function deleteServiceRep(service_rep_id) {
    // Put our data we want to send in a javascript object
    let data = {
        service_rep_id: service_rep_id
    };

    console.log(data)

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-service-rep-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(service_rep_id);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log(xhttp.response)
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(service_rep_id){
    let table = document.getElementById("service-representatives-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == service_rep_id) {
            table.deleteRow(i);
            break;
       }
    }
}
