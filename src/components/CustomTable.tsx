import React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

interface TableColumn {
  label: string;
  renderCell: (item: any) => React.ReactNode;
}

interface CustomTableProps {
  columns: TableColumn[];
  data: any[]; // Ensure that data is an array
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data }) => {
  const theme = useTheme([
    getTheme(),
    {

      HeaderRow: `
        background-color: #ffffff;
        width: 100%:
      `,
      HeaderCell:`
        &:nth-of-type(1) {
            width: 100%;
        }
        &:nth-of-type(2) {
            width: 100%;
        }
        &:nth-of-type(3) {
            width: 100%;
        }
        `,

      Row: `
        &:nth-of-type(odd) {
          background-color: #ffffff;
        }
        &:nth-of-type(even) {
          background-color: #ffffff;
        }
      `,
      // Adjust column widths here
      Cell: `
        &:nth-of-type(1) {
          width: 100%;
        }
        &:nth-of-type(2) {
          width: 100%;
        }
        &:nth-of-type(3) {
          width: 100%;
        }
      `,
    },
  ]);

  return <CompactTable columns={columns} data={data || []} theme={theme} />;
};

export default CustomTable;
