const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    cover: { type: String, required: true },
    product: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subscribers: [{ type: Schema.Types.ObjectId, ref: "Subscription" }],
    updated_at: { type: Date }
  },
  { collation: { locale: "en_US", strength: 2} }
);
productSchema.pre("save", function(next) {
  this.updated_at = Date.now();
  next();
});
mongoose.model("Product", productSchema);
