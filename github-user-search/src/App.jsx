import Search from './components/Search';
import './styles/Search.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Search for GitHub users and view their profiles</p>
      </header>
      
      <Search />
    </div>
  );
}

export default App;