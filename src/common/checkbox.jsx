import React, { Component } from "react";

class Checkbox extends Component {
  handleChange = ({ target: input }) => {
    this.props.onChange({
      currentTarget: {
        name: this.props.name,
        value: input.checked,
      },
    });
  };

  render() {
    const { name, label, error, ...rest } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          autoFocus
          {...rest}
          name={name}
          id={name}
          className="inputCheckbox"
          onChange={this.handleChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Checkbox;
