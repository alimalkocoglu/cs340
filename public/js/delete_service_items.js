function deleteServiceItems(service_item_id) {
    // Put our data we want to send in a javascript object
    let data = {
        service_item_id: service_item_id
    };

    console.log(data)

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-service-items-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(service_item_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log(xhttp.response)
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(service_item_id){
    let table = document.getElementById("service-items-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == service_item_id) {
            table.deleteRow(i);
            break;
       }
    }
}