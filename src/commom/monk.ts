export const createMockData= <T extends object|any>(time:number,entity:T)=>{
    const arr : T[]= [];
    for (let i = 0; i < time; i++)    
    {
        let newEntity = JSON.parse(JSON.stringify(entity));
        for (const key in newEntity) {
            if (newEntity.hasOwnProperty(key)) {
                if(key!=="key"){
                    newEntity[key] = `${newEntity[key]}${i}`;
            }
                else{
                    newEntity[key] =  i;
                   
                }
            }
        }
        arr.push(newEntity);
    }
     
    return arr;
}
