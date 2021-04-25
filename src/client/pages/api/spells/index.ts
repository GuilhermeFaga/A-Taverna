import { NextApiRequest, NextApiResponse } from "next";
import spells from "./spells.json";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(spells);
};
