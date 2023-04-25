import { useState, useEffect } from 'react';

import axios from 'axios';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Avatar, Paper, Divider, Pagination, Box } from '@mui/material/';
import { Link } from 'react-router-dom';

const baseURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200'

function Home() {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL);
                setData(response.data)
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, []);

    const itemsPerPage = 50;
    const noOfPages = Math.ceil(data.length/itemsPerPage);
    const begin = (page - 1) * itemsPerPage;
    const end = begin + itemsPerPage;

    const currentData = data.slice(begin, end)

    const handleChange = (e, value) => {
        setPage(value);
    }

    const getId = (e) => {
        console.log(e.currentTarget.id)
    }

    const percentNull = (value) => {
        if (value === null) {
            return 0;
        } else {
            return Math.round((value + Number.EPSILON) * 100) / 100;
        }
    }

  return (
    <div>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650, height: "10px" }} aria-label="simple table">
                <TableHead>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>Name</TableCell>
                        <TableCell>Logo</TableCell>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>MarketCap</TableCell>
                        <TableCell>24H Change</TableCell>
                        <TableCell>Trading Volume</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentData.map(dataItem => {
                        return (
                                <TableRow key={dataItem.id}>
                                    <TableCell component="th">
                                        <Link to={`/coin/${dataItem.id}`}>
                                            {dataItem.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left" className='coin-logo'><Avatar src={dataItem.image} alt="crypto-coin-logo"/></TableCell>
                                    <TableCell align="left">{dataItem.symbol.toUpperCase()}</TableCell>
                                    <TableCell align="left">${dataItem.current_price.toLocaleString()}</TableCell>
                                    <TableCell align="left">${dataItem.market_cap.toLocaleString()}</TableCell>
                                    <TableCell align="left">{percentNull(dataItem.price_change_percentage_24h)}%</TableCell>
                                    <TableCell align="left">$ {dataItem.total_volume.toLocaleString()}</TableCell>
                                </TableRow>
                        )})}
                </TableBody>
                </Table>
                    </TableContainer>
        <Divider />
        <Box>
            <Pagination 
                count={noOfPages}
                page={page}
                onChange={handleChange}
                defaultPage={1}
                showFirstButton
                showLastButton
            />
        </Box>
    </div>
  )
}

export default Home