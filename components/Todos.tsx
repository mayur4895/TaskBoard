"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CiEdit } from "react-icons/ci";
import {
  PiTrashSimpleThin,
  PiCheckThin,
  PiCrossThin,
  PiXThin,
} from "react-icons/pi";
import { Toggle } from "@/components/ui/toggle";
import axios from "axios";
import { PiCircleNotchLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { Task } from "@prisma/client";
import { Label } from "./ui/label";
import { useModal } from "@/hooks/use-modal-store";
const Tasks = () => {
  const router = useRouter();
  const [Tasks, setTasks] = useState<Task[]>([]);
  const [IsLoding, setIsLoding] = useState(false);

  const getAllTasks = async () => {
    try {
      setIsLoding(true);
      const res = await axios.get("/api/task");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
      setIsLoding(false);
    } finally {
      setIsLoding(false);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const deleteTask = async (taskId: any) => {
    try {
      setIsLoding(true);
      await axios.delete(`/api/task/${taskId}`);
      getAllTasks();
    } catch (error) {
      console.log(error);
      setIsLoding(false);
    } finally {
      setIsLoding(false);
    }
  };

  const togglestatus = async (taskId: any, taskstatus: boolean) => {
    try {
      setIsLoding(true);
      const data = {
        completed: taskstatus,
      };
      await axios.patch(`/api/task/status/${taskId}`, data);
      getAllTasks();
    } catch (error) {
      console.log(error);
      setIsLoding(false);
    } finally {
      setIsLoding(false);
    }
  };
  const { onOpen } = useModal();

  if (IsLoding) {
    return <div>Loading...</div>;
  }

  if (!Tasks) {
    return <div>No Taks Found</div>;
  }

  return (
    <div className="rounded-md  mb-5      h-full justify-start flex-shrink-0 flex flex-wrap gap-5 ">
      {Tasks.map((task) => {
        if (task) {
          return (
            <Card className="w-[310px]  overflow-clip p-5 z-50 dark:bg-zinc-900" key={task.id}>
              <CardHeader className="p-0 mb-2">
                 
                <CardTitle className="flex  justify-between items-center">
                  {task.title}{" "}
                  <Label className="text-xs   text-gray-500">
                    {task.priority}
                  </Label>
                </CardTitle>
                <CardDescription className=" text-sm max-w-[250px]">{task.desc}</CardDescription>
              </CardHeader>

              <h2>Assignto : {task.assignto}</h2>
              <CardContent />
              <CardFooter  className="flex gap-3 p-0"> 

                  <Button
                    variant="outline"
                    onClick={() => {
                      onOpen("editTask", task);
                    }}>
                    <CiEdit size={20} />
                  </Button>

                  <Button
                    variant="outline"
                    disabled={task.status === "completed"}
                    onClick={() => {
                      deleteTask(task.id);
                    }}>
                    <PiTrashSimpleThin size={20} />
                  </Button>
                

                <div>
                  <Button variant={"outline"} className=" text-sm">
                    {task.status}
                  </Button>

                </div>
              </CardFooter>
            </Card>
          );
        }
      })}
    </div>
  );
};

export default Tasks;
