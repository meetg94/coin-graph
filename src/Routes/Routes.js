import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '../Components/Home';
import About from '../Components/About';
import CoinGraph from '../Components/CoinGraph';
import CoinChart from '../Components/CoinChart';

function pathRoutes() {
  return (
    <div>
    <Router>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About /> } />
            <Route path="/coin/:id" element={<CoinChart />} />
        </Routes>
    </Router>
    </div>
  )
}

export default pathRoutes