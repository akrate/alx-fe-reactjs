import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PostsComponent from "./components/PostsComponent";

function App() {
  return (
    <div>
      <h1>React Query Demo</h1>
      <PostsComponent />
    </div>
  );
}

export default App;
