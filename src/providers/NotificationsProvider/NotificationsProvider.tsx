import React, { ReactElement, ReactNode, useMemo } from 'react';

import { notification } from 'antd';
import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl';

import { NotificationsContext } from './NotificationsContext';
import { NotificationType } from './enums';

interface IProps {
  children: ReactElement;
}

export const NotificationsProvider: React.FC<IProps> = (props: IProps) => {
  const { children } = props;
  const { formatMessage } = useIntl();
  const [api, contextHolder] = notification.useNotification();

  const showNotification = (
    title: MessageDescriptor | string,
    description?: MessageDescriptor | string,
    type = NotificationType.SUCCESS,
    duration = 5,
  ) => {
    const getTitle = () => {
      if (typeof title === 'string') {
        return title;
      }
      return formatMessage(title);
    };

    const getDescription = (): ReactNode => {
      if (!description) {
        return null;
      }

      if (typeof description === 'string') {
        return <>{description}</>;
      }

      return <FormattedMessage {...description} />;
    };

    api[type]({
      duration,
      message: getTitle(),
      description: getDescription(),
    });
  };

  const contextValue = useMemo(() => {
    return { showNotification };
  }, [showNotification]);

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
      {contextHolder}
    </NotificationsContext.Provider>
  );
};
