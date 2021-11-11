import React, { useContext } from 'react';
import { LocalizationContext } from '../../../../lib/LocalizationContext';

import Label, {
  LabelTypography,
  LabelColors,
} from '../../../../ui/Label';
import Icon, {
  IconTypes,
} from '../../../../ui/Icon';
import { useOpenChannelSettings } from '../../context/OpenChannelSettingsProvider';
import useSendbirdStateContext from '../../../../hooks/useSendbirdStateContext';
import OpenChannelProfile from '../OpenChannelProfile';

export interface OperatorUIProps {
  renderChannelProfile?: () => React.ReactNode;
};

export const OperatorUI = ({
  renderChannelProfile,
}: OperatorUIProps) => {
  const { stringSet } = useContext(LocalizationContext);
  const {
    onCloseClick,
  } = useOpenChannelSettings();
  const globalState = useSendbirdStateContext();
  const logger = globalState?.config?.logger;
  return (
    <>
      <div className="sendbird-openchannel-settings__header">
        <Label type={LabelTypography.H_2} color={LabelColors.ONBACKGROUND_1}>
          {stringSet.CHANNEL_SETTING__HEADER__TITLE}
        </Label>
        <Icon
          className="sendbird-openchannel-settings__close-icon"
          type={IconTypes.CLOSE}
          height="24px"
          width="24px"
          onClick={() => {
            onCloseClick();
          }}
        />
      </div>
      <div className="sendbird-openchannel-settings__profile">
        {
          renderChannelProfile?.() || (
            <OpenChannelProfile />
          )
        }
      </div>
      <div className="sendbird-openchannel-settings__url">
        <Icon
          className="sendbird-openchannel-settings__copy-icon"
          type={IconTypes.COPY}
          height="22px"
          width="22px"
          onClick={() => {
            copyToClipboard(channel?.url);
          }}
        />
        <Label
          className="sendbird-openchannel-settings__url-label"
          type={LabelTypography.CAPTION_2}
          color={LabelColors.ONBACKGROUND_2}
        >
          {stringSet.OPEN_CHANNEL_SETTINGS__OPERATOR_URL}
        </Label>
        <Label
          className="sendbird-openchannel-settings__url-value"
          type={LabelTypography.SUBTITLE_2}
        >
          {channel?.url}
        </Label>
      </div>
      <AccordionGroup>
        <ParticipantsAccordion
          channel={channel}
          currentUser={currentUser}
        />
      </AccordionGroup>
      <DeleteChannel
        isOnline={isOnline}
        onDeleteChannel={() => {
          channel?.delete((response, error) => {
            if (error) {
              logger.warning('OpenChannelSettings: Delete channel failed', error);
              return;
            }
            logger.info('OpenChannelSettings: Delete channel success', response);
            if (onDeleteChannel) {
              onDeleteChannel(channel);
            }
          });
        }}
      />
    </>
  );
};

export default OperatorUI;
