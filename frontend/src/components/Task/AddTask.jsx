import React, { useState } from 'react'
import ModalWrapper from '../ModalWrapper'
import { DialogTitle } from '@headlessui/react'
import UserList from './UserList'
import { useForm } from "react-hook-form";
import TextBox from '../TextBox';
import SelectList from '../SelectList';
import Button from '../Button';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../../redux/slices/api/taskApiSlice';
import {toast} from 'sonner';
import { dateFormatter, formatDate } from '../../utils';

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];


const  AddTask = ({ open, setOpen, task }) => {
  const defaultValues = {
    title: task?.title || "",
    date: dateFormatter(task?.date || new Date()),
    team: [],
    satge: "",
    priority: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues});

  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const submitHandler = async (data) => {
    try{
      const newData = {
        ...data,
        team,
        stage,
        priority,
      };
  
      const res = task?._id ? await updateTask({ ...newData, _id:task._id }).unwrap() : await createTask(newData).unwrap();

      toast.success(res.message);

      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 500);
    } catch(err){
      console.log(err);
      toast.error(err?.data?.message || err.error); 
    }
  };



  return (
    <>
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(submitHandler)}>
              <DialogTitle as ='h2' className='text-base font-bold text-gray-900 mb-4'>
                {task? "UPDATE TASK" : "ADD TASK"}
              </DialogTitle>

              <div className='mt-2 flex flex-col gap-6'>
                <TextBox
                  placeholder='Task Title'
                  type='text'
                  name='title'
                  label='Task Title'
                  className='w-full rounded'
                  register={register("title", { required: "Title is required" })}
                  error={errors.title ? errors.title.message : ""}
                />

                <UserList setTeam={setTeam} team={team} />

                <div className='flex gap-4'>
                  <SelectList
                    label='Task Stage'
                    lists={LISTS}
                    selected={stage}
                    setSelected={setStage}
                  />

                  <div className='w-full'>
                    <TextBox
                      placeholder='Date'
                      type='date'
                      name='date'
                      label='Task Date'
                      className='w-full rounded'
                      register={register("date", {
                      required: "Date is required!",
                      })}
                      error={errors.date ? errors.date.message : ""}
                    />
                  </div>
                </div>

                <div className='flex gap-4'>
                  <SelectList
                    label='Priority Level'
                    lists={PRIORIRY}
                    selected={priority}
                    setSelected={setPriority}
                  />
                </div>
                
                <div className='bg-gray-50 py-6 sm:flex-row-reverse gap-4'>
                  <Button
                    label='Submit'
                    type='submit'
                    className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                  />


                <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
                />

                </div>
              </div>

            </form>

            


        </ModalWrapper>
    </>
  )
}

export default AddTask