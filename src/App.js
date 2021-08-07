import "./App.css";
import Filters from "./Filters";
import {filtersOptions} from './FiltersData';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Filters
          filtersOptions={filtersOptions}
          appliedFiltersWereUpdated={(appliedFilters) => {
            console.log(appliedFilters);
          }}
        />
      </header>
    </div>
  );
}

export default App;
