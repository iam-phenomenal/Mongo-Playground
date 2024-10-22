const { Router } = require("express");
const {
  Tarrif,
  Subscription,
  SubscriptionLog,
} = require("../models/reference.model");
const router = Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const { error } = req.query;
  // try {
  //   // const data = await session.withTransaction(async () => {
  //   //   const tarrif = await Tarrif.create([
  //   //     {
  //   //       name: "Basic",
  //   //       point: 10,
  //   //     },
  //   //     { session: session },
  //   //   ]);
  //   //   const subscription = await Subscription.create([
  //   //     {
  //   //       name: "Things",
  //   //       tarrif: tarrif.id,
  //   //     },
  //   //     { session: session },
  //   //   ]);
  //   //   if (error) {
  //   //     throw new Error(error);
  //   //   }
  //   //   const subscriptionLog = await SubscriptionLog.create([
  //   //     {
  //   //       subscription: subscription.id,
  //   //     },
  //   //     { session: session },
  //   //   ]);
  //   //   return { tarrif, subscription, subscriptionLog };
  //   // });

  //   return res.status(201).json(data);
  // } catch (error) {
  //   return res.status(500).json(error.message);
  // }
  let session = null;

  session = await mongoose.startSession();
  session.startTransaction();
  try {
    const tarrif = await Tarrif.create(
      [
        {
          name: "Basic",
          point: 10,
        },
      ],
      { session: session }
    );
    const subscription = await Subscription.create(
      [
        {
          name: "Things",
          tarrif: tarrif.id,
        },
      ],
      { session: session }
    );
    if (error) {
      throw new Error(error);
    }
    const subscriptionLog = await SubscriptionLog.create(
      [
        {
          subscription: subscription.id,
        },
      ],
      { session: session }
    );

    return res.status(201).json({ tarrif, subscription, subscriptionLog });
  } finally {
    await session.endSession();
  }
});

router.get("/point", async (req, res) => {
  try {
    const { subscription } = await SubscriptionLog.findOne().populate(
      "subscription"
    );
    console.log(subscription);
    const tarrif = await subscription.populate("tarrif");

    return res.status(200).json(tarrif.tarrif.point);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
