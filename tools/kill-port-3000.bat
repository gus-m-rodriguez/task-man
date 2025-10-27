@echo off
echo Liberando puerto 3000...

REM Buscar procesos usando el puerto 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Encontrado proceso PID: %%a
    taskkill /PID %%a /F
    echo Proceso %%a terminado
)

REM Verificar que el puerto esté libre
netstat -ano | findstr :3000
if %errorlevel% equ 0 (
    echo ADVERTENCIA: El puerto 3000 sigue ocupado
) else (
    echo PUERTO 3000 LIBERADO correctamente
)

echo.
echo Ejecutando servidor...
npm run dev
