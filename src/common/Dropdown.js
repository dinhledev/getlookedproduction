// Import Node Modules
import React, { Component, Fragment } from "react";

class Select extends Component {
  render() {
    const {value, handleChange, data } = this.props;
    return (
      <Fragment>
        <label>
          <select value={value} onChange={handleChange}>
            {data.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </Fragment>
    );
  }
}

export default Select;
