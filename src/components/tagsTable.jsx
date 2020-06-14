import React, { Component } from "react";
import Table from "../common/table";

class TagsTable extends Component {
  columns = [
    {
      path: "lastModifiedTimestamp",
      label: "Created Date",
      isDate: true,
      classes: "table-first-column",
    },
    { path: "name", label: "Name" },
    { path: "taggedCount", label: "Tagged Count" },
    {
      path: "delete",
      content: (tag) => (
        <button
          className="btn btn-danger btn-sm"
          disabled={tag.taggedCount > 0 ? true : false}
          onClick={() => this.props.onDelete(tag._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { onDelete, onSelected, onSort, sortColumn, tags } = this.props;
    return (
      <Table
        onDelete={onDelete}
        onSort={onSort}
        sortColumn={sortColumn}
        onSelected={onSelected}
        data={tags}
        columns={this.columns}
      />
    );
  }
}

export default TagsTable;
