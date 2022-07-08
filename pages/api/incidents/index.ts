import connectMongo from "../../../utils/connectMongo";
import Incidents from "../../../models/Incidents"
import { NextApiRequest, NextApiResponse } from "next";
import Components from "../../../models/Components";

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
        const Incident = req.body.incident;
        const components = req.body.incident.components;
        Incident.components = components;
        console.log('CREATED DOCUMENT');
        for(const id of Object.keys(req.body.incident.components)){
          await Components.findByIdAndUpdate(id, {
            status: req.body.incident.components[id]
          }).clone().catch(function(err){console.log(err)});
        }
        const test = await Incidents.create(Incident);
        res.json({ test });
      } catch (error) {
        console.log(error);
        res.json({ error });
      }
      case 'GET': 
        try{
          console.log('CONNECTING TO MONGO');
          await connectMongo();
          console.log('CONNECTED TO MONGO');

          console.log('CREATING DOCUMENT');
          const test = await Incidents.find({}, async function(err:any, docs:any){
            if(err){
              console.log(err);
              throw err;
            }
            else{
              console.log(docs);
              const componentsFromDB = await Components.find({},async function(err:any, comps:any){
                //id -->comp
                if(err){
                  console.log(err);
                }
                let map = new Map();
                for(const comp of comps){
                  map.set(comp["_id"].valueOf(), comp);
                }
                console.log(map);
                const returnIncidents = await docs.map(async(item:any)=>{
                  let tmp = [];
                  let  i = 0;
                  for(const component of item.component_ids){
                    console.log("Here is component group",component);
                    tmp[i++] = map.get(component);
                  }
                  console.log("Here is tmp",tmp);
                  item.components = tmp;
                  return item;
                })
                Promise.all(returnIncidents).then((x)=>{return res.json(x)});
              }).clone().catch(function(err){console.log(err)});
            
              
            }
          }).clone().catch(function(err){console.log(err)});
          // console.log('CREATED DOCUMENT');
        } catch (error) {
          console.log(error);
          res.json({ error });
        }
      case "PATCH": 
        try{
          
        }
        catch(error){
          console.log(error);
          res.json({error});
        }
  }
}