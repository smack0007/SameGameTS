@ECHO OFF
PUSHD %~dp0
CALL tslint --project .
POPD