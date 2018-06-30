import AccessTokens from "./api/AccessTokens";
import Bot from "./api/Bot";
import Channels from "./api/Channels";
import Memberships from "./api/Memberships";

export default class Api {
    public AccessTokens: AccessTokens;
    public Bot: Bot;
    public Channels: Channels;
    public Memberships: Memberships;

    constructor(baseUrl: string, accessToken: string) {
        this.AccessTokens = new AccessTokens(baseUrl, accessToken);
        this.Bot = new Bot(baseUrl, accessToken);
        this.Channels = new Channels(baseUrl, accessToken);
        this.Memberships = new Memberships(baseUrl, accessToken);
    }
}

