Filters component
filters component dispalays a list of filters, that view a list of options for each when toggled, and allows you to pick multiple options from multiple filters

props :
  filtersOptions: (`object`) The filters and the options the componet can view, orgnized in JS object with filter names as keys and the values is an array of objects that contain the id and title for each option [required]
  appliedFiltersWereUpdated: (`func`) A callback function that is called when the applier filters and theier option are updated, it has only one parameter which is the applied options in the same structure as `filtersOptions` [optional]
  disabled : (`boolean`) a boolean disables the component if true, default value `false` [optional]
  width: (`string`) the width of the component using same css values and units, default value `100%` [optional]
  className: (`string`) classname to be addded to the root element in the component to make styling easier [optional]
  theme: (`object`) and object that contain the basic variables used to style the component [optional]

  defualt theme: 
{ 
     palette: {
    primary: {
      main: "rgba(40, 40, 40,1)",
      light: "rgba(50, 50, 50,1)",
      dark: "rgba(30, 30, 30,1)",
    },
    secondary: {
      main: "rgba(06, 06, 06, 1)",
      light: "rgba(08, 08, 08, 1)",
      dark: "rgba(05, 05, 05, 1)",
    },
    highLight: {
      main: "#f00",
      light: "#ff0000aa",
    },
    confirm: {
      main: "#0f0",
      light: "#00ff00aa",
    },

    reject: {
      main: "#0000ff",
      light: "#0000ffaa",
    },
    text: {
      main: "#eee",
      light: "#fff",
      dark: "#ccc",
    },
  },
  border: {
    size: "1px",
    style: "solid",
    color: {
      main: "#eee",
      light: "#fff",
      dark: "#ccc",
    },
  },
  typography: {
    fontFamily: ["Helvetica Neue", "Arial", "sans-serif"],
    fontStyle: "normal",
    fontSize: "14px",
  },
  spacing: {
    factor: "5",
    unit: "px",
  },
  menuHeight: "70px",
};
}