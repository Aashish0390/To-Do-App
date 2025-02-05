


//  Updated the functionality of the search, sorting and filtering of the cards based on their inputs

var todoArray = JSON.parse(localStorage.getItem('cards')) || [];
var editId = null;

// Function to set errors on the form fields
function setError(id, error) {
  let field = document.getElementById(id);
  field.getElementsByClassName("text-ip")[0].innerHTML = error;
}

// Function to clear errors from the form fields
// function clearErrors(id) {
//   let field = document.getElementById(id);
//   field.getElementsByClassName("text-ip")[0].innerHTML = "";
// }
function clearErrors(id) {
  let field = document.getElementById(id);
  if (field) {
    let errorElement = field.getElementsByClassName("text-ip")[0];
    if (errorElement) {
      errorElement.innerHTML = "";
    }
  }
}

// Function to validate the form inputs
function validateForm() {
  var returnvalue = true;
  var name = document.forms["myForm"]["text"].value;
  var textra = document.forms["myForm"]["task-description"].value;
  var prior = document.forms["myForm"]["priority"].value;
  var stat = document.forms["myForm"]["status"].value;

  if (!name || name.length >= 20) {
    setError("name", "*Please enter a valid name.");
    return false;
  } else {
    clearErrors("name");
  }

  if (!textra || textra.length >= 50) {
    setError("textra", "*Please add a valid description.");
    return false;
  }

  if (!prior) {
    setError("prior-ip", "*Please specify the priority!");
    return false;
  }

  if (!stat) {
    setError("stat-ip", "*Please specify the status!");
    return false;
  }

  var varDate = document.forms["myForm"]["date"].value;
  if (!varDate) {
    setError(
      "date-field",
      "*Please enter a valid date between 01-01-1990 and 31-12-2050."
    );
    return false;
  }

  var selectedDate = new Date(varDate);
  var minDate = new Date("1990-10-01");
  var maxDate = new Date("2050-12-31");

  if (selectedDate < minDate || selectedDate > maxDate) {
    setError(
      "date",
      "*Please enter a valid date between 01-01-1990 and 31-12-2050."
    );
    return false;
  }

  return returnvalue;
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();
  var isError = validateForm();
  if (!isError) {
    return;
  }

  let objForm = {
    // object of the given inputs
    id: editId ? editId : Date.now(),
    name: document.forms["myForm"]["text"].value,
    discription: document.forms["myForm"]["task-description"].value,
    priority: document.forms["myForm"]["priority"].value,
    status: document.forms["myForm"]["status"].value,
    date: document.forms["myForm"]["date"].value,
  };



  if (editId) {
    todoArray = todoArray.map((currentValue) => {
      if (currentValue.id === editId) {
        return objForm;
      }
      return currentValue;
    });
  } else {
    todoArray.push(objForm);
  }

  editId = null;
  localStorage.setItem("cards", JSON.stringify(todoArray));

  renderTasks(todoArray);  
  // render tasks after adding or updating a task
}

// Function to filter tasks based on searched input
document.querySelector(".search-text").addEventListener("input", function (event) {
let searchValue = event.target.value.trim().toLowerCase(); 
console.log(searchValue);
  if (searchValue === "") {
    
    renderTasks(todoArray); // Show all tasks when search bar is empty
  } else {
    filterTasks(searchValue); // Filter tasks when there is any input given
  }
});

// This function to filter search

function filterTasks(searchValue) {
  // console.log("print")
  // Filter tasks from todoArray where the task name  matches the search 
  const filteredTasks = todoArray.filter(task => 
    task.name.toLowerCase().includes(searchValue) || 
    task.discription.toLowerCase().includes(searchValue)
  );
// console.log(filteredTasks)
  renderTasks(filteredTasks); 
}


// function for status filteration



function statusOrder(statusValue) {
  console.log(statusValue, todoArray)
  if (statusValue ==="") {
    renderTasks(todoArray);
    return;
  }
console.log(statusValue)
console.log(statusValue.toLowerCase())

  let filteredTasks = todoArray.filter( task =>  task.status.toLowerCase() === statusValue.toLowerCase());
 
  console.log("Filtered Tasks by status", filteredTasks);
  
  renderTasks(filteredTasks);
}
document.getElementById("filter-stat").addEventListener("change", function () {
  let selectedStatus = this.value.trim().toLowerCase(); 
  console.log("hello this is working")
  statusOrder(selectedStatus);  
  console.log(selectedStatus);
});


// function for Priority filteration


document.getElementById("filter-prior").addEventListener("change", function () {
  let selectedPriority = this.value;
  priorityOrder(selectedPriority);  
});

function priorityOrder(priorityValue) {
  if (priorityValue === "") {
    renderTasks(todoArray);
    return;
  }
  let filteredTasks = todoArray.filter(task => task.priority.toLowerCase() === priorityValue.toLowerCase());
  console.log("Filtered Tasks", filteredTasks);
  
  renderTasks(filteredTasks);
}




// Function to render tasks on the page
function renderTasks(tasks) {
  document.getElementById("flex-box").innerHTML = "";

  tasks.forEach(function (currentValue) {
    const parentCard = document.createElement("div");
    parentCard.className = "div-content";

    var headText = document.createElement("h1");
    headText.className = "card-input";
    headText.innerText = currentValue.name;

    var descriptionText = document.createElement("p");
    descriptionText.className = "parag-input";
    descriptionText.innerText = currentValue.discription;

    var priorityText = document.createElement("span");
    priorityText.className = "prior-input";
    if (currentValue.priority === "High") {
      priorityText.className = "priority-high";
    } else if (currentValue.priority === "Medium") {
      priorityText.className = "priority-medium";
    } else {
      priorityText.className = "priority-low";
    }
    priorityText.innerText = currentValue.priority + " Priority";

    var statusText = document.createElement("p");
    statusText.className = "stat-input";
    statusText.innerText = currentValue.status;

    var endText = document.createElement("p");
    endText.className = "last-input";
    endText.innerText = currentValue.date;

    const parentButton = document.createElement("div");
    parentButton.className = "ed-dl";

    var editText = document.createElement("button");
    editText.className = "edit-input";
    editText.innerText = "Edit";

    editText.addEventListener("click", function () {
      const data = todoArray.find((del) => del.id === currentValue.id);
      document.forms["myForm"]["text"].value = data["name"];
      document.forms["myForm"]["task-description"].value = data["discription"];
      document.forms["myForm"]["priority"].value = data["priority"];
      document.forms["myForm"]["status"].value = data["status"];
      document.forms["myForm"]["date"].value = data["date"];
      editId = data.id;
    });

    var deleteText = document.createElement("button");
    deleteText.className = "delete-input";
    deleteText.innerText = "Delete";

    deleteText.addEventListener("click", function () {
      todoArray = todoArray.filter((del) => del.id !== currentValue.id);
      localStorage.setItem("cards", JSON.stringify(todoArray));
      renderTasks(todoArray);  // Re-render card after deletion
    });

    parentButton.append(editText, deleteText);

    parentCard.append(
      headText,
      descriptionText,
      priorityText,
      statusText,
      endText,
      parentButton
    );

    document.getElementById("flex-box").append(parentCard);
  });
}


// render when the searched caed loads
renderTasks(todoArray);
