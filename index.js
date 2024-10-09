const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const SubscriberRoutes = require("./modules/subscribers/subscribers.routes");
const BlogsRoutes = require("./modules/blogs/blogs.routes");
const InquiryRoutes = require("./modules/inquiries/inquiries.routes");
const UserRoutes = require("./modules/users/users.routes");
const ReportRoutes = require("./modules/inquiries/inquiries.routes");
const OrderRoutes = require("./modules/orders/orders.routes");

app.use("/files", express.static("files"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.text({ type: "text/plain" }));

app.use("/inquiries", InquiryRoutes);
app.use("/users", UserRoutes);
app.use("/orders", OrderRoutes);
app.use("/blogs", BlogsRoutes);
app.use("/subscribers", SubscriberRoutes);

app.get("/", (req, res) => {
  try {
    res.send("Server is working fine");
  } catch (error) {}
});
app.listen(5000, () => {
  console.log("Server started at port 5000");
});
