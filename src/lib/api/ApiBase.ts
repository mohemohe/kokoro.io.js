import fetch from "node-fetch";
import FormData from "form-data";
import {IMembershipEntity, IMessageEntity} from "../IPuripara";

export default class ApiBase {
    protected baseUrl: string;
    protected accessToken: string;

    constructor(baseUrl: string, accessToken: string) {
        this.baseUrl = baseUrl;
        this.accessToken = accessToken;
    }

    protected generateHeader(override?: any) {
        return Object.assign({}, {
            "X-Access-Token": this.accessToken,
        }, override);
    }
}

