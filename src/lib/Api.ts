import AccessTokens from "./api/AccessTokens";
import Bot from "./api/Bot";
import Channels from "./api/Channels";
import Devices from "./api/Devices";
import Memberships from "./api/Memberships";
import Messages from "./api/Messages";
import Profiles from "./api/Profiles";

export default class Api {
    public AccessTokens: AccessTokens;
    public Bot: Bot;
    public Channels: Channels;
    public Devices: Devices;
    public Memberships: Memberships;
    public Messages: Messages;
    public Profiles: Profiles;

    constructor(baseUrl: string, accessToken: string) {
        this.AccessTokens = new AccessTokens(baseUrl, accessToken);
        this.Bot = new Bot(baseUrl, accessToken);
        this.Channels = new Channels(baseUrl, accessToken);
        this.Devices = new Devices(baseUrl, accessToken);
        this.Memberships = new Memberships(baseUrl, accessToken);
        this.Messages = new Messages(baseUrl, accessToken);
        this.Profiles = new Profiles(baseUrl, accessToken);
    }
}

