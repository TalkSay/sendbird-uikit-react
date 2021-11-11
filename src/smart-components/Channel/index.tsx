import React from 'react';

import SendBird from 'sendbird';
import ChannelUI from './components/ChannelUI';

import { ReplyType, ChannelQueries, ChannelProvider } from './context/ChannelProvider';
export interface ChannelProps {
  channelUrl: string;
  useMessageGrouping?: boolean;
  useReaction?: boolean;
  showSearchIcon?: boolean;
  highlightedMessage?: number;
  startingPoint?: number;
  onBeforeSendUserMessage?(text: string, quotedMessage?: SendBird.UserMessage | SendBird.FileMessage): SendBird.UserMessageParams;
  onBeforeSendFileMessage?(file: File, quotedMessage?: SendBird.UserMessage | SendBird.FileMessage): SendBird.FileMessageParams;
  onBeforeUpdateUserMessage?(text: string): SendBird.UserMessageParams;
  onChatHeaderActionClick?(event: React.MouseEvent<HTMLElement>): void;
  onSearchClick?(): void;
  replyType?: ReplyType;
  queries?: ChannelQueries;
}

const Channel: React.FC<ChannelProps> = (props: ChannelProps) => {
  const {
    channelUrl,
    useMessageGrouping,
    useReaction,
    showSearchIcon,
    highlightedMessage,
    startingPoint,
    onBeforeSendUserMessage,
    onBeforeSendFileMessage,
    onBeforeUpdateUserMessage,
    onChatHeaderActionClick,
    onSearchClick,
    replyType,
    queries,
  } = props;
  return (
    <ChannelProvider
      channelUrl={channelUrl}
      useMessageGrouping={useMessageGrouping}
      useReaction={useReaction}
      showSearchIcon={showSearchIcon}
      highlightedMessage={highlightedMessage}
      startingPoint={startingPoint}
      onBeforeSendUserMessage={onBeforeSendUserMessage}
      onBeforeSendFileMessage={onBeforeSendFileMessage}
      onBeforeUpdateUserMessage={onBeforeUpdateUserMessage}
      onChatHeaderActionClick={onChatHeaderActionClick}
      onSearchClick={onSearchClick}
      replyType={replyType}
      queries={queries}
    >
      <ChannelUI />
    </ChannelProvider>
  );
};

export default Channel;
