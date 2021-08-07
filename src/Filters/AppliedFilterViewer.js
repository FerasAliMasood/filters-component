import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ChipWrapper, ChipContent, CloseBtn, AppliedFilterWrapper, ClearAllBtn} from "./Styles";
import { FiltersContext } from ".";
import { getOptionTitle } from "./Utils";

function AppliedFilterViewer({
  appliedFilters,
  removeAppliedFilter,
  clearAllFilters,
  filtersOptions,
}) {
  const { theme, disabled } = useContext(FiltersContext);
  const renderAppliedFilters = () => {
    return (
      <React.Fragment>
        {Object.keys(appliedFilters).map((filter) =>
          appliedFilters[filter].map((option) => (
            <ChipWrapper
              theme={theme}
              disabled={disabled}
              key={`chip-${filter}-${option}`}
            >
              <ChipContent theme={theme}>
                {getOptionTitle(filter, option, filtersOptions)}
              </ChipContent>
              <CloseBtn
                theme={theme}
                onClick={() => removeAppliedFilter(option, filter)}
              >
                X
              </CloseBtn>
            </ChipWrapper>
          ))
        )}
      </React.Fragment>
    );
  };
  return (
    <AppliedFilterWrapper>
      <span>Applied filters:</span>
      {Object.keys(appliedFilters).length ? (
        <React.Fragment>
          {renderAppliedFilters()}
          <ClearAllBtn onClick={clearAllFilters} theme={theme}>
            Clear all
          </ClearAllBtn>
        </React.Fragment>
      ) : (
        <span>--None--</span>
      )}
    </AppliedFilterWrapper>
  );
}
AppliedFilterViewer.propTypes = {
  appliedFilters: PropTypes.object,
  removeAppliedFilter: PropTypes.func,
};

export default AppliedFilterViewer;
