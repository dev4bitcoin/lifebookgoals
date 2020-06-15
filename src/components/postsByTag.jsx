import React, { Component, Fragment } from "react";
import Pagination from "react-js-pagination";
import ArticleCard from "./articleCard";
import { getArticlesByTag } from "../services/articleService";
import Tags from "./tags";
import PopularStories from "./popularStories";

class PostsByTag extends Component {
  state = {
    articles: [],
    currentPage: 1,
    pageSize: 6,
    totalCount: 0,
    showPaging: false,
  };

  componentWillMount() {
    this.scrollToTop();
    this.populateArticle();
  }

  handlePageChange = async (page) => {
    this.scrollToTop();
    this.setState({ currentPage: page });
    const result = await getArticlesByTag(
      this.props.location.state._id,
      page,
      this.state.pageSize
    );

    const { articles } = result.data;

    this.setState({ articles, showPaging: articles.length > 6 ? true : false });
  };

  async populateArticle() {
    if (
      !this.props ||
      !this.props.location ||
      !this.props.location.state ||
      !this.props.location.state._id
    ) {
      return;
    }

    const result = await getArticlesByTag(
      this.props.location.state._id,
      this.state.currentPage,
      this.state.pageSize
    );

    const { articles, totalCount } = result.data;

    this.setState({ articles, totalCount });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  handleTagsClick = async (tag) => {
    if (!tag || !tag._id) {
      return;
    }
    const result = await getArticlesByTag(
      tag._id,
      this.state.currentPage,
      this.state.pageSize
    );

    const { articles, totalCount } = result.data;

    this.setState({ articles, totalCount });
  };

  render() {
    const {
      currentPage,
      pageSize,
      totalCount,
      articles,
      showPaging,
    } = this.state;
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              {articles.length !== 0 && (
                <Fragment>
                  <div className="row article-home-height">
                    {articles.map((article) => (
                      <div key={article._id} className="col-md-6">
                        <ArticleCard
                          key={article._id}
                          article={article}
                          props={this.props}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 mb-3 d-flex justify-content-center">
                    {articles.length !== 0 && showPaging && (
                      <Pagination
                        firstPageText={
                          <i className="align-middle mr-2 fas fa-angle-double-left"></i>
                        }
                        lastPageText={
                          <i className="align-middle mr-2 fas fa-angle-double-right"></i>
                        }
                        prevPageText={
                          <i className="align-middle mr-2 fas fa-angle-left"></i>
                        }
                        nextPageText={
                          <i className="align-middle mr-2 fas fa-angle-right"></i>
                        }
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={currentPage}
                        itemsCountPerPage={pageSize}
                        totalItemsCount={totalCount}
                        onChange={this.handlePageChange}
                      />
                    )}
                  </div>
                </Fragment>
              )}
            </div>
            <Fragment>
              {articles.length === 0 && (
                <div className="w-100 mt-3 text-center">
                  There are no articles posted yet!
                </div>
              )}
            </Fragment>

            <div className="col-md-3 ml-auto">
              <aside className="sidebar sidebar-sticky">
                <Tags props={this.props} onTagsClick={this.handleTagsClick} />
                <PopularStories />
              </aside>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PostsByTag;
