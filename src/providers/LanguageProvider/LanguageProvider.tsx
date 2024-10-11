import React, { ReactElement } from 'react';

import { IntlProvider } from 'react-intl';

import csMessages from '../../translations/cs.json';

const DEFAULT_LANGUAGE = 'cs';

interface IProps {
  children: ReactElement;
}

export const LanguageProvider: React.FC<IProps> = (props: IProps) => {
  const { children } = props;

  return (
    <IntlProvider locale={DEFAULT_LANGUAGE} key={DEFAULT_LANGUAGE} messages={csMessages}>
      {children}
    </IntlProvider>
  );
};
