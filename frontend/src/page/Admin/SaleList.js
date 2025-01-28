import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SaleItem from './SaleItem';

const SaleList = () => {
    const [sales, setSales] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchSales = async (start, end) => {
        try {
            const response = await axios.get('/api/sales/period', {
                params: {
                    startDate: start,
                    endDate: end
                }
            });
            setSales(response.data);
        } catch (error) {
            console.error("Error fetching sales:", error);
        }
    };

    useEffect(() => {
        const now = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        const formattedNow = now.toISOString().slice(0, 16);
        const formattedLastMonth = lastMonth.toISOString().slice(0, 16);
        
        setStartDate(formattedLastMonth);
        setEndDate(formattedNow);
        fetchSales(formattedLastMonth, formattedNow);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSales(startDate, endDate);
    };

    return (
        <div>
            <h2>Sale List</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Start Date:
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <button type="submit">Filter</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sale Date</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Items</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <SaleItem key={sale.id} sale={sale} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SaleList;
