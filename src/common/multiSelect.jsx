import React, { Component, Fragment } from "react";
import { Multiselect } from "multiselect-react-dropdown";

class MultiSelect extends Component {
  state = {};
  onSelect = (selectedList, selectedItem) => {
    this.props.onChange({
      currentTarget: {
        name: this.props.name,
        value: selectedList,
      },
    });
  };

  onRemove = (selectedList, removedItem) => {
    this.props.onChange({
      currentTarget: {
        name: this.props.name,
        value: selectedList.length === 0 ? null : selectedList,
      },
    });
  };

  render() {
    const { name, label, value, items, error, displayValue } = this.props;
    return (
      <Fragment>
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <Multiselect
            name={name}
            id={name}
            options={items} // Options to display in the dropdown
            selectedValues={value || []} // Preselected value to persist in dropdown
            onSelect={this.onSelect} // Function will trigger on select event
            onRemove={this.onRemove} // Function will trigger on remove event
            displayValue={displayValue} // Property name to display in the dropdown options
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
      </Fragment>
    );
  }
}

export default MultiSelect;
