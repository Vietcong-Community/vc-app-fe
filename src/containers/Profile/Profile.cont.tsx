import React from 'react';

import { compact } from 'lodash';

import { useUserDetail } from '../../api/hooks/users/api';
import { useRouter } from '../../hooks/RouterHook';

import { AchievementProgress } from './components/Achievements/Achievements';
import { MatchHistory } from './components/MatchHistory/MatchHistory';
import { IMatch } from './components/MatchHistory/MatchHistory';
import { Statistics } from './components/Statistics/Statistics';
import { UserInfo } from './components/UserInfo/UserInfo';

import * as S from './Profile.style';

export const ProfileCont: React.FC = () => {
  const { query } = useRouter<{ id: string }>();

  const userDetail = useUserDetail(query.id);

  const user = {
    name: compact([userDetail.data?.firstName, userDetail.data?.lastName]).join(' '),
    nickname: userDetail.data?.nickname ?? '',
    inGameName: '#uNik0rn . basccino',
    avatar:
      'https://yt3.googleusercontent.com/ytc/AIdro_myqhcBlGAgfbLJGgA_llswXSkDKlvG0T-hA1siGmm_yC0=s900-c-k-c0x00ffffff-no-rj', // Odkaz na profilovou fotku
  };

  const actualPlacement = 8;
  const bestPlacement = 1;
  const actualDivision = 'Gold';
  const bestDivision = 'Legend';
  const matchesPlayed = 10;
  const wins = 6;
  const draws = 2;
  const losses = 2;
  const totalFlags = 12;
  const totalKills = 50;
  const totalDeaths = 30;

  const matchData: IMatch[] = [
    {
      key: '1',
      date: '2024-11-01',
      result: 'win',
      flagsCaptured: 3,
      kills: 20,
      deaths: 15,
      points: 30,
    },
    {
      key: '2',
      date: '2024-11-02',
      result: 'draw',
      flagsCaptured: 1,
      kills: 20,
      deaths: 18,
      points: 12,
    },
    {
      key: '3',
      date: '2024-11-01',
      result: 'loss',
      flagsCaptured: 0,
      kills: 13,
      deaths: 18,
      points: -19,
    },
    // Další zápasy...
  ];

  return (
    <>
      {/* Předání objektu user jako prop */}
      <UserInfo user={user} />
      <AchievementProgress />
      <S.ClipPath>
        <br />
        <br />
        <h2>Statistiky</h2>
        <br />
        <div>
          <Statistics
            actualPlacement={actualPlacement}
            bestPlacement={bestPlacement}
            actualDivision={actualDivision}
            bestDivision={bestDivision}
            matchesPlayed={matchesPlayed}
            wins={wins}
            draws={draws}
            losses={losses}
            totalFlags={totalFlags}
            totalKills={totalKills}
            totalDeaths={totalDeaths}
          />
          <br />
          <br />
        </div>
        <br />
        <br />
      </S.ClipPath>
      <h3>Historie zápasů</h3>
      <MatchHistory matches={matchData} />
    </>
  );
};
