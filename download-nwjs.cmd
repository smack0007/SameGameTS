@ECHO OFF
PUSHD %~dp0

ECHO Downloading nwjs...
CALL tsc --project .\scripts\tsconfig.json && CALL node .\scripts\download-nwjs.js

ECHO Done.
POPD