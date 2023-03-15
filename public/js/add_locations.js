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
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputAddress1.value = '';
            inputAddress2.value = '';
            inputAddrcity.value = '';
            inputAddrstate.value = '';
            inputAddrzip.value = '';
            inputPhoneNum.value = '';
            inputLocationName.value = '';
        } 
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("locations-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 10 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let address1Cell = document.createElement("TD");
    let address2Cell = document.createElement("TD");
    let addressCityCell = document.createElement("TD");
    let addressStateCell  = document.createElement("TD");
    let addressZipCell  = document.createElement("TD");
    let phone_numberCell  = document.createElement("TD");
    let location_nameCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.location_id;
    address1Cell.innerText = newRow.address1;
    address2Cell.innerText = newRow.address2;
    addressCityCell.innerText = newRow.address_city;
    addressStateCell.innerText = newRow.address_state;
    addressZipCell.innerText  = newRow.address_zip;
    phone_numberCell.innerText = newRow.phone_number;
    location_nameCell.innerText = newRow.location_name;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(address1Cell);
    row.appendChild(address2Cell);
    row.appendChild(addressCityCell);
    row.appendChild(addressStateCell);
    row.appendChild(addressZipCell);
    row.appendChild(phone_numberCell);
    row.appendChild(location_nameCell);

    // Add the row to the table
    currentTable.appendChild(row);

}