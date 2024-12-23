import { mongodbConnect } from "@/db/mongobConnect"
import urlShortnerSchema from "@/models/urlShortnerSchema";

export async function POST(req:Request) {
    try {
        await mongodbConnect();
        const body:any = await req.json();
        const find = await urlShortnerSchema.findOne({
            shortURL: body.shortURL
        })
        if(find){
            return Response.json({success:false,message:"Duplicate Short URL",URL:find.URL,shortURL: find.shortURL})
        }
        const result = await urlShortnerSchema.insertMany({
            URL: body.URL,
            shortURL: body.shortURL
        })
        return Response.json({success:true, error: false, message: "Short URL generated Sucessfully",URL:body.URL,shortURL:body.shortURL});
    } catch (error) {
        console.log("Error in api shortenUrl route",error)
    }

    
}

export async function GET(req:Request) {
    try {
        await mongodbConnect();
        const find = await urlShortnerSchema.find({})
        return Response.json({success:true, error: false, message: "Short URL's fetched Sucessfully",find});
    } catch (error) {
        console.log("Error in api shortenUrl route",error)
    }

    
}