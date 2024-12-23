import {connect} from "mongoose";

export const mongodbConnect = async () => { 

    try {
        await connect(process.env.MONGODB_URI as string);
    } catch (error){
        console.log("Error while connecting with database: ", error);   
    }
}


