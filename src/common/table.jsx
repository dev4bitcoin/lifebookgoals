import React from "react";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table mt-10">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />

      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
