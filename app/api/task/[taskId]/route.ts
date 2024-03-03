import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function DELETE(req:Request,  {params}:{params:{taskId:string}}){

    try {
      const {taskId} = params; 
        const {userId} = auth();  
        if(!userId){
          return   NextResponse.json("Unauthorized",{status:500});
        }

       
        const tasks  = await db.task.delete({
           where:{
            id: taskId
           } 
        })
return  NextResponse.json(tasks, {status:200});
 

    } catch (error) {
      return  NextResponse.json("Error POST CREATING TASK",{status:500})
    }
}
 
export async function PATCH(req: Request, { params: { taskId } }: { params: { taskId: string } }) {

  try {
    
      const {userId} = auth();  
      if(!userId){
        return   NextResponse.json("Unauthorized",{status:500});
      }
      const {title,desc,due_date} = await req.json();

      if(!title || !desc || !due_date){
          NextResponse.json("all fields are required",{status:500});
      }
      console.log(title);
      
     
      const updatedTasks  = await db.task.update({
         where:{
          id: taskId
         },data:{
          title,
          desc,
          due_date,
          userId 
         }
      })
      return NextResponse.json(updatedTasks, { status: 200 });
  } catch (error) {
    console.log(error);
    
    return  NextResponse.json(error,{status:500})
  }
}
