import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../services/authService";
import {
  getArticleStub,
  getArticle,
  getArticles,
} from "./../services/articleService";
import { getTags } from "./../services/tagService";

class postArticle extends Form {
  state = {
    data: {},
    errors: {},
    tags: [],
    selectedValue: [],
    relatedArticles: [],
  };

  async componentDidMount() {
    const result = await getArticles();
    const { articles: relatedArticles } = result.data;
    this.setState({ relatedArticles });
    this.populateArticle();
    this.populateTags();
  }

  async populateArticle() {
    if (!this.props.match.params.id || this.props.match.params.id === "new") {
      this.editNewArticle();
      return;
    }
    const { data } = await getArticle(this.props.match.params.id);
    const { currentArticle: article } = data;
    article.hasRichTextData = true;
    this.setState({ data: article });
  }

  async populateTags() {
    const { data: tags } = await getTags();
    this.setState({ tags });
  }

  async editNewArticle() {
    let data = {};
    if (
      !this.props.location ||
      !this.props.location.data ||
      !this.props.location.data.data
    ) {
      const { data: stub } = await getArticleStub();
      data = stub;
    } else {
      data = this.props.location.data.data;
      data.hasRichTextData = true;
    }
    this.setState({ data });
  }

  schema = {
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    tags: Joi.array().required().label("Tags"),
    imageName: Joi.string().required().label("Image"),
    isFeatured: Joi.boolean().allow("").label("Feature Article"),
    relatedArticles: Joi.array().optional().label("Feature Article"),
  };

  doSubmit = (data) => {
    try {
      this.props.history.push({
        pathname: "/postPreview",
        data: this.state.data,
      });
    } catch (ex) {}
  };

  onSelect(selectedList, selectedItem) {}

  render() {
    if (!auth.getCurrentUser()) {
      return <Redirect to="/" />;
    }

    return (
      <div className="d-flex justify-content-center">
        <div className="w-75 align-self-center">
          <h1>Post Article</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderFileUploader("imageName", "Image")}
            {this.renderMultiSelect("tags", "Tags", this.state.tags, "name")}
            {this.renderMultiSelect(
              "relatedArticles",
              "Related Articles",
              this.state.relatedArticles,
              "title"
            )}
            {this.renderCheckbox("isFeatured", "Feature Article")}
            {this.renderRichText("description", "Description")}
            <div className="float-right">
              {this.renderButton("next", "Next")}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default postArticle;
