 'use client'
 import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import ActionTooltip from './ActionTooltip'
import { VscAdd } from "react-icons/vsc";
import { useModal } from '@/hooks/use-modal-store';
const AddButton = () => {

    const {onOpen} = useModal();
  return (
  <ActionTooltip 
  side={'bottom'}
  label={'Add Task'}
  >
   
  <VscAdd size={22} onClick={()=>{onOpen('createTask')}}/>
   
  </ActionTooltip>
  )
}

export default AddButton