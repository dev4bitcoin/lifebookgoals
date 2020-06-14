import React, { Component } from "react";
import { getTags } from "../services/tagService";
import { Link } from "react-router-dom";

class Tags extends Component {
  state = { tags: [] };

  async componentDidMount() {
    const { data: tags } = await getTags();
    this.setState({ tags });
  }

  handleClick = (tag) => {
    if (this.props.onTagsClick) {
      this.props.onTagsClick(tag);
    }
  };

  render() {
    const { tags } = this.state;
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">Tags</h4>
          {tags.map((tag) => (
            <Link
              key={tag._id}
              className="btn btn-light btn-sm mb-1 mr-1"
              onClick={() => this.handleClick(tag)}
              to={{
                pathname: `/tag/${tag.name.replace(/ /g, "-")}`,
                state: tag,
              }}
            >
              <div className="d-flex">
                <div>{tag.name} </div>
                {tag.taggedCount !== 0 && (
                  <div className="ml-2 pl-1 pr-1 rounded-circle btn-tag-bg-color">
                    <div>{tag.taggedCount} </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Tags;
