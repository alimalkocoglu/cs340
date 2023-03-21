// Get the objects we need to modify

let addUpdatedCustomerForm = document.getElementById('update-customer-form-ajax');
// Modify the objects we need
addUpdatedCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();
    console.log("SHOULD BE THE DATA CUSTOMER ID",e.target.getAttribute("customer_id_added"))
    // Get form fields we need to get data from (html id's must match the corresponding form fields.)
    let inputFirstName = document.getElementById("update-fname");
    let inputLastName = document.getElementById("update-lname");
    let inputMidName = document.getElementById("update-midname");
    let inputAddress1 = document.getElementById("update-address1");
    let inputAddress2 = document.getElementById("update-address2");
    let inputAddressCity = document.getElementById("update-address_city");
    let inputAddressState = document.getElementById("update-address_state");
    let inputAddressZip = document.getElementById("update-address_zip");
    let inputPhoneNumber = document.getElementById("update-phone_number");
    

    // Get the values from the form fields (user inputs)
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let midNameValue = inputMidName.value;
    let address1Value = inputAddress1.value;
    let address2Value = inputAddress2.value;
    let addressCityValue = inputAddressCity.value;
    let addressStateValue = inputAddressState.value;
    let addressZipValue = inputAddressZip.value;
    let PhoneNumberValue = inputPhoneNumber.value;

    // Put our data we want to send in a javascript object
    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        middle_name: midNameValue,  
        address1: address1Value,
        address2: address2Value, 
        address_city: addressCityValue, 
        address_state: addressStateValue, 
        address_zip: addressZipValue, 
        phone_number: PhoneNumberValue, 
        // this is coming from the add_service_rep.js page function updateServiceRep
        customer_id: e.target.getAttribute("customer_id_added")
    }

    // Setup our AJAX request
    // For updates needs to be PUT
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-customer-ajax", true);
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