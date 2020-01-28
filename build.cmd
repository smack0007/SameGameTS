@ECHO OFF
PUSHD %~dp0
CALL lint

ECHO Building...
CALL .\node_modules\.bin\tsc.cmd
POPD