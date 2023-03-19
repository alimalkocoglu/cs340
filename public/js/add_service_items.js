// Get the objects we need to modify
let addServiceItemsForm = document.getElementById('add-service-item-form-ajax');
// Modify the objects we need
addServiceItemsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

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
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-serviceitems-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("37 add servie",xhttp.response)
            // Add the new data to the table
            //addRowToTable(xhttp.response);
            location.reload()
            // Clear the input fields for another transaction
            inputPrice.value = '';
            inputServiceName.value = '';
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
    let currentTable = document.getElementById("service-items-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]
    console.log(newRow, "new row add ")
    // Create a row and 10 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let PriceCell = document.createElement("TD");
    let ServiceItemCell = document.createElement("TD");
    let delete_service_item_btn = document.createElement("BUTTON")
    delete_service_item_btn.addEventListener("click",function(){
        deleteServiceItems(newRow.service_item_id)
    })


    // Fill the cells with correct data
    idCell.innerText = newRow.service_rep_id;
    PriceCell.innerText = newRow.price;
    ServiceItemCell.innerText = newRow.service_name;
    delete_service_item_btn.innerText = "Delete"
    delete_cell.appendChild(delete_service_item_btn)


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(PriceCell);
    row.appendChild(ServiceItemCell);
    // Add the row to the table
    currentTable.appendChild(row);
}



function updateServiceItems(ID,price,serviceName) {

    console.log(ID,price,serviceName,"from add service items")
    
    // adds a attribute to the form with the service rep id to use it in delete query later.
    let addUpdatedServiceItemForm = document.getElementById('update-service-item-form-ajax');
    addUpdatedServiceItemForm.setAttribute("service_item_id_added",ID)

    let updateForm = document.getElementById("update-service-item-form")
    updateForm.classList.remove("hidden")
   
    
    // choose the form elements by ID on the update form
    let inputPrice = document.getElementById("update-price");
    let inputServiceName = document.getElementById("update-service_name");


    // prepopulate the data for the form fields
    inputPrice.value = price
    inputServiceName.value = serviceName
}

function closeUpdateForm (){
    let updateForm = document.getElementById("update-service-item-form")
    updateForm.classList.add("hidden")
}