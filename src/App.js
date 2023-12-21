
import './App.css';
// import { Login } from './api/basicconfig';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from './Auth/Login';
import Home from './Compoents/Home/Home';

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/"  element={< LoginForm />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  </Router>
  );
}

export default App;
