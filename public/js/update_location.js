let addUpdatedLocationForm = document.getElementById('update-location-form-ajax');
// Modify the objects we need
addUpdatedLocationForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();
    // console.log("SHOULD BE THE DATA LOCATION ID",e.target.getAttribute("location_id_added"))
    // Get form fields we need to get data from (html id's must match the corresponding form fields.)
    let inputAddress1 = document.getElementById("update-address1");
    let inputAddress2 = document.getElementById("update-address2");
    let inputAddressCity = document.getElementById("update-address_city");
    let inputAddressState = document.getElementById("update-address_state");
    let inputAddressZip = document.getElementById("update-address_zip");
    let inputPhoneNumber = document.getElementById("update-phone_number");
    let inputLocationName = document.getElementById("update-location_name");
    

    // Get the values from the form fields (user inputs)
    let address1Value = inputAddress1.value;
    let address2Value = inputAddress2.value;
    let addressCityValue = inputAddressCity.value;
    let addressStateValue = inputAddressState.value;
    let addressZipValue = inputAddressZip.value;
    let PhoneNumberValue = inputPhoneNumber.value;
    let LocationNameValue = inputLocationName.value;

    // Put our data we want to send in a javascript object
    let data = { 
        address1: address1Value,
        address2: address2Value, 
        address_city: addressCityValue, 
        address_state: addressStateValue, 
        address_zip: addressZipValue, 
        phone_number: PhoneNumberValue, 
        location_name: LocationNameValue,
        // this is coming from the add_service_rep.js page function updateServiceRep
        location_id: e.target.getAttribute("location_id_added")
    }

    // Setup our AJAX request
    // For updates needs to be PUT
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-location-ajax", true);
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