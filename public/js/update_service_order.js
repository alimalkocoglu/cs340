// Get the objects we need to modify

let addUpdatedServiceOrderForm = document.getElementById('update-service-order-form-ajax');
// Modify the objects we need
addUpdatedServiceOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();
    console.log("SHOULD BE THE DATA service order ID",e.target.getAttribute("order_id_added"))
    // Get form fields we need to get data from (html id's must match the corresponding form fields.)
    let status = document.getElementById("update-status-ajax-service-orders");
    let rep_id = document.getElementById("update-rep-ajax-service-orders");
    console.log(status.value)
    // Put our data we want to send in a javascript object
    let data = {
        status: status.value,
        rep_id: rep_id.value,
        service_order_id : e.target.getAttribute("order_id_added")
    }

    // Setup our AJAX request
    // For updates needs to be PUT
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-service-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("37 update serc rep",xhttp.response)
            // reload the page (view) the newly updated data is there.
            location.reload()
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request to the server and wait for the response
    xhttp.send(JSON.stringify(data));

})
