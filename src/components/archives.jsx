import React, { Component } from "react";
import ArchivesTable from "./archivesTable";
import { toast } from "react-toastify";
import { getArticleArchives, deleteArticle } from "../services/articleService";

class Archives extends Component {
  state = { articles: [] };

  async componentDidMount() {
    const result = await getArticleArchives();
    const { articles } = result.data;
    this.setState({ articles });
  }

  onHandleDelete = async (id) => {
    const originalArticles = this.state.articles;
    const articles = originalArticles.filter((m) => m._id !== id);
    this.setState({ articles });

    try {
      await deleteArticle(id);
      toast.success("The article deleted successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This post has already been deleted");
      } else {
        this.setState({ articles: originalArticles });
      }
    }
  };

  render() {
    const { articles } = this.state;
    return (
      <div className="d-flex justify-content-center">
        <div className="w-75 align-self-center">
          <h1>Archives</h1>
          <div>
            <ArchivesTable articles={articles} onDelete={this.onHandleDelete} />
          </div>
        </div>
      </div>
    );
  }
}

export default Archives;
