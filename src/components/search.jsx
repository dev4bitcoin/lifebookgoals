import React, { Component, Fragment } from "react";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import { getSearchSuggestions } from "../services/articleService";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    value: "",
    suggestions: [],
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await this.getSuggestions(value);
    this.setState({
      suggestions,
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = async (value) => {
    const inputValue = value.trim().toLowerCase();

    const { data: suggestions } = await getSearchSuggestions(inputValue);
    return suggestions.length === 0 ? [] : suggestions;
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => suggestion.title;

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion, { query }) => {
    const matches = AutosuggestHighlightMatch(suggestion.title, query);
    const parts = AutosuggestHighlightParse(suggestion.title, matches);
    return (
      <span className={"suggestion-content"}>
        <Link
          to={{
            pathname: `/article/${suggestion.title.replace(/ /g, "-")}`,
            state: suggestion._id,
          }}
        >
          <img
            className="card-img react-autosuggest-image-size"
            src={suggestion.image}
            alt=""
          />
        </Link>

        <Link
          className="react-autosuggest-name-size"
          to={{
            pathname: `/article/${suggestion.title.replace(/ /g, "-")}`,
            state: suggestion._id,
          }}
        >
          <span>
            {parts.map((part, index) => {
              const className = part.highlight ? "highlight" : null;
              return (
                <Fragment key={part.text}>
                  <span className={className} key={index}>
                    {part.text}
                  </span>
                </Fragment>
              );
            })}
          </span>
        </Link>
      </span>
    );
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search..",
      value,
      onChange: this.onChange,
      className: "search js-search form-control form-control-rounded mr-sm-2",
    };
    return (
      <Autosuggest
        id="articleSearch"
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default Search;
