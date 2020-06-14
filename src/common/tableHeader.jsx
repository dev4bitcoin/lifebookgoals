import React, { Component } from "react";

// coulmns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className={`clickable ${column.classes}`}
              key={column.path || column.key}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
