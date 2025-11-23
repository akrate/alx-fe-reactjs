import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 py-12">
      <div className="container mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            GitHub User Search
          </h1>
          <p className="text-xl text-white opacity-90">
            Search for GitHub users with advanced filters
          </p>
        </header>

        {/* Search Component */}
        <Search />
      </div>
    </div>
  );
}

export default App;