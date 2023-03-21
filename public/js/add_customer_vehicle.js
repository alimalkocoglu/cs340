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


function updateCustomerVehicle(ID,customer_id,vin_number,make,model,year,milage,trim,engine_type,license_plate) {

    console.log(ID,vin_number,make,model,year,milage,trim,engine_type,license_plate,"from updatecustomerVehicle")
    
    // adds a attribute to the form with the service rep id to use it in delete query later.
    let addUpdatedCustomerVehicleForm = document.getElementById("update-customer-vehicle-form-ajax");
    addUpdatedCustomerVehicleForm.setAttribute("vehicle_id_added",ID)

    let updateForm = document.getElementById("update_customer_vehicle_form")
    updateForm.classList.remove("hidden")
   
    
    // choose the form elements by ID on the update form
    let inputVinNumber = document.getElementById("update-vin_number");
    let inputMake = document.getElementById("update-make");
    let inputModel = document.getElementById("update-model");
    let inputYear= document.getElementById("update-year");
    let inputMilage= document.getElementById("update-mileage");
    let inputTrim= document.getElementById("update-trim");
    let inputEngineType= document.getElementById("update-engine_type");
    let inputLicensePlate= document.getElementById("update-license_plate");


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