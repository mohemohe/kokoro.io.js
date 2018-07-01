import fetch from "node-fetch";
import ApiBase from "./ApiBase";
import { IMessageEntity } from "../IPuripara";

export interface IPostChannelMessageBody {
    message: string;
    nsfw?: boolean;
}

export default class Bot extends ApiBase {
    public async postChannelMessage(channelId: string, body: IPostChannelMessageBody) {
        const response = await fetch(`${this.baseUrl}/api/v1/bot/channels/${channelId}/messages`, {
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