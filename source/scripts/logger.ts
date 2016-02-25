module TSC {
    export class Logger {

        public static logMessage(message: string) {
            // Only log messages if we're in Verbose Mode
            if (_VerboseMode) {
                var log = <HTMLTextAreaElement> document.getElementById("log-output");
                log.value += message + "\n"
            }
        }

        public static logWarning(message: string) {
            var log = <HTMLTextAreaElement> document.getElementById("log-output");
            log.value += "WARNING: " + message + "\n";
        }

        public static logError(message: string, line: number, module: String) {
            var log = <HTMLTextAreaElement> document.getElementById("log-output");
            log.value += "ERROR in " + module + " on line " + line + ": " + message;
        }

        public static logTokens() {
            var table = <HTMLTableElement> document.getElementById('tokens-table');
            for (var i = 0; i < _Tokens.length; i++) {
                // Use i + 1 to keep the header on top
                var row = <HTMLTableRowElement> table.insertRow(i + 1);
                var type  = <HTMLTableCellElement> row.insertCell(0);
                var value = <HTMLTableCellElement> row.insertCell(1);
                var line  = <HTMLTableCellElement> row.insertCell(2);

                type.innerHTML = _Tokens[i].type;
                value.innerHTML = _Tokens[i].value;
                line.innerHTML = _Tokens[i].line;
            }
        }

        // Sometimes we need to log something even if we're in verbose mode.
        public static logIgnoringVerboseMode(message: string) {
            var log = <HTMLTextAreaElement> document.getElementById("log-output");
            log.value += message + "\n";
        }
    }
}