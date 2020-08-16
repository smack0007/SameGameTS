@ECHO OFF
PUSHD %~dp0

CALL env.cmd

IF NOT EXIST "bin" (
    CALL build.cmd
)

START /B tsc %__TSC_FLAGS% -w src\main.ts
START /B CALL watchify --debug src\main.js -o bin\app.js

CALL run.cmd

POPD