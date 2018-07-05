# kokoro.io.js (kokoro-io)

[kokoro.io](https://kokoro.io) SDK for Node.js

## breaking changes!

https://github.com/mohemohe/kokoro.io.js/wiki/%E8%A8%AD%E8%A8%88%E6%96%B9%E9%87%9D

## インストール

```bash
yarn add kokoro-io
```

TypeScriptで書かれたソースをpostinstallで自動的にビルドします。
型定義ファイルのd.tsも同時に出力します。

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
        kokoroIo.Api.Channels.postChannelMessage(postChannelId, {
            message: 'もこたんインしたお！',
        });
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
    kokoroIo.Api.Bot.postChannelMessage('JPERDC16M', {
        message: 'hu',
    });
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
- [ ] PriparaEvent
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

- [x] devices
    - [x] get /v1/devices
    - [x] post /v1/devices
    - [x] delete /v1/devices/{device_identifier}

- [x] memberships
    - [x] get /v1/memberships
    - [x] post /v1/memberships
    - [x] delete /v1/memberships/{id}
    - [x] put /v1/memberships/{id}
    - [x] put /v1/memberships/{id}/join

- [x] messages
    - [x] delete /v1/messages/{message_id}

- [x] profiles
    - [x] get /v1/profiles
    - [x] get /v1/profiles/me
    - [x] put /v1/profiles/me
