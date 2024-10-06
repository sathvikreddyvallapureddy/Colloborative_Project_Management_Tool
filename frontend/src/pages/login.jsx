import React, { useEffect } from 'react'
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/slices/api/authApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import { toast } from 'sonner';


const login = () => {
  const {user}  = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();


  const submitHandler = async(data) => {
    try{
      const result = await login(data).unwrap();
      console.log(result);
      const result1 = await login(data);
      dispatch(setCredentials(result1))
      navigate("/")
    }
    catch(error){
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };
  
  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);



  return(
    <div>
      <div className="flex items-center w-full h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700 text-center">Account Login</h3>
          <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-3">
              <TextBox
                placeholder='email@example.com'
                type='email'
                name='email'
                label='Email Address'
                className="w-full rounded-full"
                register={register("email", {required: "Email Adress is required!",})}
                error={errors.email ? errors.email.message: ""}
              />

              <TextBox
                placeholder='your password'
                type='password'
                name='password'
                label='Password'
                className="w-full rounded-full"
                register={register("password", {required: "Password is required!",})}
                error={errors.password ? errors.password.message: ""}
              />


              <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>
                Forgot Password?
              </span>
            
            <Button
              type="submit"
              label="Login"
              className="w-full h-10 bg-blue-700 text-white rounded-full"
              />
            
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default login