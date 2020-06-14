import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Table from "./../common/table";

class ArchivesTable extends Component {
  columns = [
    {
      path: "postingDate",
      label: "Date",
      isDate: true,
      classes: "table-first-column",
    },
    {
      path: "title",
      label: "Title",
      content: (article) => (
        <Link
          to={{
            pathname: `/article/${article.title.replace(/ /g, "-")}`,
            state: article._id,
          }}
        >
          {article.title}
        </Link>
      ),
    },
  ];

  editColumn = {
    path: "edit",
    classes: "table-first-column",
    content: (article) => (
      <a
        className="btn btn-secondary btn-sm"
        href={`/postArticle/${article._id}`}
      >
        Edit
      </a>
    ),
  };

  deleteColumn = {
    path: "delete",
    content: (article) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.onDelete(article._id)}
      >
        Delete
      </button>
    ),
  };

  componentDidMount() {
    const user = auth.getCurrentUser();

    if (user) {
      this.columns.push(this.editColumn);
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { onDelete, articles } = this.props;
    return <Table onDelete={onDelete} data={articles} columns={this.columns} />;
  }
}

export default ArchivesTable;
