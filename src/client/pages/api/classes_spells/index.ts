import { NextApiRequest, NextApiResponse } from 'next'
import classes_spells from "./classes_spells.json";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(classes_spells);
};
