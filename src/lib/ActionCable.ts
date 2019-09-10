import { EventEmitter } from "events";
import { IOption } from "./kokoro.io";
import WebSocket from "ws";
import {IMessageEntity} from "./IPuripara";

export enum EventType {
	Connect = "connect",
	Disconnect = "disconnect",
	Chat = "chat",
	Event = "event",
	Error = "kokoro.io.error",
}

export enum ActionCableEvent {
	Welcome = "welcome",
	Ping = "ping",
	ConfirmSubscription = "confirm_subscription",
	RejectSubscription = "reject_subscription",
}

export enum PuriparaEvent {
	MessageCreated = "message_created",
	MessageUpdated = "message_updated",
}

interface IPuriparaMessage<T> {
	identifier: {
		channel: string,
	};
	message: {
		event: PuriparaEvent,
		data: T,
	};
}

export interface IActionCableMessage<T> {
	type: ActionCableEvent;
	identifier?: any;
	data?: T;
}

export default class ActionCable extends EventEmitter {
	private url: string;
	private origin: string;
	private accessToken: string;
	private autoReconnect: boolean;
	private streamTimeoutSec: number;
	private retryCount: number;
	private retryHandler?: NodeJS.Timer;
	private timeoutHandler?: NodeJS.Timer;
	private websocket?: WebSocket;
	public Event = EventType;

	constructor(option: IOption) {
		super();

		this.url = option.cableUrl!;
		this.origin = option.baseUrl!;
		this.accessToken = option.accessToken;
		this.autoReconnect = option.autoReconnect!;
		this.streamTimeoutSec = option.streamTimeoutSec!;
		this.retryCount = 0;
	}

	public connect(autoReconnect?: boolean) {
		if (!this.url || !this.origin || !this.accessToken) {
			throw new Error();
		}

		if (autoReconnect) {
			this.autoReconnect = autoReconnect;
		}

		try {
			this.websocket = new (require("ws"))(this.url, {
				origin: this.origin,
				headers: {
					"X-Access-Token": this.accessToken,
				},
			}) as WebSocket;
			this.websocket.on("error", this.onError.bind(this));
			this.websocket.on("open", this.onConnect.bind(this));
			this.websocket.on("close", this.onDisconnect.bind(this));
			this.websocket.on("message", this.onMessage.bind(this));
		} catch (e) {
			this.onDisconnect();
		}
	}

	public dispose() {
		if (this.retryHandler) {
			clearTimeout(this.retryHandler);
		}
		if (this.websocket) {
			this.websocket.close();
			delete this.websocket;
		}
	}

	public on(event: EventType, listener: (...args: any[]) => void) {
		return super.on(event, listener);
	}

	public send(command: string, data?: any, identifier?: any) {
		if (this.websocket) {
			const message = {
				command,
				identifier: JSON.stringify(identifier || {
					channel: "ChatChannel",
				}),
				data: data ? JSON.stringify(data) : undefined,
			};
			this.sendRaw(message);
		}
	}

	public sendRaw(message: any): void {
		if (this.websocket) {
			if (process && process.env && process.env.NODE_ENV === "debug") {
				// tslint:disable-next-line:no-console
				console.log("[kokoro.io] ActionCable send:", message);
			}
			const json = JSON.stringify(message);
			this.websocket.send(json);
		}
	}

	private onConnect() {
		// NOTE: NOP, move to onWelcome
	}

	private onError(error: Error) {
		this.emit(EventType.Error, error);
	}

	private onDisconnect() {
		// tslint:disable-next-line:no-console
		console.log("[kokoro.io] ActionCable disconnected");
		this.emit(EventType.Disconnect);

		if (this.autoReconnect) {
			this.dispose();

			this.retryCount++;
			const waitTime = this.waitTime;
			// tslint:disable-next-line:no-console
			console.log(`[kokoro.io] waiting for reconnect: ${waitTime}sec.`);
			this.retryHandler = setTimeout(() => {
				this.connect();
			}, this.waitTime * 1000);
		}
	}

	private get waitTime() {
		const min = this.retryCount;
		const max = Math.pow(2, this.retryCount);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	private onMessage(data: WebSocket.Data) {
		const json = JSON.parse(data.toString()) as IActionCableMessage<any> & IPuriparaMessage<any>;
		if (process && process.env && process.env.NODE_ENV === "debug") {
			// tslint:disable-next-line:no-console
			console.log("[kokoro.io] ActionCable received:", json);
		}
		switch (json.type) {
			case ActionCableEvent.Ping:
				if (this.timeoutHandler) {
					clearTimeout(this.timeoutHandler);
				}
				this.sendRaw({
					type: "pong",
					message: Math.floor(new Date().getTime() / 1000),
				});
				this.timeoutHandler = setTimeout(() => {
					this.onDisconnect();
				}, this.streamTimeoutSec * 1000);
				break;
			case ActionCableEvent.Welcome:
				this.send("subscribe");
				break;
			case ActionCableEvent.ConfirmSubscription:
				this.emit(EventType.Event, json);
				// tslint:disable-next-line:no-console
				console.log("[kokoro.io] ActionCable connected");
				this.retryCount = 0;
				this.emit(EventType.Connect);
				break;
			case ActionCableEvent.RejectSubscription:
				this.emit(EventType.Event, json);
				break;
			default:
				const message = json as IPuriparaMessage<IMessageEntity>;
				switch (message.message.event) {
					case PuriparaEvent.MessageCreated:
					case PuriparaEvent.MessageUpdated:
						this.emit(EventType.Chat, message.message);
						break;
					default:
						// tslint:disable-next-line:no-console
						console.log("[kokoro.io.js] not impremented event received:", message);
				}
		}
	}
}
