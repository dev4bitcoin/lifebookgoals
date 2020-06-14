import React from "react";

const Privacy = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <article className="card mb-4">
            <header className="card-header text-center">
              <h1 className="card-title">Privacy Policy</h1>
            </header>
            <div className="card-body">
              <p>
                <h2>Who We are</h2>
              </p>
              <p> Our website address is: https://www.lifebookgoals.com.</p>
              <p>
                <h2>What personal data we collect?</h2>
              </p>
              <p>
                We dont collect any personal information except when you
                subscibe to our news letter. We only keep the email address
                which you subscribed to notify you when new article is posted.
              </p>
              <p>
                <h2>Embedded content from other websites</h2>
              </p>
              <p>
                These websites may collect data about you, use cookies, embed
                additional third-party tracking, and monitor your interaction
                with that embedded content, including tracing your interaction
                with the embedded content if you have an account and are logged
                in to that website.
              </p>
              <p>
                <h2>Do we disclose any information to outside parties?</h2>
              </p>
              <p>
                We do not sell, trade, or otherwise transfer to outside parties
                your personally identifiable information.
              </p>
              <p>
                <h2>Your Consent</h2>
              </p>
              <p>
                By using our site, you consent to our websites privacy policy.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
