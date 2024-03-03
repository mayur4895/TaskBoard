'use client'
import { useEffect, useState } from "react";
import CreateTaskModal from "../modal/create-task-modal";
import EditTaskModal from "../modal/edit-task-modal";
 
 
 

const ModalProvider = ()=>{

    const [isMounted,setisMounted] = useState(false)
    
    
    useEffect(()=>{
    setisMounted(true);
    },[setisMounted])
    
    if(!isMounted){
        return null
    }
    return(
 
       <>
  <CreateTaskModal />  
<EditTaskModal/>

</>
        )
}

export default ModalProvider;