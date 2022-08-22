"use strict";

import {applications} from './applications';
import { SHUTDOWN_MP3_PATH, HELP_IMAGE_PATH } from './definitions';
import {servDeleteApp, servLoadApps} from '../services/applicationService';

const playSound = (videoFile) => {
  const audio = new Audio(videoFile);
  audio.play();
};

const setDefaultApps = () => {
  localStorage.setItem("applications", JSON.stringify(applications));
  refreshList();
};

const removeItemFromTheList = (id) => {
  servDeleteApp(id);
  $(`#deleteConfirmation${id}`).modal("hide");
  refreshList();
  playSound(SHUTDOWN_MP3_PATH);
};

const refreshList = () => {
  setAppsList(document.querySelector("#appsSearch").value);
}

const setAppsList = (filter = "") => {
  let filterBy, name, image, desc, companyName;
  filterBy = String(filter).toUpperCase();
  appsData = servLoadApps();

  document.getElementById("appsList").innerHTML = appsData
    .map((app) => (app = `<option value=${app.name}></option>`))
    .join("");
  document.getElementById("listAllApps").innerHTML = appsData
    .map((app) => {
      image =
        app.imageUrl === "" ? HELP_IMAGE_PATH : `${app.imageUrl}`;
      desc = app.desc === "" ? "this app does not have description" : app.desc;
      companyName =
        app.companyName === ""
          ? "this app does not have a company"
          : app.companyName;
      name = app.name;
      if ((name.toUpperCase().indexOf(filterBy) > -1) || !filterBy === "") {
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
                        <p class="card-text"><small class="text-muted">Created At: ${app.createdAt}</small></p>
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
  setAppsList();
});
