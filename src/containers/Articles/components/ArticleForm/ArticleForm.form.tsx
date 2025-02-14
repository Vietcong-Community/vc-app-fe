import React from 'react';

import { Flex, Form } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { ICategory } from '../../../../api/hooks/articles/interfaces';
import { Button } from '../../../../components/Button/Button';
import { Card } from '../../../../components/Card/Card';
import { InputAreaField } from '../../../../components/Fields/InputAreaField/InputAreaField';
import { InputField } from '../../../../components/Fields/InputField/InputField';
import { SelectField } from '../../../../components/Fields/SelectField/SelectField';
import { FormComponent } from '../../../../components/Form/FormComponent';
import { BreakPoints } from '../../../../theme/theme';

import { IFormData } from './ArticleForm.fields';
import { fields } from './ArticleForm.fields';
import { messages } from './messages';

interface IProps {
  categories: ICategory[];
  initialValues?: Partial<IFormData>;
  isSubmitting: boolean;
  onSubmit: (values: IFormData) => void;
}

export const ArticleForm: React.FC<IProps> = (props: IProps) => {
  const { categories, initialValues, isSubmitting, onSubmit } = props;
  const [form] = Form.useForm<IFormData>();
  const { formatMessage } = useIntl();
  const perexValue = Form.useWatch('perex', form);

  return (
    <Card style={{ margin: '1rem auto', maxWidth: BreakPoints.md }}>
      <FormComponent id="article-form" form={form} initialValues={initialValues} onSubmit={onSubmit}>
        <InputField
          {...fields.title}
          label={<FormattedMessage {...messages.title} />}
          placeholder={formatMessage(messages.title)}
        />
        <SelectField
          {...fields.categoryId}
          label={<FormattedMessage {...messages.category} />}
          placeholder={formatMessage(messages.category)}
          options={categories.map((item) => ({ id: item.id, value: item.id, label: item.name }))}
        />
        <InputAreaField
          {...fields.perex}
          label={<FormattedMessage {...messages.perex} />}
          placeholder={formatMessage(messages.perex)}
          maxLength={512}
          showCount
          valueLength={perexValue?.length}
        />
        <Flex justify="flex-end">
          <Button loading={isSubmitting} type="submit">
            <FormattedMessage {...messages.submit} />
          </Button>
        </Flex>
      </FormComponent>
    </Card>
  );
};
