// src/components/navbar/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./navigation.js";
import { Container } from "../ui/index.js";
import { useAuth } from "../../context/AuthContext.jsx";

function PacmanIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true" className="shrink-0">
      <circle cx="100" cy="100" r="80" fill="#FCD34D" />
      <polygon points="100,100 180,45 180,155" fill="#0B0F19" />
      <circle cx="120" cy="60" r="10" fill="#0F172A" />
    </svg>
  );
}

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, signout, user } = useAuth();

  // Path robusto para Perfil (tomado desde las rutas privadas)
  const perfilPath =
    (PrivateRoutes.find(r => r.name.toLowerCase() === "perfil") || {}).path || "/perfil";

  const handleLogout = async () => {
    try {
      await signout();
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  const NavLinks = () => (
    <ul className="flex flex-wrap items-center justify-center gap-2">
      {(isAuth ? PrivateRoutes.filter(r => r.name !== "Logout") : PublicRoutes).map(
        ({ name, path }) => (
          <li
            key={name}
            className={`text-slate-200 rounded-md bg-zinc-600/60 px-3 py-1 hover:bg-zinc-700 transition-colors ${
              location.pathname === path ? "bg-zinc-700" : ""
            }`}
          >
            <Link to={path}>{name}</Link>
          </li>
        )
      )}
      {isAuth && (
        <li>
          <button
            onClick={handleLogout}
            className="text-slate-200 rounded-md bg-red-900 px-3 py-1 hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </li>
      )}
    </ul>
  );
  //Manejo de avatar con Gravatar o iniciales
  function getInitials(nameOrEmail = "") {
    const base = (nameOrEmail || "").trim();
    if (!base) return "U";
    const name = base.includes("@") ? base.split("@")[0] : base;
    const p = name.replace(/[_\\.]+/g, " ").split(" ").filter(Boolean);
    if (p.length === 1) return p[0].slice(0, 2).toUpperCase();
    return (p[0][0] + p[1][0]).toUpperCase();
  }

  function AvatarMini({ text, gravatar }) {
    const initials = getInitials(text);
    return (
      <div className="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-semibold flex items-center justify-center">
        {gravatar ? (
          <img
            src={gravatar}
            alt="avatar"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement.textContent = initials;
            }}
          />
        ) : (
          initials
        )}
      </div>
    );
  }

  return (
    <nav className="bg-zinc-950">
      <Container className="py-3">
        {/* Desktop */}
        <div className="hidden md:flex w-full items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <PacmanIcon size={32} />
            <span role="img" aria-label="memo" className="text-2xl">📋</span>
            <span className="text-white text-2xl font-extrabold tracking-tight">Task-Man</span>
          </Link>

          <div className="flex items-center gap-4">
            <NavLinks />
            {isAuth && (
              <Link
                to={perfilPath}
                className="text-slate-200 flex items-center gap-2 hover:text-white transition-colors"
                title="Ir a Perfil"
                aria-label="Ir a Perfil"
              >
                <AvatarMini text={user?.nombre || user?.email} gravatar={user?.gravatar} />
                <span className="hidden sm:inline">{user?.nombre}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden w-full flex-col items-center gap-3">
          {/* Fila 1: íconos */}
          <div className="flex items-center gap-2">
            <PacmanIcon size={28} />
            <span role="img" aria-label="memo" className="text-xl">📋</span>
          </div>

          {/* Fila 2: marca */}
          <Link to="/" className="text-white text-xl font-extrabold tracking-tight">
            Task-Man
          </Link>

          {/* Fila 3: avatar + nombre -> link a Perfil */}
          {isAuth && (
            <Link
              to={perfilPath}
              className="text-slate-200 flex items-center gap-2 hover:text-white transition-colors"
              title="Ir a Perfil"
              aria-label="Ir a Perfil"
            >
              <AvatarMini text={user?.nombre || user?.email} gravatar={user?.gravatar} />
              <span>{user?.nombre}</span>
            </Link>
          )}

          {/* Fila 4: links */}
          <NavLinks />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;

