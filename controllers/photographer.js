import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getPhotographerRegister = (req, res) => {
  const q = "SELECT * FROM photographers WHERE name = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    // if (data.length) return res.status(409).json("Venues already Exists!");
   
    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    // const allfiles =  req.body.images.map (x => `"${x}"`).join (', ');
    const q =
      "INSERT INTO photographers (`name`,`email`,`number`,`address`,`business_name`,`about`,`city`,`locality`,`price`,`gallery`,`isActive`) VALUES (?) ";

    const values = [
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.address,
      req.body.business_name,
      req.body.about,
      req.body.city,
      req.body.locality,
      req.body.price,
      JSON.stringify(req.body.images),
      req.body.isActive,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Photographers created Successfully!");
    });
  });
};

export const getPhotographers = (req, res) => {

    const q = "SELECT * FROM photographers";

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("Photographers does not exist");
  
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

  
export const getPhotographersById = (req, res) => {

  const q = "SELECT * FROM photographers WHERE id = ?";

  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Photographers does not exist");

    const token = jwt.sign({ id: data[0].id }, "secretKey");

    const { password, ...otherData } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherData);
  });
};

export const getPhotographerUpdate = (req, res) => {
  // const q = "SELECT * FROM venues WHERE id = ?";
  const userId=req.params.userId;
  // const q ="UPDATE venues SET `name`=?,`email`=?,`number`=?,`address`=?,`business_name`=?,`about`=?,`guest_range`=?,`number_halls`=?,`indoor_outdoor`=?,`wedding_price_veg`=?,`wedding_price_nonveg`=?,`engagement_price_veg`=?,`engagement_price_nonveg`=? WHERE id=?";  
  
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
    const q ="UPDATE photographers SET `name`=?,`email`=?,`number`=?,`address`=?,`business_name`=?,`about`=?,`city`=?,`locality`=?,`price`=?,`gallery`=?,`isActive`=? WHERE id=?";

    const values = [
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.address,
      req.body.business_name,
      req.body.about,
      req.body.city,
      req.body.locality,
      req.body.price,
      JSON.stringify(req.body.images),
      req.body.isActive,
    ];

    db.query(q,[...values, userId],(err,data)=>{
      if (err) return res.status(500).json(err);
      return res.status(200).json("Photographers updated Successfully!");
    });
};


export const getPhotographerDelete = (req, res) => {

  const userId=req.params.userId;
  const q="DELETE FROM photographers WHERE id=?"

  db.query(q,[userId],(err,data)=>{
      if(err) return res.json(err)
      return res.json("Photographers has been deleted.")
  })
};