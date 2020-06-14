import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";
import Select from "./select";
import RichText from "./richText";
import FileUploader from "../common/fileUploader";
import Checkbox from "./checkbox";
import MultiSelect from "./multiSelect";

class Form extends Component {
  state = {
    data: {},
    erros: {},
  };

  validate = () => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
    };

    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) {
      return null;
    }

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault(); // preventing the round trip to the server
    //const username = this.username.current.value;
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    this.doSubmit(this.state.data);

    //call the server and save the changes
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(name, label, classes) {
    return (
      <button
        name={name}
        disabled={this.validate()}
        className={`btn btn-primary ${classes}`}
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderCheckbox(name, label, type = "checkbox") {
    const { data, errors } = this.state;
    return (
      <Checkbox
        name={name}
        label={label}
        type={type}
        value={data[name]}
        checked={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, items) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        items={items || []}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderMultiSelect(name, label, items, displayValue) {
    const { data, errors } = this.state;
    return (
      <MultiSelect
        name={name}
        label={label}
        items={items || []}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        displayValue={displayValue}
      />
    );
  }

  renderRichText(name, label) {
    const { data, errors } = this.state;
    return (
      <RichText
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        hasRichTextData={data["hasRichTextData"]}
        onChange={this.handleChange}
      />
    );
  }

  renderFileUploader(name, label) {
    const { data, errors } = this.state;
    return (
      <FileUploader
        name={name}
        label={label}
        error={errors[name]}
        path={data[name]}
        data={data}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
