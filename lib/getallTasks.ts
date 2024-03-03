import { auth, redirectToSignIn } from "@clerk/nextjs";
import axios from "axios"

 


 export async function getAllTasks(){
    try {
   
      const res = await axios.get('/api/task');
      console.log(res.data);
      
                
          
                
    } catch (error) {
      console.log(error)
     
    }  
  }