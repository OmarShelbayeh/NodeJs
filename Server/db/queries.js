const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nodejs",
  password: "postgres",
  port: 5432,
});

const getAllPlanets = (req, res) => {
  pool.query("SELECT * FROM planets ;", (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send(result.rows);
  });
};

const getAllMountains = (req, res) => {
  pool.query(
    "SELECT m.id as mountain_id, m.name as mountain_name, m.description as mountain_description, m.price as mountain_price, p.name as planet_name FROM mountains m INNER JOIN planets p ON p.id = m.planet_id WHERE m.available = true ORDER BY m.id asc;",
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send(result.rows);
    }
  );
};

const getMountainById = (req, res) => {
  pool.query(
    "SELECT m.id as mountain_id, m.name as mountain_name, m.description as mountain_description, m.price as mountain_price, p.name as planet_name FROM mountains m INNER JOIN planets p ON p.id = m.planet_id WHERE m.available = true AND m.id = $1 ORDER BY m.id asc;",
    [req.body.id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(200).send(result.rows);
    }
  );
};

const buyMountains = (req, res) => {
  let items = req.body.ids;
  for (let i = 0; i < items.length; i++) {
    pool.query(
      "UPDATE mountains SET available = false WHERE id = $1 ;",
      [items[i]],
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );
  }
  res.status(200).redirect("/");
};

module.exports = {
  getAllPlanets,
  getAllMountains,
  getMountainById,
  buyMountains,
};
