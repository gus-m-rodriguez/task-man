
import {Button, Card, Container, Input, Label} from '../components/ui/index.js';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useEffect } from 'react';

//import axios from 'axios';

function RegisterPage() {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const { signup, errors: setUserErrors, setErrors } = useAuth();
  const navigate = useNavigate();
    useEffect(() => {
    setErrors([]);
    return () => setErrors([]);
  }, [setErrors]);
  const onSubmit = handleSubmit (async(data) => {
    //console.log(data);
    //const response = await fetch ('http://localhost:3000/api/signup', {
    //  credentials: 'include',
    //  method: 'POST',
    //  body: JSON.stringify(data),
    //  headers: {
    //    'Content-Type': 'application/json'
    //  }
    //});
    //const result = await response.json();
    //const result = await axios.post('http://localhost:3000/api/signup', data, {withCredentials: true});
    //console.log(result);
    const user =await signup(data);
    if(user) {
      navigate('/tareas');
    }
  });
 
  return (
    <Container className='h-[calc(90vh-64px)] flex items-center justify-center'>
      <Card>
        { setUserErrors && setUserErrors.map((error, index) => (
          <div key={index} className='bg-red-500 text-white p-2 mb-2 rounded'>
            {error}
          </div>
        ))}
        <h3 className='text-2xl font-bold text-blue-600 my-2'>Registro</h3>
        <form onSubmit={onSubmit}>
          <div>
            <Label htmlFor='nombre'>Nombre</Label>
            <Input id="nombre" placeholder= "Ingrese su nombre"{...register("nombre", {required:true} )}></Input>
            {
              errors.nombre && <span className='text-red-500'>Este campo es obligatorio</span>
            }
          </div>
          <div>
            <Label htmlFor='email'>E-Mail</Label>
            <Input id="email" type="email" placeholder= "Ingrese su correo electrónico"{...register("email", {required:true})}></Input>
            {
              errors.email && <span className='text-red-500'>Este campo es obligatorio</span>
            }
          </div>
          <div>
            <Label htmlFor='password'>Contraseña</Label>
            <Input id="password" type="password" placeholder= "Ingrese su contraseña"{...register("password", {required:true})}></Input>
            {
              errors.password && <span className='text-red-500'>Este campo es obligatorio</span>
            }
          </div>
          <div className='mt-2'>
            <Button>
              Registrarse
            </Button>
          </div>
          <div className="flex justify-between mt-4 text-gray-600">
        <p>Si ya tienes una cuenta{" "}</p>
        <Link to="/login" className="text-blue-600 hover:underline">
          Inicia sesión
        </Link>
      </div>
        </form>
      </Card>
    </Container>
  )
}

export default RegisterPage
