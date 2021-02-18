"use strict";
exports.__esModule = true;
exports.outputEnvironmentVariables = exports.respositoryRootDirectory = void 0;
var path = require("path");
exports.respositoryRootDirectory = path.join(__dirname, "..");
function outputEnvironmentVariables(output) {
    if (output === void 0) { output = console.info; }
    output("\n=== Environment ===");
    output("respositoryRootDirectory = '" + exports.respositoryRootDirectory + "'");
    output("======\n");
}
exports.outputEnvironmentVariables = outputEnvironmentVariables;
