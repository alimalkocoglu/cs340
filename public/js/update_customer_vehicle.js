// Get the objects we need to modify
let addupdateCustomerVehicle = document.getElementById('update-customer-vehicle-form-ajax');

// Modify the objects we need
addupdateCustomerVehicle.addEventListener("submit", function (e) {
    console.log("SHOULD BE THE DATA vehicle ID",e.target.getAttribute("vehicle_id_added"))

    // Prevent the form from submitting
    e.preventDefault();


    // Get form fields we need to get data from
    let inputCustomerID = document.getElementById("update-customer-ajax-custvehicle")
    let inputVinNumber = document.getElementById("update-vin_number");
    let inputMake = document.getElementById("update-make");
    let inputModel = document.getElementById("update-model");
    let inputYear= document.getElementById("update-year");
    let inputMilage= document.getElementById("update-mileage");
    let inputTrim= document.getElementById("update-trim");
    let inputEngineType= document.getElementById("update-engine_type");
    let inputLicensePlate= document.getElementById("update-license_plate");


    // Get the values from the form fields
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
        license_plate: LicensePlateValue,
        vehicle_id: e.target.getAttribute("vehicle_id_added")
    }
    
    // Setup our AJAX request

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-customer-vehicle-ajax", true);
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

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

