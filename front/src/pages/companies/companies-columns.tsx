import { useMemo } from 'react';
import {
  TbBuilding,
  TbCalendar,
  TbLink,
  TbMapPin,
  TbSum,
  TbUser,
} from 'react-icons/tb';
import { CellContext, createColumnHelper } from '@tanstack/react-table';

import { CompanyEditableNameChipCell } from '@/companies/components/CompanyEditableNameCell';
import { Company } from '@/companies/interfaces/company.interface';
import { updateCompany } from '@/companies/services';
import {
  PersonChip,
  PersonChipPropsType,
} from '@/people/components/PersonChip';
import { SearchConfigType } from '@/search/interfaces/interface';
import { SEARCH_USER_QUERY } from '@/search/services/search';
import { EditableDate } from '@/ui/components/editable-cell/EditableDate';
import { EditableRelation } from '@/ui/components/editable-cell/EditableRelation';
import { EditableText } from '@/ui/components/editable-cell/EditableText';
import { CheckboxCell } from '@/ui/components/table/CheckboxCell';
import { ColumnHead } from '@/ui/components/table/ColumnHead';
import { SelectAllCheckbox } from '@/ui/components/table/SelectAllCheckbox';
import { mapToUser, User } from '@/users/interfaces/user.interface';
import { QueryMode } from '~/generated/graphql';

const columnHelper = createColumnHelper<Company>();

export const useCompaniesColumns = () => {
  return useMemo(() => {
    return [
      {
        id: 'select',
        header: ({ table }: any) => (
          <SelectAllCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={(newValue) => table.toggleAllRowsSelected(newValue)}
          />
        ),
        cell: (props: CellContext<Company, string>) => (
          <CheckboxCell
            id={`company-selected-${props.row.original.id}`}
            name={`company-selected-${props.row.original.id}`}
            checked={props.row.getIsSelected()}
            onChange={(newValue) => props.row.toggleSelected(newValue)}
          />
        ),
        size: 25,
      },
      columnHelper.accessor('name', {
        header: () => (
          <ColumnHead viewName="Name" viewIcon={<TbBuilding size={16} />} />
        ),
        cell: (props) => (
          <CompanyEditableNameChipCell company={props.row.original} />
        ),
        size: 120,
      }),
      columnHelper.accessor('domainName', {
        header: () => (
          <ColumnHead viewName="URL" viewIcon={<TbLink size={16} />} />
        ),
        cell: (props) => (
          <EditableText
            content={props.row.original.domainName || ''}
            placeholder="Domain name"
            changeHandler={(value) => {
              const company = props.row.original;
              company.domainName = value;
              updateCompany(company);
            }}
          />
        ),
        size: 100,
      }),
      columnHelper.accessor('employees', {
        header: () => (
          <ColumnHead viewName="Employees" viewIcon={<TbSum size={16} />} />
        ),
        cell: (props) => (
          <EditableText
            content={props.row.original.employees?.toString() || ''}
            placeholder="Employees"
            changeHandler={(value) => {
              const company = props.row.original;

              if (value === '') {
                company.employees = null;
                updateCompany(company);
              } else if (!Number.isNaN(Number(value))) {
                company.employees = Number(value);
                updateCompany(company);
              }
            }}
          />
        ),
        size: 70,
      }),
      columnHelper.accessor('address', {
        header: () => (
          <ColumnHead viewName="Address" viewIcon={<TbMapPin size={16} />} />
        ),
        cell: (props) => (
          <EditableText
            content={props.row.original.address || ''}
            placeholder="Address"
            changeHandler={(value) => {
              const company = props.row.original;
              company.address = value;
              updateCompany(company);
            }}
          />
        ),
        size: 170,
      }),
      columnHelper.accessor('createdAt', {
        header: () => (
          <ColumnHead viewName="Creation" viewIcon={<TbCalendar size={16} />} />
        ),
        cell: (props) => (
          <EditableDate
            value={props.row.original.createdAt || new Date()}
            changeHandler={(value: Date) => {
              const company = props.row.original;
              company.createdAt = value;
              updateCompany(company);
            }}
          />
        ),
        size: 70,
      }),
      columnHelper.accessor('accountOwner', {
        header: () => (
          <ColumnHead
            viewName="Account Owner"
            viewIcon={<TbUser size={16} />}
          />
        ),
        cell: (props) => (
          <EditableRelation<User, PersonChipPropsType>
            relation={props.row.original.accountOwner}
            searchPlaceholder="Account Owner"
            ChipComponent={PersonChip}
            chipComponentPropsMapper={(
              accountOwner: User,
            ): PersonChipPropsType => {
              return {
                name: accountOwner.displayName || '',
              };
            }}
            onChange={(relation: User) => {
              const company = props.row.original;
              if (company.accountOwner) {
                company.accountOwner.id = relation.id;
              } else {
                company.accountOwner = {
                  __typename: 'users',
                  id: relation.id,
                  email: relation.email,
                  displayName: relation.displayName,
                };
              }
              updateCompany(company);
            }}
            searchConfig={
              {
                query: SEARCH_USER_QUERY,
                template: (searchInput: string) => ({
                  displayName: {
                    contains: `%${searchInput}%`,
                    mode: QueryMode.Insensitive,
                  },
                }),
                resultMapper: (accountOwner) => ({
                  render: (accountOwner) => accountOwner.displayName,
                  value: mapToUser(accountOwner),
                }),
              } satisfies SearchConfigType<User>
            }
          />
        ),
      }),
    ];
  }, []);
};
