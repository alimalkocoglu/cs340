function deleteServiceItemsFromOrder(service_order_id,service_item_id) {
    // Put our data we want to send in a javascript object
    let data = {
        service_order_id: service_order_id,
        service_item_id: service_item_id
    };

    console.log(data)

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-service-item-from-order", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            // deleteRow(vehicle_id);
            // console.log(vehicle_id,"customer id from delete customer 20 line")
            location.reload()
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input. from delete customer.js")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}