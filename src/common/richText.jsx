import React, { Component } from "react";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

class RichText extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    isInitialized: false,
  };
  onEditorStateChange = (editorState) => {
    const value = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    ).toString();
    this.props.onChange({
      currentTarget: {
        name: this.props.name,
        value: value === "<p></p>\n" ? "" : value,
      },
    });
    this.setState({
      editorState,
    });
  };

  convertHtmlToEditorContent(value) {
    if (!value) {
      return;
    }
    const contentBlock = htmlToDraft(value);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }
  }

  render() {
    const { name, label, value, error, hasRichTextData } = this.props;
    const { isInitialized, editorState } = this.state;

    if (hasRichTextData === true && !isInitialized) {
      this.setState({
        isInitialized: true,
        editorState: this.convertHtmlToEditorContent(value),
      });
    }
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <Editor
          editorState={editorState}
          name={name}
          id={name}
          value={value}
          wrapperClassName="rich-text-wrapper"
          editorClassName="rich-text-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default RichText;
