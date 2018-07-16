import fetch from "node-fetch";
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
		if (!response.ok) {
			throw new Error();
		}

		return response.json() as any as IDeviceEntity[];
	}

	public async postDevice(body: IPostDeviceBody) {
		const response = await fetch(`${this.baseUrl}/api/v1/devices`, {
			method: "POST",
			headers: this.generateHeader(),
			body: this.generateFormData(body),
		});
		if (!response.ok) {
			throw new Error();
		}

		return response.json() as any as IDeviceEntity;
	}

	public async deleteDevice(deviceIdentifier: string) {
		const response = await fetch(`${this.baseUrl}/api/v1/devices/${deviceIdentifier}`, {
			method: "DELETE",
			headers: this.generateHeader(),
		});
		if (!response.status.toString().startsWith("2")) {
			throw new Error();
		}

		return;
	}
}
