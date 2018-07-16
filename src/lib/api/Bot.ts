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
		if (!this.isSuccessResponse(response)) {
			throw await this.generateApiErrorObject(response);
		}

		return response.json() as Promise<IMessageEntity>;
	}
}
