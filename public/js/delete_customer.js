function deleteCustomer(customer_id) {
    // Put our data we want to send in a javascript object
    let data = {
        customer_id: customer_id
    };

    console.log(data)

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(customer_id);
            console.log(customer_id,"customer id from delete customer 20 line")
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log(xhttp.response)
            console.log(customer_id,"customer id from delete customer 23 line")
            console.log("There was an error with the input. from delete customer.js")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(customer_id){
    let table = document.getElementById("customers-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customer_id) {
            table.deleteRow(i);
            break;
       }
    }
}
