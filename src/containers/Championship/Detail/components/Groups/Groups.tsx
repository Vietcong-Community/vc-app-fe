import React from 'react';

import { groupBy } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { ILadderItem } from '../../../../../api/hooks/league/interfaces';
import { Collapse } from '../../../../../components/Collapse/Collapse';
import { Divider } from '../../../../../components/Divider/Divider';
import { Table } from '../../../../../components/Table/Table';
import { H2 } from '../../../../../components/Titles/H2/H2';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';
import { messages } from '../../messages';
import { ILadderTableRow, LADDER_COLUMNS } from '../../types';
import { GroupMatches } from '../GroupMatches/GroupMatches';

import * as S from './Groups.style';

interface IProps {
  ladder: ILadderItem[];
  ladderIsLoading: boolean;
}

export const Groups: React.FC<IProps> = (props: IProps) => {
  const { navigate, query } = useRouter<{ id: string }>();
  const { ladder, ladderIsLoading } = props;
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const groups = groupBy(ladder, 'group') ?? [];
  const groupNames = Object.keys(groups);
  const isSingleGroup = groupNames.length === 1;

  return (
    <>
      <Collapse
        withDivider={false}
        title={
          <H2>
            <FormattedMessage {...(isSingleGroup ? messages.singleLadderTitle : messages.multiLadderTitle)} />
          </H2>
        }
      >
        <S.TablesContainer>
          {groupNames.map((groupName) => {
            const ladderItems = groups[groupName];

            const ladderTableData: ILadderTableRow[] =
              ladderItems.map((item, index) => {
                return {
                  id: item.team.id,
                  position: index + 1,
                  name: item.team.name,
                  countOfMatches: item.countOfMatches,
                  wins: item.wins,
                  draws: item.draws,
                  loses: item.loses,
                  points: item.points ?? 0,
                  seasonTeamId: item.id,
                };
              }) ?? [];

            return (
              <S.TableContainer>
                {!isSingleGroup && (
                  <h3 style={{ margin: 0 }}>
                    <FormattedMessage {...messages.groupName} values={{ value: groupName }} />
                  </h3>
                )}
                <Table
                  columns={LADDER_COLUMNS(isSmallerThanMd)}
                  onRow={(item) => {
                    return {
                      onClick: () => navigate(Routes.TEAM_DETAIL.replace(':id', item.id)),
                      style: {
                        cursor: 'pointer',
                      },
                    };
                  }}
                  data={ladderTableData}
                  loading={ladderIsLoading}
                  pagination={{ hideOnSinglePage: true, pageSize: 20 }}
                  style={{ width: '100%' }}
                />
              </S.TableContainer>
            );
          })}
        </S.TablesContainer>
      </Collapse>
      <Divider style={{ margin: '0' }} />
      {!ladderIsLoading && ladder.length > 0 && (
        <GroupMatches
          championshipId={query.id}
          isSingleGroup={isSingleGroup}
          roundsCount={isSingleGroup ? ladder.length - 1 : Math.round(ladder.length / 2) - 1}
        />
      )}
    </>
  );
};
