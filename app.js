const express = require ("express");
const cors = require('cors');
const userRouter = require("./routes/admin");
const loginRouter = require("./routes/login");
const eventRouter = require("./routes/event");
const adminsignupRouter = require("./routes/adminsignupr");
const adminloginRouter = require("./routes/adminlogin");
const registerRouter = require("./routes/register");
const contactusRouter = require("./routes/contactusr");


const app = express();
const morgan=require('morgan');


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type,authorization,Accept-Language,X-Requested-With"
    );
  
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Methods", "*");
      // res.header("Access-Control-Allow-Methods",'Put,Post,Patch,Delete,Get,put');
      return res.status(200).json({});
    }
  
    next();
  });
  
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/event", eventRouter);
app.use("/api/adminsignupr", adminsignupRouter);
app.use("/api/adminlogin", adminloginRouter);
app.use("/api/register", registerRouter);
app.use("/api/contactusr", contactusRouter);

app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    console.log(error);
    next(error);
  });

 app.use((error, req, res, next) => {
  res.status(error.status || 500);
  //if(error)	throw error;
  console.log(error);
  if (error.status == 404)
    res.json({
      error: {
        message: `not found 404`,
      },
    });
  // console.log(error);
  else
    res.json({
      error: {
        massage: "other error crash app ",
        err: error.massage,
      },
    });
});
 

 
module.exports = app ;