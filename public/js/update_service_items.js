// Get the objects we need to modify

let addUpdatedServiceItemForm = document.getElementById('update-service-item-form-ajax');
// Modify the objects we need
addUpdatedServiceItemForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();
    console.log("SHOULD BE THE DATA ITEM ID",e.target.getAttribute("service_item_id_added"))
    // Get form fields we need to get data from (html id's must match the corresponding form fields.)
    let inputPrice = document.getElementById("input-price");
    let inputServiceName = document.getElementById("input-service_name");

    // Get the values from the form fields (user inputs)
    let PriceValue = inputPrice.value;
    let ServiceNameValue = inputServiceName.value;

    // Put our data we want to send in a javascript object
    let data = {
        price: PriceValue,
        service_name: ServiceNameValue,
    }
    // Setup our AJAX request
    // For updates needs to be PUT
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-serviceitems-ajax", true);
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