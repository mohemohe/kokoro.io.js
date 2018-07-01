import fetch from "node-fetch";
import ApiBase from "./ApiBase";
import { IMembershipEntity } from "../IPuripara";

export interface IUpdateMembershipBodyBase {
    notification_policy?: "all_messages" | "only_mentions" | "nothing";
    read_state_tracking_policy?: "keep_latest" | "consume_last" | "consume_latest";
    visible?: boolean;
    muted?: boolean;
}

export interface IPostMembershipBody extends IUpdateMembershipBodyBase {
    channel_id: string;
}

export interface IPutMembershipBody extends IUpdateMembershipBodyBase {
    latest_read_message_id?: number;
}

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

    public async postMembership(body: IPostMembershipBody) {
        const response = await fetch(`${this.baseUrl}/api/v1/memberships`, {
            method: "POST",
            headers: this.generateHeader(),
            body: this.generateFormData(body),
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IMembershipEntity;
    }

    public async deleteMembership(id: string) {
        const response = await fetch(`${this.baseUrl}/api/v1/memberships/${id}`, {
            method: "DELETE",
            headers: this.generateHeader(),
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IMembershipEntity;
    }

    public async putMembership(id: string, body: IPutMembershipBody) {
        const response = await fetch(`${this.baseUrl}/api/v1/memberships/${id}`, {
            method: "PUT",
            headers: this.generateHeader(),
            body: this.generateFormData(body),
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IMembershipEntity;
    }

    public async putJoinMembership(id: string) {
        const response = await fetch(`${this.baseUrl}/api/v1/memberships/${id}/join`, {
            method: "PUT",
            headers: this.generateHeader(),
        });
        if (!response.ok) {
            throw new Error();
        }

        return response.json() as any as IMembershipEntity;
    }
}