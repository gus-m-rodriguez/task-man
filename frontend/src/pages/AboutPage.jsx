import React from "react";

function AboutPage() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-[#cdd5df] to-[#cdd5df] text-gray-800 rounded-3xl mx-8 my-6 shadow-inner max-w-3xl text-center p-10">
        
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-sky-700 mb-2 flex items-center justify-center gap-2 drop-shadow-sm">
            <span dangerouslySetInnerHTML={{ __html: `<svg xmlns='http://www.w3.org/2000/svg' width='62' height='62' viewBox='0 0 200 200'><circle cx='100' cy='100' r='80' fill='#FCD34D'/>
      <polygon points='100,100 180,45 180,155' fill='#cdd5df'/><circle cx='120' cy='60' r='8' fill='#111827'/></svg>`}}/>📋Acerca de Task-Man
          </h1>
          <p className="text-gray-700 text-lg">
            Una aplicación académica desarrollada en el entorno <b>PERN</b> 
            (PostgreSQL, Express, React y Node.js), creada como proyecto final 
            de la <b>Tecnicatura Universitaria en Programación</b> de la UTN.
          </p>
        </header>

        <main className="space-y-4 text-gray-600 text-md leading-relaxed">
          <p>
            <b>Task-Man</b> permite crear, organizar y administrar tareas 
            y proyectos de forma simple, intuitiva y colaborativa. 
            Su objetivo es aplicar en un entorno real los conceptos 
            aprendidos de desarrollo <b>full-stack</b> y buenas prácticas 
            de ingeniería de software.
          </p>
          <p>
            Implementa autenticación con JWT, validación de datos, 
            gestión de usuarios y persistencia en base de datos, 
            demostrando un flujo completo entre frontend y backend.
          </p>
          <p>
            Más allá de su fin académico, <b>Task-Man</b> busca reflejar 
            la pasión de un grupo de programadores por aprender, mejorar 
            y trabajar en equipo, uniendo creatividad con conocimiento técnico.
          </p>
        </main>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-sky-700 mb-2">👨‍💻 Equipo UTN Wizards</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Victor Alejandro · Florencia · Axel ·  Franco · Rocío · Alejandro · Gustavo · Brisa
          </p>
        </section>

        <footer className="mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} Task-Man — Proyecto académico UTN
        </footer>
      </div>
    </div>
  );
}

export default AboutPage;