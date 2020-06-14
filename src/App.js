import React, { useState, useEffect, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar";
import Home from "./components/home";
import Subscribe from "./components/subscribe";
import Footer from "./components/footer";
import Contact from "./components/contact";
import Login from "./components/login";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import Article from "./components/article";
import TagManagement from "./components/tagManagement";
import ProtectedRoute from "./components/protectedRoute";
import PostArticle from "./components/postArticle";
import auth from "../src/services/authService";
import PostPreview from "./components/postPreview";
import Archives from "./components/archives";
import PostsByTag from "./components/postsByTag";
import Privacy from "./components/privacyPolicy";
import "../src/scss/lifebookgoals.scss";
import "react-toastify/dist/ReactToastify.css";
import "font-awesome/css/font-awesome.css";
import "./App.css";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <Fragment>
      <header>
        <NavBar user={user} />
      </header>
      <main className="container">
        <div className="route-links">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/notFound" component={NotFound} />
            <ProtectedRoute path="/tagManagement" component={TagManagement} />
            <ProtectedRoute
              path="/postPreview"
              render={(props) => <PostPreview {...props} user={user} />}
            />
            <ProtectedRoute
              path="/postArticle/:id"
              render={(props) => <PostArticle {...props} user={user} />}
            />
            <Route
              path="/article/:name"
              render={(props) => <Article {...props} user={user} />}
            />

            <Route path="/home" component={Home} />
            <Route
              path="/tag/:name"
              render={(props) => <PostsByTag {...props} user={user} />}
            />
            <Route path="/archives" component={Archives} />
            <Route path="/contact" component={Contact} />
            <Route path="/privacy" component={Privacy} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/notFound" />
          </Switch>
          <ToastContainer />
        </div>
      </main>
      <Subscribe />
      <footer className="site-footer bg-darkest">
        <Footer />
      </footer>
    </Fragment>
  );
}

export default App;
