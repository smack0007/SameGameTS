@ECHO OFF
PUSHD %~dp0

ECHO Building...
CALL tsc --project .\scripts\tsconfig.json && CALL node .\scripts\build.js

ECHO Done.
POPD