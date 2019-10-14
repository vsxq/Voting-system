export async function insert_one(will_add_data:object,model:any){
    const will_add_mongo_data = new model(
        will_add_data
                    )
                    await will_add_mongo_data.save((err: any, res: any) => {
        
                        if (err) {
                            console.log("Error:" + err);
        
                        }
                        else {
                            console.log("Res:" + res);
                        }
        
                    })
}