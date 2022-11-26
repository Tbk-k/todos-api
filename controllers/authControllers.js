import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      return res.status(409).json("Podany adres e-mail jest zajęty.");
    }
    const q = "INSERT INTO users(`email`,`password`) VALUES (?)";
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertData = [req.body.email, hash];

    db.query(q, [insertData], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Operacja pomyślna");
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    console.log(req.body);
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Błędny adres e-mail bądź hasło.");
    const pwdCorrect = bcrypt.compareSync(req.body.password, data[0].password);
    if (!pwdCorrect)
      return res.status(404).json("Błędny adres e-mail bądź hasło.");
    const token = jwt.sign({ id: data[0].id }, "d41d8cd98f00b");
    const { password, ...otherData } = data[0];
    return res
      .cookie("accesToke", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherData);
  });
};
