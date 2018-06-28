export interface IMembershipEntity {
    id: string;
    channel: IChannelWithoutMembershipEntity;
    authority: string;
    disable_notification: boolean;
    notification_policy: string;
    read_state_tracking_policy: string;
    latest_read_message_id: number;
    unread_count: number;
    visible: boolean;
    muted: boolean;
    profile: IProfileEntity;
}

export interface IProfileEntity {
    id: string;
    type: string;
    screen_name: string;
    display_name: string;
    avatar: string;
    avatars: IAvatarEntity[];
    archived: boolean;
    invited_channels_count: number;
}

export interface IAvatarEntity  {
    size: number;
    url: string;
    is_default: boolean;
}

export interface IChannelWithoutMembershipEntity {
    id: string;
    channel_name: string;
    kind: string;
    archived: boolean;
    description: string;
    latest_message_id?: number;
    latest_message_published_at?: string;
    messages_count: number;
}

export interface IMessageEntity {
    id: number;
    idempotent_key: string;
    display_name: string;
    avatar: string;
    expand_embed_contents: boolean;
    avatars: IAvatarEntity[];
    status: "active" | "deleted_by_publisher" | "deleted_by_another_member";
    content: string;
    html_content: string;
    plaintext_content: string;
    raw_content: string;
    embedded_urls: string[];
    embed_contents: IEmbedContentEntity[];
    published_at: string;
    nsfw: boolean;
    channel: IChannelEntity;
    profile: IChannelWithoutMembershipEntity;
}

export interface IEmbedContentEntity {
    url: string;
    position: number;
    data: IEmbedDataEntity;
}

export interface IEmbedDataEntity {
    cache_age: number;
    medias: IEmbedDataMediaEntity;
    metadata_image: IEmbedDataMediaEntity;
    restriction_policy: "Unknown" | "Safe" | "NotSafe";
    title: string;
    type: "MixedContent" | "SingleImage" | "SingleVideo" | "SingleAudio";
    url: string;
}

export interface IEmbedDataMediaEntity {
    raw_url: string;
    restriction_policy: "Unknown" | "Safe" | "NotSafe";
    type: "Image" | "Video" | "Audio";
    thumbnail: IEmbedDataImageInfoEntity;
}

export interface IEmbedDataImageInfoEntity {
    url: string;
    width: number;
    height: number;
}

export interface IChannelEntity {
    id: string;
    channel_name: string;
    kind: "public_channel" | "private_channel" | "direct_message";
    archived: boolean;
    description: string;
    latest_message_id: number;
    latest_message_published_at: string;
    messages_count: number;
    membership: IMembershipEntity;
}