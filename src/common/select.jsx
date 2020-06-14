import React from "react";

const Select = ({ name, label, items, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="dropdown">
        <select
          className="selectpicker"
          data-live-search="true"
          name={name}
          id={name}
          {...rest}
        >
          {items.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
