import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { DiscussionEmbed } from "disqus-react";
import TimeAgo from "timeago-react";
import ReactHtmlParser from "react-html-parser";
import { getArticle } from "../services/articleService";
import Tags from "./tags";
import PopularStories from "./popularStories";
import RelatedArticles from "./relatedArticles";

class Article extends Component {
  state = { article: {}, nextArticle: {}, previousArticle: {}, dummyText: "" };

  componentDidMount() {
    //this.populateArticle();
  }
  setCommentAreaRef = (element) => {
    this.toCommentArea = element;
    this.scrollToBottom();
  };

  populateArticle() {
    window.scrollTo(0, 0);
    getArticle(this.props.location.state)
      .then((result) => {
        this.setState({
          article: result.data.currentArticle,
          nextArticle: result.data.nextArticle,
          previousArticle: result.data.previousArticle,
        });
      })
      .catch((ex) => {
        if (ex.response && ex.response.status === 404) {
          this.props.history.replace("/notFound");
        }
      });
  }

  navigateToNextPost = () => {
    const article = this.state.nextArticle;
    const articlePathName = `/article/${article.title.replace(/ /g, "-")}`;
    this.props.location.state = article._id;
    this.props.history.push({
      pathname: articlePathName,
      state: article._id,
    });
  };
  navigateToPrevioustPost = () => {
    const article = this.state.previousArticle;
    const articlePathName = `/article/${article.title.replace(/ /g, "-")}`;
    this.props.location.state = article._id;
    this.props.history.push({
      pathname: articlePathName,
      state: article._id,
    });
  };

  scrollToBottom = () => {
    if (this.toCommentArea && this.props.location.toCommentSection) {
      this.toCommentArea.scrollIntoView({ behavior: "smooth" });
    }
  };

  render() {
    const { article, nextArticle, previousArticle } = this.state;
    if (
      !article ||
      !article.title ||
      article._id !== this.props.location.state
    ) {
      this.populateArticle();
      return <div key={new Date().getTime()}></div>;
    }

    const { title } = article;

    const articlePathName = `/article/${article.title.replace(/ /g, "-")}`;

    return (
      <Fragment>
        <div className="row">
          <div className="col-md-9">
            <article className="card mb-4">
              <header className="card-header text-center">
                <div className="card-meta">
                  <TimeAgo className="timeago" datetime={article.postingDate} />
                  &nbsp; in &nbsp;
                  {article.tags.map((tag, index) => (
                    <div className="d-inline-block" key={tag._id}>
                      {index > 0 && ` | `}
                      <Link
                        key={tag._id}
                        to={{
                          pathname: `/tag/${tag.name.replace(/ /g, "-")}`,
                          state: tag,
                        }}
                      >
                        {tag.name}
                      </Link>
                    </div>
                  ))}
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

            {(previousArticle || nextArticle) && (
              <div className="d-flex mt-3 mb-3 p-2 alert-secondary border border-secondary">
                <div className="w-50">
                  {previousArticle && (
                    <Fragment>
                      <i className="mr-2 fas fa-angle-left"></i>
                      <Link
                        to={{
                          pathname: `/article/${previousArticle.title.replace(
                            / /g,
                            "-"
                          )}`,
                          state: previousArticle._id,
                        }}
                        className="text-dark font-weight-bold"
                      >
                        Previous Post
                      </Link>
                    </Fragment>
                  )}
                </div>

                <div className="w-50 text-right">
                  {nextArticle && (
                    <Fragment>
                      <Link
                        to={{
                          pathname: `/article/${nextArticle.title.replace(
                            / /g,
                            "-"
                          )}`,
                          state: nextArticle._id,
                        }}
                        className="text-dark font-weight-bold"
                      >
                        Next Post
                      </Link>
                      <i className="mr-2 fas fa-fw fa-angle-right"></i>
                    </Fragment>
                  )}
                </div>
              </div>
            )}
            {article.relatedArticles && article.relatedArticles.length !== 0 && (
              <div className="mt-4">
                <h3>Recommended Posts</h3>
                <RelatedArticles article={article} />
              </div>
            )}
            <div className="mt-3" ref={this.setCommentAreaRef}>
              <h3>Comments</h3>

              <DiscussionEmbed
                shortname="lifebookgoals"
                config={{
                  url: `${window.location.origin}${articlePathName}`,
                  identifier: `${window.location.origin}${articlePathName}`,
                  title: { title },
                }}
              />
            </div>
          </div>
          <div className="col-md-3 ml-auto">
            <aside className="sidebar sidebar-sticky">
              <Tags props={this.props} />
              <PopularStories />
            </aside>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Article;
