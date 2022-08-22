const { pool, closeClient, connectClient } = require("./database");

const querySet = async (queryText, values = []) => {
    try {
        connectClient();
        await pool.query(queryText, values);
    } catch (err) {
        throw new Error(err.message);
    } finally {
        closeClient();
    }
};

const queryGet = async (queryText, values = []) => {
    try {
        connectClient();
        return await pool
            .query(queryText, values)
            .then((res) => {
                console.log(res.rows);
                return res.rows;
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        throw new Error(err.message);
    } finally {
        closeClient();
    }
};

const updateApp = async (app) => {
  await querySet(
    `UPDATE "AppsCenter".applications SET "id" = $1, "imageUrl" = $2, "name" = $3, "price" = $4, "desc" = $5, "companyName" = $6, "createdAt" = $7 WHERE "id" = $1`,
    [app.id, app.imageUrl, app.name, app.price, app.desc, app.companyName, app.createdAt]
  );
};

const getApps = async () => {
  return await queryGet(`SELECT * FROM "AppsCenter".applications`);
};

const insertApp = async (app) => {
  await querySet(
    `INSERT INTO "AppsCenter".applications("id", "imageUrl", "name", "price", "desc", "companyName", "createdAt") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [app.id, app.imageUrl, app.name, app.price, app.desc, app.companyName, app.createdAt]
  );
};

const getAppById = async (id) => {
  return await queryGet(`SELECT * FROM "AppsCenter".applications WHERE "id" = $1`, [id]);
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
};
