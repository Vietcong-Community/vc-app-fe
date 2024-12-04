import { IFormData as IBasicInformationFormData } from './sections/BasicInformation/BasicInformation.fields';
import { IFormData as IRoundsInformationFormData } from './sections/RoundsInformation/RoundsInformation.fields';

export interface IMixedMatchResultFormData {
  BASIC_INFORMATION?: IBasicInformationFormData;
  ROUNDS_INFORMATION?: IRoundsInformationFormData;
}
