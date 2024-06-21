const express = require("express");
const router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const stripe = require("stripe")(
  ""
);
const bookings = require("../models/booking");
const rooms = require('../models/room')
router.post("/bookroom",async (req, res) => {
  const {room, first, last,  totalDays,totalAmount} = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${room.name}`,
          },
          unit_amount: `${totalAmount}` * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer_creation: "if_required",
    shipping_address_collection: "required",
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    success_url:`${process.env.BASE_URL_SUCCESS}/${room._id}/${room.name}/${frist}/${last}/${totalAmount}/${totalDays}`,
    cancel_url: `${process.env.BASE_URL_CANCEL}`,
  });
  console.log(session)
  res.json({ id: session.id });
});
router.post("/complete", async (req, res) => {
  const { id, name, fromdate, todate, amount, totalDays, user } = req.body;
  const newbooking = new bookings({
    userid: user._id,
    room: name,
    roomid: id,
    totalDays: totalDays,
    fromdate: moment(fromdate).format("DD-MM-YYYY"),
    todate: moment(todate).format("DD-MM-YYYY"),
    totalAmount: amount,
    transactionId: "1234",
    status: "booked",
  });
  await newbooking.save();
  const obj = {
    bookingid: newbooking._id,
    fromdate: moment(fromdate).format("DD-MM-YYYY"),
    todate: moment(todate).format("DD-MM-YYYY"),
    userid: user._id,
    status: "booked",
  };

  const room = await rooms.findOne({ _id: id });
  console.log(room);
  await room.currentbookings.push(obj);
  room.save();

  res.send("Booking Saved Succesfully");
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    const bookingitem = await bookings.findOne({ _id: bookingid });
    bookingitem.status = "cancelled";
    await bookingitem.save();
    const room = await rooms.findOne({ _id: roomid });
    const bookings = room.currentbookings;
    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    console.log(temp);
    room.currentbookings = temp;
    await room.save();

    res.send("Booking deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "something went wrong" });
  }
});

router.post("/getuserbookings", async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await bookings.find({ userid: userid }).sort({ _id: -1 });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await bookings.find({});
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
