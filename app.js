/*
    SETUP
*/
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
PORT = 9495;

// handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')

/*
    customer routes 
*/
app.get('/', function (req, res) {
    let query1 = "SELECT * FROM customers;";               // Define our query

    // if no search is made query string will be empty and basic SELECT * 
    if (req.query.lname === undefined) {
        query1 = "SELECT * FROM customers;";
    }

    else {
        query1 = `SELECT * FROM customers WHERE last_name LIKE "%${req.query.lname}%"`
    }
    db.pool.query(query1, function (error, rows, fields) {    // Execute the query

        res.render('index', { data: rows });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});

app.delete('/delete-customer-ajax', function (req, res, next) {
    let data = req.body;
    let customer_id = parseInt(data.customer_id);
    let deleteCustomer = `DELETE FROM customers WHERE customer_id = ?`;

    db.pool.query(deleteCustomer, [customer_id], function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.post('/add-customer-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database 

    query1 = `INSERT INTO customers (first_name, last_name, middle_name, address1, address2, address_city , address_state , address_zip, phone_number ) VALUES ('${data.first_name}', '${data.last_name}', '${data.middle_name}','${data.address1}','${data.address2}','${data.address_city}','${data.address_state}','${data.address_zip}','${data.phone_number}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on customers
            query2 = `SELECT * FROM customers;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.put('/update-customer-ajax', function (req, res) {
    let data = req.body;
    console.log(data, "update customer")

    // Declare Query 1
    let query1 = `UPDATE customers SET first_name =  '${data.first_name}' , last_name = '${data.last_name}', middle_name = '${data.middle_name}', address1= '${data.address1}', address2= '${data.address2}', address_city= '${data.address_city}', address_state= '${data.address_state}', address_zip= '${data.address_zip}', phone_number = '${data.phone_number}' WHERE customer_id = '${data.customer_id}';`
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            res.send("updated")
        }
    })
});


/*
    service-represantative routes
*/

app.get('/service_representatives', function (req, res) {
    let data = req.body;
    // Declare Query 1
    let query1 = `SELECT service_rep_id, first_name, last_name, middle_name, location_name , service_representatives.location_id FROM service_representatives LEFT JOIN locations ON locations.location_id = service_representatives.location_id ORDER BY service_rep_id ASC;`

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM locations;";

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the service reps
        let service_reps = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the locations
            let locations = rows;
            return res.render('service_reps', { data: service_reps, locations: locations });
        })
    })
});

app.delete('/delete-service-rep-ajax', function (req, res, next) {
    let data = req.body;
    let service_rep_id = parseInt(data.service_rep_id);
    let deleteServiceRep = `DELETE FROM service_representatives WHERE service_rep_id = ?`;

    db.pool.query(deleteServiceRep, [service_rep_id], function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});



app.put('/update-servicerep-ajax', function (req, res) {
    let data = req.body;
    console.log(data, "update serv rep")

    // Declare Query 1
    let query1 = `UPDATE service_representatives SET first_name =  '${data.first_name}' , last_name = '${data.last_name}', middle_name = '${data.middle_name}', location_id= '${data.location_id}' WHERE service_rep_id = '${data.service_rep_id}';`
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            res.send("updated")
        }
    })
});


app.post('/add-servicerep-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log("line 63 service rep ajax ", data)
    // Create the query and run it on the database 

    query1 = `INSERT INTO service_representatives (first_name, last_name, middle_name, location_id) VALUES ('${data.first_name}', '${data.last_name}', '${data.middle_name}',${data.location_id ? data.location_id : null})`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {

            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT service_rep_id, first_name, last_name, middle_name, location_name FROM service_representatives JOIN locations ON locations.location_id = service_representatives.location_id ORDER BY service_rep_id ASC;`
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })

        }
    })
});

/*
    locations route
*/

app.delete('/delete-location-ajax', function (req, res, next) {
    let data = req.body;
    let location_id = parseInt(data.location_id);
    let deleteLocation = `DELETE FROM locations WHERE location_id = ?`;

    db.pool.query(deleteLocation, [location_id], function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.get('/locations', function (req, res) {
    let data = req.body;
    // Declare Query 1
    let query1 = `SELECT location_id, address1, address2, address_city, address_state, address_zip, phone_number, location_name FROM locations ORDER BY location_id ASC;`

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the locations
        let locations = rows;
        return res.render('locations', { data: locations, locations: locations });

    })
});

app.post('/add-location-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log("88 line app.js", data)
    // Create the query and run it on the database 

    query1 = `INSERT INTO locations (address1, address2, address_city, address_state, address_zip, phone_number, location_name ) VALUES ('${data.address1}', '${data.address2}', '${data.address_city}','${data.address_state}','${data.address_zip}','${data.phone_number}','${data.location_name}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {

            // If there was an error on the second query, send a 400
            query2 = `SELECT * FROM locations;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

/*
    customer vehicle routes
*/
app.get('/customer_vehicles', function (req, res) {
    let data = req.body;
    // Declare Query 1
    let query1 = `SELECT customer_id, vehicle_id, vin_number, make, model, year, mileage, trim, engine_type, license_plate	FROM customer_vehicles ORDER BY customer_id ASC;`

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the locations
        let customer_vehicle = rows;
        return res.render('customer_vehicle', { data: customer_vehicle, customer_vehicle: customer_vehicle });

    })
});

app.get('/customer_vehicles/:id', function (req, res) {
    let customer_id = req.params.id
    
    // Declare Query 1
    let query1 = `SELECT  vehicle_id, make, model, year,license_plate FROM customer_vehicles WHERE customer_id = ${customer_id};`

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the locations
        let customer_vehicle = rows;
        return res.send(customer_vehicle);

    })
});

app.post('/add-customer-vehicle-form-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log("88 line app.js", data)
    // Create the query and run it on the database 

    query1 = `INSERT INTO customer_vehicle (vin_number, make, model, year, mileage, trim, engine_type, license_plate) VALUES ('${data.vin_number}', '${data.make}', '${data.model}','${data.year}','${data.mileage}','${data.trim}','${data.engine_type}','${data.license_plate}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {

            // If there was an error on the second query, send a 400
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            // If all went well, send the results of the query back.
            else {
                res.send(rows);
            }

        }
    })
});



/*
service orders
*/

app.get('/service_orders', function (req, res) {
    //let data = req.body;
    // Declare Query 1
    let query1 = `SELECT
         so.service_rep_id,
         sr.first_name AS rep_firstname,
         sr.last_name AS rep_lastname,
         cst.first_name AS customer_firstname,
         cst.last_name AS customer_lastname,
         cv.license_plate,
         cv.make,
         cv.model,
         so.is_completed,
         so.vehicle_id,
         so.customer_id,
         so.service_order_id
         FROM service_orders as so
         INNER JOIN customers as cst ON cst.customer_id = so.customer_id
         LEFT JOIN customer_vehicles as cv ON so.vehicle_id = cv.vehicle_id
         INNER JOIN service_representatives as sr ON so.service_rep_id = sr.service_rep_id;`

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM service_representatives;";
    let query3 = "SELECT * FROM customers;";
    // Run the 1st query

    db.pool.query(query1, function (error1, service_orders, fields) {
        if (error1) {
            console.log(error1);
            res.sendStatus(400);
        } else {
            //Run the second query
            db.pool.query(query2, (error2, service_reps, fields) => {
                if (error2) {
                    console.log(error2);
                    res.sendStatus(400);
                } else {
                    db.pool.query(query3, (error3, customers, fields) => {
                        if (error3) {
                            console.log(error3);
                            res.sendStatus(400);
                        } else {
                            res.render('service_orders', { data: service_orders, reps: service_reps, customers: customers })
                        }
                    })

                }

            })
        }
    })
});

app.post('/add-serviceorders-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO service_orders (customer_id, vehicle_id , service_rep_id) VALUES (${data.customer_id},${data.vehicle_id},${data.service_rep_id});`
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.send(rows);
        }
    })
})

app.put('/update-service-order-ajax', function (req, res) {
    let data = req.body;
    console.log(data, "update serv order item")

    //Declare Query 1
    let query1 = `UPDATE service_orders SET service_rep_id =  ${data.rep_id} , is_completed = ${data.status} WHERE service_order_id  =${data.service_order_id};`
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            res.send("updated")
        }
    })
});

/*
    service items
*/

app.get('/service_items', function (req, res) {
    let data = req.body;
    // Declare Query 1
    let query1 = `SELECT service_item_id, price, service_name FROM service_items ORDER BY service_item_id ASC;`

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the locations
        let service_items = rows;
        return res.render('service_items', { data: service_items, service_items: service_items });

    })
});

app.delete('/delete-service-items-ajax', function (req, res, next) {
    let data = req.body;
    let service_item_id = parseInt(data.service_item_id);
    let deleteServiceItems = `DELETE FROM service_items WHERE service_item_id = ?`;

    db.pool.query(deleteServiceItems, [service_item_id], function (error, rows, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

app.put('/update-serviceitems-ajax', function (req, res) {
    let data = req.body;
    console.log(data, "update serv item")

    // Declare Query 1
    let query1 = `UPDATE service_items SET price =  '${data.price}' , service_name = '${data.service_name}' WHERE service_item_id  ='${data.service_item_id}';`
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            res.send("updated")
        }
    })
});

app.post('/add-serviceitems-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data)

    // Create the query and run it on the database
    query1 = `INSERT INTO service_items (price, service_name) VALUES ('${data.price}','${data.service_name}');`
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else {
            res.redirect('/service_items');
        }
    })
})

/*
 service order details
*/

app.get('/service_order_details', function (req, res) {

    order_id = req.query.order_id
    console.log(order_id)
    //Declare Query 1
    let query1 = `SELECT 
    service_order_id,
    service_name,
    price
    FROM 
    service_items
    INNER JOIN
    service_order_details ON service_items.service_item_id = service_order_details.service_item_id
    WHERE service_order_id = ${order_id};`

    //Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the locations
        let order_details = rows;
        return res.render('order details', { data: order_details});

    })
});

app.get('/service_representatives', function (req, res) {
    let data = req.body;
    // Declare Query 1
    let query1 = `SELECT service_rep_id, first_name, last_name, middle_name, location_name , service_representatives.location_id FROM service_representatives LEFT JOIN locations ON locations.location_id = service_representatives.location_id ORDER BY service_rep_id ASC;`

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM locations;";

    // Run the 1st query
    db.pool.query(query1, function (error, rows, fields) {

        // Save the service reps
        let service_reps = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {

            // Save the locations
            let locations = rows;
            return res.render('service_reps', { data: service_reps, locations: locations });
        })
    })
});


/*
    LISTENER
*/
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
