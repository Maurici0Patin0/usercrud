import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './styles/formUsers.css'

const defaultValues = {
    email:'',
    password:'',
    first_name:'',
    last_name:'',
    birthday:''
}

const FormUsers = ({ createNewUsers, updateInfo, updateUserById, setUpdateInfo, setformIsClose}) => {
    const { handleSubmit, reset, register } = useForm()


    useEffect(()=>{
        if(updateInfo){
            reset(updateInfo)
        }
    },[updateInfo])


    const sudmit = data => {
        if(updateInfo){
        updateUserById(updateInfo.id, data)
        setUpdateInfo()
        }else{
            createNewUsers(data)
        }
        reset(defaultValues)
        setformIsClose(true)
    }

    const handleCloseForm=()=>{
        setformIsClose(true)

    };


    return (
        <form className='form' onSubmit={handleSubmit(sudmit)}>
            

            <i onClick={handleCloseForm} className='from_x fa-solid fa-xmark'></i>
 
            
            <h2 className='form_title'>{updateInfo? 'Edit User' : 'New User'}</h2>
            <div className='form_div'>
                 
                <label className='form_label' htmlFor="email">Email</label>
                <input className='form_input' placeholder='Enter you email' type="email" id="email" {...register('email')} />
            </div>

            <div className='form_div'>
                <label className='form_label' htmlFor="password">Password</label>
                <input className='form_input' placeholder='Enter you password' type="password" id="password" {...register('password')} />
            </div>

            <div className='form_div'>
                <label className='form_label' htmlFor="first_name">First Name</label>
                <input className='form_input' placeholder='Enter you first name' type="text" id="first_name" {...register('first_name')} />
            </div>

            <div className='form_div'>
                <label className='form_label' htmlFor="last_name">Last Name</label>
                <input className='form_input' placeholder='Enter you last name' type="text" id="last_name" {...register('last_name')} />
            </div>

            <div className='form_div'>
                <label className='form_label' htmlFor="birthday">BirthDay</label>
                <input className='form_input' placeholder='Enter you birthday' type="date" id="birthday" {...register('birthday')} />
            </div>
            <button className='form_btn'>{updateInfo?'Update' : 'Create'}</button>
        </form>
    )
}

export default FormUsers