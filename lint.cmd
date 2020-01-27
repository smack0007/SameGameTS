@ECHO OFF
PUSHD %~dp0
tslint --project .
POPD