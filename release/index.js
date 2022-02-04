export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-d5fada84.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-d5fada84.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-ab441eb9.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-bb688cb3.js';
import './index-b15036e3.js';
import 'css-vars-ponyfill';
import './index-47b62cb1.js';
import './LeaveChannel-49a91b35.js';
import './index-43e6f549.js';
import './index-8a0efa84.js';
import './utils-fe289e88.js';
import './index-a7a3c8b1.js';
import './index-7e9a2c56.js';
import './index-06810a72.js';
import './index-75e1084c.js';
import 'react-dom';

/**
 * Example:
 * const MyComponent = () => {
 *  const context = useSendbirdStateContext();
 *  const sdk = sendbirdSelectors.getSdk(context);
 *  return (<div>...</div>);
 * }
 */

function useSendbirdStateContext() {
  var context = useContext(SendbirdSdkContext);
  return context;
}

export { useSendbirdStateContext };
//# sourceMappingURL=index.js.map
