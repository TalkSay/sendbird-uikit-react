import SendBird from 'sendbird';

type CreateDefaultUserListQueryType = {
  sdk: SendBird.SendBirdInstance;
  userFilledApplicationUserListQuery?: SendBird.ApplicationUserListQuery;
}

export const createDefaultUserListQuery = (
  { sdk, userFilledApplicationUserListQuery }: CreateDefaultUserListQueryType
): SendBird.ApplicationUserListQuery => {
  const params = sdk.createApplicationUserListQuery();
  if (userFilledApplicationUserListQuery) {
    Object.keys(userFilledApplicationUserListQuery).forEach((key) => {
      params[key] = userFilledApplicationUserListQuery[key];
    });
  }
  return params;
};

export const setChannelType = (
  params: SendBird.GroupChannelParams,
  type: string,
): SendBird.GroupChannelParams => {
  if (type === 'broadcast') {
    // eslint-disable-next-line no-param-reassign
    params.isBroadcast = true;
  }
  if (type === 'supergroup') {
    // eslint-disable-next-line no-param-reassign
    params.isSuper = true;
  }
  return params;
};

export const isBroadcastChannelEnabled = (sdk: SendBird.SendBirdInstance): boolean => {
  const ALLOW_BROADCAST_CHANNEL = 'allow_broadcast_channel';
  const applicationAttributes = sdk?.appInfo?.applicationAttributes;

  if (Array.isArray(applicationAttributes)) {
    return applicationAttributes.includes(ALLOW_BROADCAST_CHANNEL);
  }

  return false;
};
export const isSuperGroupChannelEnabled = (sdk: SendBird.SendBirdInstance): boolean => {
  const ALLOW_SUPER_GROUP_CHANNEL = 'allow_super_group_channel';
  const applicationAttributes = sdk?.appInfo?.applicationAttributes;

  if (Array.isArray(applicationAttributes)) {
    return applicationAttributes.includes(ALLOW_SUPER_GROUP_CHANNEL);
  }

  return false;
};

// export const setChannelType = (params, type) => {
//   if (type === 'broadcast') {
//     // eslint-disable-next-line no-param-reassign
//     params.isBroadcast = true;
//   }
//   if (type === 'supergroup') {
//     // eslint-disable-next-line no-param-reassign
//     params.isSuper = true;
//   }
//   return params;
// };

// export const createChannel = (
//   sdk,
//   selectedUsers,
//   onBeforeCreateChannel,
//   userId,
//   type = 'group',
// ) => new Promise((resolve, reject) => {
//   // have custom params
//   if (onBeforeCreateChannel) {
//     const params = onBeforeCreateChannel(selectedUsers);
//     setChannelType(params, type);
//     sdk.GroupChannel.createChannel(params, (response, error) => {
//       const swapParams = sdk.getErrorFirstCallback();
//       let groupChannel = response;
//       let err = error;
//       if (swapParams) {
//         groupChannel = error;
//         err = response;
//       }
//       if (err) {
//         reject(err);
//       }
//       resolve(groupChannel);
//     });
//     return;
//   }

//   const params = new sdk.GroupChannelParams();
//   params.addUserIds(selectedUsers);
//   params.isDistinct = false;

//   if (userId) {
//     params.operatorUserIds = [userId];
//   }
//   setChannelType(params, type);
//   // do not have custom params
//   sdk.GroupChannel.createChannel(
//     params,
//     (response, error) => {
//       const swapParams = sdk.getErrorFirstCallback();
//       let groupChannel = response;
//       let err = error;
//       if (swapParams) {
//         groupChannel = error;
//         err = response;
//       }
//       if (err) {
//         reject(err);
//       }
//       resolve(groupChannel);
//     },
//   );
// });

// export default createChannel;
