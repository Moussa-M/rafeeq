const mongoose = require("mongoose");
const products = require("./products");
const StoreSchema = new mongoose.Schema(
  {
    store_name: { type: String, required: true },
    store_owner_id: { type: String, required: true },
    category: { type: String, required: true },
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

const Store = mongoose.model("stores", StoreSchema,"stores",false);
function getStoreDocument(req, res, next) {
  Store.findOne({ _id: req.store.id }, (err, store) => {
    if (err || !store) {
      res.status("400").json({ status: "store-missing" });
    }
    req.storeDocument = store;
    next();
  });
}

module.exports = { StoreSchema, Store, getStoreDocument };
