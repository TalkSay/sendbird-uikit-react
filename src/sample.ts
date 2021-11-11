
import React from 'react';

export type MessageProps = {
  renderMessage?: () => React.ReactNode;
  children?: React.ReactNode;
};


interface MessageProviderInterface extends MessageProps {
};

const MessageContext = React.createContext<MessageProviderInterface|null>(undefined);

function MessageProvider(props: MessageProps) {
  return (
    <MessageContext.Provider value={}>
      <div className="sendbird-conversation">
        {children}
      </div>
    </MessageContext.Provider>
  );
}

const useMessage = () => React.useContext(MessageContext);

export { MessageProvider, useMessage };
