import React from 'react';
import SendBird from 'sendbird';
import ChannelSettingsUI from './components/ChannelSettingsUI';

import { ChannelSettingsProvider } from './context/ChannelSettingsProvider';

interface ApplicationUserListQuery {
  limit?: number;
  userIdsFilter?: Array<string>;
  metaDataKeyFilter?: string;
  metaDataValuesFilter?: Array<string>;
}

interface ChannelSettingsQueries {
  applicationUserListQuery?: ApplicationUserListQuery;
}

interface ChannelSettingsProps {
  channelUrl: string;
  onCloseClick?(): void;
  onChannelModified?(channel: SendBird.GroupChannel): void;
  onBeforeUpdateChannel?(currentTitle: string, currentImg: File, data: string): SendBird.GroupChannelParams;
  queries?: ChannelSettingsQueries;
}

const ChannelSettings: React.FC<ChannelSettingsProps> = (props: ChannelSettingsProps) => {
  const {
    channelUrl,
    onCloseClick,
    onChannelModified,
    onBeforeUpdateChannel,
    queries,
  } = props;
  return (
    <ChannelSettingsProvider
      channelUrl={channelUrl}
      onCloseClick={onCloseClick}
      onChannelModified={onChannelModified}
      onBeforeUpdateChannel={onBeforeUpdateChannel}
      queries={queries}
    >
      <ChannelSettingsUI />
    </ChannelSettingsProvider>
  );
}

export default ChannelSettings;
