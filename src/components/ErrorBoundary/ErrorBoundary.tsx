import React, { ErrorInfo, PropsWithChildren } from 'react';

import { FormattedMessage } from 'react-intl';

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
          <H1>
            <FormattedMessage {...messages.title} />
          </H1>
          <br />
          nejaky title, nejaky obrazek, tlacitko go back to homo page
        </S.Container>
      );
    }

    return children;
  }
}
