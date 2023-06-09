function deleteCustomerVehicle(vehicle_id) {
    // Put our data we want to send in a javascript object
    let data = {
        vehicle_id: vehicle_id
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-customer-vehicle-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            location.reload()
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input. from delete customer.js")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}
