@echo off
echo ==========================================
echo    LIBERADOR DE PUERTO 3000
echo ==========================================
echo.

REM Buscar procesos usando el puerto 3000
echo Buscando procesos en puerto 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo ✓ Encontrado proceso PID: %%a
    taskkill /PID %%a /F >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✓ Proceso %%a terminado exitosamente
    ) else (
        echo ✗ Error al terminar proceso %%a
    )
)

echo.
echo Verificando estado del puerto...
netstat -ano | findstr :3000 >nul
if %errorlevel% equ 0 (
    echo ✗ ADVERTENCIA: El puerto 3000 sigue ocupado
    echo   Ejecuta este script como administrador si persiste el problema
) else (
    echo ✓ PUERTO 3000 LIBERADO correctamente
)

echo.
echo Presiona cualquier tecla para continuar...
pause >nul
