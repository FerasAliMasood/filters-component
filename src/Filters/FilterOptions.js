import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FiltersContext } from ".";
import { FilterToggleBtn } from "./Styles";
import { isEqual } from "./Utils";

const FilterOption = styled(FilterToggleBtn)`
   {
    font-size: 85%;
  }
`;

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;
const DropDownActoionBtns = styled(FilterOption)`
  z-index: 999;
`;
const FilterOptionsApplyBtn = styled(DropDownActoionBtns)`
  background-color: ${(props) => props.theme.palette.confirm.light};
  border-color: ${(props) => props.theme.palette.confirm.main};
`;

const DropDownCancele = styled(DropDownActoionBtns)`
  background-color: ${(props) => props.theme.palette.reject.light};
  border-color: ${(props) => props.theme.palette.reject.main};
`;

const FiltersOptionsActionsBtnWrapper = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function FilterOptions({
  filterName,
  options,
  appliedOptions,
  optionsWereApplied,
}) {
  const { theme, disabled, isMobile } = useContext(FiltersContext);
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    if (appliedOptions && !isEqual(appliedOptions, selectedOptions)) {
      setSelectedOptions(appliedOptions);
    }
  }, [appliedOptions]);

  const optionWasClicked = (id) => {
    if (disabled) return;
    let tmp = [...selectedOptions];
    if (tmp.indexOf(id) > -1) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }
    setSelectedOptions(tmp);
  };
  const apply = () => {
    if (disabled) return;
    if (optionsWereApplied) {
      optionsWereApplied(filterName, selectedOptions);
    }
  };
  const cancel = () => {
    setSelectedOptions(appliedOptions || []);
  };
  return (
    <React.Fragment>
      <OptionsWrapper className="filter-options-wrapper">
        {options?.map((option) => (
          <FilterOption
            key={`option-${filterName}-${option.id}`}
            theme={theme}
            style={
              selectedOptions.indexOf(option.id) > -1
                ? { borderColor: theme.palette.highLight.main }
                : null
            }
            onClick={() => optionWasClicked(option.id)}
          >
            {option.title}
          </FilterOption>
        ))}
      </OptionsWrapper>
      <FiltersOptionsActionsBtnWrapper className="filters-options-actions-btns-wrapper">
        <div className="filter-options-btn-container filter-options-cancel-btn-container">
          {
            <DropDownCancele
              theme={theme}
              isMobile={isMobile}
              disabled={disabled}
              className="filter-options-btn filter-options-cancel-btn"
              onClick={cancel}
            >
              Cancel
            </DropDownCancele>
          }
        </div>
        <div className="filter-dropdown-btn-options filter-dropdown-apply-btn-options">
          {
            <FilterOptionsApplyBtn
              theme={theme}
              isMobile={isMobile}
              disabled={disabled}
              className="filter-options-btn filter-options-apply-btn"
              onClick={apply}
            >
              Apply
            </FilterOptionsApplyBtn>
          }
        </div>
      </FiltersOptionsActionsBtnWrapper>
    </React.Fragment>
  );
}

export default FilterOptions;
