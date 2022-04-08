import './App.scss';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import RouterComponent from './router/RouterComponent';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Header/>
              <RouterComponent/>
              <Footer/>
            </>
          }
        ></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
