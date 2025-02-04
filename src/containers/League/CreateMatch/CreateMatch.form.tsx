import React, { useState } from 'react';

import { Flex, Form, Space } from 'antd';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';

import { IMap } from '../../../api/hooks/interfaces';
import { ISeasonTeamItem } from '../../../api/hooks/league/interfaces';
import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { DatePickerField } from '../../../components/Fields/DatePickerField/DatePickerField';
import { SelectField } from '../../../components/Fields/SelectField/SelectField';
import { FormComponent } from '../../../components/Form/FormComponent';
import { Gap } from '../../../components/Gap/Gap';
import { LinkButton } from '../../../components/LinkButton/LinkButton';
import { BreakPoints } from '../../../theme/theme';
import { ExpectedEloPointsModal } from '../components/ExpectedEloPointsModal/ExpectedEloPointsModal';

import { fields, IFormData } from './CreateMatch.fields';
import { messages } from './messages';

interface IProps {
  initialValues?: Partial<IFormData>;
  isSubmitting: boolean;
  maps: IMap[];
  onCancel: () => void;
  onSubmit: (values: IFormData) => void;
  myTeam?: ISeasonTeamItem;
  teams: ISeasonTeamItem[];
}

export const CreateMatchForm: React.FC<IProps> = (props: IProps) => {
  const { initialValues, isSubmitting, maps, onCancel, onSubmit, myTeam, teams } = props;
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form] = Form.useForm<IFormData>();
  const selectedOpponent = Form.useWatch('opponentId', form);

  const opponentOptions =
    teams?.map((item) => ({ id: item.team.id, value: item.team.id, label: item.team.team.name })) ?? [];
  const mapsOptions = maps?.map((item) => ({ id: item.id, value: item.id, label: item.name })) ?? [];

  const opponentSeasonTeam = teams?.find((item) => item.team.id === selectedOpponent);

  return (
    <>
      <Card style={{ margin: '1rem auto', maxWidth: BreakPoints.sm }} title={<FormattedMessage {...messages.title} />}>
        <FormComponent form={form} initialValues={initialValues} onSubmit={onSubmit}>
          <SelectField
            {...fields.opponentId}
            label={<FormattedMessage {...messages.opponentId} />}
            placeholder={formatMessage(messages.opponentId)}
            options={opponentOptions}
          />
          <SelectField
            {...fields.challengerMapId}
            label={<FormattedMessage {...messages.mapLabel} />}
            placeholder={formatMessage(messages.mapLabel)}
            options={mapsOptions}
          />
          <DatePickerField
            {...fields.startDate}
            label={<FormattedMessage {...messages.startDate} />}
            placeholder={formatMessage(messages.startDate)}
            showTime
            minimalDate={dayjs()}
          />
          {selectedOpponent && myTeam && (
            <>
              <Gap defaultHeight={8} />
              <Flex justify="end">
                <LinkButton withScale={false} onClick={() => setIsOpen(true)}>
                  <FormattedMessage {...messages.expectedPoints} />
                </LinkButton>
              </Flex>
            </>
          )}
          <Gap defaultHeight={16} />
          <Space>
            <Button onClick={onCancel} variant={MainButtonVariant.OUTLINED}>
              <FormattedMessage {...messages.cancelButton} />
            </Button>
            <Button loading={isSubmitting} type="submit">
              <FormattedMessage {...messages.submitButton} />
            </Button>
          </Space>
        </FormComponent>
      </Card>
      <ExpectedEloPointsModal
        closeModal={() => setIsOpen(false)}
        challengerId={myTeam?.team?.id}
        challengerName={myTeam?.team.team?.tag}
        challengerElo={myTeam?.team?.eloPoints}
        isOpen={isOpen}
        opponentId={opponentSeasonTeam?.team?.id}
        opponentName={opponentSeasonTeam?.team?.team?.tag}
        opponentElo={opponentSeasonTeam?.team?.eloPoints}
      />
    </>
  );
};
