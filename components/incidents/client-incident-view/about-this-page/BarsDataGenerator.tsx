export const GenerateBarsData = (days:number)=>{
    let list:any[] = [];
    for(let day = 0; day<days; day++)
    {
        const downTime = Math.floor(Math.random() * 70);
        list.push(downTime);
    }
    return list;
}