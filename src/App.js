
import './App.css';
import { ThemeProvider } from 'styled-components';

// import { Login } from './api/basicconfig';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginForm from './Auth/Login';
import Home from './Compoents/Home/Home';
import { useMemo } from 'react';
import IdeaForm from "./Compoents/IdeaForm/IdeaForm"
function App() {
  const theme = useMemo(() => ({
    colors: {
      primary: '#0070f3',
      bg: '#fff',
      text: '#333',
      grey: '#aaa',
    },
    fontSize: '16px',
  }), []);
  return (
    <ThemeProvider theme={theme}>
    <Router>
    <Routes>
      <Route exact path="/"  element={< LoginForm />} />
      <Route path="/Home" element={<Home />} />
      <Route path="IdeaForm" element={<IdeaForm />}/>
    </Routes>
  </Router>
  </ThemeProvider>
  );
}

export default App;
