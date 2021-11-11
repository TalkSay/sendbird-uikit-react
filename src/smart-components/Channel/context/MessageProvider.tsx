
import React from 'react';
import { CoreMessageType } from '../../../utils';

export type MessageProps = {
  message: CoreMessageType;
  handleScroll: any;
  children: React.ReactNode;
  chainTop?: boolean;
  chainBottom?: boolean;
  hasSeparator?:boolean;
};


interface MessageProviderInterface extends MessageProps {};

const MessageContext = React.createContext<MessageProviderInterface|null>(undefined);

function MessageProvider({
  message,
  handleScroll,
  children,
  chainTop,
  chainBottom,
  hasSeparator,
}: MessageProps) {
  return (
    <MessageContext.Provider value={{
      message,
      handleScroll,
      children,
      chainTop,
      chainBottom,
      hasSeparator,
    }}>
      {children}
    </MessageContext.Provider>
  );
}

const useMessage = () => React.useContext(MessageContext);

export { MessageProvider, useMessage };
