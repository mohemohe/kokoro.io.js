import { Response } from "node-fetch";
import FormData from "form-data";
import { IOption } from "../kokoroIo";

export default class ApiBase {
	protected option: IOption;
	protected baseUrl: string;
	protected accessToken: string;

	constructor(option: IOption) {
		this.option = option;
		this.baseUrl = option.baseUrl!;
		this.accessToken = option.accessToken;
	}

	protected generateHeader(override?: any) {
		return {
			"X-Access-Token": this.accessToken,
			...override,
		};
	}

	protected generateQueryParameter(params: { [index: string]: string | number | undefined }) {
		const queryArray: string[] = [];
		Object.keys(params).forEach((key) => {
			if (params[key]) {
				queryArray.push(`${key}=${params[key]}`);
			}
		});
		return queryArray.length > 0 ? `?${queryArray.join("&")}` : "";
	}

	protected generateFormData(body: any) {
		const form = new FormData();
		Object.keys(body).forEach((key) => {
			form.append(key, body[key]);
		});
		return form;
	}

	protected isSuccessResponse(response: Response) {
		return response.status.toString().startsWith("2");
	}

	protected async generateApiErrorObject(response: Response) {
		return new Error(`Invalid response, status: ${response.status} ${response.statusText}, body: ${await response.text()}`);
	}
}
