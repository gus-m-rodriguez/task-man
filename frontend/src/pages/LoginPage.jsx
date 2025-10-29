import { Link, useNavigate } from "react-router-dom";
import { Card, Input, Button, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { signin } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
    navigate("/perfil");
  });

  return (
    <div className="h-[calc(90vh-64px)] flex items-center justify-center">
      <Card>
        <h1 className="text-4xl font-bold my-2 text-center">Iniciar sesión</h1>

        <form onSubmit={onSubmit}>
          <Label htmlFor={"email"}>E-Mail</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="Ingrese su email" {...register("email", { required: true })}></Input>
          <Label htmlFor={"password"}>Contraseña</Label>
          <Input id="password" type="password" autoComplete="current-password" placeholder="Ingrese su Contraseña"{...register("password", { required: true })}></Input>
          <Button>Ingresar</Button>
        </form>
        <div className="flex justify-between mt-4 text-gray-600">
          <p>¿No tienes una cuenta?{" "}</p>
          <Link to="/register" className="text-blue-600 hover:underline">
            Registrate
          </Link>
        </div>
      </Card>
    </div>
  );

}

export default LoginPage
