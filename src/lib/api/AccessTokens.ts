import fetch from "node-fetch";
import ApiBase from "./ApiBase";
import { IAccessTokenEntity } from "../IPuripara";

export interface IPostAccessTokenBody {
    name: string;
}

export default class AccessTokens extends ApiBase {
    public async getAccesstokens() {
        const response = await fetch(`${this.baseUrl}/api/v1/access_tokens`, {
            method: "GET",
            headers: this.generateHeader(),
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IAccessTokenEntity[];
    }

    public async postAccesstoken(body: IPostAccessTokenBody) {
        const response = await fetch(`${this.baseUrl}/api/v1/access_tokens`, {
            method: "POST",
            headers: this.generateHeader(),
            body: this.generateFormData(body),
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IAccessTokenEntity;
    }

    public async deleteAccesstoken(id: string) {
        const response = await fetch(`${this.baseUrl}/api/v1/access_tokens/${id}`, {
            method: "DELETE",
            headers: this.generateHeader(),
        });
        if (!response.status.toString().startsWith("2")) {
            throw new Error();
        }

        return;
    }
}