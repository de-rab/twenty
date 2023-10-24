import { isNull, isNumber } from '@sniptt/guards';

import { FieldNumberValue } from '../FieldMetadata';

// TODO: add yup
export const isFieldNumberValue = (
  fieldValue: unknown,
): fieldValue is FieldNumberValue => isNull(fieldValue) || isNumber(fieldValue);
