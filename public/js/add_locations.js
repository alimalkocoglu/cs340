// Get the objects we need to modify
let addLocationForm = document.getElementById('add-location-form-ajax');

// Modify the objects we need
addLocationForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from (html id's must match the corresponding form fields.)
    let inputAddress1= document.getElementById("input-address1");
    let inputAddress2= document.getElementById("input-address2");
    let inputAddrcity= document.getElementById("input-addrcity");
    let inputAddrstate= document.getElementById("input-addrstate");
    let inputAddrzip= document.getElementById("input-addrzip"); 
    let inputPhoneNum= document.getElementById("input-phonenum");
    let inputLocationName= document.getElementById("input-locationname");
    
    // Get the values from the form fields (user inputs)
    let address1Value = inputAddress1.value;
    let address2Value = inputAddress2.value;
    let addressCityValue = inputAddrcity.value;
    let addressStateValue = inputAddrstate.value;
    let addressZipValue =inputAddrzip.value;
    let phoneNumValue = inputPhoneNum.value;
    let locationName = inputLocationName.value;

    // Put our data we want to send in a javascript object
    let data = { 
        address1: address1Value,
        address2: address2Value,
        address_city : addressCityValue,
        address_state :addressStateValue,
        address_zip: addressZipValue,
        phone_number: phoneNumValue,
        location_name: locationName
    }
    
console.log("from add location js page")


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-location-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.response, "from locations js")
            // Add the new data to the table
            location.reload()
        } 
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function updateLocation(ID,address1,address2,address_city,address_state,address_zip,phone_number,location_name) {
    // console.log(phone_number, "phone number 146")
    // adds a attribute to the form with the service rep id to use it in delete query later.
    let addUpdatedLocationForm = document.getElementById('update-location-form-ajax');
    addUpdatedLocationForm.setAttribute("location_id_added",ID)

    let updateForm = document.getElementById("update_location_form")
    updateForm.classList.remove("hidden")
    console.log(ID,address1,address2,address_city,address_state,address_zip,phone_number,location_name, "from add customer js updata customer")
    
    // choose the form elements by ID on the update form
    let inputAddress1 = document.getElementById("update-address1");
    let inputAddress2 = document.getElementById("update-address2");
    let inputAddressCity = document.getElementById("update-address_city");
    let inputAddressState = document.getElementById("update-address_state");
    let inputAddressZip = document.getElementById("update-address_zip");
    let inputPhoneNumber = document.getElementById("update-phone_number");
    let inputLocationName =  document.getElementById("update-location_name");
    // console.log(phone_number, "phone number 165")
    

    // prepopulate the data for the form fields
    inputAddress1.value = address1
    inputAddress2.value = address2
    inputAddressCity.value = address_city
    inputAddressState.value = address_state
    inputAddressZip.value = address_zip
    inputPhoneNumber.value = phone_number
    inputLocationName.value = location_name
}


function closeUpdateForm (){
    let updateForm = document.getElementById("update_location_form")
    updateForm.classList.add("hidden")
}