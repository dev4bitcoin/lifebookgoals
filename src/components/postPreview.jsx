import React from "react";
import TimeAgo from "timeago-react";
import ReactHtmlParser from "react-html-parser";
import { toast } from "react-toastify";
import Form from "./../common/form";
import { saveArticle } from "./../services/articleService";

class PostPreview extends Form {
  handlePost = async () => {
    const { data: article } = this.props.location;
    await saveArticle(article._id, article);
    if (article._id) {
      toast.success("The article updated successfully");
    } else {
      toast.success("The article posted successfully");
    }
    this.props.history.push("/home");
  };

  handleBack = () => {
    this.props.history.push({
      pathname: "/postArticle/new",
      data: this.props.location,
    });
  };

  render() {
    const { data: article } = this.props.location;
    return (
      <div className="col-md-9">
        <article className="card mb-4">
          <header className="card-header text-center">
            <div className="card-meta">
              <a href="/">
                <TimeAgo className="timeago" datetime={article.postingDate} />
              </a>
              &nbsp; in &nbsp;
              <a href="page-category.html">{article.categoryName}</a>
            </div>
            <h1 className="card-title">{article.title}</h1>
          </header>
          <img className="card-img" src={article.image} alt="" />
          <div className="card-body">
            <div className="card-text">
              {ReactHtmlParser(article.description)}
            </div>
          </div>
        </article>

        <button
          name="edit"
          className={`btn btn-primary`}
          onClick={this.handleBack}
        >
          Back
        </button>
        <div className="float-right">
          <button
            name="post"
            className={`btn btn-primary`}
            onClick={this.handlePost}
          >
            {article.id ? "Update" : "Post"}
          </button>
        </div>
      </div>
    );
  }
}

export default PostPreview;
