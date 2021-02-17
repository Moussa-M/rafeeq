const express = require("express");
const stores = require("./stores");
const orders = require("./orders");
const products = require("./products");
const users = require("./users");
const analysis = require("./analysis");



function createRouter() {
  const router = express.Router();

  /* Stores APIs */
  router.get('/',(req,res,next)=>{
    res.status(200).json({health:'good'});
  })
  router.get("/api/stores", (req, res, next) => {
    stores.Store.find({}).then((result) => {
      res.status(200).json(result);
    });
  });

  router.get("/api/stores:id", stores.getStoreDocument, (req, res, next) => {
    const store = req.storeDocument;
    res.status(200).json({
      store_name: store.store_name,
      store_owner_id: store.store_owner_id,
      category: store.category,
    });
  });

  router.put("/api/stores", async (req, res, next) => {
    const exists = await stores.Store.exists({
      store_name: req.store.store_name,
    });
    if (exists) {
      return res.status(400).json({ status: "store-exists" });
    }
    await stores.Store.create({
      store_name: req.body.store_name,
      store_owner_id: req.body.store_owner_id,
      category: req.body.category,
      products: req.body.products,
    });
    res.status(200).json({ status: "ok" });
  });

  /* USers APIs */
  router.get("/api/users", async (req, res, next) => {
 
    users.User.find({}).then((val) => {
      res.status(200).json(val);
    });
  });

  router.get("/api/users:id", users.getUserDocument, (req, res, next) => {
    const user = req.userDocument;
    res.status(200).json({
      username: user.username,
      email: user.email,
      type: user.type,
    });
  });

  router.put("/api/users", async (req, res, next) => {
    const exists = await users.User.exists({
      _id: req.user._id,
    });
    if (exists) {
      return res.status(400).json({ status: "user-exists" });
    }
    await users.User.create({
      username: req.body.username,
      email: req.body.email,
      type: req.body.type,
    });
    res.status(200).json({ status: "ok" });
  });

  /* Orders APIs */
  router.get("/api/orders", (req, res, next) => {
    orders.Order.find({}).then((result) => {
      res.status(200).json(result);
    });
  });
  router.get("/api/orders/:id", orders.getOrderDocument, (req, res, next) => {
    const order = req.orderDocument;
    res.status(200).json({
      id: order._id,
      store_name: order.store_name,
      products: order.products,
    });
  });

  router.put("/api/orders", async (req, res, next) => {
    await orders.Order.create({
      store_id: req.body.store_id,
      customer_id: req.body.cusotmer_id,
      products: req.body.products,
    });
    res.status(200).json({ status: "ok" });
  });

  /* Products APIs */
  router.get("/api/products", (req, res, next) => {
    products.Product.find({}).then((result) => {
      res.status(200).json(result);
    });
  });
  router.get(
    "/api/products/:id",
    products.getProductDocument,
    (req, res, next) => {
      const product = req.productDocument;

      res.status(200).json({
        id: product._id,
        store_name: product.store_name,
        products: product.products,
      });
    }
  );

  router.get("/api/analysis", async (req, res, next) => {
    analysis.Analysis.find({}).then((result) => {
      res.status(200).json(result);
    });
  });

  return router;
}

module.exports = createRouter;























// Sample test data
// stores.Store.create({
//       store_name: "KFC",
//       store_owner_id: "kfc@gmail.com",
//       category: "FOOD",
//       products:
//     [{
//       name: "Big mac",
//       store_id: "602e31e62efeb96319955a5a",
//       price: 20,
//     },
//     {
//       name: "Small mac",
//       store_id: "602e31e62efeb96319955a5a",
//       price: 12,
//     }]
//   })

// async function createSampleD(){
//   await users.User.create({
//     username: "Will smith",
//     email: "willsmith@gmail.com",
//     type: "ADMIN",
//   },
//   {
//     username: "Jim ro",
//     email: "jimro@gmail.com",
//     type: "CUSTOMER",
//   },
//   {
//     username: "malcom",
//     email: "malcom@gmail.com",
//     type: "DRIVER",
//   },
//   {
//     username: "stiffany",
//     email: "stiffany@gmail.com",
//     type: "STORE_OWNER",
//   },
//   );
//   await stores.Store.create({
//     store_name: "KFC",
//     store_owner_id: "kfc@gmail.com",
//     category: "FOOD",
//   },{
//     store_name: "Flooory",
//     store_owner_id: "floory@gmail.com",
//     category: "FLOWERS",
//   },
//   );
//   await orders.Order.create(
//     {
//       store_id: "f65sd4fdsfsd46f45sd",
//       customer_id: "f4s6dfsd456sdf45ds",
//        products: [
//          {
//             name:"KFC",
//             price:15,
//             store_id:"f65sd4fdsfsd46f45sd"
//          }
//        ],
//     },
//     {
//       store_id: "48485sd4s5d5s45d4s5",
//       customer_id: "48fd245df1f5df45d5",
//        products: [
//          {
//             name:"jasmine",
//             price:22,
//             store_id:"48485sd4s5d5s45d4s5"
//          }
//        ],
//     }
//   );

//   await analysis.Analysis.create({
//     online_members:15,
//     orders_count: 250,
//     today_orders: 50,
//     stores_count: 166,
//     drivers_count: 80,
//     store_owners_count: 150,
//   }
//   );

// }
// createSampleD();