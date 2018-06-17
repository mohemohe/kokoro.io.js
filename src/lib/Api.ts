import fetch from "node-fetch";
import FormData from "form-data";
import {IMembershipEntity, IMessageEntity} from "./IPuripara";

export default class Api {
    private baseUrl: string;
    private accessToken: string;
    
    constructor(baseUrl: string, accessToken: string) {
        this.baseUrl = baseUrl;
        this.accessToken = accessToken;
    }

    private generateHeader(override?: any) {
        return Object.assign({}, {
            "X-Access-Token": this.accessToken,
        }, override);
    }

    public async getMemberships() {
        const response = await fetch(`${this.baseUrl}/api/v1/memberships`, {
            method: "GET",
            headers: this.generateHeader(),
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IMembershipEntity[];
    }

    public async postChannelMessage(channelId: string, message: string, nsfw: boolean = false) {
        const body = new FormData();
        body.append("message", message);
        body.append("nsfw", JSON.stringify(nsfw));
        const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}/messages`, {
            method: "POST",
            headers: this.generateHeader(),
            body,
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IMessageEntity[];
    }
}

