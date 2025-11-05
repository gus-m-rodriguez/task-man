import { useMemo, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext.jsx";
import Card from "../components/ui/card.jsx";
import ButtonTi from "../components/ui/ButtonTi.jsx";

function getInitials(nameOrEmail = "") {
  const base = (nameOrEmail || "").trim();
  if (!base) return "U";
  const name = base.includes("@") ? base.split("@")[0] : base;
  const p = name.replace(/[_\\.]+/g, " ").split(" ").filter(Boolean);
  if (p.length === 1) return p[0].slice(0, 2).toUpperCase();
  return (p[0][0] + p[1][0]).toUpperCase();
}
function prettyDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("es-AR", { year: "numeric", month: "short", day: "2-digit" });
}
function Section({ title, children, right }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {right}
      </div>
      <div className="h-px bg-zinc-800" />
      {children}
    </div>
  );
}
function Avatar({ text, gravatar }) {
  const initials = useMemo(() => getInitials(text), [text]);

  return (
    <div className="size-20 rounded-2xl flex items-center justify-center font-semibold text-xl text-white shadow-md bg-gradient-to-br from-indigo-500 to-purple-600 select-none overflow-hidden">
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

export default function ProfilePage() {
  const { user, setUser } = useAuth();


  const [profileOpen, setProfileOpen] = useState(true);
  const [passOpen, setPassOpen] = useState(false);


  const [profileErrors, setProfileErrors] = useState([]);
  const [passErrors, setPassErrors] = useState([]);
  const [profileOk, setProfileOk] = useState("");
  const [passOk, setPassOk] = useState("");


  const [savingProfile, setSavingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    nombre: user?.nombre ?? user?.name ?? "",
    email: user?.email ?? "",
  });

  const [savingPass, setSavingPass] = useState(false);
  const [passForm, setPassForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });


  const fullName = user?.nombre ?? user?.name ?? "";
  const email = user?.email ?? "—";
  const role = user?.role ?? user?.rol ?? "Usuario";
  const joined = user?.created_at ?? user?.fecha_alta ?? user?.createdAt ?? null;
  const uid = user?.id ?? user?._id ?? "—";


  const onChangeProfile = (e) => {
    setProfileErrors([]);
    setProfileOk("");
    const { name, value } = e.target;
    setProfileForm((f) => ({ ...f, [name]: value }));
  };
  const onChangePass = (e) => {
    setPassErrors([]);
    setPassOk("");
    const { name, value } = e.target;
    setPassForm((f) => ({ ...f, [name]: value }));
  };

  const onSaveProfile = async (e) => {
    e.preventDefault();
    setProfileErrors([]);
    setProfileOk("");
    setSavingProfile(true);
    try {
      const res = await axios.put("/profile", profileForm, { withCredentials: true });
      if (res?.data) setUser?.(res.data);
      setProfileOk("Perfil actualizado.");
    } catch (err) {
      const msg = err?.response?.data?.message || "No se pudo actualizar el perfil.";
      
      if (err?.response?.status === 409) {
        setProfileErrors(["El correo ya se encuentra registrado por otro usuario."]);
      } else {
        setProfileErrors([msg]);
      }
    } finally {
      setSavingProfile(false);
    }
  };

  const onSavePass = async (e) => {
    e.preventDefault();
    setPassErrors([]);
    setPassOk("");

    if (passForm.newPassword !== passForm.confirmNewPassword) {
      setPassErrors(["La confirmación no coincide."]);
      return;
    }
    if (!passForm.newPassword || passForm.newPassword.length < 6) {
      setPassErrors(["La nueva contraseña debe tener al menos 6 caracteres."]);
      return;
    }

    setSavingPass(true);
    try {
      const res = await axios.put(
        "/profile/password",
        { currentPassword: passForm.currentPassword, newPassword: passForm.newPassword },
        { withCredentials: true }
      );
      if (res?.data?.message) setPassOk(res.data.message);
      setPassForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (err) {
      const msg = err?.response?.data?.message || "No se pudo actualizar la contraseña.";
      setPassErrors([msg]);
    } finally {
      setSavingPass(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6 md:p-10 space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Mi perfil</h1>

      <Card>
      
        {(profileErrors.length > 0 || passErrors.length > 0) && (
          <div className="mb-4">
            {profileErrors.map((e, i) => (
              <div key={`pe-${i}`} className="bg-red-500/20 text-red-300 border border-red-500/40 rounded-md px-3 py-2 mb-2">
                {e}
              </div>
            ))}
            {passErrors.map((e, i) => (
              <div key={`se-${i}`} className="bg-red-500/20 text-red-300 border border-red-500/40 rounded-md px-3 py-2 mb-2">
                {e}
              </div>
            ))}
          </div>
        )}
        {(profileOk || passOk) && (
          <div className="mb-4">
            {profileOk && (
              <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-md px-3 py-2 mb-2">
                {profileOk}
              </div>
            )}
            {passOk && (
              <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-md px-3 py-2 mb-2">
                {passOk}
              </div>
            )}
          </div>
        )}

      
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <Avatar text={fullName || email} gravatar={user?.gravatar} />
          <div className="flex-1 space-y-1">
            <h2 className="text-xl font-semibold">{fullName || "Sin nombre definido"}</h2>
            <p className="text-sm text-zinc-400">{email}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-2">
              <span>ID: {uid}</span>
              <span className="opacity-50">•</span>
              <span>Rol: {role}</span>
              <span className="opacity-50">•</span>
              <span>Alta: {prettyDate(joined)}</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-zinc-800 my-6" />

      
        <Section
          title="Datos básicos"
          right={
            <button onClick={() => setProfileOpen((v) => !v)} className="text-sm text-zinc-300 hover:text-white transition-colors">
              {profileOpen ? "Ocultar" : "Editar"}
            </button>
          }
        >
          {profileOpen && (
            <form onSubmit={onSaveProfile} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-sm text-zinc-300">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={profileForm.nombre}
                  onChange={onChangeProfile}
                  className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 w-full text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-zinc-300">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={profileForm.email}
                  onChange={onChangeProfile}
                  className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 w-full text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                <ButtonTi hue="rose" type="submit" disabled={savingProfile}>
                  {savingProfile ? "Guardando…" : "Guardar cambios"}
                </ButtonTi>
              </div>
            </form>
          )}
        </Section>

        <div className="my-6" />

      
        <Section
          title="Seguridad — Cambiar contraseña"
          right={
            <button onClick={() => setPassOpen((v) => !v)} className="text-sm text-zinc-300 hover:text-white transition-colors">
              {passOpen ? "Ocultar" : "Editar"}
            </button>
          }
        >
          {passOpen && (
            <form onSubmit={onSavePass} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="currentPassword" className="text-sm text-zinc-300">Contraseña actual</label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  value={passForm.currentPassword}
                  onChange={onChangePass}
                  className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 w-full text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm text-zinc-300">Nueva contraseña</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  value={passForm.newPassword}
                  onChange={onChangePass}
                  className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 w-full text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="confirmNewPassword" className="text-sm text-zinc-300">Confirmar nueva contraseña</label>
                <input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  autoComplete="new-password"
                  value={passForm.confirmNewPassword}
                  onChange={onChangePass}
                  className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 w-full text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                <ButtonTi hue="rose" type="submit" disabled={savingPass}>
                  {savingPass ? "Actualizando…" : "Actualizar contraseña"}
                </ButtonTi>
              </div>
            </form>
          )}
        </Section>

      
        
      </Card>
    </div>
  );
}
