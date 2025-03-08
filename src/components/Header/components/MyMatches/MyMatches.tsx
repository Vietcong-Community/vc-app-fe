import React from 'react';

import { Pagination } from 'antd';
import { FormattedMessage } from 'react-intl';

import { IMeMatch } from '../../../../api/hooks/users/interfaces';
import { useWindowDimensions } from '../../../../hooks/WindowDimensionsHook';
import { BreakPoints } from '../../../../theme/theme';
import { Drawer } from '../../../Drawer/Drawer';
import { Gap } from '../../../Gap/Gap';
import { H2 } from '../../../Titles/H2/H2';
import { Match } from '../Match/Match';

import { messages } from './messages';

import * as S from './MyMatches.style';

interface IProps {
  isOpen: boolean;
  matches: IMeMatch[];
  onClose: () => void;
  onPageChange: (page: number) => void;
  page: number;
  total: number;
}

export const MyMatches: React.FC<IProps> = (props: IProps) => {
  const { isOpen, matches, onClose, onPageChange, page, total } = props;
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const noMatches = total === 0;

  return (
    <Drawer drawerWidth={isSmallerThanMd ? width : 600} isOpen={isOpen} onClose={onClose}>
      <>
        <H2>
          <FormattedMessage {...messages.title} />
        </H2>
        <Gap defaultHeight={16} />
        {noMatches && <FormattedMessage {...messages.noMatches} />}
        {!noMatches && (
          <>
            <S.MatchesContainer>
              {matches.map((item) => {
                return <Match onClose={onClose} key={item.id} match={item} />;
              })}
            </S.MatchesContainer>
            <Gap defaultHeight={32} />
            <Pagination
              align={'end'}
              responsive
              current={page}
              defaultPageSize={10}
              hideOnSinglePage={false}
              total={total}
              onChange={(value) => onPageChange(value)}
              showQuickJumper={false}
              showSizeChanger={false}
              style={{ width: '100%' }}
            />
          </>
        )}
      </>
    </Drawer>
  );
};
