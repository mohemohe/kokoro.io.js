import ActionCable from "./ActionCable";
import Api from "./Api";
import Helper from "./Helper";

export interface IOption extends IDefaultOption {
	accessToken: string;
}

interface IDefaultOption {
	baseUrl?: string;
	cableUrl?: string;
	autoReconnect?: boolean;
	streamTimeoutSec?: number;
}

interface IKokoroIo {
	io: {
		option: IOption,
	};
}

const defaultOption: IDefaultOption = {
	baseUrl: "https://kokoro.io",
	cableUrl: "wss://kokoro.io/cable",
	autoReconnect: false,
	streamTimeoutSec: 10,
};

export default class KokoroIo {
	private kokoro: IKokoroIo;
	public Stream: ActionCable;
	public Api: Api;
	public Helper: Helper;

	constructor(option: IOption) {
		this.kokoro = {
			io: {
				option: {
					...defaultOption,
					...option,
				} as IOption,
			},
		};

		this.Stream = new ActionCable(this.kokoro.io.option);
		this.Api = new Api(this.kokoro.io.option);
		this.Helper = Helper;
	}
}
