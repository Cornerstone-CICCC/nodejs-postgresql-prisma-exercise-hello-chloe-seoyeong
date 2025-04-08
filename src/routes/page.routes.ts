import { Request, Response, Router } from "express";

const pageRouter = Router();

pageRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to my server! 🚀");
});

export default pageRouter;
