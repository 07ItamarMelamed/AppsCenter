const { pool } = require("./database");

const FACEBOOK_IMAGE_PATH = "../assets/images/facebook.png";
const TWITTER_IMAGE_PATH = "../assets/images/twitter.png";
const INSTAGRAM_IMAGE_PATH = "../assets/images/instagram.jpg";
const WAZE_IMAGE_PATH = "../assets/images/waze.png";
const WHATSAPP_IMAGE_PATH = "../assets/images/whatsapp.png";
const GETTAXI_IMAGE_PATH = "../assets/images/getTaxi.png";

const defaultApps = [
  {
    id: "Uakgb_J5m9g-0JDMbcJqL",
    imageUrl: FACEBOOK_IMAGE_PATH,
    name: "Facebook",
    price: 2.99,
    desc: "To see whats new in your friends life!",
    companyName: "Facebook",
    createdAt: "2022-08-22",
  },
  {
    id: "V1StGXR8_Z5jdHi6B-myT",
    imageUrl: TWITTER_IMAGE_PATH,
    name: "Twitter",
    price: 5,
    desc: "To see whats new in your friends life!",
    companyName: "TwitterC",
    createdAt: "2022-08-22",
  },
  {
    id: "OswYhi05XGsxYqyGGjenk",
    imageUrl: INSTAGRAM_IMAGE_PATH,
    name: "Instagram",
    price: 2,
    desc: "To talk with your friends!",
    companyName: "Instagram",
    createdAt: "2022-08-22",
  },
  {
    id: "ZLyrwiz_1IXq6F9qKQKqQ",
    imageUrl: WAZE_IMAGE_PATH,
    name: "waze",
    price: 6.66,
    desc: "To go to see your friends!",
    companyName: "Israel",
    createdAt: "2022-08-22",
  },
  {
    id: "CoQEzUWP1TM3O2KJhZh2H",
    imageUrl: WHATSAPP_IMAGE_PATH,
    name: "Whatsapp",
    price: 7,
    desc: "To talk to your friends!",
    companyName: "facebook",
    createdAt: "2022-08-22",
  },
  {
    id: "NCvsMgtkQYiOvTzp63oSs",
    imageUrl: GETTAXI_IMAGE_PATH,
    name: "GetTaxi",
    price: 5.99,
    desc: "To take a taxi!",
    companyName: "KahMonit (C)",
    createdAt: "2022-08-22",
  },
];

const querySet = async (queryText, values = []) => {
  try {
    //connectClient();
    await pool.query(queryText, values);
  } catch (err) {
    throw new Error(err.message);
  } finally {
    //closeClient();
  }
};

const queryGet = async (queryText, values = []) => {
  try {
    //connectClient();
    return await pool
      .query(queryText, values)
      .then((res) => {
        //console.log(res.rows);
        return res.rows;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    throw new Error(err.message);
  } finally {
    //closeClient();
  }
};

const updateApp = async (id, app) => {
  await querySet(
    `UPDATE "AppsCenter".applications SET "imageUrl" = $2, "name" = $3, "price" = $4, "desc" = $5, "companyName" = $6, "createdAt" = $7 WHERE "id" = $1`,
    [
      id,
      app.imageUrl,
      app.name,
      app.price,
      app.desc,
      app.companyName,
      app.createdAt,
    ]
  );
};

const getApps = async () => {
  return await queryGet(`SELECT * FROM "AppsCenter".applications`);
};

const insertApp = async (app) => {
  await querySet(
    `INSERT INTO "AppsCenter".applications("id", "imageUrl", "name", "price", "desc", "companyName", "createdAt") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      app.id,
      app.imageUrl,
      app.name,
      app.price,
      app.desc,
      app.companyName,
      app.createdAt,
    ]
  );
};

const addDefaultApps = async () => {
  await querySet(`DELETE FROM "AppsCenter".applications`);
  await querySet(`INSERT INTO "AppsCenter".applications("id", "imageUrl", "name", "price", "desc", "companyName", "createdAt") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
  [defaultApps[0].id, defaultApps[0].imageUrl, defaultApps[0].name, defaultApps[0].price, defaultApps[0].desc, defaultApps[0].companyName, defaultApps[0].createdAt]);
  await querySet(`INSERT INTO "AppsCenter".applications("id", "imageUrl", "name", "price", "desc", "companyName", "createdAt") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
  [defaultApps[1].id, defaultApps[1].imageUrl, defaultApps[1].name, defaultApps[1].price, defaultApps[1].desc, defaultApps[1].companyName, defaultApps[1].createdAt]);
  await querySet(`INSERT INTO "AppsCenter".applications("id", "imageUrl", "name", "price", "desc", "companyName", "createdAt") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, 
  [defaultApps[2].id, defaultApps[2].imageUrl, defaultApps[2].name, defaultApps[2].price, defaultApps[2].desc, defaultApps[2].companyName, defaultApps[2].createdAt]);
  await querySet(`INSERT INTO "AppsCenter".applications("id", "imageUrl", "name", "price", "desc", "companyName", "createdAt") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
  [defaultApps[3].id, defaultApps[3].imageUrl, defaultApps[3].name, defaultApps[3].price, defaultApps[3].desc, defaultApps[3].companyName, defaultApps[3].createdAt]);
  await querySet(`INSERT INTO "AppsCenter".applications("id", "imageUrl", "name", "price", "desc", "companyName", "createdAt") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, 
  [defaultApps[4].id, defaultApps[4].imageUrl, defaultApps[4].name, defaultApps[4].price, defaultApps[4].desc, defaultApps[4].companyName, defaultApps[4].createdAt]);
  await querySet(`INSERT INTO "AppsCenter".applications("id", "imageUrl", "name", "price", "desc", "companyName", "createdAt") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
  [defaultApps[5].id, defaultApps[5].imageUrl, defaultApps[5].name, defaultApps[5].price, defaultApps[5].desc, defaultApps[5].companyName, defaultApps[5].createdAt]);
};

const getAppById = async (id) => {
  return await queryGet(
    `SELECT * FROM "AppsCenter".applications WHERE "id" = $1`,
    [id]
  );
};

const deleteAppById = async (id) => {
  await querySet(`DELETE FROM "AppsCenter".applications WHERE "id" = $1`, [id]);
};

module.exports = {
  updateApp,
  getApps,
  insertApp,
  getAppById,
  deleteAppById,
  addDefaultApps,
};
