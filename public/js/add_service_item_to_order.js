



// Get the objects we need to modify
let addItemToOrder = document.getElementById('add-service-item-to-order');
// Modify the objects we need
addItemToOrder.addEventListener("submit", function (e) {
    e.target.getAttribute("service-order-id-default")

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from (html id's must match the corresponding form fields.)
    let inputServName = document.getElementById("add-service-item-to-order-ajax");


    // Get the values from the form fields (user inputs)
    let serviceName = inputServName.value;

    // // Put our data we want to send in a javascript object
    let data = {
        service_item_id: serviceName,
        service_order_id: e.target.getAttribute("service-order-id-default")
    }

    console.log(data)

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-service-item-to-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("37 add servie",xhttp.response)
            // Add the new data to the table
            //addRowToTable(xhttp.response);
            location.reload()
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
