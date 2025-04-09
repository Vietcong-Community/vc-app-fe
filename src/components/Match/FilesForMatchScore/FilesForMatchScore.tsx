import React, { useState } from 'react';

import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Collapse, Pagination } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useFilesForMatchScoreList } from '../../../api/hooks/league/api';
import { AnimatedHeightContainer } from '../../Animations/AnimatedHeightContainer/AnimatedHeightContainer';
import { Card } from '../../Card/Card';
import { Gap } from '../../Gap/Gap';
import { MPResultDetail } from '../MPResultDetail/MPResultDetail';

import { messages } from './messages';

import * as S from './FilesForMatchScore.style';

interface IProps {
  matchId: string;
}

export const FilesForMatchScore: React.FC<IProps> = (props: IProps) => {
  const { matchId } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [activeKey, setActiveKey] = useState<string | string[] | undefined>(undefined);
  const files = useFilesForMatchScoreList(matchId, { page: selectedPage }, isOpen);

  const fetchMPResults = async () => {
    await files.refetch();
  };

  return (
    <Card>
      <S.SectionTitle>
        <FormattedMessage {...messages.title} />
        <div
          onClick={() => setIsOpen((val) => !val)}
          style={{
            alignItems: 'center',
            cursor: 'pointer',
            display: 'flex',
            fontSize: 14,
            gap: 8,
            justifyContent: 'center',
          }}
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
      </S.SectionTitle>
      <AnimatedHeightContainer isOpen={isOpen}>
        <Gap defaultHeight={8} />
        <Collapse
          activeKey={activeKey}
          onChange={(e) => setActiveKey(e)}
          items={
            files.data?.files.map((item) => ({
              key: item.id,
              label: item.url.split('/')?.pop(),
              children: (
                <MPResultDetail
                  fetchMPResults={fetchMPResults}
                  id={item.id}
                  isOpen={activeKey?.includes(item.id) ?? false}
                  matchId={matchId}
                  url={item.url}
                />
              ),
            })) ?? []
          }
          expandIconPosition="end"
          style={{ textAlign: 'start' }}
        />
        <Gap defaultHeight={32} />
        <Pagination
          align={'end'}
          responsive
          current={selectedPage}
          defaultPageSize={10}
          hideOnSinglePage
          total={files.data?.total ?? 0}
          onChange={(value) => setSelectedPage(value)}
          showQuickJumper
          showSizeChanger={false}
          style={{ width: '100%' }}
        />
      </AnimatedHeightContainer>
    </Card>
  );
};
