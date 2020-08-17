@ECHO OFF
PUSHD %~dp0

CALL env.cmd

ECHO Downloading nwjs...
CALL tsc %__TSC_FLAGS% scripts\download-nwjs.ts && CALL node .\scripts\download-nwjs.js

ECHO Done.
POPD