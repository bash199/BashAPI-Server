import jwt from "jsonwebtoken";
import {User} from "../model/user.model.js";

// Authenticate user
export const auth = async (req, res, next) => {
   console.log("auth");
   const secret = process.env.AUTH_SECRET;
   try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, secret);
      const user = await User.findOne({
         _id: decoded._id,
         "tokens.token": token,
      });
      if (!user) throw new Error("user not found");
      req.user = user;
      req.token = token;
      next();
   } catch (e) {
      console.log(e);
      res.status(401).send({message: "Please authenticate."});
   }
};
