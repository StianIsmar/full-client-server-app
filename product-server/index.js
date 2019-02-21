//Starts a server and listens on port 4000!


const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
// Query
const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM react_sql.products';

// Gives instance of our connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kflip44',
    database: 'react_sql',
    port: 3306
});
connection.connect();
// console.log(connection)

connection.connect(err => {
    if (err) {
        return err;
    }
});


app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /products to see products')
});

app.get('/empty', (req, res) => {
    res.send('Empty')
});

app.get('/products/add', (req, res) => {
    const { name, price } = req.query;
    const INSERT_PRODUCTS_QUERY = `INSERT INTO products (name, price) VALUES('${name}',${price})`
    connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.send('successfully added product')
        }
    })
    console.log(name, price)
})

app.get('/products', (req, res) => {
    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, result) => {
        if (err) {
            return res.send(err)
        }
        else {
            console.log(res.json({ data: result }))
            //return res.json({
            //  data: results
            //})
        }
    })
});

app.listen(4000, () => {
    console.log(`Products server listening on port 4000`)
});
