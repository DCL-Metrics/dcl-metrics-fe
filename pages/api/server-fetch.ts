import { NextApiRequest, NextApiResponse } from "next"
import { getDataWithApiKey } from "../../src/lib/data/fetch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { endpoint, url } = req.query
  const result = await getDataWithApiKey(url, endpoint, {})
  res.status(200).json({ result })
}
