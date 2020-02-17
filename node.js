const express = require('express');
const cors = require('cors')
const mysql = require('mysql')
const app = express();

const SELECT_ALL_PRODUCT_QUERY = 'SELECT * FROM users';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'reactsql'
});

connection.connect(err => {
    if(err){
        return err;
    }
});

console.log(connection);
app.use(cors());

app.get('/users/delete', (req, res) => {
    const { id } = req.query;
    const DELETE_QUERY = 'DELETE FROM users WHERE userid = ?';
    connection.query(DELETE_QUERY,id,(err,results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.send('successfully DELETE users')
        }
    }); 
});

app.get('/users', (req, res) => {
    connection.query(SELECT_ALL_PRODUCT_QUERY, (err,results) => {
        if(err) {
            return res.send(err)
        }
        else{ 
            return res.json({
                data: results
            })
        }
    })
});

app.listen(3100, () => {
    console.log('Products server listening on port 3100');
});