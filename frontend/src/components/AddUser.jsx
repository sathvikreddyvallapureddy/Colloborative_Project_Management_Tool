import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import ModalWrapper from './ModalWrapper';
import { DialogTitle } from '@headlessui/react';
import TextBox from './TextBox';
import Button from './Button';
import { useRegisterMutation } from '../redux/slices/api/authApiSlice';
import { useUpdateUserMutation } from '../redux/slices/api/userApiSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  // console.log(defaultValues)
  const { user } = useSelector((state) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ defaultValues: {defaultValues} });

    const dispatch = useDispatch();
    const [addnewUser] = useRegisterMutation(); 
    const [updateUser] = useUpdateUserMutation();

    const handleOnSubmit = async (data) => {
      try {
        if (userData) {
          const result = await updateUser(data).unwrap();
          toast.success(result?.message);
          if(userData?.data?._id == user?.data?._id){
            dispatch(setCredentials({...result.user}))
          }
        }
        else{
          await addnewUser({...data, password:"123456"}).unwrap();
          toast.success("New User Added Successfully"); 
        }

        setTimeout(() => {
          setOpen(false)
          window.location.reload();
        }, 1500);
      } catch (error) {
        toast.error("Something went wrong")
      }
    }

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </DialogTitle>
          <div className='mt-2 flex flex-col gap-6'>
            <TextBox
              placeholder='Full name'
              type='text'
              name='name'
              label='Full Name'
              className='w-full rounded'
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <TextBox
              placeholder='Title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <TextBox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Email Address'
              className='w-full rounded'
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <TextBox
              placeholder='Role'
              type='text'
              name='role'
              label='Role'
              className='w-full rounded'
              register={register("role", {
                required: "User role is required!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button 
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                label='Submit'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          
        </form>
      </ModalWrapper>
    </>
  )
}

export default AddUser