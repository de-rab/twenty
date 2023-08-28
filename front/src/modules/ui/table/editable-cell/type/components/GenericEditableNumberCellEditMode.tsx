import { useRecoilState } from 'recoil';

import type { ViewFieldNumberMetadata } from '@/ui/editable-field/types/ViewField';
import { useCurrentRowEntityId } from '@/ui/table/hooks/useCurrentEntityId';
import { useUpdateEntityField } from '@/ui/table/hooks/useUpdateEntityField';
import { tableEntityFieldFamilySelector } from '@/ui/table/states/selectors/tableEntityFieldFamilySelector';
import {
  canBeCastAsPositiveIntegerOrNull,
  castAsPositiveIntegerOrNull,
} from '~/utils/cast-as-positive-integer-or-null';

import type { ColumnDefinition } from '../../../types/ColumnDefinition';

import { TextCellEdit } from './TextCellEdit';

type OwnProps = {
  columnDefinition: ColumnDefinition<ViewFieldNumberMetadata>;
};

export function GenericEditableNumberCellEditMode({
  columnDefinition,
}: OwnProps) {
  const currentRowEntityId = useCurrentRowEntityId();

  // TODO: we could use a hook that would return the field value with the right type
  const [fieldValue, setFieldValue] = useRecoilState<string>(
    tableEntityFieldFamilySelector({
      entityId: currentRowEntityId ?? '',
      fieldName: columnDefinition.metadata.fieldName,
    }),
  );

  const updateField = useUpdateEntityField();

  function handleSubmit(newText: string) {
    if (newText === fieldValue) return;

    try {
      let numberValue = parseInt(newText);

      if (isNaN(numberValue)) {
        throw new Error('Not a number');
      }

      if (columnDefinition.metadata.isPositive) {
        if (!canBeCastAsPositiveIntegerOrNull(newText)) {
          return;
        }

        const valueCastedAsPositiveNumberOrNull =
          castAsPositiveIntegerOrNull(newText);

        if (valueCastedAsPositiveNumberOrNull === null) {
          throw Error('Not a number');
        }

        numberValue = valueCastedAsPositiveNumberOrNull;
      }

      // TODO: find a way to store this better in DB
      if (numberValue > 2000000000) {
        throw new Error('Number too big');
      }

      setFieldValue(numberValue.toString());

      if (currentRowEntityId && updateField) {
        updateField(currentRowEntityId, columnDefinition, numberValue);
      }
    } catch (error) {
      console.warn(
        `In GenericEditableNumberCellEditMode, Invalid number: ${newText}, ${error}`,
      );
    }
  }

  return (
    <TextCellEdit autoFocus value={fieldValue ?? ''} onSubmit={handleSubmit} />
  );
}
