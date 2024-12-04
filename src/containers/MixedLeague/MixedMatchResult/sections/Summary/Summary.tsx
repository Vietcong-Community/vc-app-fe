import React from 'react';

import { IMixedMatchResultFormData } from '../../types';

interface IProps {
  data: IMixedMatchResultFormData;
  goBack: () => void;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export const Summary: React.FC<IProps> = (props) => {
  const { data } = props;
  return <>{data?.BASIC_INFORMATION?.players}</>;
};
