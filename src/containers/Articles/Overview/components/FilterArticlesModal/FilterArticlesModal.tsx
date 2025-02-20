import React, { Dispatch, SetStateAction } from 'react';

import { Checkbox, Modal, Radio, RadioChangeEvent } from 'antd';
import { FormattedMessage } from 'react-intl';

import { ICategory } from '../../../../../api/hooks/articles/interfaces';
import { Gap } from '../../../../../components/Gap/Gap';
import { messages } from '../../messages';

interface IProps {
  articleCategories: ICategory[];
  isOpen: boolean;
  onClose: () => void;
  setCategory: (e: RadioChangeEvent) => void;
  setPublished: Dispatch<SetStateAction<boolean>>;
  showPublished: boolean;
  userCanManageArticles: boolean;
}

export const FilterArticlesModal: React.FC<IProps> = (props: IProps) => {
  const { articleCategories, isOpen, onClose, setCategory, setPublished, showPublished, userCanManageArticles } = props;

  const onCategoryChange = (e: RadioChangeEvent) => {
    setCategory(e);
    onClose();
  };

  return (
    <Modal onCancel={onClose} onOk={onClose} open={isOpen}>
      <Radio.Group
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
        onChange={onCategoryChange}
        defaultValue={undefined}
        options={[
          { value: undefined, label: <FormattedMessage {...messages.allCategories} /> },
          ...(articleCategories.map((item) => ({ value: item.id, label: item.name })) ?? []),
        ]}
      ></Radio.Group>
      {userCanManageArticles && (
        <>
          <Gap defaultHeight={4} />
          <Checkbox defaultChecked={showPublished} onChange={() => setPublished((value) => !value)}>
            <FormattedMessage {...messages.published} />
          </Checkbox>
        </>
      )}
    </Modal>
  );
};
