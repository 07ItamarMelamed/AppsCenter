const addItemToTheList = (data) => {
  localStorage.setItem(
    "applications",
    JSON.stringify(
      JSON.parse(localStorage.getItem("applications")).concat(data)
    )
  );
};

const getNextId = () => {
  let id = localStorage.getItem("id");
  localStorage.setItem("id", ++id);

  return id;
};

document.addEventListener("DOMContentLoaded", () => {
    
});

let check = [false, false, false, false, false];

const checkName = (event) => {
  let form = document.getElementById('nameInput');
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  form.classList.add('was-validated');
};

const checkPrice = (event) => {
    let form = document.getElementById('nameInput');
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
  
    form.classList.add('was-validated');
  };

const checkDesc = (event) => {
    let form = document.getElementById('nameInput');
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
  
    form.classList.add('was-validated');
  };

const checkCompany = (event) => {
    let form = document.getElementById('nameInput');
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
  
    form.classList.add('was-validated');
  };

const checkImage = (event) => {
    let form = document.getElementById('nameInput');
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
  
    form.classList.add('was-validated');
  };

const checkAllFields = () => {
  if (check[0] && check[1] && check[2] && check[3] && check[4]) {
    location.assign("mainPage.html");
  } else {
    alert("Some fields are empty.\nCheck once more.");
  }
};

(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()