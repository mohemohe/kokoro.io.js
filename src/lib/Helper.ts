import {IMembershipEntity} from "./IPuripara";
import ActionCable from "./ActionCable";

export default class Helper {
	public static membershipsToChannelIds(memberships: IMembershipEntity[]) {
		return memberships.map((membership: IMembershipEntity) => {
			return membership.channel.id;
		});
	}

	public static membershipsToChannelIdByChannelName(memberships: IMembershipEntity[], targetChannelName: string) {
		const filtered = memberships.filter((membership: IMembershipEntity) => {
			return membership.channel.channel_name === targetChannelName;
		});
		const channel = filtered.pop();
		if (!channel) {
			return undefined;
		}
		return channel.channel.id;
	}

	public static subscribeChatChannelByChannelIds(stream: ActionCable, channelIds: string[]) {
		stream.send("message", {
			action: "subscribe",
			channels: channelIds,
		});
	}
}
