// Get the objects we need to modify

let addUpdatedServiceRepForm = document.getElementById('update-service-rep-form-ajax');
// Modify the objects we need
addUpdatedServiceRepForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();
    console.log("SHOULD BE THE DATA REP ID",e.target.getAttribute("serv_rep_id_added"))
    // Get form fields we need to get data from (html id's must match the corresponding form fields.)
    let inputFirstName = document.getElementById("update-fname");
    let inputLastName = document.getElementById("update-lname");
    let inputMidName = document.getElementById("update-midname");
    let inputLocation= document.getElementById("update-location-ajax-service-rep");

    // Get the values from the form fields (user inputs)
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let midNameValue = inputMidName.value;
    let locationValue = inputLocation.value;

    // Put our data we want to send in a javascript object
    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        middle_name: midNameValue,  
        location_id: locationValue,
        // this is coming from the add_service_rep.js page function updateServiceRep
        service_rep_id: e.target.getAttribute("serv_rep_id_added")
    }

    // Setup our AJAX request
    // For updates needs to be PUT
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-servicerep-ajax", true);
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
