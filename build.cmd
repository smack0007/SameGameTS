@ECHO OFF
PUSHD %~dp0

ECHO Building...
CALL tsc --strict --typeRoots ext\@types -t es2015 -m commonjs --inlineSourceMap --inlineSources src\main.ts
CALL browserify --debug src\main.js -o bin\app.js

CALL tsc --strict --typeRoots ext\@types scripts\build.ts && CALL node scripts\build.js

POPD