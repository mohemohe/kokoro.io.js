import fetch from "node-fetch";
import ApiBase from "./ApiBase";
import { IMembershipEntity } from "../IPuripara";

export default class Memberships extends ApiBase {
    public async getMemberships() {
        const response = await fetch(`${this.baseUrl}/api/v1/memberships`, {
            method: "GET",
            headers: this.generateHeader(),
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IMembershipEntity[];
    }
}