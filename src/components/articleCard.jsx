import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import TextTruncate from "react-text-truncate";
import htmlToText from "html-to-text";
import { CommentCount } from "disqus-react";

class ArticleCard extends Component {
  render() {
    const { article } = this.props;
    const articlePathName = `/article/${article.title.replace(/ /g, "-")}`;
    return (
      <article className="card mb-4">
        <header className="card-header">
          <div className="card-meta">
            <TimeAgo
              className="timeago"
              datetime={article.postingDate}
            ></TimeAgo>
            &nbsp;in&nbsp;
            {article.tags.map((tag, index) => (
              <Fragment key={tag._id}>
                {index > 0 && ` | `}
                <Link
                  key={tag._id}
                  to={{
                    pathname: `/tag/${tag.name}`,
                    state: tag,
                  }}
                >
                  {tag.name}
                </Link>
              </Fragment>
            ))}
          </div>
          <Link
            to={{
              pathname: articlePathName,
              state: article._id,
            }}
          >
            <h4 className="card-title">{article.title}</h4>
          </Link>
        </header>
        <Link
          to={{
            pathname: articlePathName,
            state: article._id,
          }}
        >
          <img className="card-img" src={article.image} alt="" />
        </Link>
        <div className="card-body">
          <div className="card-text">
            <TextTruncate
              line={3}
              element="div"
              truncateText="…"
              text={htmlToText.fromString(article.description)}
              textTruncateChild={
                <Link
                  className="readMore"
                  to={{
                    pathname: articlePathName,
                    state: article._id,
                  }}
                >
                  Read More
                </Link>
              }
            />
          </div>
          <div className="mt-2">
            <Link
              to={{
                pathname: articlePathName,
                state: article._id,
                toCommentSection: true,
              }}
            >
              <CommentCount
                shortname="lifebookgoals"
                config={{
                  url: `${window.location.origin}${articlePathName}`,
                  identifier: `${window.location.origin}${articlePathName}`,
                  title: article.title,
                }}
              ></CommentCount>
            </Link>
          </div>
        </div>
      </article>
    );
  }
}

export default ArticleCard;
