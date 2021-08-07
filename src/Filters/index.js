import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import FilterDropdown from "./FilterDropdown";
import AppliedFilterViewer from "./AppliedFilterViewer";
import { mergeThemes } from "./Utils";
import { defaultTeheme } from "./Theme";
import FilterOptions from "./FilterOptions";
import { FiltersWrapper, FilterToggleBtn } from "./Styles";

export const FiltersContext = React.createContext();

function Filters({
  filtersOptions,
  appliedFiltersWereUpdated,
  disabled = false,
  width = "",
  theme = {},
  className = "",
  ref=null,
  ...rest
}) {
  const [isMoreOptionsShown, setIsMoreOptionsShow] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [openedFilter, setOpenedFilter] = useState();
  const [componentWidth, setComponentWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [dropdownPosition, setDropdownPoisiton] = useState({});
  const mainDevRef = useRef();
  const dropdownWidth = 400;
  const combinedTheme = mergeThemes(defaultTeheme, theme);

  useEffect(() => {
    if (appliedFiltersWereUpdated) {
      appliedFiltersWereUpdated(appliedFilters);
    }
  }, [appliedFilters]);

  useEffect(() => {
    const trackElementResize = (e) => {
      setComponentWidth(mainDevRef.current.offsetWidth);
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    trackElementResize();
    window.addEventListener("resize", trackElementResize);
    return () => {
      window.removeEventListener("resize", trackElementResize);
    };
  });

  const filters = Object.keys(filtersOptions);

  const handleFilterToggle = (filterName, position, width) => {
    if (disabled) return;
    setOpenedFilter((currentFilter) =>
      currentFilter !== filterName ? filterName : null
    );
    setIsMoreOptionsShow(false);
    setDropdownPoisiton(
      componentWidth - position > dropdownWidth
        ? { left: `${position}px` }
        : { right: `${componentWidth - position - width}px` }
    );
  };
  const clearAllFilters = () => {
    setAppliedFilters({});
  };
  const removeAppliedFilter = (id, filter) => {
    if (disabled) return;
    let tmp = { ...appliedFilters };
    if (!tmp.hasOwnProperty(filter)) return;
    if (tmp[filter].indexOf(id) > -1) {
      tmp[filter].splice(tmp[filter].indexOf(id), 1);
      if (tmp[filter].length === 0) delete tmp[filter];
      setAppliedFilters(tmp);
    }
  };
  let context = {
    disabled,
    width,
    theme: combinedTheme,
    componentWidth,
    isMobile,
    dropdownPosition,
    windowWidth,
  };
  const renderMobileMenu = () => {
    return (
      <React.Fragment>
        {filters.slice(0, 2).map((filter, index) => (
          <FilterToggleBtn
            theme={combinedTheme}
            isMobile={isMobile}
            data-testid={`filter-toggle-btn-${filter}`}
            disabled={disabled}
            key={`filter-${filter}-${index}`}
            className={"filter-toggle-btn"}
            style={
              openedFilter === filter
                ? { borderColor: combinedTheme?.palette?.highLight.main }
                : {}
            }
            onClick={(e) => {
              handleFilterToggle(
                filter,
                e.target.offsetLeft,
                e.target.offsetWidth
              );
            }}
          >
            {`${filter}${
              !openedFilter === filter && appliedFilters[filter].length
                ? ` (${appliedFilters[filter].length})`
                : ``
            }`}
          </FilterToggleBtn>
        ))}
        <FilterToggleBtn
          theme={combinedTheme}
          isMobile={isMobile}
          disabled={disabled}
          onClick={() => {
            setIsMoreOptionsShow((currentValue) => !currentValue);
            setOpenedFilter(false);
          }}
          style={
            isMoreOptionsShown
              ? { borderColor: combinedTheme?.palette?.highLight.main }
              : {}
          }
        >
          More filters
        </FilterToggleBtn>
      </React.Fragment>
    );
  };

  const renderDesktopMenu = () => {
    return (
      <React.Fragment>
        {filters.map((filter, index) => (
          <FilterToggleBtn
            theme={combinedTheme}
            isMobile={isMobile}
            disabled={disabled}
            key={`filter-${filter}-${index}`}
            className={"filter-toggle-btn"}
            style={
              openedFilter === filter
                ? { borderColor: combinedTheme?.palette?.highLight.main }
                : {}
            }
            onClick={(e) => {
              handleFilterToggle(
                filter,
                e.target.offsetLeft,
                e.target.offsetWidth
              );
            }}
          >
            {`${filter}${
              filter !== openedFilter && appliedFilters[filter]?.length > 0
                ? ` (${appliedFilters[filter].length})`
                : ``
            }`}
          </FilterToggleBtn>
        ))}
      </React.Fragment>
    );
  };
  const applyFilters = (filter, options) => {
    let tmp = { ...appliedFilters };
    if (options?.length) {
      tmp[filter] = options;
    } else {
      if (tmp[filter]) {
        delete tmp[filter];
      }
    }
    setAppliedFilters(tmp);
    if (!isMobile) {
      setOpenedFilter(null);
    }
  };

  const renderOtherFilters = () => {
    if (!isMobile) return;
    const accordionStyle = {
      background: combinedTheme?.palette?.secondary?.main,
      color: combinedTheme?.palette.text?.main,
      fontSize: combinedTheme?.typography?.fontSize,
      fontFamily: Array.isArray(combinedTheme?.typography?.fontFamily)
        ? combinedTheme?.typography?.fontFamily.join(",")
        : combinedTheme?.typography?.fontFamily,
      widht: "100%",
      textTransform: "capitalize",
    };
    const accordionItemStyle = {
      padding: `calc(${combinedTheme?.spacing?.factor}*2${combinedTheme.spacing?.unit}) calc(${combinedTheme?.spacing?.factor}*1${combinedTheme.spacing?.unit})`,
      borderBottom: `${combinedTheme?.border?.size} ${combinedTheme?.border?.style} ${combinedTheme?.border?.color?.light}`,
      cursor: "pointer",
    };
    console.log();
    return (
      <FilterDropdown>
        <Accordion style={accordionStyle}>
          {filters.slice(2).map((filter) => (
            <AccordionItem
              style={accordionItemStyle}
              uuid={`${filter}-accordion-item`}
              key={`filter-accordion-item-${filter}`}
            >
              <AccordionItemHeading>
                <AccordionItemButton>{filter}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel style={{ padding: "10px 0px" }}>
                <FilterOptions
                  filterName={filter}
                  appliedOptions={appliedFilters[filter]}
                  optionsWereApplied={applyFilters}
                  options={filtersOptions[filter]}
                />
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </FilterDropdown>
    );
  };
  return (
    <React.Fragment>
      <FiltersContext.Provider value={context}>
        <FiltersWrapper
          ref={mainDevRef}
          theme={combinedTheme}
          isMobile={isMobile}
          disabled={disabled}
          className={`root ${className}`}
          {...rest}
        >
          {!isMobile ? renderDesktopMenu() : renderMobileMenu()}
          {openedFilter && (
            <FilterDropdown>
              <FilterOptions
                filterName={openedFilter}
                optionsWereApplied={applyFilters}
                appliedOptions={appliedFilters[openedFilter]}
                options={filtersOptions[openedFilter]}
              />
            </FilterDropdown>
          )}
          {isMoreOptionsShown && renderOtherFilters()}
        </FiltersWrapper>
        {
          <AppliedFilterViewer
            filtersOptions={filtersOptions}
            clearAllFilters={clearAllFilters}
            appliedFilters={appliedFilters}
            removeAppliedFilter={removeAppliedFilter}
          />
        }
      </FiltersContext.Provider>
    </React.Fragment>
  );
}
Filters.propTypes = {
  filtersOptions: PropTypes.object,
  appliedFiltersWereUpdated: PropTypes.func,
  disabled: PropTypes.bool,
  width: PropTypes.string,
  theme: PropTypes.object,
  className: PropTypes.string,
};

export default Filters;
