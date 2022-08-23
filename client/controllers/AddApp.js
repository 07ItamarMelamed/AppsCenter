//import { STARTUP_MP3_PATH } from "./definitions.js";
//import {servAddApp} from '../services/applicationService.js';
//import {playSound, refreshList} from '../controllers/main.js';

const addForm = (
  id,
  label,
  name,
  placeholder,
  isRequired,
  maxlength = 10000,
  minlength = 0,
  pattern = "*",
  feedback = ""
) => {
  const reqString = isRequired ? "required" : "";
  const feedString =
    feedback === "" ? "" : `<div class="invalid-feedback">${feedback}</div>`;
  document.querySelector(".newForms").innerHTML = document
    .querySelector(".newForms")
    .innerHTML.concat(
      `<div class="row-md-4">
      <label for="${id}" class="form-label py-2">${label}</label>
      <div class="input-group has-validation">
        <input
          type="text"
          class="form-control"
          id="${id}"
          name="${name}"
          placeholder="${placeholder}"
          aria-describedby="inputGroupPrepend"
          maxlength="${maxlength}"
          minlength="${minlength}"
          pattern=${pattern}
          ${reqString}
        />
        ${feedString}
      </div>
    </div>`
    );
};

const onSubmit = () => {
  const name = document.getElementById("nameInput");
  const price = document.getElementById("priceInput");
  const desc = document.getElementById("descInput");
  const company = document.getElementById("companyInput");
  const image = document.getElementById("imageInput");
  if (
    name.checkValidity() &&
    price.checkValidity() &&
    desc.checkValidity() &&
    company.checkValidity() &&
    image.checkValidity()
  ) {
    servAddApp({
      imageUrl: image.value,
      name: name.value,
      price: price.value,
      desc: desc.value,
      companyName: company.value,
    }).then(() => {
      $("#addPageModal").modal("hide");
      playSound(STARTUP_MP3_PATH);
      refreshList();
    });
  } else {
    let forms = document.querySelectorAll(".needs-validation");

    Array.prototype.slice.call(forms).forEach((form) => {
      form.classList.add("was-validated");
    });
  }
};

const setFields = () => {
  addForm(
    "nameInput",
    "App Name:",
    "name",
    "Name",
    true,
    30,
    4,
    "\\w*",
    "Must have at least 4 characters from letters and numbers."
  );
  addForm(
    "priceInput",
    "App Price:",
    "price",
    "Price in $",
    true,
    10000,
    0,
    "\\d*\\.*\\d+",
    "Insert a number."
  );
  addForm(
    "descInput",
    "App Description:",
    "description",
    "Description",
    false,
    500
  );
  addForm("companyInput", "Company:", "companyName", "Company Name", false, 30);
  addForm("imageInput", "Image URL:", "ImageUrl", "Image URL", false, 300);
};

document.addEventListener("DOMContentLoaded", () => {
  setFields();
});
