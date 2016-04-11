module TSC {
    export class Logger {

        public static logMessage(message: string): void {
            // Only log messages if we're in Verbose Mode
            if (_VerboseMode) {
                var log = <HTMLTextAreaElement> document.getElementById("log-output");
                log.value += message + "\n"
            }
        }

        public static logWarning(message: string): void {
            var log = <HTMLTextAreaElement> document.getElementById("log-output");
            log.value += "WARNING: " + message + "\n";
        }

        public static logError(message: string, line: number, module: String): void {
            var log = <HTMLTextAreaElement> document.getElementById("log-output");
            log.value += "ERROR in " + module + " on line " + line + ": " + message;
        }

        public static logTokens(): void {
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

        public static logCST(): void {
            var log = <HTMLTextAreaElement> document.getElementById('cst-output');
            log.value = _CST.toString();
        }

        // Sometimes we need to log something even if we're in verbose mode.
        public static logIgnoringVerboseMode(message: string): void {
            var log = <HTMLTextAreaElement> document.getElementById("log-output");
            log.value += message + "\n";
        }

        public static logAST(output: string): void {
            var log = <HTMLTextAreaElement> document.getElementById('ast-output');
            log.value = output;
        }

        public static logSymbolTable(symbolTable: Scope[]): void {
            for (var i = 0; i < symbolTable.length; i++) {
                this.logScope(symbolTable[i]);
            }
        }

        public static logScope(scope: Scope): void {
            var table = <HTMLTableElement> document.getElementById('symbol-table');
            var unusedSymbols: Symbol[] = [];
            for (var i = 0; i < scope.getSymbols().length; i++) {
                var symbols = scope.getSymbols();

                var row = <HTMLTableRowElement> table.insertRow(i + 1);
                var name  = <HTMLTableCellElement> row.insertCell(0);
                var type  = <HTMLTableCellElement> row.insertCell(1);
                var level = <HTMLTableCellElement> row.insertCell(2);
                var line  = <HTMLTableCellElement> row.insertCell(3);

                name.innerHTML = symbols[i].getName();
                type.innerHTML = symbols[i].getType();
                level.innerHTML = scope.getName();
                line.innerHTML = symbols[i].getLine();

                if (!symbols[i].getInitialized()) {
                    unusedSymbols.push(symbols[i]);
                }
            }

            this.logUninitializedIdentifiers(unusedSymbols);
        }

        public static logUninitializedIdentifiers(symbols: Symbol[]) {
            for (var i = 0; i < symbols.length; i++) {
                this.logWarning("Identifier '" + symbols[i].getName() + "' on line " + symbols[i].getLine() + " was not initialized.");
            }
        }
    }
}