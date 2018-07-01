import FormData from "form-data";

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

    protected generateQueryParameter(params: any) {
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
}

