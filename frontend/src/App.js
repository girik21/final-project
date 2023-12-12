import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home';
import { Create } from './pages/create-post';
import { Auth } from './pages/auth';
import { Navbar } from './components/navbar';
import "./App.css"


function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
  );
}

export default App;
