export const createMockData2= <T extends object | any>(time:number,entity:T)=>{
    const arr : T[]= [];
    for (let i = 0; i < time; i++)    
    {
        for (const key in entity) {
            if (entity.hasOwnProperty(key)) {
                entity[key] = (key+ i).toString();
            }
        }
        arr.push(entity);
    }
}
