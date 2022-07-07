import connectMongo from "../../utils/connectMongo";
import Components from "../../models/Components"
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addComponents(req:NextApiRequest, res:NextApiResponse) {

  const method = req.method;
  switch(method){
    case "POST":
    try {
      console.log(req.body.component);
      console.log('CONNECTING TO MONGO');
      await connectMongo();
      console.log('CONNECTED TO MONGO');

      console.log('CREATING DOCUMENT');
      const test = await Components.create(req.body.component);
      console.log('CREATED DOCUMENT');

      res.json({ test });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
    case "GET":
      try{
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        console.log('CREATING DOCUMENT');
        const test = await Components.find({}, function(err:any, docs:any){
          if(err){
            console.log(err);
            throw err;
          }
          else{
            console.log(docs);
            return res.json(docs);
          }
        }).clone().catch(function(err){console.log(err)});
      }
      catch(error) {
        console.log(error);
        res.json({ error });
      }
}
}