
// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from (html id's must match the corresponding form fields.)
    let inputFirstName = document.getElementById("input-fname");
    let inputLastName = document.getElementById("input-lname");
    let inputMidName = document.getElementById("input-midname");
    let inputAddress1= document.getElementById("input-address1");
    let inputAddress2= document.getElementById("input-address2");
    let inputAddrcity= document.getElementById("input-addrcity");
    let inputAddrstate= document.getElementById("input-addrstate");
    let inputAddrzip= document.getElementById("input-addrzip"); 
    let inputPhoneNum= document.getElementById("input-phonenum");
    
    // Get the values from the form fields (user inputs)
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let midNameValue = inputMidName.value;
    let address1Value = inputAddress1.value;
    let address2Value = inputAddress2.value;
    let addressCityValue = inputAddrcity.value;
    let addressStateValue = inputAddrstate.value;
    let addressZipValue =inputAddrzip.value;
    let phoneNumValue = inputPhoneNum.value;

    // Put our data we want to send in a javascript object
    let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        middle_name: midNameValue,  
        address1: address1Value,
        address2: address2Value,
        address_city : addressCityValue,
        address_state :addressStateValue,
        address_zip: addressZipValue,
        phone_number: phoneNumValue
    }
    
console.log("from add customer js page")


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.response, "from customer js")
            // Add the new data to the table
            // ******* README HERE ***** in the corrected version of this add customer page addRowToTable function is not used anymore instead here location.reload() is used. 
            // addRowToTable(xhttp.response);
            location.reload()
            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputMidName.value = '';
            inputAddress1.value = '';
            inputAddress2.value = '';
            inputAddrcity.value = '';
            inputAddrstate.value = '';
            inputAddrzip.value = '';
            inputPhoneNum.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateCustomer(ID,fname,lname,midname,address1,address2,address_city,address_state,address_zip,phone_number) {
    console.log(phone_number, "phone number 146")
    // adds a attribute to the form with the service rep id to use it in delete query later.
    let addUpdatedServiceRepForm = document.getElementById('update-customer-form-ajax');
    addUpdatedServiceRepForm.setAttribute("customer_id_added",ID)

    let updateForm = document.getElementById("update_customer_form")
    updateForm.classList.remove("hidden")
    console.log(ID,fname,lname,midname,address1,address2,address_city,address_state,address_zip,phone_number, "from add customer js updata customer")
    
    // choose the form elements by ID on the update form
    let inputFirstName = document.getElementById("update-fname");
    let inputLastName = document.getElementById("update-lname");
    let inputMidName = document.getElementById("update-midname");
    let inputAddress1 = document.getElementById("update-address1");
    let inputAddress2 = document.getElementById("update-address2");
    let inputAddressCity = document.getElementById("update-address_city");
    let inputAddressState = document.getElementById("update-address_state");
    let inputAddressZip = document.getElementById("update-address_zip");
    let inputPhoneNumber = document.getElementById("update-phone_number");
    console.log(phone_number, "phone number 165")
    

    // prepopulate the data for the form fields
    inputFirstName.value = fname
    inputLastName.value = lname
    inputMidName.value = midname
    inputAddress1.value = address1
    inputAddress2.value = address2
    inputAddressCity.value = address_city
    inputAddressState.value = address_state
    inputAddressZip.value = address_zip
    inputPhoneNumber.value = phone_number
    
}


function closeUpdateForm (){
    let updateForm = document.getElementById("update_customer_form")
    updateForm.classList.add("hidden")
}