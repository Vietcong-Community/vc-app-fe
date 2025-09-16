import React, { ReactNode, useState } from 'react';

import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { FormattedMessage } from 'react-intl';

import { AnimatedHeightContainer } from '../Animations/AnimatedHeightContainer/AnimatedHeightContainer';
import { Divider } from '../Divider/Divider';

import { messages } from './messages';

import * as S from './Collapse.style';

interface IProps {
  defaultOpen?: boolean;
  children: ReactNode;
  title?: ReactNode;
  withDivider?: boolean;
}

export const Collapse: React.FC<IProps> = (props: IProps) => {
  const { defaultOpen = true, children, title, withDivider = true } = props;
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <S.Container>
      <Flex justify="space-between">
        {title}
        <div
          onClick={() => setIsOpen((val) => !val)}
          style={{ alignItems: 'center', display: 'flex', fontSize: 14, gap: 8, justifyContent: 'center' }}
        >
          {isOpen ? (
            <>
              <FormattedMessage {...messages.close} />
              <S.Icon>
                <UpOutlined />
              </S.Icon>
            </>
          ) : (
            <>
              <FormattedMessage {...messages.open} />
              <S.Icon>
                <DownOutlined />
              </S.Icon>
            </>
          )}
        </div>
      </Flex>
      {withDivider && <Divider />}
      <AnimatedHeightContainer isOpen={isOpen}>{children}</AnimatedHeightContainer>
    </S.Container>
  );
};
