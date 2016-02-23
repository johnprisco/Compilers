module TSC {
    export class Logger {

        public static logMessage(message: string) {
            var log = <HTMLTextAreaElement> document.getElementById("log-output");
            log.value += message + "\n";
        }

        public static logWarning(message: string) {
            var log = <HTMLTextAreaElement> document.getElementById("log-output");
            log.value += "WARNING: " + message + "\n";
        }

        public static logError(message: string, line: number, module: String) {
            var log = <HTMLTextAreaElement> document.getElementById("log-output");
            log.value += "ERROR in " + module + " on line " + line + ": " + message;
        }
    }
}