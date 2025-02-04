import jwt from "jsonwebtoken";
export const auth = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret");
    req.user = decodedToken;
    req.token = token;
    
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};
