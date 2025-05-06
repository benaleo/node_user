import pool from '../db/index.js';

// Import database connection (if needed)

const userController = {
    view: (req, res) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Connection error", err);
                return res.status(500).send("Database connection error");
            }
            console.log("Connected! with ID " + connection.threadId);

            // query connection
            connection.query('SELECT * FROM users', (err, results) => {
                // release connection
                connection.release();
                if (err) {
                    console.error("Query error", err);
                    return res.status(500).send("Database query error");
                }
                res.render('users', {
                    title: 'Users',
                    users: results
                });

                console.log(results);
            });
        });
    }
};

export default userController;