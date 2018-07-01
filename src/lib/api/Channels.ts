import fetch from "node-fetch";
import ApiBase from "./ApiBase";
import { IMessageEntity, IChannelEntity } from "../IPuripara";

export interface IPostChannelMessageBody {
    message: string;
    nsfw?: boolean;
    idempotent_key?: string;
    expand_embed_contents?: string;
}

export default class Channels extends ApiBase {
    public async getChannels(archived: boolean = true) {
        const response = await fetch(`${this.baseUrl}/api/v1/channels?archived=${archived}`, {
            method: "GET",
            headers: this.generateHeader(),
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IChannelEntity[];
    }

    public async getChannel(channelId: string) {
        const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}`, {
            method: "GET",
            headers: this.generateHeader(),
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IChannelEntity;
    }

    public async getChannelMessages(channelId: string, limit?: number, before_id?: number, after_id?: number) {
        const params = this.generateQueryParameter({
            limit,
            before_id,
            after_id,
        });
        console.log(`${this.baseUrl}/api/v1/channels/${channelId}/messages${params}`);
        const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}/messages${params}`, {
            method: "GET",
            headers: this.generateHeader(),
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IMessageEntity[];
    }

    public async postChannelMessage(channelId: string, body: IPostChannelMessageBody) {
        const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}/messages`, {
            method: "POST",
            headers: this.generateHeader(),
            body: this.generateFormData(body),
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IMessageEntity[];
    }
}