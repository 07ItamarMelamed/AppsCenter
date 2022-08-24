
let currAppList = [];

const playSound = (videoFile) => {
  const audio = new Audio(videoFile);
  audio.play();
};

const setDefaultApps = () => {
  servSetDefaultApps();
  currAppList = defaultApps;
  refreshList();
};

const removeItemFromTheList = (id) => {
  servDeleteApp(id);
  currAppList = currAppList.filter((app) => app.id !== id);
  playSound(SHUTDOWN_MP3_PATH);
  refreshList();
  $(`#deleteConfirmation${id}`).modal("hide");
};

const refreshList = (clearSearch = false) => {
  const filter = clearSearch === false ? document.querySelector("#appsSearch").value : "";
  setAppsList(filter);
};

const firstTimeList = () => {
  servLoadApps().then((res) => {
    currAppList = res;
    setAppsList();
  });
}

const setAppsList = (filter = "") => {
  let filterBy, name, image, desc, companyName, id;
  filterBy = String(filter).toUpperCase();
  document.getElementById("appsList").innerHTML = currAppList
    .map((app) => (app = `<option value=${app.name}></option>`))
    .join("");
  document.getElementById("listAllApps").innerHTML = currAppList
    .map((app) => {
      image = app.imageUrl === "" ? HELP_IMAGE_PATH : `${app.imageUrl}`;
      desc = app.desc === "" ? "this app does not have description" : app.desc;
      companyName =
        app.companyName === ""
          ? "this app does not have a company"
          : app.companyName;
      name = app.name;
      id = String(app.id);
      if (name.toUpperCase().indexOf(filterBy) > -1 || !filterBy) {
        return `
              <div class="card mb-3 border border-5 border-dark center appCard">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${image}" class="img-fluid rounded-circle appCardImage" alt="${app.name}">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <button type="button" class="btn btn-danger rounded-circle float-end deleteButton" data-bs-toggle="modal" data-bs-target="#deleteConfirmation${id}">🗑</button>
              
                      <div class="modal fade" id="deleteConfirmation${id}" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="deleteConfirmation${id}label" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="deleteConfirmation${id}label">Delete ${app.name}</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              Are you sure about deleting ${app.name}?
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                              <button type="button" onclick="removeItemFromTheList('${id}')" class="btn btn-danger" data-bs-dismiss="modal">Delete</button>
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
  firstTimeList();
});
