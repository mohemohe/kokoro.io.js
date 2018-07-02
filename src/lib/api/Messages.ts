import fetch from "node-fetch";
import ApiBase from "./ApiBase";
import { IMessageEntity } from "../IPuripara";

export default class Messages extends ApiBase {
    public async deleteMessage(messageId: number) {
        const response = await fetch(`${this.baseUrl}/api/v1/messages/${messageId}`, {
            method: "DELETE",
            headers: this.generateHeader(),
        });
        if (!response.status.toString().startsWith("2")) {
            throw new Error();
        }

        return response.json() as any as IMessageEntity;
    }
}