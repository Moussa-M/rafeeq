const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    store_id: { type: String, required: true },
  },
  {
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Product = mongoose.model("products", ProductSchema,'products',false);
function getProductDocument(req, res, next) {
  Product.findOne({ _id: req.product.id }, (err, product) => {
    if (err || !product) {
      res.status("400").json({ status: "product-missing" });
    }
    req.productDocument = product;
    next();
  });
}

module.exports = { ProductSchema, Product, getProductDocument };
