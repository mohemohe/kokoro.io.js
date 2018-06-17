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
}

interface IKokoroIoOption extends IOption  {
} 

interface IKokoroIo {
    io: {
        option: IOption,
    }
}

const defaultOption: IDefaultOption = {
    baseUrl: 'https://kokoro.io',
    cableUrl: 'wss://kokoro.io/cable',
    autoReconnect: false,
};

export default class KokoroIo {
    private kokoro: IKokoroIo;
    public Stream: ActionCable;
    public Api: Api;
    public Helper: Helper;

    constructor(option: IOption) {
        this.kokoro = {
            io: {
                option: Object.assign({}, defaultOption, option) as IKokoroIoOption,
            },
        };

        this.Stream = new ActionCable(this.kokoro.io.option.cableUrl!, this.kokoro.io.option.baseUrl!, this.kokoro.io.option.accessToken);
        this.Api = new Api(this.kokoro.io.option.baseUrl!, this.kokoro.io.option.accessToken);
        this.Helper = Helper;
    }
}