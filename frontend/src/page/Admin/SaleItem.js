import React from 'react';

const SaleItem = ({ sale }) => {
    return (
        <tr>
            <td>{sale.id}</td>
            <td>{new Date(sale.saleDate).toLocaleString()}</td>
            <td>{sale.totalPrice}</td>
            <td>{sale.status}</td>
            <td>
                <ul>
                    {sale.saleItems.map(item => (
                        <li key={item.id}>
                            Product ID: {item.productId}, Quantity: {item.quantity}, Price: {item.price}
                        </li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

export default SaleItem;
