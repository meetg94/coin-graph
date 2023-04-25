import {useState, useEffect} from 'react';

import axios from "axios";
import * as d3 from 'd3';
import { useParams } from 'react-router-dom';

function CoinChart() {

  const { id } = useParams()

  const [coinData, setCoinData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`)
        d3.json(data.prices)
        setCoinData(data.prices)
      } catch(err) {
        console.log(err)
      }
    }
    fetch()
  }, [])
  
  return (
    <div>
        
    </div>
  )
}

export default CoinChart