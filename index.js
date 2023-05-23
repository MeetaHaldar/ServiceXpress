require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = 2000 || Process.env.PORT;
const Consumer = require("./models/consumer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/", bloodSampleList.bloodSampleList);
// app.use("/hospital", hospitalRoutes);
// app.use("/receiver", receiverRoutes);
// app.use("/bloodSample", bloodSampleRoutes);
// app.use("/request", requestRoutes);

app.get("/", (req, res) => {
  res.send("hello there");
});
app.post("/consumer/register", async (req, res) => {
  try {
    const { name, email, phone, password, gender, city, state, address } =
      req.body;

    // Validate user input
    if (
      !(
        name &&
        email &&
        phone &&
        password &&
        gender &&
        city &&
        state &&
        address
      )
    ) {
      res.status(400).send("All input is required");
    }
    const oldConsumer = await Consumer.findOne({ email });

    if (oldConsumer) {
      return res.status(409).send({ msg: "User Already Exist. Please Login" });
    }

    //Encrypt user password

    const encryptedUserPassword = await bcrypt.hash(password, "10");
    console.log("new password is  = " + encryptedUserPassword);

    // Create user in our database
    const newConsumer = new Consumer({
      name,
      email,
      phone,
      gender,
      city,
      state,
      address,
      password: encryptedUserPassword,
    });
    try {
      const consumer = await newConsumer.save();
      res.send(consumer);
    } catch (err) {
      res.json({ message: err.message });
    }

    // save user token
    // user.token = token;
    console.log(" your token is = " + token);

    // return new user
    // res.status(201).json(token);
  } catch (error) {
    console.log(error);

    res.send(error);
  }
});

app.post("/consumer/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const oldConsumer = await Consumer.findOne({ email });
    if (!oldConsumer) {
      return res.status(409).send("User does not Exist. Please signup");
    }

    if (oldConsumer && (await bcrypt.compare(password, oldConsumer.password))) {
      // Create token
      const token = jwt.sign(
        { email: email, name: oldConsumer.name },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      res.status(200).send(token);
    } else {
      res.send("your password is wrong").status(409);
    }
  } catch (error) {
    console.log(error);
  }
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to mongodb");
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
