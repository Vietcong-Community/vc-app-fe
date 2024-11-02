import { FormRule } from 'antd';

export interface IField {
  name: string;
  required?: boolean;
  rules?: FormRule[];
}

export type IFormFields<T> = {
  [key in keyof Required<T>]: IField;
};
