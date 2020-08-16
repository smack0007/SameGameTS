@ECHO OFF
PUSHD %~dp0

CALL env.cmd

ECHO Building...
CALL tsc %__TSC_FLAGS% src\main.ts
CALL browserify --debug src\main.js -o bin\app.js

CALL tsc --strict --typeRoots ext\@types scripts\build.ts && CALL node scripts\build.js

POPD