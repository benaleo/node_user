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
            connection.query('SELECT * FROM users WHERE is_active = true AND is_deleted = false', (err, results) => {
                // release connection
                connection.release();
                if (err) {
                    console.error("Query error", err);
                    return res.status(500).send("Database query error");
                }
                res.render('users', {
                    title: 'Users',
                    users: results,
                    successMessage: req.flash('success')
                });

                console.log(results);
            });
        });
    },

    create: (req, res) => {

        res.render('users/create', {})
    },

    store: (req, res) => {
        const { name, email, phone, is_active } = req.body;

        pool.getConnection((err, connection) => {  // Changed from getMaxListeners to getConnection
            if (err) {
                console.error("Connection error", err);
                return res.status(500).send("Database connection error");
            }
            console.log("Connected! with ID " + connection.threadId);

            // Fixed query with spaces after SET and proper formatting
            connection.query('INSERT INTO users SET ' +  // Added space after SET
                'name = ?, ' +  // Added space after comma
                'email = ?, ' +  // Added space after comma
                'phone = ?, ' +  // Added space after comma
                'is_active = ?',
                [name, email, phone, is_active],  // Changed to array for parameterized query
                (err, results) => {
                    // release in done
                    connection.release();

                    if (err) {
                        console.error("Query error", err);
                        return res.status(500).send("Database query error");
                    } else {
                        req.flash('success', 'User created successfully');
                        res.redirect('/users');
                    }

                    console.log('results data create user ' + results);
                }
            );
        });
    }
};

export default userController;