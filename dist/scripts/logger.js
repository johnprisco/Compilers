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
        Logger.logAST = function (output) {
            var log = document.getElementById('ast-output');
            log.value = output;
        };
        Logger.logSymbolTable = function (symbolTable) {
            for (var i = 0; i < symbolTable.length; i++) {
                this.logScope(symbolTable[i]);
            }
        };
        Logger.logScope = function (scope) {
            var table = document.getElementById('symbol-table');
            var unusedSymbols = [];
            for (var i = 0; i < scope.getSymbols().length; i++) {
                var symbols = scope.getSymbols();
                var row = table.insertRow(i + 1);
                var name = row.insertCell(0);
                var type = row.insertCell(1);
                var level = row.insertCell(2);
                var line = row.insertCell(3);
                name.innerHTML = symbols[i].getName();
                type.innerHTML = symbols[i].getType();
                level.innerHTML = scope.getName();
                line.innerHTML = symbols[i].getLine();
                if (!symbols[i].getInitialized()) {
                    unusedSymbols.push(symbols[i]);
                }
            }
            this.logUnusedIdentifiers(unusedSymbols);
        };
        Logger.logUnusedIdentifiers = function (symbols) {
            for (var i = 0; i < symbols.length; i++) {
                this.logWarning("Unused identifier '" + symbols[i].getName() + "' on line " + symbols[i].getLine() + ".");
            }
        };
        return Logger;
    })();
    TSC.Logger = Logger;
})(TSC || (TSC = {}));
