import { useContext } from 'react';

import { NotificationsContext } from '../providers/NotificationsProvider/NotificationsProvider';

export const useNotifications = () => useContext(NotificationsContext);
