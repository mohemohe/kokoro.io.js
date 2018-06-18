import Channels from "./api/Channels";
import Bot from "./api/Bot";
import Memberships from "./api/Memberships";

export default class Api {
    public Bot: Bot;
    public Channels: Channels;
    public Memberships: Memberships;

    constructor(baseUrl: string, accessToken: string) {
        this.Bot = new Bot(baseUrl, accessToken);
        this.Channels = new Channels(baseUrl, accessToken);
        this.Memberships = new Memberships(baseUrl, accessToken);
    }
}

