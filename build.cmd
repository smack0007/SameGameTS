@ECHO OFF
PUSHD %~dp0
lint
tsc
POPD