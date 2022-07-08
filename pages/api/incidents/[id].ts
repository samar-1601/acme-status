import { NextApiRequest, NextApiResponse } from "next";
import Components from "../../../models/Components";
import Incidents from "../../../models/Incidents";

export default async function(req:NextApiRequest, res:NextApiResponse){
    const pid = req.query.id;
    const method = req.method;
    console.log(pid);
    // res.end(pid)
    switch(method){
        case "PATCH":
            try{
                console.log("here comes incident edit", req.body.incident);
                const test:any = await Incidents.findByIdAndUpdate(pid, req.body.incident, async function(err:any, r:any){
                    if(err){
                        console.log(err);
                    }
                    const components = req.body.incident.components;
                    for(const id of Object.keys(req.body.incident.components)){
                        await Components.findByIdAndUpdate(id, {
                            status: req.body.incident.components[id]
                        }).clone().catch(function(err){console.log(err)});
                    }
                })
                res.json(test);
            }
            catch(error){
                res.json({error});
            }
        case "GET":
            try{
                console.log("this is pid", pid)
                const test:any = await Incidents.findById(pid, async function(err: any, r: any){
                    if(err){
                        console.log(err);
                    }
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
                          let tmp = [];
                          let  i = 0;
                          for(const component of r.component_ids){
                            console.log("Here is component group",component);
                            tmp[i++] = map.get(component);
                          }
                          r.components = tmp;
                          console.log("Here is r",r);
                        //   return res.json( r);
                        Promise.resolve(r).then((x)=>{return res.json(x)});
                      }).clone().catch(function(err){console.log(err)});
                    
                }).clone().catch(function(err){console.log(err)})
            }
            catch(error){
                return res.json({error});
            }
    }
}