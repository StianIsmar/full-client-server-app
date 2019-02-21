//Starts a server and listens on port 4000!


const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
// Query
const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM products';

// Gives instance of our connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'theo',
    database: 'react_sql'
});

connection.connect(err => {
    if (err) {
        return err;
    }
});


app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /products to see products')

});

app.get('/products', (req, res) => {
    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, result) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});

app.listen(4000, () => {
    console.log(`Products server listening on port 4000`)
});
