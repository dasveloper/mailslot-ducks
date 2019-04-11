const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String },
    brandColor: { type: String },
    logo: { type: String},
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],

    updated_at: { type: Date },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});
userSchema.pre("save", function(next) {
  this.updated_at = Date.now();
  next();
});
mongoose.model('User', userSchema);