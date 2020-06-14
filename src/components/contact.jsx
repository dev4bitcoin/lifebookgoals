import React from "react";

const Contact = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <article className="card mb-4">
            <header className="card-header text-center">
              <h1 className="card-title">Get in touch</h1>
            </header>
            <div className="card-body">
              <p>
                If you have have any question or want to get in touch me. Use
                the following:
              </p>
              <p>
                <strong>Email: </strong>
                <a
                  className="anchor-email-link"
                  href="mailto:lifebookgoals@gmail.com"
                >
                  lifebookgoals@gmail.com
                </a>
              </p>
              <p>
                If there is any difficulty using the website, please do let me
                know.
              </p>
              <p>Thank You!</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Contact;
