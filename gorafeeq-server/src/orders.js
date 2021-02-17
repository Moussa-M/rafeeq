const mongoose = require("mongoose");
const products = require("./products");

const OrderSchema = new mongoose.Schema(
  {
    store_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    //Here we are nestign the schema to create a doublicates of the Products in case the Products info 'price' changes later  
     products: [products.ProductSchema],
  },
  {
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Order = mongoose.model("orders", OrderSchema,'orders');


function getOrderDocument(req, res, next) {
  Order.findOne({ _id: req.params.id }, (err, order) => {
    if (err || !order) {
      res.status("400").json({ status: "order-missing" });
    }
    req.orderDocument = order;
    next();
  });
}

module.exports = { OrderSchema, Order, getOrderDocument };
