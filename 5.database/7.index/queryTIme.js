const sqlite3 = require('sqlite3').verbose();

function connectToDatabase() {
    return new sqlite3.Database('mydb.db');
}

function queryName(db, searchName) {
    const selectQuery = 'SELECT * FROM employees WHERE name = ?';

    console.time('Query Time');
    
    db.all(selectQuery, [searchName], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Result: ', rows);
        }

        console.timeEnd('Query Time');
    });
}

module.exports = {connectToDatabase, queryName};
