const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const jwtkey = "e-com";

app.use(express.json());
app.use(cors());

// Register API
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    const token = await Jwt.sign({ result }, jwtkey, { expiresIn: "2h" });
    res.send({ result, token });
  } catch (err) {
    res.send({ result: "something went wrong try after some time" });
  }
});

// Login API
app.post("/login", async (req, res) => {
  try {
    if (req.body.password && req.body.email) {
      const user = await User.findOne(req.body).select("-password");
      if (user) {
        const token = await Jwt.sign({ user }, jwtkey, { expiresIn: "2h" });
        res.send({ user, token });
      } else {
        res.send({ result: "No User found" });
      }
    } else {
      res.send({ result: "No User Found" });
    }
  } catch (err) {
    res.send({ result: "something went wrong try after some time" });
  }
});

// Add Product API
app.post("/add-product", async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (err) {
    res.send({ result: "Failed to add product" });
  }
});

// Get All Products API
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.send(products);
    } else {
      res.send({ result: "No Product Found" });
    }
  } catch (err) {
    res.send({ result: "Failed to fetch products" });
  }
});

// Delete Product API
app.delete("/product/:id", async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (err) {
    res.send({ result: "Failed to delete product" });
  }
});

// Get Product API
app.get("/product/:id", async (req, res) => {
  try {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No Record Found " });
    }
  } catch (err) {
    res.send({ result: "Failed to fetch product" });
  }
});

// Update Product API
app.put("/product/:id", async (req, res) => {
  try {
    const result = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.send(result);
  } catch (err) {
    res.send({ result: "Failed to update product" });
  }
});

// Search Product API
app.get("/search/:key", async (req, res) => {
  try {
    const result = await Product.find({
      $or: [
        { name: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
      ],
    });
    res.send(result);
  } catch (err) {
    res.send({ result: "Failed to search products" });
  }
});

// Start Server
const port = 5100;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("./db/config");
// const User = require("./db/User");
// const Product = require("./db/Product");
// const bcrypt = require("bcrypt");
// const Jwt = require("jsonwebtoken");
// const jwtkey = "e-com";

// app.use(express.json());
// app.use(cors());

// app.post("/register", async (req, res) => {
//   let user = new User(req.body);
//   let result = await user.save();
//   result = result.toObject();
//   delete result.password;
//   // res.send(result);
//   if (result) {
//     console.log("User:", result);
//     console.log("JwtKey:", jwtkey);
//     Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
//       if (err) {
//         res.send({ result: "something went wrong try after some time" });
//       }
//       res.send({ result, token });
//     });
//     // res.send(user);
//   } else {
//     res.send({ a: "No  User found" });
//   }
  
    
// });
// app.post("/login", async (req, res) => {
//   console.log(req.body);
//   if (req.body.password && req.body.email) {
//     let user = await User.findOne(req.body).select("-password");
//     if (user) {
//       console.log("User:", user);
//       console.log("JwtKey:", jwtkey);
//       Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
//         if (err) {
//           res.send({ result: "something went wrong try after some time" });
//         }
//         res.send({ user, token });
//       });
//       // res.send(user);
//     } else {
//       res.send({ result: "No  User found" });
//     }
//   } 
//   else {
//     res.send({ result: "No User Found" });
//   }
// });
// app.post("/add-product", async (req, res) => {
//   let product = new Product(req.body);
//   let result = await product.save();
//   res.send(result);
// });
// app.get("/products", async (req, res) => {
//   let products = await Product.find();
//   if (products.length > 0) {
//     res.send(products);
//   } else {
//     res.send({ result: "No Product Found" });
//   }
// });

// app.delete("/product/:id", async (req, resp) => {
//   const result = await Product.deleteOne({ _id: req.params.id });
//   resp.send(result);
// });

// app.get("/product/:id", async (req, resp) => {
//   let result = await Product.findOne({ _id: req.params.id });
//   if (result) {
//     resp.send(result);
//   } else {
//     resp.send({ result: "No Record Found " });
//   }
// });

// app.put("/product/:id", async (req, resp) => {
//   let result = await Product.updateOne(
//     { _id: req.params.id },
//     {
//       $set: req.body,
//     }
//   );
//   resp.send(result);
// });

// app.get("/search/:key", async (req, resp) => {
//   let result = await Product.find({
//     $or: [
//       { name: { $regex: req.params.key } },
//       { company: { $regex: req.params.key } },
//       { category: { $regex: req.params.key } },
//     ],
//   });
//   resp.send(result);
// });

// app.listen(5100);
