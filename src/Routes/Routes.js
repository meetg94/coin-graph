import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '../Components/Home';
import About from '../Components/About';
import CoinGraph from '../Components/CoinGraph';

function pathRoutes() {
  return (
    <div>
    <Router>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About /> } />
            <Route path="/:id" element={<CoinGraph />} />
        </Routes>
    </Router>
    </div>
  )
}

export default pathRoutes