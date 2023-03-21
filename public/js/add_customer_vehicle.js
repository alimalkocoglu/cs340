// Get the objects we need to modify
let addCustomerVehicleForm = document.getElementById('add-customer-vehicle-form-ajax');

// Modify the objects we need
addCustomerVehicleForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from (html id's must match the corresponding form fields.)
    // let inputCustomerID = document.getElementById("input-customer_id")
    let inputCustomerID = document.getElementById("input-customer-ajax-customer-vehicle");
    let inputVinNumber = document.getElementById("input-vin_number");
    let inputMake = document.getElementById("input-make");
    let inputModel = document.getElementById("input-model");
    let inputYear= document.getElementById("input-year");
    let inputMilage= document.getElementById("input-mileage");
    let inputTrim= document.getElementById("input-trim");
    let inputEngineType= document.getElementById("input-engine_type");
    let inputLicensePlate= document.getElementById("input-license_plate");

    console.log(inputCustomerID.value, "Line 21");
    
    // Get the values from the form fields (user inputs)
    let CustomerID_Value = inputCustomerID.value;
    let VinNumberValue = inputVinNumber.value;
    let MakeValue = inputMake.value;
    let ModelValue = inputModel.value;
    let YearValue = inputYear.value;
    let MilageValue = inputMilage.value;
    let TrimValue = inputTrim.value;
    let EngineTypeValue = inputEngineType.value;
    let LicensePlateValue =inputLicensePlate.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_id: CustomerID_Value,
        vin_number: VinNumberValue,
        make: MakeValue,  
        model: ModelValue,
        year: YearValue,
        mileage : MilageValue,
        trim :TrimValue,
        engine_type: EngineTypeValue,
        license_plate: LicensePlateValue
    }
    
console.log("from add_customer_vehicle js page")


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-vehicle-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.response, "from customer_vehicle js")
            // Add the new data to the table
            // addRowToTable(xhttp.response);

            location.reload()
            // Clear the input fields for another transaction
            inputVinNumber.value = '';
            inputMake.value = '';
            inputModel.value = '';
            inputYear.value = '';
            inputMilage.value = '';
            inputTrim.value = '';
            inputEngineType.value = '';
            inputLicensePlate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customers-vehcile-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 10 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    // let customeridCell = document.createElement("TD");
    let vinNumberCell = document.createElement("TD");
    let makeCell = document.createElement("TD");
    let modelCell = document.createElement("TD");
    let yearCell = document.createElement("TD");
    let milageCell = document.createElement("TD");
    let trimCell = document.createElement("TD");
    let engineTypeCell  = document.createElement("TD");
    let licensePlateCell  = document.createElement("TD");

    // Fill the cells with correct data
    // customeridCell.innerText = newRow.id;
    idCell.innerText = newRow.id;
    vinNumberCell.innerText = newRow.vin_number;
    makeCell.innerText = newRow.make;
    modelCell.innerText = newRow.model;
    yearCell.innerText  = newRow.year;
    milageCell.innerText = newRow.mileage;
    trimCell.innerText = newRow.trim;
    engineTypeCell.innerText = newRow.engine_type;
    licensePlateCell.innerText  = newRow.license_plate;

    // Add the cells to the row 
    // row.appendChild(customeridCell);
    row.appendChild(idCell);
    row.appendChild(vinNumberCell);
    row.appendChild(makeCell);
    row.appendChild(modelCell);
    row.appendChild(yearCell);
    row.appendChild(milageCell);
    row.appendChild(trimCell);
    row.appendChild(engineTypeCell);
    row.appendChild(licensePlateCell);

    // Add the row to the table
    currentTable.appendChild(row);
}


function updateCustomerVehicle(ID, vin_number,make,model,year,milage,trim,engine_type,license_plate) {

    console.log(ID,vin_number,make,model,year,milage,trim,engine_type,license_plate,"from updatecustomerVehicle")
    
    // adds a attribute to the form with the service rep id to use it in delete query later.
    let addUpdatedCustomerVehicleForm = document.getElementById("update_customer_vehicle_form");
    addUpdatedCustomerVehicleForm.setAttribute("customer_vehicle_id_added",ID)

    let updateForm = document.getElementById("update_customer_vehicle_form")
    updateForm.classList.remove("hidden")
   
    
    // choose the form elements by ID on the update form
    let inputVinNumber = document.getElementById("input-vin_number");
    let inputMake = document.getElementById("input-make");
    let inputModel = document.getElementById("input-model");
    let inputYear= document.getElementById("input-year");
    let inputMilage= document.getElementById("input-mileage");
    let inputTrim= document.getElementById("input-trim");
    let inputEngineType= document.getElementById("input-engine_type");
    let inputLicensePlate= document.getElementById("input-license_plate");


    // prepopulate the data for the form fields
    inputVinNumber.value = vin_number
    inputMake.value = make
    inputModel.value = model
    inputYear.value = year
    inputMilage.value = milage
    inputTrim.value = trim
    inputEngineType.value = engine_type
    inputLicensePlate.value = license_plate

}

function closeUpdateForm (){
    let updateForm = document.getElementById("update-customer-vehicle-form")
    updateForm.classList.add("hidden")
}