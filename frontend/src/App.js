import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ViewProduts from './components/ViewProduts';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={< ViewProduts/>}/>
        <Route path='/add' element={< AddProduct/>}/>
        <Route path='/edit' element={< EditProduct/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
