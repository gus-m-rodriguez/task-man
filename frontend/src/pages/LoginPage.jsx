import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, Input, Button, Label, Container } from "../components/ui";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";



function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: authErrors, setErrors } = useAuth();

  useEffect(() => {
    setErrors([]);
    return () => setErrors([]);
  }, [setErrors]);

  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    setErrors([]);
    const user = await signin(data);
    if(user) {
      navigate("/tareas");
    }
  });

  return (
    <Container className="h-[calc(90vh-64px)] flex items-center justify-center">
      <Card>
        {
          (authErrors ?? []).map((error, index) => (
            <div key={index} className="bg-red-500 text-white p-2 mb-2 rounded">
              {error}
            </div>
          ))
        }
        <h1 className="text-4xl font-bold my-2 text-center">Iniciar sesión</h1>

        <form onSubmit={onSubmit}>
          <div> 
            <Label htmlFor={"email"}>E-Mail</Label>
            <Input id="email" type="email" autoComplete="email" placeholder="Ingrese su email" {...register("email", { required: true })}></Input>
              {
              errors.email && <span className='text-red-500'>Este campo es obligatorio</span>
              }
          </div>
          <div>
            <Label htmlFor={"password"}>Contraseña</Label>
            <Input id="password" type="password" autoComplete="current-password" placeholder="Ingrese su Contraseña"{...register("password", { required: true })}></Input>
              {
                errors.password && <span className='text-red-500'>Este campo es obligatorio</span>
              }
          </div>
          <div className='mt-2'>
            <Button>Ingresar</Button>
          </div>
        </form>
        <div className="flex justify-between mt-4 text-gray-600">
          <p>¿No tienes una cuenta?{" "}</p>
          <Link to="/register" className="text-blue-600 hover:underline">
            Registrate
          </Link>
        </div>
      </Card>
    </Container>
  );

}

export default LoginPage
