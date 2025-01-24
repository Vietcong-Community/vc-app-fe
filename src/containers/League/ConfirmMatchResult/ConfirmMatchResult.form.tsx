import React from 'react';

import { Form } from 'antd';
import { FormattedMessage } from 'react-intl';

import { IMap } from '../../../api/hooks/interfaces';
import { ITeam } from '../../../api/hooks/teams/interfaces';
import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { InputNumberField } from '../../../components/Fields/InputNumberField/InputNumberField';
import { FormComponent } from '../../../components/Form/FormComponent';
import { Gap } from '../../../components/Gap/Gap';
import { useWindowDimensions } from '../../../hooks/WindowDimensionsHook';
import { BreakPoints } from '../../../theme/theme';
import { fields as formFields, roundFields } from '../SetMatchResult/SetMatchResult.fields';

import { IFormData } from './ConfirmMatchResult.fields';
import { messages } from './messages';

import * as S from './ConfirmMatchResult.style';

interface IProps {
  challengerTeam?: ITeam;
  challengerMap?: IMap;
  initialValues?: Partial<IFormData>;
  isSubmitting: boolean;
  onCancel: () => void;
  opponentMap?: IMap;
  opponentTeam?: ITeam;
  onSubmit: (values: IFormData) => void;
}

export const ConfirmMatchResultForm: React.FC<IProps> = (props: IProps) => {
  const { challengerMap, challengerTeam, initialValues, isSubmitting, onCancel, opponentMap, opponentTeam, onSubmit } =
    props;
  const [form] = Form.useForm<IFormData>();
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;
  const roundsFormValue = Form.useWatch('rounds', form) ?? [];

  const getOverallScore = (challenger?: boolean) => {
    let score = 0;
    roundsFormValue.forEach((item) => {
      if (challenger && item.scoreChallenger > item.scoreOpponent) {
        score += 1;
      } else if (!challenger && item.scoreChallenger < item.scoreOpponent) {
        score += 1;
      }
    });
    return score;
  };

  const challengerOverallScore = getOverallScore(true);
  const opponentOverallScore = getOverallScore(false);

  const challengerWinning = challengerOverallScore > opponentOverallScore;
  const opponentWinning = challengerOverallScore < opponentOverallScore;

  return (
    <Card style={{ margin: '1rem auto', maxWidth: BreakPoints.md }} title={<FormattedMessage {...messages.title} />}>
      <FormComponent form={form} initialValues={initialValues} onSubmit={onSubmit}>
        <Gap defaultHeight={16} />
        <S.OverallScore>
          <FormattedMessage {...messages.overallScore} />
          <Gap defaultHeight={16} />
          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <S.Score $isLosing={opponentWinning} $isWinning={challengerWinning}>
              {isSmallerThanMd ? challengerTeam?.tag : challengerTeam?.name}
              <br />
              <span>{challengerOverallScore}</span>
            </S.Score>
            <S.Score $isLosing={challengerWinning} $isWinning={opponentWinning}>
              {isSmallerThanMd ? opponentTeam?.tag : opponentTeam?.name}
              <br />
              <span>{opponentOverallScore}</span>
            </S.Score>
          </div>
        </S.OverallScore>
        <Gap defaultHeight={16} />
        <Form.List name={formFields.rounds.name}>
          {(fields) => {
            return (
              <S.FieldsContainer>
                {fields.map((field, index) => {
                  const mapId = form.getFieldValue(['rounds', field.name, 'mapId']);
                  const map = challengerMap?.id === mapId ? challengerMap : opponentMap;

                  return (
                    <S.RoundContainer>
                      <S.MapTitle>
                        <FormattedMessage {...messages.mapRound} values={{ map: map?.name ?? '', round: index + 1 }} />
                      </S.MapTitle>
                      <S.TeamsContainer>
                        <S.TeamContainer>
                          <InputNumberField
                            disabled
                            label={<FormattedMessage {...messages.scoreChallenger} />}
                            name={[field.name, roundFields.scoreChallenger.name]}
                            rules={roundFields.scoreChallenger.rules}
                          />
                        </S.TeamContainer>
                        <S.TeamContainer>
                          <InputNumberField
                            disabled
                            label={<FormattedMessage {...messages.scoreOpponent} />}
                            name={[field.name, roundFields.scoreOpponent.name]}
                            rules={roundFields.scoreOpponent.rules}
                          />
                        </S.TeamContainer>
                      </S.TeamsContainer>
                    </S.RoundContainer>
                  );
                })}
              </S.FieldsContainer>
            );
          }}
        </Form.List>
        <Gap defaultHeight={16} />
        <S.ActionButtons>
          <Button onClick={onCancel} variant={MainButtonVariant.OUTLINED}>
            <FormattedMessage {...messages.cancelButton} />
          </Button>
          <Button loading={isSubmitting} type="submit">
            <FormattedMessage {...messages.submitButton} />
          </Button>
        </S.ActionButtons>
      </FormComponent>
    </Card>
  );
};
