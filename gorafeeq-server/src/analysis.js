const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema(
  {
    online_members: { type: String, required: true },
    orders_count: { type: String, required: false },
    today_orders: { type: String, required: false },
    stores_count: { type: String, required: false },
    drivers_count: { type: String, required: false },
    store_owners_count: { type: String, required: false },
    
  },
  {
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Analysis = mongoose.model("Reports", AnalysisSchema);
Analysis.createCollection();
function getAnalysisDocument(req, res, next) {
  Analysis.findOne({ _id: req.params.id }, (err, order) => {
    if (err || !order) {
      res.status("400").json({ status: "order-missing" });
    }
    req.orderDocument = order;
    next();
  });
}

module.exports = { AnalysisSchema, Analysis, getAnalysisDocument };
