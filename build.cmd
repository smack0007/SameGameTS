@ECHO OFF
PUSHD %~dp0
CALL lint

ECHO Building...
CALL .\node_modules\.bin\ts-node.cmd --project .\scripts\tsconfig.json .\scripts\build.ts

ECHO Done.
POPD