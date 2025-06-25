// import ratelimit from "../config/upstash.js";

// const rateLimiter = async (req, res, next) => {
//   try {
//     const { success } = await ratelimit.limit(req.ip);

//     if (!success) {
//       return res.status(429).json({
//         message: "Too many requests, please try again later",
//       });
//     }

//     next();
//   } catch (error) {
//     console.log("Rate limit error", error);
//     next(error);
//   }
// };

// export default rateLimiter;


// //607baad6-24d9-4a85-bd36-a7323ea618bb

import rateLimit from "express-rate-limit";

// Create the limiter instance
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, // Limit each IP to 5 requests per 10 seconds
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    // Custom error handling like Upstash version
    return res.status(429).json({
      message: "Too many requests, please try again later",
    });
  },
});

// Wrap it like your Upstash-style async middleware
const rateLimiter = async (req, res, next) => {
  try {
    await limiter(req, res, next);
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
