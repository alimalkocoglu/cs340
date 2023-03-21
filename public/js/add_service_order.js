// Get the objects we need to modify
// get the changes on the drop down.
let customer_dropdown = document.getElementById('input-customer-ajax-service-orders');
// Modify the objects we need
customer_dropdown.addEventListener("change", function (e) {
console.log(e.target.value, " line 6 customer id")
    // Prevent the form from submitting
    e.preventDefault();

    

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    // sends the customer id as a param.
    xhttp.open("get", `/customer_vehicles/${e.target.value}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("37 customer  vehicle",typeof xhttp.response)
            add_customer_vehicle(JSON.parse(xhttp.response))

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send();

})

function add_customer_vehicle(cust_vehicles) { 
    let dropdown = document.getElementById('input-vehicle-ajax-service-orders') 
    dropdown.innerHTML = '<option value="">Select a vehicle</option>'

    for(let vehicle of cust_vehicles){
        let option = document.createElement("option")
        option.setAttribute("value",vehicle.vehicle_id)
        option.textContent=`${vehicle.make} ${vehicle.model} ${vehicle.year}`
        dropdown.appendChild(option)
    }
}

// Get the objects we need to modify
let addServiceOrderForm = document.getElementById('add-service-order-form-ajax');
// Modify the objects we need
addServiceOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from (html id's must match the corresponding form fields.)
    let inputServiceRep = document.getElementById("input-rep-ajax-service-orders");
    let inputCustomerID = document.getElementById("input-customer-ajax-service-orders");
    let inputVehicleID = document.getElementById("input-vehicle-ajax-service-orders");

    // Get the values from the form fields (user inputs)
    let serviceRepID = inputServiceRep.value;
    let customerID = inputCustomerID.value;
    let vehicleID = inputVehicleID.value;

    // Put our data we want to send in a javascript object
    let data = {
        service_rep_id: serviceRepID,
        customer_id: customerID,
        vehicle_id: vehicleID,  
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-serviceorders-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("37 add servie",xhttp.response)
            // Add the new data to the table
            //addRowToTable(xhttp.response);
            location.reload()
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateServiceOrder(ID) {

    let updateForm = document.getElementById("update_service_order_form")
    let updateh2 = document.getElementById("h2forUpDate")
    // dynamically populate the service order ID
    updateh2.textContent = `Updating service order ${ID}`
    updateForm.classList.remove("hidden")

    // adds a attribute to the form with the service order ID to use it in delete or update query later.
    let addUpdatedServiceOrderForm = document.getElementById('update-service-order-form-ajax');
    addUpdatedServiceOrderForm.setAttribute("order_id_added",ID)
}

function closeUpdateForm (){
    let updateForm = document.getElementById("update_service_order_form")
    updateForm.classList.add("hidden")
}


function addRemoveItems(id){
    closeUpdateForm()
    // open the service_order_details page with the service_order_id
    window.location.href = `/service_order_details?order_id=${id}`
  

}