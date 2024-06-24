const express = require("express");
const router = express.Router();
const axios = require("axios");
const UserItem = require("../Models/user");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const qs = require("qs");
require("dotenv").config();
const FRONTURL = process.env.NEXT_PUBLIC_FRONTURL;

const maxAge = 1000 * 60 * 60;
router.use(
  session({
    secret: process.env.SERCETKEY, // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({ checkPeriod: maxAge }),
    cookie: {
      maxAge,
    },
  })
);

const axiosInstance = axios.create({
  headers: {
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});

router.get("/callback/kakao", async (req, res) => {
  //  #swagger.tags = ['Oauth API']
  //  #swagger.summary = 'Kakao API 등록하기'
  //  #swagger.description = 'kakao에 로그인하기입니다. '
  try {
    const { CLIENT_ID, REDIRECT_URI } = process.env;
    const { code } = req.query;

    const token = await axiosInstance.post(
      "https://kauth.kakao.com/oauth/token",
      qs.stringify({
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        code,
      })
    );

    const user = await axiosInstance.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
      },
    });

    const {
      id,
      kakao_account: {
        profile: { nickname },
      },
    } = user.data;
    const existingUser = await UserItem.findOne({ _id: id });

    if (!existingUser) {
      const userItem = new UserItem({
        _id: id,
        name: nickname,
      });
      await userItem.save();
    }
    req.session.userData = {
      _id: id,
      name: nickname,
    };

    return res.redirect(`${FRONTURL}/?id=` + id);
  } catch (error) {
    console.error("Error in Kakao OAuth callback:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/findUser/:id", async (req, res) => {
  //  #swagger.tags = ['Oauth API']
  //  #swagger.summary = 'user 정보찾기'
  //  #swagger.description = 'User 테이블에 등록된 정보를 봅니다. '
  const { id } = req.params;
  try {
    const existingUser = await UserItem.find({ _id: id });
    if (!existingUser) {
      res.json({ message: "User is not exist." });
    }
    res.json(existingUser);
  } catch (error) {
    res.status(500).json({ error: "Could not find the user." });
  }
});

router.get("/deleteUser/:id", async (req, res) => {
  //  #swagger.tags = ['Oauth API']
  //  #swagger.summary = 'kakao 유저 삭제하기'
  //  #swagger.description = 'kakao로 로그인을 한 유저를 삭제합니다. '
  try {
    req.session.destroy(() => {
      req.session;
    });
    res.status(200).json({ message: "로그아웃 되었습니다. " });
  } catch (error) {
    console.error("Error in Delete User :", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/check-session", (req, res) => {
  //  #swagger.tags = ['Oauth API']
  //  #swagger.summary = 'session 정보보기'
  //  #swagger.description = 'session에 등록된 정보를 봅니다. '
  console.log(req.session.userData);

  if (req.session.userData) {
    res.json({ authenticated: true, userId: req.session.userData });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
