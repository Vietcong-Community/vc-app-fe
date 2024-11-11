import React from 'react';

import { Col, Row } from 'antd';

import * as S from './Statistics.style';

interface IStatisticsProps {
  actualPlacement: number;
  bestPlacement: number;
  actualDivision: string;
  bestDivision: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  totalFlags: number;
  totalKills: number;
  totalDeaths: number;
}

export const Statistics: React.FC<IStatisticsProps> = ({
  actualPlacement,
  bestPlacement,
  actualDivision,
  bestDivision,
  matchesPlayed,
  wins,
  draws,
  losses,
  totalFlags,
  totalKills,
  totalDeaths,
}) => {
  const averageFlags = matchesPlayed ? (totalFlags / matchesPlayed).toFixed(2) : '0.00';
  const averageKills = matchesPlayed ? (totalKills / matchesPlayed).toFixed(2) : '0.00';
  const averageDeaths = matchesPlayed ? (totalDeaths / matchesPlayed).toFixed(2) : '0.00';

  return (
    <>
      <div>
        <Row gutter={0} style={{ textAlign: 'center' }}>
          <Col span={6} style={{ marginTop: '-40px' }}>
            <S.Column>
              <S.Value>{actualPlacement}</S.Value>
              <S.Name>Aktuální umístění</S.Name>
              <S.Value style={{ color: 'gold' }}>{actualDivision}</S.Value>
              <S.Name>Aktuální divize</S.Name>
              <S.Value>{bestPlacement}</S.Value>
              <S.Name>Nejlepší umístění</S.Name>
              <S.Value style={{ color: '#27ddf5' }}>{bestDivision}</S.Value>
              <S.Name>Nejlepší divize</S.Name>
            </S.Column>
          </Col>
          <Col span={6} style={{ marginTop: '-40px' }}>
            <S.Column>
              <S.Value>{matchesPlayed}</S.Value>
              <S.Name>Počet her</S.Name>
              <S.Value>{wins}</S.Value>
              <S.Name>Výhry</S.Name>
              <S.Value>{draws}</S.Value>
              <S.Name>Remízy</S.Name>
              <S.Value>{losses}</S.Value>
              <S.Name>Prohry</S.Name>
            </S.Column>
          </Col>
          <Col span={6}>
            <S.Column>
              <S.Value>{totalFlags}</S.Value>
              <S.Name>Celkem vlajek</S.Name>
              <S.Value>{totalKills}</S.Value>
              <S.Name>Celkem zabití</S.Name>
              <S.Value>{totalDeaths}</S.Value>
              <S.Name>Celkem smrtí</S.Name>
            </S.Column>
          </Col>
          <Col span={6}>
            <S.Value>
              <S.Value>{averageFlags}</S.Value>
              <S.Name>Vlajek na zápas</S.Name>
              <S.Value>{averageKills}</S.Value>
              <S.Name>Zabití na zápas</S.Name>
              <S.Value>{averageDeaths}</S.Value>
              <S.Name>Smrtí na zápas</S.Name>
            </S.Value>
          </Col>
        </Row>
      </div>
    </>
  );
};
