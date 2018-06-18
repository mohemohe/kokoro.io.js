import fetch from "node-fetch";
import FormData from "form-data";
import ApiBase from "./ApiBase";
import { IMessageEntity } from "../IPuripara";

export default class Channels extends ApiBase {
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