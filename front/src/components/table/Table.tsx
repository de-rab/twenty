import * as React from 'react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import TableHeader from './table-header/TableHeader';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styled from '@emotion/styled';

type OwnProps = {
  data: Array<any>;
  columns: Array<ColumnDef<any, any>>;
  viewName: string;
  viewIcon?: IconProp;
};

const StyledTable = styled.table`
  min-width: 100%;
  border-radius: 4px;
  border-spacing: 0;

  th {
    color: ${(props) => props.theme.text40};
    padding: 0;
    border-top: 1px solid ${(props) => props.theme.tertiaryBackground};
    border-bottom: 1px solid ${(props) => props.theme.tertiaryBackground};
    text-align: left;
    :not(:last-child) {
      border-right: 1px solid ${(props) => props.theme.tertiaryBackground};
    }
  }

  td {
    color: ${(props) => props.theme.text80};
    padding: 0;
    border-bottom: 1px solid ${(props) => props.theme.tertiaryBackground};
    text-align: left;
    :not(:last-child) {
      border-right: 1px solid ${(props) => props.theme.tertiaryBackground};
    }
  }
`;

const StyledTableWithHeader = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

function Table({ data, columns, viewName, viewIcon }: OwnProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <StyledTableWithHeader>
      <TableHeader viewName={viewName} viewIcon={viewIcon} />
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {table
          .getFooterGroups()
          .flatMap((group) => group.headers)
          .filter((header) => !!header.column.columnDef.footer).length > 0 && (
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </StyledTable>
    </StyledTableWithHeader>
  );
}

export default Table;