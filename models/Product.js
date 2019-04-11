const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  cover: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User",required: true },
  //responses: [{ type: Schema.Types.ObjectId, ref: "Response" }],
  updated_at: { type: Date }
});
productSchema.pre("save", function(next) {
  this.updated_at = Date.now();
  next();
});
mongoose.model("Product", productSchema);
