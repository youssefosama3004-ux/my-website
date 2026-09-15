@echo off
cd /d "%~dp0"
set ASTRO_TELEMETRY_DISABLED=1
call ".\node_modules\.bin\astro.cmd" dev --host 0.0.0.0 --port 4321 > dev-server.log 2> dev-server.err.log
