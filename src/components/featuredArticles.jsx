import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

const FeaturedArticles = ({ articles }) => {
  return (
    <div className="intro">
      <div className="container-fluid">
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
                  <TimeAgo
                    className="timeago"
                    datetime={article.postingDate}
                  ></TimeAgo>
                  <h2>{article.title}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticles;
