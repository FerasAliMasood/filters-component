import styled from 'styled-components';

export const FiltersWrapper = styled.div `
padding: calc(${(props)=>props.theme?.spacing?.factor}*1${(props)=>props.theme?.spacing?.unit});
background: ${(props)=>props.disabled ? props.theme?.palette?.secondary?.main : props.theme?.palette?.secondary?.light};
display: flex;
justify-content: ${(props)=>props.isMobile ? 'stretch' : 'flex-start'};
border-top: ${(props)=>props.theme?.border?.size} ${(props)=>props.theme?.border?.style} ${(props)=>props.theme?.border?.color?.light};
border-bottom: ${(props)=>props.theme?.border?.size} ${(props)=>props.theme?.border?.style}  ${(props)=>props.theme?.border?.color?.light};
width: ${(props)=>props.width ?? 'auto'};
font-family: ${(Array.isArray((props)=>props.theme?.typography?.fontFamily)) ? (props)=>props.theme?.typography?.fontFamily.join(',') : (props)=>props.theme?.typography?.fontFamily};
font-size: ${(props)=>props.theme?.typography?.fontSize};
font-style: ${(props)=>props.theme?.typography?.fontStyle};
`
export const FilterToggleBtn = styled.button`
padding: calc(${(props)=>props.theme?.spacing?.factor} * 1${(props)=>props.theme?.spacing?.unit});
border: ${(props)=>props.theme?.border?.size} ${(props)=>props.theme?.border?.style} ${(props)=>props.theme?.border?.color?.main};
background: ${(props)=>props.disabled ? props.theme?.palette?.primary?.light: props.theme?.palette?.primary?.main};
font-size: 100%;
text-transform: capitalize;
color: ${(props)=>props.theme?.palette?.text?.main};
margin: calc(${(props)=>props.theme?.spacing?.factor} * 2${(props)=>props.theme?.spacing?.unit});
min-width: 100px;
justify-content: center;
align-items: center;
flex:${(props)=>props.isMobile ? 1 : 0};
`;


export const ClearAllBtn = styled(FilterToggleBtn)`
  height: 35px;
  color: ${(props) => props.theme?.palette?.highLight?.main};
  box-sizing: border-box;
  margin: calc(${(props) => props.theme?.spacing?.factor} * 1${(props) => props.theme?.spacing?.unit});
`;
export const AppliedFilterWrapper = styled.div`
  display: inline-block;
`;

export const ChipWrapper = styled.span`
  display: inline-block;
  padding: calc(${(props) => props.theme?.spacing?.factor} * 1${(props) => props.theme?.spacing?.unit});
  border: ${(props) => props.theme?.border?.size}
    ${(props) => props.theme?.border?.style}
    ${(props) => props.theme?.border?.color?.main};
  background: ${(props) =>
    props.disabled
      ? props.theme?.palette?.primary?.light
      : props.theme?.palette?.primary?.main};
  font-size: 100%;
  text-transform: capitalize;
  color: ${(props) => props.theme?.palette?.text?.main};
  margin: calc(${(props) => props.theme?.spacing?.factor} * 1${(props) => props.theme?.spacing?.unit}
  );
  height: 35px;
  box-sizing: border-box;
`;
export const ChipContent = styled.div`
  display: inline-block;
`;

export const CloseBtn = styled.button`
  border: none;
  background: rgba(0, 0, 0, 0);
  color: #eee;
  align-items: center;
  margin: 0px
    calc(${(props) => props.theme?.spacing?.factor} * 1${(props) => props.theme?.spacing?.unit});
`;


export const Dropdown = styled.div`
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: calc(${(props) => props.theme.menuHeight});
  border: ${(props) => props.theme.border.size}
    ${(props) => props.theme.border.style}
    ${(props) => props.theme.border.color.main};
  background: ${(props) => props.theme.palette.secondary.main};
  padding: calc(${(props) => props.theme.spacing.factor}*4${(props) => props.theme.spacing.unit});
  box-sizing: border-box;
  ${(props) => (!props.isMobile ? props.dropdownPosition : "left: 10px;")}
  ${(props) => props.isMobile && "  width: calc(100% - 20px);"}
`;
