/* --------
   Utils.ts

   Utility functions.
   -------- */
var TSC;
(function (TSC) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.trim = function (str) {
            return str.replace(/^\s+ | \s+$/g, "");
            /*
            Huh?  Take a breath.  Here we go:
            - The "|" separates this into two expressions, as in A or B.
            - "^\s+" matches a sequence of one or more whitespace characters at the beginning of a string.
            - "\s+$" is the same thing, but at the end of the string.
            - "g" makes is global, so we get all the whitespace.
            - "" is nothing, which is what we replace the whitespace with.
            */
        };
        Utils.rot13 = function (str) {
            var retVal = ""; // trouble explaining it in the future.  There's a lot to be said for obvious code.
            for (var i in str) {
                var ch = str[i];
                var code = 0;
                if ("abcedfghijklmABCDEFGHIJKLM".indexOf(ch) >= 0) {
                    code = str.charCodeAt(i) + 13; // It's okay to use 13.  It's not a magic number, it's called rot13.
                    retVal = retVal + String.fromCharCode(code);
                }
                else if ("nopqrstuvwxyzNOPQRSTUVWXYZ".indexOf(ch) >= 0) {
                    code = str.charCodeAt(i) - 13; // It's okay to use 13.  See above.
                    retVal = retVal + String.fromCharCode(code);
                }
                else {
                    retVal = retVal + ch;
                }
            }
            return retVal;
        };
        Utils.setVerbose = function () {
            // If its on, turn it off and vice verse.
            document.getElementById('verbose-button').classList.toggle("btn-success");
            document.getElementById('verbose-button').classList.toggle("btn-danger");
            _VerboseMode = !_VerboseMode;
        };
        Utils.compile = function () {
            // Reset globals
            _Tokens = [];
            _CurrentToken = null;
            _TokenIndex = 0;
            var log = document.getElementById("log-output");
            var source = document.getElementById("source-code");
            log.value = "";
            this.clearTokensTable();
            if (source.value === '') {
                _Logger.logIgnoringVerboseMode("Try putting some code in there!");
                return;
            }
            // Grab the tokens from the lexer . . .
            _Lexer.lex();
            // . . . and parse!
            _Logger.logMessage("Lexical analysis successful.");
            // This will allow us to parse multiple programs.
            // Not very useful in Project One, but possibly in the future?
            while (_TokenIndex < _Tokens.length) {
                _Parser.parse();
                _Logger.logIgnoringVerboseMode("Completed parsing program.");
            }
        };
        Utils.clearTokensTable = function () {
            var table = document.getElementById('tokens-table');
            var length = table.rows.length;
            if (length > 1) {
                // Remove rows from the bottom up
                // Otherwise, they'll be removed out of order or some will be skipped
                for (var i = length - 1; i > 0; i--) {
                    table.deleteRow(i);
                }
            }
        };
        Utils.missingEoP = function () {
            var source = document.getElementById("source-code");
            source.value = '{ \n  int a \n  a = 2 \n  print(a) \n} ';
            this.compile();
        };
        Utils.invalidSymbol = function () {
            var source = document.getElementById("source-code");
            source.value = '{ \n  int a \n  a = 2 \n  print(a - 2) \n} $';
            this.compile();
        };
        Utils.everything = function () {
            var source = document.getElementById("source-code");
            var everything = "{\n" +
                "  string a\n" +
                "  int b\n" +
                "  a = \"test\"\n" +
                "  b = 2\n" +
                "  if (b == 2) {\n" +
                "    print(a)\n" +
                "  }\n" +
                "  while (b != 3) {\n" +
                "    string c\n" +
                "    c = \"testing grammar\"\n" +
                "    print(c)\n" +
                "    b = 3\n" +
                "}\n" +
                "  if false {\n" +
                "    print(\"false\")\n" +
                "  }\n" +
                "} $";
            source.value = everything;
            this.compile();
        };
        Utils.basicProgram = function () {
            var source = document.getElementById("source-code");
            source.value = '{}$';
            this.compile();
        };
        Utils.newLineString = function () {
            var source = document.getElementById("source-code");
            source.value = '{\n  string a\n  a = \"str\ning\"\n  print(a)\n} $';
            this.compile();
        };
        Utils.unexpectedToken = function () {
            var source = document.getElementById("source-code");
            source.value = '{\n  int a\n  a == 5 + 1\n  print(a)\n} $';
            this.compile();
        };
        return Utils;
    })();
    TSC.Utils = Utils;
})(TSC || (TSC = {}));
