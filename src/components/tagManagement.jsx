import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "../common/form";
import auth from "../services/authService";
import { getTags, saveTag, deleteTag } from "../services/tagService";
import TagsTable from "./tagsTable";

class TagManagement extends Form {
  state = {
    data: {},
    tags: [],
    errors: {},
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data: tags } = await getTags();
    this.setState({ tags });
  }

  schema = {
    name: Joi.string().required().label("Name"),
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  onHandleSelected = (id) => {
    // const tags = [...this.state.data];
    // const tag = getTags(id);
    // const index = tags.indexOf(tag);
    // this.setState({ tag });
  };

  onHandleDelete = async (id) => {
    const originalTags = this.state.tags;
    const tags = originalTags.filter((m) => m._id !== id);
    this.setState({ tags: tags });

    try {
      await deleteTag(id);
      toast.success(`The selected tag deleted sucessfully`);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This tag has already been deleted");
      } else {
        this.setState({ tags: originalTags });
      }
    }
  };

  doSubmit = async (tag) => {
    try {
      await saveTag(tag._id, tag);
      toast.success(`${tag.name} added successfully`);
      const { data: tags } = await getTags();
      this.setState({ tags });
    } catch (ex) {
      toast.error(`Could not add the tag ${tag.name}`);
    }
  };

  render() {
    if (!auth.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    const { tags, sortColumn } = this.state;
    return (
      <div className="d-flex justify-content-center">
        <div className="w-75 align-self-center">
          <h1>Tags</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="d-flex">
              {this.renderInput("name", "Name")}
              {this.renderButton("add", "Add", "add-btn")}
            </div>
            <div>
              <TagsTable
                tags={tags}
                onDelete={this.onHandleDelete}
                onSelected={this.onHandleSelected}
                onSort={this.handleSort}
                sortColumn={sortColumn}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TagManagement;
