'use client'
import { addDays, format, toDate } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
 import qs from "query-string"
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import axios from 'axios'
import {
  CalendarIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useModal } from '@/hooks/use-modal-store'
import { Calendar } from '../ui/calendar'

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'required',
  }).max(20, {
    message: 'max is 20',
  }),

  desc: z.string().min(1, {
    message: 'required',
  }).max(100, {
    message: 'max is 20',
  }),
  due_date: z.date({
    required_error: 'due date is required.',
  }),
})
const EditTaskModal = () => {
  const { isOpen, type, onClose, data } = useModal()
 
  const isModalOpen = isOpen && type == 'editTask'
 
 
  
 
 
 
 

  const form = useForm<z.infer<typeof formSchema>>({

    resolver: zodResolver(formSchema),
    defaultValues: {
      desc:  data.desc ||  '' ,
      title:  data.title || '',
    },
  })

  const isloding = form.formState.isSubmitting
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const editedData = {
        
        title:values.title,
        desc:values.desc,
        due_date:values.due_date.toDateString()
      }
      
       
      await axios.patch( `/api/task/${data.id}`, editedData)
      form.reset();
      onClose();
      
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleChnage = () => {
    form.reset()
    onClose()
  }
 

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleChnage}>
        <DialogContent className="outline-none">
          <DialogHeader>
            <DialogTitle className="text-2xl">Edit Task</DialogTitle>
            <DialogDescription>
              Edit your task
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Description" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 " align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: any) =>
                            date < new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">{isloding ? 'Editing' : 'Edit'}</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditTaskModal