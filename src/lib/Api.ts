import AccessTokens from "./api/AccessTokens";
import Bot from "./api/Bot";
import Channels from "./api/Channels";
import Devices from "./api/Devices";
import Memberships from "./api/Memberships";
import Messages from "./api/Messages";
import Profiles from "./api/Profiles";
import { IOption } from "./kokoroIo";

export default class Api {
	public AccessTokens: AccessTokens;
	public Bot: Bot;
	public Channels: Channels;
	public Devices: Devices;
	public Memberships: Memberships;
	public Messages: Messages;
	public Profiles: Profiles;

	constructor(option: IOption) {
		this.AccessTokens = new AccessTokens(option);
		this.Bot = new Bot(option);
		this.Channels = new Channels(option);
		this.Devices = new Devices(option);
		this.Memberships = new Memberships(option);
		this.Messages = new Messages(option);
		this.Profiles = new Profiles(option);
	}
}
