const { Schema, model } = require("mongoose");

const tarrifSchema = new Schema({
  name: { type: String, required: true },
  point: { type: Number, default: 0 },
});

const Tarrif = model("Tarrif", tarrifSchema);

const subscriptionSchema = new Schema({
  name: { type: String, required: true },
  tarrif: { type: Schema.Types.ObjectId, ref: "Tarrif" },
});

const Subscription = model("Subscription", subscriptionSchema);

const subscriptionLogSchema = new Schema({
  subscription: { type: Schema.Types.ObjectId, ref: "Subscription" },
});

const SubscriptionLog = model("SubscriptionLog", subscriptionLogSchema);

module.exports = { Tarrif, Subscription, SubscriptionLog };
