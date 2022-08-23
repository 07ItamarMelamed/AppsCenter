
//import {applications} from './applications.js';
//import { SHUTDOWN_MP3_PATH, HELP_IMAGE_PATH } from './definitions.js';
//import {servDeleteApp, servLoadApps} from '../services/applicationService.js';

let currAppList;

const playSound = (videoFile) => {
  const audio = new Audio(videoFile);
  audio.play();
};

const setDefaultApps = async () => {
  currAppList.forEach(app => {
    servDeleteApp(app.id).then(() => {
      console.log(`removed app ${app.name}`);
    });
  });
  applications.forEach((app) => {
    servAddApp(app).then(() => {
      console.log(`added app ${app.name}`);
      if (app.name === "getTaxi") {
        refreshList();
        console.log("refreshed list");
      }
    });
  });
};

const removeItemFromTheList = (id) => {
  servDeleteApp(id)
  .then(() => {
    $(`#deleteConfirmation${id}`).modal("hide");
    refreshList();
    playSound(SHUTDOWN_MP3_PATH);
  });
};

const refreshList = () => {
  servLoadApps()
  .then((res) => {
    currAppList = res;
  })
  .then(() => {
    setAppsList(document.querySelector("#appsSearch").value);
  });
};

const setAppsList = (filter = "") => {
  let filterBy, name, image, desc, companyName;
  filterBy = String(filter).toUpperCase();
  document.getElementById("appsList").innerHTML = currAppList
  .map((app) => (app = `<option value=${app.name}></option>`))
  .join("");
  document.getElementById("listAllApps").innerHTML = currAppList
  .map((app) => {
    image =
      app.imageUrl === "" ? HELP_IMAGE_PATH : `${app.imageUrl}`;
    desc = app.desc === "" ? "this app does not have description" : app.desc;
    companyName =
      app.companyName === ""
        ? "this app does not have a company"
        : app.companyName;
    name = app.name;
    if ((name.toUpperCase().indexOf(filterBy) > -1) || !filterBy) {
      return `
              <div class="card mb-3 border border-5 border-dark center appCard">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${image}" class="img-fluid rounded-circle appCardImage" alt="${app.name}">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <button type="button" class="btn btn-danger rounded-circle float-end deleteButton" data-bs-toggle="modal" data-bs-target="#deleteConfirmation${app.id}">🗑</button>
              
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
                      <h6 class="card-text">${desc}</h6>
                      <h8 class="card-text smallCardText">Price:${app.price}$</h8>
                      <h8 class="card-text smallCardText">Company name:${companyName}</h8>
                      <h8 class="card-text smallCardText">Created At: ${app.createdAt}</h8>
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

document.addEventListener("DOMContentLoaded", () => {
  servLoadApps()
  .then((res) => {
    currAppList = res;
  })
  .then(() => {
    setAppsList();
  });
});
