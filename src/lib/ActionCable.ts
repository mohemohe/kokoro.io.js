import {EventEmitter} from "events";
import WebSocket from "ws";
import { IOption } from "./kokoro.io";

const EventType = {
	Connect: "connect",
	Disconnect: "disconnect",
	Chat: "chat",
	Event: "event",
	Error: "error",
};
export type EventType = keyof typeof EventType;

const ActionCableEvent = {
	Welcome: "welcome",
	Ping: "ping",
	ConfirmSubscription: "confirm_subscription",
	RejectSubscription: "reject_subscription",
};
type ActionCableEvent = keyof typeof ActionCableEvent;

const PuriparaEvent = {
	MessageCreated: "message_created",
};
type PuriparaEvent = keyof typeof PuriparaEvent;

interface IPuriparaMessage {
	identifier: {
		channel: string,
	};
	message: {
		event: PuriparaEvent,
		data: any,
	};
}

export interface IActionCableMessage {
	type: ActionCableEvent;
	identifier?: any;
	data?: any;
}

export default class ActionCable extends EventEmitter {
	private url: string;
	private origin: string;
	private accessToken: string;
	private autoReconnect: boolean;
	private websocket?: WebSocket;

	constructor(option: IOption) {
		super();

		this.url = option.cableUrl!;
		this.origin = option.baseUrl!;
		this.accessToken = option.accessToken;
		this.autoReconnect = false;
	}

	public connect(autoReconnect?: boolean) {
		if (!this.url || !this.origin || !this.accessToken) {
			throw new Error();
		}

		if (autoReconnect) {
			this.autoReconnect = autoReconnect;
		}

		this.websocket = new WebSocket(this.url, {
			origin: this.origin,
			headers: {
				"X-Access-Token": this.accessToken,
			},
		});
		this.websocket.on("error", this.onError.bind(this));
		this.websocket.on("open", this.onConnect.bind(this));
		this.websocket.on("close", this.onDisconnect.bind(this));
		this.websocket.on("message", this.onMessage.bind(this));
	}

	public dispose() {
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
			const json = JSON.stringify({
				command,
				identifier: JSON.stringify(identifier || {
					channel: "ChatChannel",
				}),
				data: data ? JSON.stringify(data) : undefined,
			});
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
			this.connect();
		}
	}

	private onMessage(data: WebSocket.Data) {
		const json = JSON.parse(data.toString()) as IActionCableMessage & IPuriparaMessage;
		switch (json.type) {
			case ActionCableEvent.Ping:
				// NOTE: NOP
				break;
			case ActionCableEvent.Welcome:
				this.send("subscribe");
				break;
			case ActionCableEvent.ConfirmSubscription:
				this.emit(EventType.Event, json);
				// tslint:disable-next-line:no-console
				console.log("[kokoro.io] ActionCable connected");
				this.emit(EventType.Connect);
				break;
			case ActionCableEvent.RejectSubscription:
				this.emit(EventType.Event, json);
				break;
			default:
				const message = json as IPuriparaMessage;
				switch (message.message.event) {
					case PuriparaEvent.MessageCreated:
						this.emit(EventType.Chat, message.message);
						break;
					default:
						// tslint:disable-next-line:no-console
						console.log("[kokoro.io.js] not impremented event received:", message);
				}
		}
	}
}
