import React, { Component } from "react";

class FileUploader extends Component {
  handleFileUploadChange = (event) => {
    const files = event.currentTarget.files;
    if (files.length === 0) {
      return;
    }

    this.convertImageToBase64(files[0]);
    this.props.onChange({
      currentTarget: {
        name: this.props.name,
        value: files[0].name,
      },
    });
  };

  convertImageToBase64(file) {
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (this.props.data.hasOwnProperty("image")) {
        this.props.data["image"] = reader.result;
      }
    };
  }

  render() {
    const { name, imageName, label, path, error, ...rest } = this.props;
    return (
      <div className="form-group mb-3 w-50">
        <label htmlFor={name}>{label}</label>
        <div className="custom-file">
          <input
            type="file"
            {...rest}
            className="custom-file-input"
            id={name}
            name={name}
            accept="image/*"
            aria-describedby={name}
            multiple={false}
            onChange={this.handleFileUploadChange}
          ></input>
          <label className="custom-file-label" htmlFor={name}>
            {path}
          </label>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default FileUploader;
