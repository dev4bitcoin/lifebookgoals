import React, { Fragment, Component } from "react";
import Pagination from "react-js-pagination";
import PopularStories from "./popularStories";
import { getArticles, getFeaturedArticles } from "../services/articleService";
import ArticleCard from "../components/articleCard";
import Tags from "./tags";
import FeaturedArticles from "./featuredArticles";

class Home extends Component {
  state = {
    articles: [],
    featuredArticles: [],
    currentPage: 1,
    pageSize: 6,
    totalCount: 0,
    showPaging: false,
  };

  async componentDidMount() {
    this.scrollToTop();
    const result = await getArticles(
      this.state.currentPage,
      this.state.pageSize
    );

    const { articles, totalCount } = result.data;

    const { data: featuredArticles } = await getFeaturedArticles();

    this.setState({
      articles: articles,
      featuredArticles: featuredArticles,
      totalCount: totalCount,
      showPaging: totalCount > 6 ? true : false,
    });
  }

  handlePageChange = async (page) => {
    this.scrollToTop();
    this.setState({ currentPage: page });
    const result = await getArticles(page, this.state.pageSize);

    const { articles } = result.data;

    this.setState({ articles });
  };

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  render() {
    const {
      featuredArticles,
      currentPage,
      pageSize,
      totalCount,
      articles,
      showPaging,
    } = this.state;

    return (
      <Fragment>
        <main className="main pt-4">
          <FeaturedArticles articles={featuredArticles} />
          <div className="container">
            {featuredArticles.length > 0 && <hr></hr>}
            <div className="row">
              <div className="col-md-9">
                <div className="row article-home-height">
                  {articles.length !== 0 && (
                    <Fragment>
                      {articles.map((article) => (
                        <div key={article._id} className="col-md-6">
                          <ArticleCard
                            key={article._id}
                            article={article}
                            props={this.props}
                          />
                        </div>
                      ))}
                    </Fragment>
                  )}
                  <Fragment>
                    {articles.length === 0 && (
                      <div className="w-100 text-center">
                        There are no articles posted yet!
                      </div>
                    )}
                  </Fragment>
                </div>
                <div className="d-flex justify-content-center">
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
              </div>
              <div className="col-md-3 ml-auto">
                <aside className="sidebar sidebar-sticky">
                  <Tags props={this.props} />
                  <PopularStories />
                </aside>
              </div>
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
}

export default Home;
