import fetch from "node-fetch";
import ApiBase from "./ApiBase";
import { IProfileEntity } from "../IPuripara";

export interface IPutMyProfileBody {
	screen_name?: string;
	display_name?: string;
	avatar?: ReadableStream;
}

export default class Profiles extends ApiBase {
	public async getProfiles() {
		const response = await fetch(`${this.baseUrl}/api/v1/profiles`, {
			method: "GET",
			headers: this.generateHeader(),
		});
		if (!this.isSuccessResponse(response)) {
			throw await this.generateApiErrorObject(response);
		}

		return response.json() as Promise<IProfileEntity[]>;
	}

	public async getMyProfile() {
		const response = await fetch(`${this.baseUrl}/api/v1/profiles/me`, {
			method: "GET",
			headers: this.generateHeader(),
		});
		if (!this.isSuccessResponse(response)) {
			throw await this.generateApiErrorObject(response);
		}

		return response.json() as Promise<IProfileEntity>;
	}

	public async putMyProfile(body: IPutMyProfileBody) {
		const response = await fetch(`${this.baseUrl}/api/v1/profiles/me`, {
			method: "PUT",
			headers: this.generateHeader(),
			body: this.generateFormData(body),
		});
		if (!this.isSuccessResponse(response)) {
			throw await this.generateApiErrorObject(response);
		}

		return response.json() as Promise<IProfileEntity>;
	}
}
