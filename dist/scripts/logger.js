var TSC;
(function (TSC) {
    var Logger = (function () {
        function Logger() {
        }
        Logger.logMessage = function (message) {
            // Only log messages if we're in Verbose Mode
            if (_VerboseMode) {
                var log = document.getElementById("log-output");
                log.value += message + "\n";
            }
        };
        Logger.logWarning = function (message) {
            var log = document.getElementById("log-output");
            log.value += "WARNING: " + message + "\n";
        };
        Logger.logError = function (message, line, module) {
            var log = document.getElementById("log-output");
            log.value += "ERROR in " + module + " on line " + line + ": " + message;
        };
        Logger.logTokens = function () {
            var table = document.getElementById('tokens-table');
            for (var i = 0; i < _Tokens.length; i++) {
                // Use i + 1 to keep the header on top
                var row = table.insertRow(i + 1);
                var type = row.insertCell(0);
                var value = row.insertCell(1);
                var line = row.insertCell(2);
                type.innerHTML = _Tokens[i].type;
                value.innerHTML = _Tokens[i].value;
                line.innerHTML = _Tokens[i].line;
            }
        };
        Logger.logCST = function () {
            var log = document.getElementById('cst-output');
            log.value = _CST.toString();
        };
        // Sometimes we need to log something even if we're in verbose mode.
        Logger.logIgnoringVerboseMode = function (message) {
            var log = document.getElementById("log-output");
            log.value += message + "\n";
        };
        return Logger;
    })();
    TSC.Logger = Logger;
})(TSC || (TSC = {}));
