import React, {
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
} from 'react';
import format from 'date-fns/format';

import useSendbirdStateContext from '../../../../hooks/useSendbirdStateContext';
import { useChannel } from '../../context/ChannelProvider';
import { useMessage } from '../../context/MessageProvider';
import { getClassName } from '../../../../utils';
import { isDisabledBecauseFrozen } from '../../context/utils';

import DateSeparator from '../../../../ui/DateSeparator';
import Label, { LabelTypography, LabelColors } from '../../../../ui/Label';
import MessageInput from '../../../../ui/MessageInput';
import MessageContent from '../../../../ui/MessageContent';
import FileViewer from '../FileViewer';
import RemoveMessageModal from '../RemoveMessageModal';

type MessageUIProps = {
  renderMessage?: () => React.ReactNode;
  renderSeperator?: () => React.ReactNode;
  // for extending
  renderEditInput?: () => React.ReactNode;
  renderMessageContent?: () => React.ReactNode;
};

const Message = (props: MessageUIProps) => {
  const {
    renderMessage,
    renderSeperator,
    renderEditInput,
    renderMessageContent,
  } = props;

  const globalStore = useSendbirdStateContext();
  const userId = globalStore?.config?.userId;
  const isOnline = globalStore?.config?.isOnline;

  const {
    currentGroupChannel,
    highLightedMessageId,
    animatedMessageId,
    updateMessage,
    scrollToMessage,
    replyType,
    useReaction,
    toggleReaction,
    emojiContainer,
    nicknamesMap,
    quoteMessage,
    setQuoteMessage,
  } = useChannel();

  const {
    message,
    handleScroll,
    hasSeparator,
    chainTop,
    resendMessage,
    chainBottom,
  } = useMessage();
  const sender = message?.sender;

  const [showEdit, setShowEdit] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showFileViewer, setShowFileViewer] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const editMessageInputRef = useRef(null);
  const useMessageScrollRef = useRef(null);

  useLayoutEffect(() => {
    handleScroll();
  }, [showEdit, message?.reactions?.length]);

  useLayoutEffect(() => {
    if (highLightedMessageId === message.messageId) {
      if (useMessageScrollRef && useMessageScrollRef.current) {
        useMessageScrollRef.current.scrollIntoView({
          block: 'center',
          inline: 'center',
        });
        setIsAnimated(false);
        setTimeout(() => {
          setIsHighlighted(true);
        }, 500);
      }
    } else {
      setIsHighlighted(false);
    }
  }, [highLightedMessageId, useMessageScrollRef.current, message.messageId]);

  useLayoutEffect(() => {
    if (animatedMessageId === message.messageId) {
      if (useMessageScrollRef && useMessageScrollRef.current) {
        useMessageScrollRef.current.scrollIntoView({
          block: 'center',
          inline: 'center',
        });
        setIsHighlighted(false);
        setTimeout(() => {
          setIsAnimated(true);
        }, 500);
      }
    } else {
      setIsAnimated(false);
    }
  }, [animatedMessageId, useMessageScrollRef.current, message.messageId]);
  const RenderedMessage = useMemo(() => {
    return renderMessage?.();
  }, [message, message?.message, renderMessage]);

  const isByMe = (userId === sender?.userId)
    || (message.requestState === 'pending')
    || (message.requestState === 'failed');

  if (RenderedMessage) {
    return (
      <div
        ref={useMessageScrollRef}
        className={getClassName([
          'sendbird-msg-hoc sendbird-msg--scroll-ref',
          isAnimated ? 'sendbird-msg-hoc__animated' : '',
          isHighlighted ? 'sendbird-msg-hoc__highlighted' : '',
        ])}
      >
        {/* date-separator */}
        {
          hasSeparator && renderSeperator?.() || (
            <DateSeparator>
              <Label type={LabelTypography.CAPTION_2} color={LabelColors.ONBACKGROUND_2}>
                {format(message.createdAt, 'MMMM dd, yyyy')}
              </Label>
            </DateSeparator>
          )
        }
        <RenderedMessage />
      </div>
    );
  }

  if (showEdit) {
    return renderEditInput?.() || (
      <MessageInput
        isEdit
        disabled={isDisabledBecauseFrozen(currentGroupChannel)}
        ref={editMessageInputRef}
        name={message.messageId}
        onSendMessage={updateMessage}
        onCancelEdit={() => { setShowEdit(false); }}
        value={message?.message}
      />
    );
  }

  return (
    <div
      ref={useMessageScrollRef}
      className={getClassName([
        'sendbird-msg-hoc sendbird-msg--scroll-ref',
        isAnimated ? 'sendbird-msg-hoc__animated' : '',
        isHighlighted ? 'sendbird-msg-hoc__highlighted' : '',
      ])}
      style={{ marginBottom: '2px' }}
    >
      {/* date-separator */}
      {
        hasSeparator && (renderSeperator?.() || (
          <DateSeparator>
            <Label type={LabelTypography.CAPTION_2} color={LabelColors.ONBACKGROUND_2}>
              {format(message.createdAt, 'MMMM dd, yyyy')}
            </Label>
          </DateSeparator>
        ))
      }
      {/* Message */}
      {
        renderMessageContent?.() || (
          <MessageContent
            className="sendbird-message-hoc__message-content"
            userId={userId}
            scrollToMessage={scrollToMessage}
            channel={currentGroupChannel}
            message={message}
            disabled={!isOnline}
            chainTop={chainTop}
            chainBottom={chainBottom}
            useReaction={useReaction}
            replyType={replyType}
            nicknamesMap={nicknamesMap}
            emojiContainer={emojiContainer}
            showEdit={setShowEdit}
            showRemove={setShowRemove}
            showFileViewer={setShowFileViewer}
            resendMessage={resendMessage}
            toggleReaction={toggleReaction}
            // quoteMessage={quoteMessage}
            setQuoteMessage={setQuoteMessage}
          />
        )
      }
      {/* Modal */}
      {
        showRemove && (
          <RemoveMessageModal
            onCancel={() => setShowRemove(false)}
          />
        )
      }
      {
        showFileViewer && (
          <FileViewer
            onCancel={() => setShowFileViewer(false)}
          />
        )
      }
    </div>
  );;
}

export default Message;
