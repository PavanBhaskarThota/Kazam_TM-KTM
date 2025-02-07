import jwt from "jsonwebtoken";
import BlacklistModel from "../Models/blacklist";
export const auth = async(req: any, res: any, next: any) => {
  try {
    
    const token = req.headers.authorization.split(" ")[1];
    

    const blacklistedToken = await BlacklistModel.findOne({ token: token });

    if (blacklistedToken as any) {
      throw Error;
    }
    const decodedToken = jwt.verify(token, "secret");
    req.user = decodedToken;
    req.token = token;
    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({message: "Unauthorized", error});
  }
};
