import { Link, useLocation } from "react-router-dom"
import { navigation } from "./navigation.js"
import { Container } from "../ui/index.js"

function Navbar() {
    const location = useLocation();
    console.log(location);
  return (
    <nav className="bg-zinc-950">
      <Container className="flex justify-between items-center py-4">
        <Link to="/">
                <h1 className="text-2xl font-bold text-white">Proyecyo PERN</h1>
        </Link>
      <ul className="flex gap-x-2">
        {navigation.map(({ name, path }) => (
          <li className= {
            `text-slate-300 rounded-md bg-zinc-500 px-3 py-1 hover:bg-zinc-700 transition-colors ${location.pathname === path && "bg-zinc-700"}`
          }
           key={name} >
            <Link to={path}>{name}</Link>
          </li>
        ))}
      </ul>
        </Container>
    </nav>
  )
}

export default Navbar
