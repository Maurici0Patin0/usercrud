import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import FormUsers from './components/FormUsers'
import UserCard from './components/UserCard'

const baseURL = 'http://144.126.218.162:9000'

function App() {
  const [users, setUsers] = useState()
  //para pasar informacion de usercard a formusername
const [updateInfo, setUpdateInfo] = useState()
const [formIsClose, setformIsClose] = useState(true)

  //para hacer el get de todos los users
  const getAllUsers = () => {
    const URL = `${baseURL}/users/`
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getAllUsers()
  }, [])

  //para crear un nuevo usuario 

  const createNewUsers = data => {
    const URL = `${baseURL}/users/`
    axios.post(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))

  }
  //Para eliminar un usuario especifico
  const deleteUserById = id => {
    const URL = `${baseURL}/users/${id}/`
    axios.delete(URL)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }
//para actualizar un usuario en especifico

const updateUserById =(id, data) =>{
  const URL = `${baseURL}/users/${id}/`
  axios.patch(URL, data)
  .then(res=> {
    console.log(res.data)
    getAllUsers()
  })
  .catch(err => console.log(err))
}
const handleOpenForm =()=>{
  setformIsClose(false)
}
  return (
    <div className="App">
       
      <div className='App_container-title'>
      <h1 className='App_title'>Users CRUD</h1>
      <button onClick={handleOpenForm} className='App_btn'>New User</button>
      </div>
      <div className={`form-container ${formIsClose && 'disable_form'}`}>

      <FormUsers
        createNewUsers={createNewUsers}
        updateInfo={updateInfo}
        updateUserById={updateUserById}
        setUpdateInfo={setUpdateInfo}
        setformIsClose={setformIsClose}
      />
      </div>

      <div className='users_container'>
      {
        users?.map(user => (
          <UserCard
            key={user.id}
            user={user}
            deleteUserById={deleteUserById}
            setUpdateInfo={setUpdateInfo}
            setformIsClose={setformIsClose}
          />
        ))
      }
      </div>
    </div>
  )
}

export default App