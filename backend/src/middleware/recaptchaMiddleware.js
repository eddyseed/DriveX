// const axios = require("axios");

// const SECRET_KEY = "6LdQ3gorAAAAAHab4TPCip-wEuzkDtQY1pGVgd2M";

// const verifyRecaptcha = async (req, res, next) => {
//   const { captchaToken } = req.body;

//   if (!captchaToken) {
//     return res.status(400).json({ success: false, message: "CSAPTCHA token is required" });
//   }

//   try {
//     const url = `https://www.google.com/recaptcha/api/siteverify`;
//     const params = new URLSearchParams();
//     params.append("secret", SECRET_KEY);
//     params.append("response", captchaToken); // ✅ Correct variable

//     const response = await axios.post(url, params);

//     if (!response.data.success) {
//       return res.status(400).json({ success: false, message: "CAPTCHA verification failed" });
//     }

//     next(); // ✅ Only call next if success is true
//   } catch (error) {
//     console.error("CAPTCHA verification error:", error.message);
//     return res.status(500).json({ success: false, message: "CAPTCHA verification error" });
//   }
// };

// module.exports = verifyRecaptcha;
