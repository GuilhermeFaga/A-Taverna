import { NextApiRequest, NextApiResponse } from 'next'
import components from "./components.json";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(components);
};
