const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  email: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product",required: true },
  updated_at: { type: Date }
});
subscriptionSchema.pre("save", function(next) {
  this.updated_at = Date.now();
  next();
});
mongoose.model("Subscription", subscriptionSchema);
