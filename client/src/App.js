import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login'
import Dashbord from './pages/dashbord';
import HistoryPage from "./pages/HistoryPage"; 

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashbord />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes >
    </Router>
  )
}

export default App