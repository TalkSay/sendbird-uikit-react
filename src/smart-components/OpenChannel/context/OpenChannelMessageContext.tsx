
import React from 'react';

import * as types from '../../../index';
import { useOpenChannel } from './OpenChannelProvider';

export type OpenChannelMessageProps = {
  // renderMessage?: () => React.ReactNode;
  children?: React.ReactNode;
  message: types.EveryMessage;
  chainTop?: boolean;
  chainBottom?: boolean;
  hasSeparator?: boolean;
  editDisabled?: boolean;
  // to do
  deleteMessage: any;
  updateMessage: any;
  resendMessage: any;
};


interface OpenChannelMessageProviderInterface extends OpenChannelMessageProps {
};

const OpenChannelMessageContext = React.createContext<OpenChannelMessageProviderInterface|null>(undefined);

function OpenChannelMessageProvider(props: OpenChannelMessageProps) {
  const {
    children,
    message,
    chainTop,
    chainBottom,
    hasSeparator,
    deleteMessage,
    updateMessage,
    resendMessage,
  } = props;

  return (
    <OpenChannelMessageContext.Provider value={{
      message,
      chainTop,
      chainBottom,
      hasSeparator,
      deleteMessage,
      updateMessage,
      resendMessage,
    }}>
      {children}
    </OpenChannelMessageContext.Provider>
  );
}

const useOpenChannelMessage = () => React.useContext(OpenChannelMessageContext);

export { OpenChannelMessageProvider, useOpenChannelMessage };
