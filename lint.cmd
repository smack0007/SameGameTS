@ECHO OFF
PUSHD %~dp0
ECHO Linting...
CALL .\node_modules\.bin\tslint.cmd --project .
POPD