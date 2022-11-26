import { db } from "../db.js";

export const getTask = (req, res) => {
  const q = "SELECT * FROM tasks WHERE userId = ?";
  db.query(q, [req.body.userId], (err, data) => {
    console.log(req.body.userId);
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Brak wyników");
    const { userId, ...otherData } = data[0];
    return res.status(200).json(otherData);
  });
};

export const addTask = (req, res) => {};
