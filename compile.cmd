@ECHO OFF
PUSHD %~dp0
ECHO Compiling...
CALL .\node_modules\.bin\tsc.cmd
POPD