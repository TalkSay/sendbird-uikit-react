export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-0706131f.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-0706131f.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-b18b97bb.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-c6d626e6.js';
import './index-e56b9347.js';
import 'css-vars-ponyfill';
import './index-08daed76.js';
import './LeaveChannel-0f67529a.js';
import './index-5a7dbafc.js';
import './index-57007992.js';
import './utils-abe8a8c1.js';
import './index-988cb128.js';
import './index-bdbb03e7.js';
import './index-e12c5161.js';
import './index-5ad621ab.js';
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
