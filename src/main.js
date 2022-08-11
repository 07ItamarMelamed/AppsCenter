'use strict';

const getData = () => {
  if (localStorage.getItem("applications") == null) {
    localStorage.setItem("applications", JSON.stringify(applications));
    localStorage.setItem("id", id);
  }

  return JSON.parse(localStorage.getItem("applications"));
};

const setAppsList = (value, option = false) => {
  let input, filter, appsData, name, image, desc, companyName;
  input = option ? String(value) : "";
  filter = input.toUpperCase();
  appsData = getData();

  document.getElementById("appsList").innerHTML = appsData
    .map((app) => (app = `<option value=${app.name}></option>`))
    .join("");
  document.getElementById("listAllApps").innerHTML = appsData
    .map((app) => {
      image =
        app.imageUrl === ''
          ? `images/Help.png`
          : `images/${app.id}/${app.imageUrl}`;
      desc =
        app.desc === ''
          ? "this app does not have description"
          : app.desc;
      companyName =
        app.companyName === ''
          ? "this app does not have a company"
          : app.companyName;
      name = app.name;
      if ((option && name.toUpperCase().indexOf(filter) > -1) || !option) {
        return `<img
                src="${image}"
                style="width: 15%; float:left; padding-right: 1rem; padding-top: 35px;"
                class="rounded-circle"
                alt="${app.name}"
            />
            <div class="container" style="display:inline;">
                <h1 style="font-size: 3rem; margin-bottom: 1px">${app.name}</h1>
                <p style="font-size: 2rem; margin-bottom: 1px">${desc}</p>
                <p style="font-size: 1rem; margin-bottom: 1px">Price:${app.price}$</p>
                <p style="font-size: 1rem;">Company name:${companyName}</p>
            </div>`;
      } else {
        return "";
      }
    })
    .join("");
};

document.addEventListener("DOMContentLoaded", (event) => {
  setAppsList(event);
});
