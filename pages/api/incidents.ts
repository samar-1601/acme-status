// export default function handler(req:any, res:any){
//     console.log("Got response here",req.body)
//     res.json({message: "How do you do"})
// }

import connectMongo from "../../utils/connectMongo";
import Incidents from "../../models/Incidents"

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addIncidents(req:any, res:any) {
  try {
    console.log(req.body.incident);
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('CREATING DOCUMENT');
    const test = await Incidents.create(req.body.incident);
    console.log('CREATED DOCUMENT');

    res.json({ test });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}