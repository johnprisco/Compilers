var TSC;
(function (TSC) {
    var Logger = (function () {
        function Logger() {
        }
        Logger.logMessage = function (message) {
            var log = document.getElementById("log-output");
            log.value += message + "\n";
        };
        Logger.logWarning = function (message) {
            var log = document.getElementById("log-output");
            log.value += "WARNING: " + message + "\n";
        };
        Logger.logError = function (message, line, module) {
            var log = document.getElementById("log-output");
            log.value += "ERROR in " + module + " on line " + line + ": " + message;
        };
        return Logger;
    })();
    TSC.Logger = Logger;
})(TSC || (TSC = {}));
//# sourceMappingURL=logger.js.map