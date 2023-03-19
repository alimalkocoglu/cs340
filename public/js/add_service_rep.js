// Get the objects we need to modify
let addServiceRepForm = document.getElementById('add-service-rep-form-ajax');
// Modify the objects we need
addServiceRepForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from (html id's must match the corresponding form fields.)
    let inputFirstName = document.getElementById("input-fname");
    let inputLastName = document.getElementById("input-lname");
    let inputMidName = document.getElementById("input-midname");
    let inputLocation= document.getElementById("input-location-ajax-service-rep");

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
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-servicerep-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("37 add servie",xhttp.response)
            // Add the new data to the table
            //addRowToTable(xhttp.response);
            location.reload()
            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputMidName.value = '';
            inputLocation.value = '';
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
    let currentTable = document.getElementById("service-representatives-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]
    console.log(newRow, "new row add ")
    // Create a row and 10 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let midNameCell = document.createElement("TD");
    let locationCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.service_rep_id;
    firstNameCell.innerText = newRow.first_name;
    lastNameCell.innerText = newRow.last_name;
    midNameCell.innerText = newRow.middle_name;
    locationCell.innerText  = newRow.location_name;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(midNameCell);
    row.appendChild(locationCell);

    // Add the row to the table
    currentTable.appendChild(row);
}



function updateServiceRep(ID,fname,lname,midname,locationName,locationID) {

    // adds a attribute to the form with the service rep id to use it in delete or update query later.
    let addUpdatedServiceRepForm = document.getElementById('update-service-rep-form');
    addUpdatedServiceRepForm.setAttribute("serv_rep_id_added",ID)

    let updateForm = document.getElementById("update_rep_form")
    updateForm.classList.remove("hidden")
    console.log(ID,fname,lname,midname,locationName,locationID)
    
    // choose the form elements by ID on the update form
    let inputFirstName = document.getElementById("update-fname");
    let inputLastName = document.getElementById("update-lname");
    let inputMidName = document.getElementById("update-midname");
    let inputLocation= document.getElementById("update-location-ajax-service-rep");

    // prepopulate the data for the form fields
    inputFirstName.value = fname
    inputLastName.value = lname
    inputMidName.value = midname
    inputLocation.value = locationID
}

function closeUpdateForm (){
    let updateForm = document.getElementById("update_rep_form")
    updateForm.classList.add("hidden")
}
