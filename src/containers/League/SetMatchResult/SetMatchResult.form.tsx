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
import { Nation } from '../../../constants/enums';
import { useWindowDimensions } from '../../../hooks/WindowDimensionsHook';
import { BreakPoints } from '../../../theme/theme';
import { mapNationToTranslation } from '../../../utils/mappingLabelUtils';

import { fields as formFields, IFormData, roundFields } from './SetMatchResult.fields';
import { messages } from './messages';

import * as S from './SetMatchResult.style';

interface IProps {
  challengerTeam?: ITeam;
  challengerMap?: IMap;
  initialValues: Partial<IFormData>;
  isSubmitting: boolean;
  opponentMap?: IMap;
  opponentTeam?: ITeam;
  onCancel: () => void;
  onSubmit: (values: IFormData) => void;
}

export const SetMatchResultForm: React.FC<IProps> = (props: IProps) => {
  const { challengerMap, challengerTeam, initialValues, isSubmitting, opponentMap, opponentTeam, onCancel, onSubmit } =
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
      <FormComponent form={form} initialValues={initialValues} requiredMark={false} onSubmit={onSubmit}>
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
                  const challengerNation = form.getFieldValue(['rounds', field.name, 'challengerNation']);
                  const map = challengerMap?.id === mapId ? challengerMap : opponentMap;

                  const opponentNation = challengerNation === Nation.US ? Nation.VC : Nation.US;

                  return (
                    <S.RoundContainer>
                      <S.MapTitle>
                        <FormattedMessage {...messages.mapRound} values={{ map: map?.name ?? '', round: index + 1 }} />
                      </S.MapTitle>
                      <S.TeamsContainer>
                        <S.TeamContainer>
                          <span>
                            <FormattedMessage
                              {...messages.nation}
                              values={{ nation: mapNationToTranslation(challengerNation) }}
                            />{' '}
                          </span>
                          <InputNumberField
                            label={<FormattedMessage {...messages.scoreChallenger} />}
                            name={[field.name, roundFields.scoreChallenger.name]}
                            rules={roundFields.scoreChallenger.rules}
                          />
                        </S.TeamContainer>
                        <S.TeamContainer>
                          <span>
                            <FormattedMessage
                              {...messages.nation}
                              values={{ nation: mapNationToTranslation(opponentNation) }}
                            />{' '}
                          </span>
                          <InputNumberField
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
