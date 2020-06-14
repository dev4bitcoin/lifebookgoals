import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import { getPopularArticles } from "../services/articleService";

class PopularStories extends Component {
  state = { articles: [] };

  async componentWillMount() {
    const { data: articles } = await getPopularArticles();
    this.setState({ articles });
  }

  render() {
    const { articles } = this.state;
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">Popular stories</h4>
          {articles.map((article) => (
            <div key={article._id}>
              <Link
                key={article._id}
                className="d-inline-block mt-3"
                to={{
                  pathname: `/article/${article.title.replace(/ /g, "-")}`,
                  state: article._id,
                }}
              >
                <h4 className="h6">{article.title}</h4>
                <img className="card-img" src={article.image} alt="" />
              </Link>
              <TimeAgo
                className="timeago"
                datetime={article.postingDate}
              ></TimeAgo>
              &nbsp; in &nbsp;
              {article.tags.map((tag, index) => (
                <Fragment key={tag._id}>
                  {index > 0 && ` | `}
                  {/* <Link
                    key={tag._id}
                    to={{
                      pathname: `/tag/${tag.name}`,
                      state: tag,
                    }}
                  >
                    {tag.name}
                  </Link> */}
                  {tag.name}
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PopularStories;
