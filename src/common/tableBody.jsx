import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }

    const value = _.get(item, column.path);

    if (column.isDate) {
      return this.formatDate(value);
    } else {
      return value;
    }
  };

  formatDate(value) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(value).toLocaleDateString([], options);
  }

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td
                className={`clickable ${column.classes}`}
                key={this.createKey(item, column)}
              >
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
