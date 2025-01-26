import React, { ErrorInfo, PropsWithChildren } from 'react';

import { BugOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import { appConfig } from '../../config/config';
import { Button } from '../Button/Button';
import { Gap } from '../Gap/Gap';
import { H1 } from '../Titles/H1/H1';

import { messages } from './messages';

import * as S from './ErrorBoundary.style';

interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<PropsWithChildren, IState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.log('-----------');
    console.log('---ERROR---');
    console.log('-----------');
    console.warn(info?.componentStack);
    console.error(error?.name);
    console.error(error?.cause);
    console.log('-----------');
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <S.Container>
          <S.IconContainer>
            <BugOutlined />
          </S.IconContainer>
          <H1>
            <FormattedMessage {...messages.title} />
          </H1>
          <Gap defaultHeight={16} />
          <FormattedMessage {...messages.description} />
          <Gap defaultHeight={32} />
          <Button onClick={() => window.location.replace(appConfig.appUrl)}>
            <FormattedMessage {...messages.backToHomePage} />
          </Button>
        </S.Container>
      );
    }

    return children;
  }
}
