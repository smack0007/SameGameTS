@ECHO OFF
PUSHD %~dp0

ECHO Building...
CALL tsc .\scripts\build.ts && CALL node .\scripts\build.js

ECHO Done.
POPD