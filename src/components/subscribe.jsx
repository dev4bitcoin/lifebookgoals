import React, { Component } from "react";
import Joi from "joi-browser";
import { subscribe } from "../services/subscriberService";

class Subscribe extends Component {
  state = { email: null, message: "", isSubscribed: false };

  schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Email Address"),
  });

  handleSubmit = async () => {
    try {
      const isValid = this.validate();
      if (!isValid) {
        const message = "Valid email is required";
        this.setState({ isSubscribed: false, message: message });
        return;
      }
      await subscribe({ email: this.state.email });
      const message =
        "Thanks for subscribing! Please Check your inbox to confirm that you opted in for this list.";
      this.setState({ isSubscribed: true, message: message });
    } catch (ex) {
      console.log(ex);
      const message = "The given email is already subscibed to the newsletter.";
      this.setState({ isSubscribed: false, message: message });
    }
  };

  validate = () => {
    const { error } = this.schema.validate({ email: this.state.email });
    if (error) {
      return false;
    }
    return true;
  };

  handleChange = ({ currentTarget: input }) => {
    this.setState({ email: input.value });
  };

  render() {
    const { email, isSubscribed, message } = this.state;
    return (
      <div className="site-newsletter">
        <div className="container">
          <div className="text-center">
            <h3 className="h4 mb-2">Subscribe to our newsletter</h3>
            <p className="text-muted">
              Join our monthly newsletter and never miss out on new stories and
              promotions.
            </p>
            <div
              className={`col-xs-12 col-sm-9 col-md-7 col-lg-5 ml-auto mr-auto p-2 ${
                message ? "email-message-border" : ""
              } `}
            >
              {message}
            </div>
            {!isSubscribed && (
              <div className="row">
                <div className="col-xs-12 col-sm-9 col-md-7 col-lg-5 ml-auto mr-auto">
                  <div className="input-group mt-3">
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      className="form-control"
                      placeholder="Email address"
                      aria-label="Email address"
                    ></input>

                    <span className="input-group-btn">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => this.handleSubmit()}
                      >
                        Subscribe
                      </button>
                    </span>
                  </div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Subscribe;
