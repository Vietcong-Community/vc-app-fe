import React from 'react';

import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

export const EditProfileCont: React.FC = () => {
  return (
    <>
      <h1>
        <FormattedMessage {...messages.title} />
      </h1>
    </>
  );
};
