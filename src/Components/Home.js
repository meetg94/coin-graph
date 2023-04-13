import { useState, useEffect } from 'react';

import axios from 'axios';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Paper, Divider, Pagination, Box } from '@mui/material/';

const baseURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200'

function Home() {

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL);
                setData(response.data)
                console.log(response.data)
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
                                <TableRow>
                                    <TableCell component="th">{dataItem.name}</TableCell>
                                    <TableCell align="left" className='coin-logo'><img src={dataItem.image} alt="crypto-coin-logo"/></TableCell>
                                    <TableCell align="left">{dataItem.symbol.toUpperCase()}</TableCell>
                                    <TableCell align="left">{dataItem.current_price}</TableCell>
                                    <TableCell align="left">{dataItem.market_cap}</TableCell>
                                    <TableCell align="left">{dataItem.price_change_percentage_24h}</TableCell>
                                    <TableCell align="left">{dataItem.total_volume}</TableCell>
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