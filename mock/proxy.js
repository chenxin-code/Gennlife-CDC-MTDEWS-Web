const express = require("express");
const app = express();
const proxy = require("http-proxy-middleware");
const ip = require("ip");

const port = 3000;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, PUT, DELETE"
  );
  res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");

  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  // );
  // res.header("X-Powered-By", " 3.2.1");
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(
  "/gmap",
  proxy({
    target: "http://localhost:8111/",
    changeOrigoin: true,
    pathRewrite: { "^/": "" }
  })
);

// app.use(
//   "/api/v1",
//   proxy({
//     target: "http://10.0.2.246:8000/",
//     changeOrigoin: true,
//     pathRewrite: { "^/": "" }
//   })
// );
// app.use(
//   "/cdc-eew",
//   proxy({
//     target: "http://10.0.2.166:5051/",
//     changeOrigoin: true,
//     pathRewrite: { "^/": "" }
//   })
// );
// app.use(
//   "/epidemicdatamng",
//   proxy({
//     target: "http://10.0.2.67:5061/",
//     changeOrigoin: true,
//     pathRewrite: { "^/": "" }
//   })
// );

// "dev": "concurrently \"vue-cli-service serve\" \"node mock/proxy.js\"",
app.listen(port, () => {
  console.log("启动proxy");
  console.log(`本地地址： http://localhost:${port}`);
  console.log(`局域网地址： http://${ip.address()}:${port}`);
});
