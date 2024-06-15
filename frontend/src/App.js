import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashBoard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
