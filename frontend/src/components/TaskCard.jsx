import clsx from 'clsx';
import React, { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { PRIOTITYSTYLES, TASK_TYPE, formatDate } from '../utils';
import TaskDialog from './Task/TaskDialog';

const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

const TaskCard = ({ task }) => {
  // console.log(task)
    const { user } = useSelector((state) => state.auth);
    const[open, setOpen] = useState(false);

    return (
        <>
          <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
            <div className='w-full flex justify-between'>
              <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium", PRIOTITYSTYLES[task?.priority])}>
                <span className='text-lg'>{ICONS[task?.priority]}</span>
                <span className='uppercase'>{task?.priority} Priority</span>
              </div>
              {/*user?.isAdmin && <TaskDialog task={task}/>*/}
              <TaskDialog task={task}></TaskDialog>
            </div>
            <>
              <div className='flex items-center gap-2'>
                <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}/>
                <h4 className='line-clamp-1 text-black'>{task?.title}</h4>
              </div>
              <span className='text-sm text-gray-600'>
                {formatDate(new Date(task?.date))}
              </span>
            </>

            <>
              <div className='border-t border-gray-200 mt-2'>
                <p className='text-gray-600 font-semibold test-sm'>TASK TEAM:</p>
                {task?.team?.map((m, index) => (
                  <p
                     key={m._id}>
                     {m.name}
                  </p>

                ))}
              </div>
            </>
          </div>
        </>
  )
}

export default TaskCard;