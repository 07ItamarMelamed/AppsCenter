"use strict";

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

const moveToMainPage = () => {
  const name = document.getElementById("nameInput");
  const price = document.getElementById("priceInput");
  const desc = document.getElementById("descInput");
  const company = document.getElementById("companyInput");
  const image = document.getElementById("imageInput");
  const imageFile = document.getElementById("imageInput")?.files[0]?.name ? document.getElementById("imageInput").files[0].name : '';
  if (
    name.checkValidity() &&
    price.checkValidity() &&
    desc.checkValidity() &&
    company.checkValidity() &&
    image.checkValidity()
  ) {
    addItemToTheList({
      id: getNextId(),
      imageUrl: imageFile,
      name: name.value,
      price: price.value,
      desc: desc.value,
      companyName: company.value
    });
    location.assign("mainPage.html");
  }
};

const setFieldsValidation = () => {
  let forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach((form) => {
    form.classList.add("was-validated");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setFieldsValidation();
});
