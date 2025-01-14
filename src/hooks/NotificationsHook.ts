import { useContext } from 'react';

import { NotificationsContext } from '../providers/NotificationsProvider/NotificationsContext';

export const useNotifications = () => useContext(NotificationsContext);
