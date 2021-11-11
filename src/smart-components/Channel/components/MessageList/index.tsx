import './message-list.scss';

import React from 'react';
import isSameDay from 'date-fns/isSameDay';

import { useChannel } from '../../context/ChannelProvider';
import PlaceHolder, { PlaceHolderTypes } from '../../../../ui/PlaceHolder';
import Icon, { IconTypes } from '../../../../ui/Icon';
import { compareMessagesForGrouping } from '../../context/utils';
import { MessageProvider } from '../../context/MessageProvider';
import Message from '../Message';

export type MessageListProps = {
  renderMessage?: () => React.ReactNode;
  renderEmptyPlaceholder?: () => React.ReactNode;
  renderCustomSeperator?: () => React.ReactNode;
};

const MessageList: React.FC<MessageListProps> = (props: MessageListProps) => {
  const {
    renderMessage,
    renderEmptyPlaceholder,
    renderCustomSeperator,
  } = props;
  const {
    allMessages,
    hasMoreToBottom,
    setIntialTimeStamp,
    setAnimatedMessageId,
    setHighLightedMessageId,
    useMessageGrouping,
  } = useChannel();

  const onClickScrollBot = () => {
    setIntialTimeStamp?.(null);
    setAnimatedMessageId?.(null);
    setHighLightedMessageId?.(null);
  };

  if (allMessages.length < 1) {
    return (
      <>
        {
          renderEmptyPlaceholder?.() || (
            <PlaceHolder
              className="sendbird-conversation__no-messages"
              type={PlaceHolderTypes.NO_MESSAGES}
            />)
        }
      </>
    );
  }
  return (
    <div className="sendbird-conversation__messages">
        <div className="sendbird-conversation__scroll-container">
          <div className="sendbird-conversation__padding" />
          <div
            className="sendbird-conversation__messages-padding"
            // ref={scrollRef}
            // onScroll={this.onScroll}
          >
            {
              allMessages.map(
                (m, idx) => {
                  const previousMessage = allMessages[idx - 1];
                  const nextMessage = allMessages[idx + 1];
                  const [chainTop, chainBottom] = useMessageGrouping
                    ? compareMessagesForGrouping(previousMessage, m, nextMessage)
                    : [false, false];
                  const previousMessageCreatedAt = previousMessage?.createdAt;
                  const currentCreatedAt = m.createdAt;
                  // https://stackoverflow.com/a/41855608
                  const hasSeparator = !(previousMessageCreatedAt && (
                    isSameDay(currentCreatedAt, previousMessageCreatedAt)
                  ));

                  const handleScroll = () => {};

                  return (
                    <MessageProvider
                      key={m.messageId || m.reqId}
                      handleScroll={handleScroll}
                      message={m}
                      chainTop={chainTop}
                      chainBottom={chainBottom}
                      hasSeparator={hasSeparator}
                    >
                      <Message
                        renderMessage={renderMessage}
                        renderCustomSeperator={renderCustomSeperator}
                      />
                    </MessageProvider>
                  )
                },
              )
            }
          </div>
        </div>
        {
          hasMoreToBottom && (
            <div
              className="sendbird-conversation__scroll-bottom-button"
              onClick={onClickScrollBot}
              onKeyDown={onClickScrollBot}
              tabIndex={0}
              role="button"
            >
              <Icon
                width="24px"
                height="24px"
                type={IconTypes.CHEVRON_DOWN}
                fillColor={IconColors.PRIMARY}
              />
            </div>
          )
        }
      </div>
  );
};


export default MessageList;
