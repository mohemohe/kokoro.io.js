# kokoro.io.js

[kokoro.io](https://kokoro.io) SDK for Node.js

## breaking changes!

https://github.com/mohemohe/kokoro.io.js/wiki/%E8%A8%AD%E8%A8%88%E6%96%B9%E9%87%9D

## インストール

npmには公開していません

```bash
yarn add mohemohe/kokoro.io.js
```

## サンプル

### stream

```js
require('source-map-support').install();
const kokoro = require('kokoro-io');

const kokoroIo = new kokoro.io({
    accessToken: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
});

kokoroIo.Stream.on('connect', async () => {
    const memberships = await kokoroIo.Api.Memberships.getMemberships();
    const channelIds = kokoroIo.Helper.membershipsToChannelIds(memberships);
    kokoroIo.Helper.subscribeChatChannelByChannelIds(kokoroIo.Stream, channelIds);

    const postChannelId = kokoroIo.Helper.membershipsToChannelIdByChannelName(memberships, "kokoro.io/テスト用");
    if (postChannelId) {
        kokoroIo.Api.Channels.postChannelMessage(postChannelId, 'もこたんインしたお！');
    }
});
kokoroIo.Stream.on('chat', (message) => {
    console.log('message:', message);
});
kokoroIo.Stream.on('event', (event) => {
    console.log('event:', event);
});
kokoroIo.Stream.connect();
```

### bot

```js
require('source-map-support').install();
const kokoro = require('kokoro-io');

const kokoroIo = new kokoro.io({
    accessToken: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
});

(async () => {
    kokoroIo.Api.Bot.postChannelMessage('JPERDC16M', 'hu');
})();
```

## 実装ステータス

### Stream

- [ ] ActionCable
    - [x] connect
    - [x] disconnect
    - [x] welcome
    - [ ] ping
    - [x] confirm_subscription
    - [x] reject_subscription
    - [x] send
- [ ] PreparaEvent
    - [ ] subscribed
    - [x] message_created
    - [ ] ？？？

### API

- [x] access_tokens
    - [x] get /v1/access_tokens
    - [x] post /v1/access_tokens
    - [x] delete /v1/access_tokens/{access_token_id}

- [x] bot
    - [x] post /v1/bot/channels/{channel_id}/messages

- [ ] channels
    - [x] get /v1/channels/{channel_id}
    - [ ] put /v1/channels/{channel_id}
    - [ ] put /v1/channels/{channel_id}/archive
    - [ ] put /v1/channels/{channel_id}/unarchive
    - [ ] get /v1/channels/{channel_id}/memberships
    - [x] get /v1/channels
    - [ ] post /v1/channels
    - [ ] post /v1/channels/direct_message
    - [ ] put /v1/channels/{channel_id}/manage_members/{member_id}
    - [x] get /v1/channels/{channel_id}/messages
    - [x] post /v1/channels/{channel_id}/messages

- [ ] devices
    - [ ] get /v1/devices
    - [ ] post /v1/devices
    - [ ] delete /v1/devices/{device_identifier}

- [ ] memberships
    - [x] get /v1/memberships
    - [ ] post /v1/memberships
    - [ ] delete /v1/memberships/{id}
    - [ ] put /v1/memberships/{id}
    - [ ] put /v1/memberships/{id}/join

- [x] messages
    - [x] delete /v1/messages/{message_id}

- [ ] profiles
    - [ ] get /v1/profiles
    - [ ] get /v1/profiles/me
    - [ ] put /v1/profiles/me
