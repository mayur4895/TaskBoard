import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

 
export async function PATCH(req: Request, { params: { taskId } }: { params: { taskId: string } }) {

    try {
      
        const {userId} = auth();  
        if(!userId){
          return   NextResponse.json("Unauthorized",{status:500});
        }
         const {completed} = await req.json();
        
       
        const EditStatus  = await db.task.update({
           where:{
            id: taskId
           },data:{
            isCompleted:!completed
           }
        })
        return NextResponse.json(EditStatus, { status: 200 });
    } catch (error) {
      console.log(error);
      
      return  NextResponse.json(error,{status:500})
    }
  }
  