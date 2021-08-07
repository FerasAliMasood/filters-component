import React, { useContext } from "react";
import { FiltersContext } from ".";
import {Dropdown} from './Styles'

function FilterDropdown({ children }) {
  const { dropdownPosition, theme, disabled, isMobile } =
    useContext(FiltersContext);

  return (
    <Dropdown
      theme={theme}
      isMobile={isMobile}
      dropdownPosition={dropdownPosition}
      disabled={disabled}
      className="filter-dropdown-container"
    >
      {children}
    </Dropdown>
  );
}

export default FilterDropdown;
