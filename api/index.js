// Require Library
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").createServer(app);
const port = process.env.PORT;
const mysql = require("mysql");
const CryptoJS = require("crypto-js");
const dayjs = require("dayjs");
const fs = require("fs");
const path = require("path");
//--

// ตั้งค่า CORS WEB
const corsList = process.env.CORS;
var whitelist = [corsList];
var corsOptions = {
  origin: function (origin, callback, originalUrl) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
      /*console.log(origin);*/
    } else {
      //callback(null, true);

      console.log(originalUrl);
      callback("ไม่สามารถเชื่อมต่อ Server ได้");
      /*  console.log(origin);*/
    }
  },
};

app.use(cors());
app.use(express.json({ limit: "50mb" }));
const io = require("socket.io")(http, {
  secure: true,
  cors: {
    origin: corsList,
  },
});

//--

// ตั้งค่า Mysql DB
const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "",
  database: "nuxt",
  multipleStatements: true,
});
//--
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}
function unlock(data) {
  try {
    var key = process.env.KEY;
    key = key.substr(7);
    var str = data;
    var encrypted = str;
    var encrypted_json = JSON.parse(atob(encrypted));
    var decrypted = CryptoJS.AES.decrypt(
      encrypted_json.value,
      CryptoJS.enc.Base64.parse(key),
      {
        iv: CryptoJS.enc.Base64.parse(encrypted_json.iv),
      }
    ).toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  } catch (error) {
    return "error";
  }
}

function lock(data) {
  try {
    let iv = CryptoJS.lib.WordArray.random(16),
      key = CryptoJS.enc.Base64.parse(process.env.KEY.substr(7));
    let options = {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, options);
    encrypted = encrypted.toString();
    iv = CryptoJS.enc.Base64.stringify(iv);
    let result = {
      iv: iv,
      value: encrypted,
      mac: CryptoJS.HmacSHA256(iv + encrypted, key).toString(),
    };
    result = JSON.stringify(result);
    result = CryptoJS.enc.Utf8.parse(result);
    var data = CryptoJS.enc.Base64.stringify(result);
    return data;
  } catch (error) {
    return "error";
  }
}
// Route--


app.post("/api/Register", cors(corsOptions), (req, res) => {
  const { ID, Password, NAME, HBD } = req.body;
  db.query(
    "SELECT COUNT(ID) as count FROM `users` WHERE ID = ?",
    [ID],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result[0].count == 0) {
          db.query(
            "INSERT INTO users (ID,Password,NAME,HBD,Status)VALUES (?, ?, ?, ?,?);",
            [ID, lock(Password), NAME, lock(HBD), 1],
            (err, result) => {
              if (err) {
                res.json({ Status: err });
              } else {
                res.json({ Status: "OK", data: result });
              }
            }
          );
        } else {
          res.json({ Status: "Not OK" });
        }
      }
    }
  );
});

app.post("/api/Login", cors(corsOptions), (req, res) => {
  const { ID, Password } = req.body;
  db.query("SELECT * FROM `users` WHERE ID = ?", [ID], (err, result) => {
    if (err) {
      res.json({ Status: err });
    } else {
      if (result.length != 0) {
        if (Password === unlock(result[0].Password)) {
          res.json({ Status: "1", data: lock(result[0]) });
        } else {
          res.json({ Status: "2" });
        }
      } else {
        res.json({ Status: "3" });
      }
    }
  });
});

app.post("/api/Forget", cors(corsOptions), (req, res) => {
  const { ID, HBD } = req.body;
  db.query(
    "SELECT No , HBD FROM `users` WHERE ID = ? ",
    [ID],
    (err, result) => {
      if (err) {
        res.json({ Status: err });
      } else {
        if (result.length != 0) {
          if (unlock(result[0].HBD) == HBD) {
            res.json({ Status: "1", data: result[0].No });
          } else {
            res.json({ Status: "2" });
          }
        } else {
          res.json({ Status: "3" });
        }
      }
    }
  );
});

app.post("/api/ForgetPassword", cors(corsOptions), (req, res) => {
  const { No, Password } = req.body;
  db.query(
    "UPDATE `users` SET Password = ? WHERE No  = ? ",
    [lock(Password), No],
    (err, result) => {
      if (err) {
        res.json({ Status: err });
      } else {
        res.json({ Status: "1" });
      }
    }
  );
});

app.post("/api/Auth", cors(corsOptions), (req, res) => {
  const { data } = req.body;
  db.query(
    "SELECT * FROM `users` WHERE ID = ? and not Status = 0",
    [unlock(data).ID],
    (err, result) => {
      if (err) {
        res.json({ Status: err });
      } else {
        if (result.length != 0) {
          try {
            if (unlock(unlock(data).Password) === unlock(result[0].Password)) {
              res.json({
                Status: "1",
                data: lock(result[0]),
                ID: result[0].ID,
                No: result[0].No,
              });
            } else {
              res.json({ Status: "2" });
            }
          } catch (error) {
            res.json({ Status: "2" });
          }
        } else {
          res.json({ Status: "3" });
        }
      }
    }
  );
});

app.post("/api/EditName", cors(corsOptions), (req, res) => {
  const { No, Name } = req.body;
  db.query(
    "UPDATE `users` SET NAME = ? WHERE No  = ? ",
    [Name, No],
    (err, result) => {
      if (err) {
        res.json({ Status: err });
      } else {
        res.json({ Status: "1" });
      }
    }
  );
});
app.post("/api/EditImg", cors(corsOptions), (req, res) => {
  const { No, Img } = req.body;
  if (Img) {
    const dir = "./public";
    fs.readdir(dir, (err, files) => {
      const counts = files.length;
      try {
        const namelist = CryptoJS.lib.WordArray.random(1).words[0].toString();
        var strImage = Img.replace(/^data:image\/[a-z]+;base64,/, "");
        var Nameimg = "./public/" + namelist + "_" + counts + ".png";
        fs.writeFile(Nameimg, strImage, "base64", function (err) {
          console.log(err);
        });
        var imgname = "/" + namelist + "_" + counts + ".png";
        db.query(
          "UPDATE `users` SET IMG = ? WHERE No  = ?;",
          [imgname, No],
          (err, result) => {
            if (err) {
              res.json({ Status: err });
            } else {
              res.json({
                Status: "1",
                Img: imgname,
              });
            }
          }
        );
      } catch (error) {
        res.json({ Status: err });
      }
    });
  } else {
    res.json({ Status: 0 });
  }
});

app.post("/api/EditPassword", cors(corsOptions), (req, res) => {
  const { No, Password } = req.body;
  db.query(
    "UPDATE `users` SET Password = ? WHERE No  = ? ",
    [Password, No],
    (err, result) => {
      if (err) {
        res.json({ Status: err });
      } else {
        res.json({ Status: "1" });
      }
    }
  );
});

app.get("/img/:name", (req, res, next) => {
  console.log(req.originalUrl);
  var options = {
    root: path.join(__dirname, "public"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
      "Cache-Control": "public, max-age=15552000",
    },
  };

  var fileName = req.params.name;

  res.sendFile(fileName, options, (err) => {
    if (err) {
      next(err);
    }
  });
});
//--

// Start Server

io.on("connection", function (socket) {
  console.log(
    "เชื่อมต่อ : " +
      socket.handshake.address +
      " / " +
      dayjs().format("YYYY-MM-DD HH:mm:ss") +
      " ออนไลน์อยู่ : " +
      socket.conn.server.clientsCount +
      " หน้าจอ"
  );

  socket.on("join", async function (msg) {
    socket.join(msg);
    if (socket.adapter.rooms.get(msg)) {
      io.to(msg).emit("CountUser", socket.adapter.rooms.get(msg).size);
    }
  });

  socket.on("logout", async function (msg) {
    io.to(msg).emit("Checkuser");
    socket.leaveAll();
  });

  socket.on("disconnect", function () {
    console.log(
      "ยกเลิกการเชื่อมต่อ : " +
        socket.handshake.address +
        " / " +
        dayjs().format("YYYY-MM-DD HH:mm:ss") +
        " ออนไลน์อยู่ : " +
        socket.conn.server.clientsCount +
        " หน้าจอ " +
        socket.id
    );
  });
  socket.on("EditName", async function (msg) {
    const { No, data } = msg;
    io.to(No).emit("EditNameGet", data);
  });
  socket.on("EditIMG", async function (msg) {
    const { No, data } = msg;
    io.to(No).emit("EditIMGGet", data);
  });
  socket.on("EditPassword", async function (msg) {
    const { No } = msg;
    io.to(No).emit("EditPasswordGet");
  });
});

http.listen(port, () => {
  console.log("Yey, your server is running on ", process.env.PORT);
});
