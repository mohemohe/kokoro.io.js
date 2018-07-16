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

export interface IPostDirectMessageBody {
	target_user_profile_id: string;
}

export interface IPutMemberAuthority {
	authority: string;
}

export default class Channels extends ApiBase {
	public async getChannels(archived: boolean = true) {
		const response = await fetch(`${this.baseUrl}/api/v1/channels?archived=${archived}`, {
			method: "GET",
			headers: this.generateHeader(),
		});
		if (!this.isSuccessResponse(response)) {
			throw await this.generateApiErrorObject(response);
		}

		return response.json() as Promise<IChannelEntity[]>;
	}

	public async getChannel(channelId: string) {
		const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}`, {
			method: "GET",
			headers: this.generateHeader(),
		});
		if (!this.isSuccessResponse(response)) {
			throw await this.generateApiErrorObject(response);
		}

		return response.json() as Promise<IChannelEntity>;
	}

	public async putArchiveChannel(channelId: string) {
		const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}/archive`, {
			method: "PUT",
			headers: this.generateHeader(),
		});
		if (!response.status.toString().startsWith("2")) {
			throw await this.generateApiErrorObject(response);
		}

		return response;
	}

	public async putUnarchiveChannel(channelId: string) {
		const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}/unarchive`, {
			method: "PUT",
			headers: this.generateHeader(),
		});
		if (!response.status.toString().startsWith("2")) {
			throw await this.generateApiErrorObject(response);
		}

		return response;
	}

	public async getChannelMemberships(channelId: string) {
		const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}/memberships`, {
			method: "GET",
			headers: this.generateHeader(),
		});
		if (!this.isSuccessResponse(response)) {
			throw await this.generateApiErrorObject(response);
		}

		return response.json() as Promise<IChannelWithMembershipsEntity>;
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
			throw await this.generateApiErrorObject(response);
		}

		return response.json() as Promise<IChannelEntity>;
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
			throw await this.generateApiErrorObject(response);
		}

		return response;
	}

	public async getChannelMessages(channelId: string, limit?: number, before_id?: number, after_id?: number) {
		const params = this.generateQueryParameter({
			limit,
			before_id,
			after_id,
		});
		const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}/messages${params}`, {
			method: "GET",
			headers: this.generateHeader(),
		});
		if (!this.isSuccessResponse(response)) {
			throw await this.generateApiErrorObject(response);
		}

		return response.json() as Promise<IMessageEntity[]>;
	}

	public async postChannelMessage(channelId: string, body: IPostChannelMessageBody) {
		const response = await fetch(`${this.baseUrl}/api/v1/channels/${channelId}/messages`, {
			method: "POST",
			headers: this.generateHeader(),
			body: this.generateFormData(body),
		});
		if (!this.isSuccessResponse(response)) {
			throw await this.generateApiErrorObject(response);
		}

		return response.json() as Promise<IMessageEntity>;
	}

	public async postDirectMessage(body: IPostDirectMessageBody) {
		const response = await fetch(`${this.baseUrl}/api/v1/channels/direct_message `, {
			method: "POST",
			headers: this.generateHeader(),
			body: this.generateFormData(body),
		});
		if (!this.isSuccessResponse(response)) {
			throw await this.generateApiErrorObject(response);
		}

		return response.json() as Promise<IMessageEntity>;
	}

	public async putMemberAuthority(channelId: string, memberId: string, body: IPutMemberAuthority) {
		const response = await fetch(`${this.baseUrl}/api/v1/channels/direct_message `, {
			method: "POST",
			headers: this.generateHeader(),
			body: this.generateFormData(body),
		});
		if (!response.status.toString().startsWith("2")) {
			throw await this.generateApiErrorObject(response);
		}

		return response;
	}
}
