import React from 'react';

export interface OpenChannelSettingsProps {
  channelUrl: string;
  onCloseClick?(): void;
  onBeforeUpdateChannel?(currentTitle: string, currentImg: File, data: string): Sendbird.OpenChannelParams;
  onChannelModified?(channel: Sendbird.OpenChannel): void;
  onDeleteChannel?(channel: Sendbird.OpenChannel): void;
}

const OpenChannelSetting = ({
  channelUrl,
  onCloseClick,
  onBeforeUpdateChannel,
  onChannelModified,
  onDeleteChannel,
}: OpenChannelSettingsProps) => {
  return <></>;
};

export default OpenChannelSetting;
