import connectMongo from "../../utils/connectMongo";
import Incidents from "../../models/Incidents"
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addIncidents(req:NextApiRequest, res:NextApiResponse) {
  const method = req.method;
  switch(method){
    case 'POST':
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
    case 'GET': 
      try{
        //get all data from database
        //res.send(data)
        // console.log(req.body.incident);
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('CREATING DOCUMENT');
        const test = await Incidents.find({}, function(err:any, docs:any){
          if(err){
            console.log(err);
            throw err;
          }
          else{
            console.log(docs);
            return res.json(docs);
          }
        }).clone().catch(function(err){console.log(err)});
        // console.log('CREATED DOCUMENT');
      } catch (error) {
        console.log(error);
        res.json({ error });
      }
  }
}