import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUserById = (req, res) => {
    const q = "SELECT * FROM users WHERE id = ?";

    db.query(q, [req.params.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User does not exist");
  
      const token = jwt.sign({ id: data[0].id }, "secretKey");
      // const encrypted = AES.encrypt(password, token); 

      const { ...otherData } = data[0];
  
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(otherData);
    });
};

export const getUsers = (req, res) => {

  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Users does not exist");

    const token = jwt.sign({ id: data[0].id }, "secretKey");

    const { ...otherData } = data;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherData);
  });
};

export const getUserUpdate = (req, res) => {
  // const q = "SELECT * FROM venues WHERE id = ?";
  const emailId=req.body.email;
  // const q ="UPDATE venues SET `name`=?,`email`=?,`number`=?,`address`=?,`business_name`=?,`about`=?,`guest_range`=?,`number_halls`=?,`indoor_outdoor`=?,`wedding_price_veg`=?,`wedding_price_nonveg`=?,`engagement_price_veg`=?,`engagement_price_nonveg`=? WHERE id=?";  
  const q1 = "SELECT * FROM users WHERE email = ?";

  db.query(q1, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
  // const values=[
  //   req.body.name,
  //   req.body.email,
  //   req.body.phone,
  //   req.body.address,
  //   req.body.business_name,
  //   req.body.about,
  //   req.body.guest_range,
  //   req.body.halls,
  //   req.body.indoor,
  //   req.body.wedding_price_veg,
  //   req.body.wedding_price_nonveg,
  //   req.body.engagement_price_veg,
  //   req.body.engagement_price_nonveg,
  // ]
  // db.query(q,[...values, userId],(err,data)=>{
  //     if(err) return res.json(err)
  //     return res.json("Venues has been updated.")
  // })
  // db.query(q, [userId], (err, data) => {
    // if (err) return res.status(500).json(err);
    // if (data.length === 0) return res.status(404).json("Venue does not exist");
   
    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    // const allfiles =  req.body.images.map (x => `"${x}"`).join (', ');
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const q ="UPDATE users SET `name`=?,`email`=?,`password`=?,`number`=?,`username`=?,`bio`=?,`city`=?,`company`=? WHERE email=?";

    const values = [
      req.body.name,
      req.body.email,
      hashedPassword,
      req.body.phone,
      req.body.username,
      req.body.bio,
      req.body.city,
      req.body.company
    ];

    db.query(q,[...values, emailId],(err,data)=>{
      if (err) return res.status(500).json(err);
      return res.status(200).json("Users updated Successfully!");
    });
  });
};
