import fetch from "node-fetch";
import ApiBase from "./ApiBase";
import { IMessageEntity, IChannelEntity, IChannelWithMembershipsEntity } from "../IPuripara";

export interface IPutChannelBody {
    channel_name?: string;
    description?: string;
}

export interface IPostChannelBody {
    channel_name: string;
    description: string;
    kind?: "public_channel" | "private_channel";
}

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

    public async putArchiveChannel(channelId: string) {
        const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}/archive`, {
            method: "PUT",
            headers: this.generateHeader(),
        });
        if (!response.status.toString().startsWith("2")) {
            throw new Error();
        }

        return response;
    }

    public async putUnarchiveChannel(channelId: string) {
        const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}/unarchive`, {
            method: "PUT",
            headers: this.generateHeader(),
        });
        if (!response.status.toString().startsWith("2")) {
            throw new Error();
        }

        return response;
    }

    public async getChannelMemberships(channelId: string) {
        const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}/memberships`, {
            method: "GET",
            headers: this.generateHeader(),
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IChannelWithMembershipsEntity;
    }

    public async postChannel(body: IPostChannelBody) {
        const data: any = {};
        Object.keys(body).forEach((key) => {
            data[`channel[${key}]`] = (body as any)[key];
        });

        const response = await fetch(`${this.baseUrl}/api/v1/channels`, {
            method: "POST",
            headers: this.generateHeader(),
            body: this.generateFormData(data),
        });
        if (!response.status.toString().startsWith("2")) {
            throw new Error();
        }

        return response.json() as any as IChannelEntity;
    }

    public async putChannel(channelId: string, body: IPutChannelBody) {
        const data: any = {};
        Object.keys(body).forEach((key) => {
            data[`channel[${key}]`] = (body as any)[key];
        });

        const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}`, {
            method: "PUT",
            headers: this.generateHeader(),
            body: this.generateFormData(data),
        });
        if (!response.status.toString().startsWith("2")) {
            throw new Error();
        }

        return response;
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