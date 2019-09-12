import fetch from "node-fetch";
import { Base64 } from "js-base64";
import ApiBase from "./ApiBase";
import { IDeviceEntity } from "../IPuripara";

export interface IPostDeviceBody {
	name: string;
	kind: "chrome" | "firefox" | "official_web" | "uwp" | "android" | "ios" | "unknown";
	device_identifier: string;
	notification_identifier?: string;
	subscribe_notification?: boolean;
}

export default class Devices extends ApiBase {
	public async getDevices() {
		const response = await fetch(`${this.baseUrl}/api/v1/devices`, {
			method: "GET",
			headers: this.generateHeader(),
		});
		if (!this.isSuccessResponse(response)) {
			throw await this.generateApiErrorObject(response);
		}

		return response.json() as Promise<IDeviceEntity[]>;
	}

	public static async postDevice(baseUrl: string, username: string, password: string, body: IPostDeviceBody) {
		const headers = {
			"X-Account-Token": Base64.encode([username, password].join(":")),
		};
		return Devices._postDevice(baseUrl, headers, body);
	}

	public async postDevice(username: string, password: string, body: IPostDeviceBody) {
		const headers = this.generateHeader();
		return Devices._postDevice(this.baseUrl, headers, body);
	}

	private static async _postDevice(baseUrl: string, headers: any, body: any) {
		const response = await fetch(`${baseUrl}/api/v1/devices`, {
			method: "POST",
			headers,
			body: JSON.stringify(body),
		});
		if (!ApiBase.isSuccessResponse(response)) {
			throw await ApiBase.generateApiErrorObject(response);
		}

		return response.json() as Promise<IDeviceEntity>;
	}

	public async deleteDevice(deviceIdentifier: string) {
		const response = await fetch(`${this.baseUrl}/api/v1/devices/${deviceIdentifier}`, {
			method: "DELETE",
			headers: this.generateHeader(),
		});
		if (!response.status.toString().startsWith("2")) {
			throw await this.generateApiErrorObject(response);
		}

		return;
	}
}
