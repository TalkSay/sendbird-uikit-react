import React from 'react';
import OpenChannelUI from './components/OpenChannelUI';
import { OpenChannelProps, OpenChannelProvider } from './context/OpenChannelProvider';

export default function OpenChannel(props: OpenChannelProps) {
  const {
    channelUrl,
    useMessageGrouping,
    queries,
    experimentalMessageLimit,
    onBeforeSendUserMessage,
    onBeforeSendFileMessage,
    onChatHeaderActionClick,
    renderMessage,
    renderHeader,
    renderInput,
  } = props;
  return (
    <OpenChannelProvider
      channelUrl={channelUrl}
      useMessageGrouping={useMessageGrouping}
      queries={queries}
      experimentalMessageLimit={experimentalMessageLimit}
      onBeforeSendUserMessage={onBeforeSendUserMessage}
      onBeforeSendFileMessage={onBeforeSendFileMessage}
      onChatHeaderActionClick={onChatHeaderActionClick}
    >
      <OpenChannelUI
        renderMessage={renderMessage}
        renderHeader={renderHeader}
        renderInput={renderInput}
      />
    </OpenChannelProvider>
  );
}
