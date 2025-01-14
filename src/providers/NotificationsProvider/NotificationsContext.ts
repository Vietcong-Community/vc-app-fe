import React from 'react';

import { MessageDescriptor } from 'react-intl';

import { NotificationType } from './enums';

export interface INotificationsContext {
  showNotification: (
    title: MessageDescriptor | string,
    description?: MessageDescriptor | string,
    type?: NotificationType,
    duration?: number,
  ) => void;
}

export const NotificationsContext = React.createContext<INotificationsContext>({
  showNotification: () => {},
});
NotificationsContext.displayName = 'NotificationsContext';
