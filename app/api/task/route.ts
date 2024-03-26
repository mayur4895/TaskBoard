import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function POST(req:Request){


    try {
        const {userId} =   auth();  
        if(!userId){
          return   NextResponse.json("Unauthorized",{status:500});
        }

        const {title,desc,assignto,priority} = await req.json();

        if(!title || !desc  || !assignto || !priority ){
            NextResponse.json("all fields are required",{status:500});
        }
        const task  = await db.task.create({
           data:{
            title,
            desc,
            assignto,
            priority,
            userId
           
           }
        })
return NextResponse.json(task,{status:200});

    } catch (error) {
      return  NextResponse.json("Error POST CREATING TASK",{status:500})
    }
}



export async function GET(req:Request){


    try {
        const {userId} =   auth();  
        if(!userId){
          return   NextResponse.json("Unauthorized",{status:500});
        }
  
       
        const tasks  = await db.task.findMany({
          where:{
            userId:userId,
            
          },orderBy:{createdAt:"desc"}
        })
return NextResponse.json(tasks,{status:200});

    } catch (error) {
       return  NextResponse.json("Error GET TASK",{status:500})
    }
}