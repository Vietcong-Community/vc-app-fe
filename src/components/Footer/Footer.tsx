import React from 'react';

import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

export const Footer: React.FC = () => {
  return (
    <>
      <FormattedMessage {...messages.title} />
    </>
  );
};
