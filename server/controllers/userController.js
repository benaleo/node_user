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

        res.render('users/create', {
            title: 'Create User',
            errorMessage: req.flash('error')
        })
    },

    store: (req, res) => {
        const {name, email, phone, is_active} = req.body;

        // Validation
        if (!name || name.trim() === '') {
            return res.render('users/create', {
                errorMessage: 'Name is required',
                // Return the input data so the user doesn't have to retype everything
                formData: {
                    email,
                    phone,
                    is_active
                }
            });
        }

        if (!email || email.trim() === '') {
            return res.render('users/create', {
                errorMessage: 'Email is required',
                formData: {
                    name,
                    phone,
                    is_active
                }
            });
        }

        pool.getConnection((err, connection) => {
            if (err) {
                console.error("Connection error", err);
                return res.render('users/create', {
                    errorMessage: 'Database connection error',
                    formData: {
                        name,
                        email,
                        phone,
                        is_active
                    }
                });
            }
            console.log("Connected! with ID " + connection.threadId);

            connection.query('INSERT INTO users SET ' +
                'name = ?, ' +
                'email = ?, ' +
                'phone = ?, ' +
                'is_active = ?',
                [name, email, phone, is_active],
                (err, results) => {
                    connection.release();

                    if (err) {
                        console.error("Query error", err);
                        return res.render('users/create', {
                            errorMessage: 'Database error: ' + err.message,
                            formData: {
                                name,
                                email,
                                phone,
                                is_active
                            }
                        });
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