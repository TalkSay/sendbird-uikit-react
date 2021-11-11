import './channel-ui.scss';

import React from 'react';
import useSendbirdStateContext from '../../../../hooks/useSendbirdStateContext';

import { UserProfileProvider } from '../../../../lib/UserProfileContext';
import { useChannel } from '../../context/ChannelProvider';
import PlaceHolder, { PlaceHolderTypes } from '../../../../ui/PlaceHolder';
import ConnectionStatus from '../../../../ui/ConnectionStatus';
import ChannelHeader from '../ChannelHeader';
import MessageList from '../MessageList';
import TypingIndicator from '../TypingIndicator';
import FrozenNotification from '../FrozenNotification';
import UnreadCount from '../UnreadCount';
import MessageInput from '../MessageInput';

type ChannelUIProps = {
  renderLoaderPlaceholder?: () => React.ReactNode;
  renderInvalidPlaceholder?: () => React.ReactNode;
  renderEmptyPlaceholder?: () => React.ReactNode;
  renderChannelHeader?: () => React.ReactNode;
  renderMessage?: () => React.ReactNode;
  renderMessageInput?: () => React.ReactNode;
  renderTypingIndicator?: () => React.ReactNode;
  renderCustomSeperator?: () => React.ReactNode;
};

export default function ChannelUI({
  renderLoaderPlaceholder,
  renderInvalidPlaceholder,
  renderEmptyPlaceholder,
  renderChannelHeader,
  renderMessage,
  renderMessageInput,
  renderTypingIndicator,
  renderCustomSeperator,
}: ChannelUIProps) {
  const {
    currentGroupChannel,
    channelUrl,
    isInvalid,
    unreadCount,
    loading,
  } = useChannel();

  const globalStore = useSendbirdStateContext();
  const sdkError = globalStore?.stores?.sdkStore?.error;
  const logger = globalStore?.config?.logger;
  const isOnline = globalStore?.config?.isOnline;

  if (!channelUrl) {
    return (<div className="sendbird-conversation">
      {
        renderInvalidPlaceholder?.() || (
          <PlaceHolder type={PlaceHolderTypes.NO_CHANNELS} />
        )
      }
    </div>);
  }
  if (isInvalid) {
    return (
      <div className="sendbird-conversation">
        {
          renderInvalidPlaceholder?.() || (
            <PlaceHolder type={PlaceHolderTypes.WRONG} />
          )
        }
      </div>
    );
  }
  if (sdkError) {
    return (
      <div className="sendbird-conversation">
        {
          renderInvalidPlaceholder?.() || (
            <PlaceHolder
              type={PlaceHolderTypes.WRONG}
              retryToConnect={() => {
                logger.info('Channel: reconnecting');
                // reconnect();
              }}
            />
          )
        }
      </div>
    );
  }
  return (
    <UserProfileProvider
      className="sendbird-conversation"
      disableUserProfile
    >
      {
        renderChannelHeader?.() || (
          <ChannelHeader />
        )
      }
      {
        currentGroupChannel?.isFrozen && (
          <FrozenNotification />
        )
      }
      {
        unreadCount > 0 && (
          <UnreadCount />
        )
      }
      {
        loading
          ? (
            <div className="sendbird-conversation">
              {
                renderLoaderPlaceholder?.() || (
                  <PlaceHolder type={PlaceHolderTypes.LOADING} />
                )
              }
            </div>
          ) : (
            <MessageList
              renderMessage={renderMessage}
              renderEmptyPlaceholder={renderEmptyPlaceholder}
              renderCustomSeperator={renderCustomSeperator}
            />
          )
      }
      <div className="sendbird-conversation__footer">
        {
          renderMessageInput?.() || (
            <MessageInput />
          )
        }
        <div className="sendbird-conversation__footer__typing-indicator">
          {
            renderTypingIndicator?.() || (
              <TypingIndicator />
            )
          }
          {
            !isOnline && (
              <ConnectionStatus />
            )
          }
        </div>
      </div>
    </UserProfileProvider>
  );
}
