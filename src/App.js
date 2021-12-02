import PaymentsInterface from "./components/PaymentsInterface";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import {Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="container">
      <NavBar />
      <br />
      <Routes>
      <Route path="/" element={<PaymentsInterface />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </div>
  );
}

export default App;
