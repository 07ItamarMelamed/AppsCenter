"use strict";

const playSound = (videoFile) => {
  const audio = new Audio(videoFile);
  audio.play();
};

const getData = () => {
  if (localStorage.getItem("applications") == null) {
    setDefaultApps();
  }

  return JSON.parse(localStorage.getItem("applications"));
};

const setDefaultApps = () => {
  localStorage.setItem("applications", JSON.stringify(applications));
  localStorage.setItem("id", id);
  setAppsList(document.querySelector("#appsSearch").value, true);
};

const removeItemFromTheList = (id) => {
  let newAppList = JSON.parse(localStorage.getItem("applications"));
  const index = newAppList.indexOf(newAppList.find((app) => app.id === id));
  newAppList.forEach((app) => {
    if (newAppList.indexOf(app) === index) {
      app.id = -100;
    } else if (newAppList.indexOf(app) > index) {
      app.id--;
    }
  });
  localStorage.setItem(
    "applications",
    JSON.stringify(newAppList.filter((app) => app.id !== -100))
  );
  $(`#deleteConfirmation${id}`).modal("hide");
  setAppsList(document.querySelector("#appsSearch").value, true);
  playSound("../assets/sounds/windows_shutdown.mp3");
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
        app.imageUrl === "" ? "../assets/images/Help.png" : `${app.imageUrl}`;
      desc = app.desc === "" ? "this app does not have description" : app.desc;
      companyName =
        app.companyName === ""
          ? "this app does not have a company"
          : app.companyName;
      name = app.name;
      if ((option && name.toUpperCase().indexOf(filter) > -1) || !option) {
        return `
                <div class="card mb-3 border border-5 border-dark center" style="max-width: 550px; max-height: 300px;">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src="${image}" class="img-fluid rounded-circle" style="width: 180px;" alt="${app.name}">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <button type="button" class="btn btn-danger rounded-circle float-end" style="margin-top: 80px; padding-top: 11px; width: 45px; height: 45px;" data-bs-toggle="modal" data-bs-target="#deleteConfirmation${app.id}">🗑</button>
                
                        <div class="modal fade" id="deleteConfirmation${app.id}" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="deleteConfirmation${app.id}label" aria-hidden="true">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="deleteConfirmation${app.id}label">Delete ${app.name}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                Are you sure about deleting ${app.name}?
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" onclick="removeItemFromTheList(${app.id})" class="btn btn-danger">Delete</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h2 class="card-title">${app.name}</h2>
                        <p class="card-text">${desc}</p>
                        <p class="card-text"><small class="text-muted">Price:${app.price}$</small></p>
                        <p class="card-text"><small class="text-muted">Company name:${companyName}</small></p>
                      </div>
                    </div>
                  </div>
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
