import React from 'react';

import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

export const AboutUsCont: React.FC = () => {
  return (
    <>
      <h1>
        <FormattedMessage {...messages.title} />
      </h1>
    </>
  );
};
