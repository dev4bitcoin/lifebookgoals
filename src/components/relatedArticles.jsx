import React, { Component } from "react";
import { Link } from "react-router-dom";

class RelatedArticles extends Component {
  getRelatedArticles() {
    if (!this.props.article || !this.props.article.relatedArticles) {
      return [];
    }

    return this.props.article.relatedArticles;
  }

  render() {
    const articles = this.getRelatedArticles();
    return (
      <div className="row">
        {articles.map((article) => (
          <div key={article._id} className="col-md-4">
            <Link
              className="intro-block"
              to={{
                pathname: `/article/${article.title.replace(/ /g, "-")}`,
                state: article._id,
              }}
              style={{ backgroundImage: `url(${article.image})` }}
            >
              <div className="intro-block-inner">
                <h2>{article.title}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default RelatedArticles;
