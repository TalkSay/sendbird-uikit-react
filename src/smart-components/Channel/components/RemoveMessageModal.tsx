import React, { useContext } from 'react';

import Modal from '../../../ui/Modal';
import { ButtonTypes } from '../../../ui/Button';
import { LocalizationContext } from '../../../lib/LocalizationContext';
import { useMessage } from '../context/MessageProvider';

const RemoveMessage = (props) => {
  const {
    onCancel,
  } = props;
  const { stringSet } = useContext(LocalizationContext);
  const {
    message,
    deleteMessage,
  } = useMessage();
  return (
    <Modal
      type={ButtonTypes.DANGER}
      disabled={message?.threadInfo?.replyCount > 0}
      onCancel={onCancel}
      onSubmit={() => { deleteMessage().then(() => {
        onCancel();
      }) }}
      submitText={stringSet.MESSAGE_MENU__DELETE}
      titleText={stringSet.MODAL__DELETE_MESSAGE__TITLE}
    />
  );
};

export default RemoveMessage;
