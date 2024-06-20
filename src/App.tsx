import React from 'react';
import './App.css';
import Upload from './components/Upload';


const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Research Paper Uploader</h1>
      </header>
      <main>
        <Upload />
      </main>
    </div>
  );
};

export default App;