///<reference path='globals.ts' />
///<reference path='tree.ts' />
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
        Utils.leftPad = function (string, length) {
            for (var i = 1; i < length; i++) {
                string = "0" + string;
            }
            return string;
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
            source.value = this.trim(source.value);
            log.value = "";
            this.clearTable('tokens-table');
            this.clearTable('symbol-table');
            if (source.value === '') {
                _Logger.logIgnoringVerboseMode("Try putting some code in there!");
                return;
            }
            _Lexer.lex();
            _Logger.logIgnoringVerboseMode("Lexical analysis successful.");
            // This will allow us to parse multiple programs.
            // Not very useful in Project One, but possibly in the future?
            while (_TokenIndex < _Tokens.length) {
                _Parser.parse();
                _Logger.logIgnoringVerboseMode("Completed parsing program.");
            }
            _Logger.logCST();
            TSC.SemanticAnalyzer.performAnalysis();
        };
        Utils.clearTable = function (element) {
            var table = document.getElementById(element);
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
        };
        Utils.invalidSymbol = function () {
            var source = document.getElementById("source-code");
            source.value = '{ \n  int a \n  a = 2 \n  print(a - 2) \n} $';
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
        };
        Utils.basicProgram = function () {
            var source = document.getElementById("source-code");
            source.value = '{}$';
        };
        Utils.newLineString = function () {
            var source = document.getElementById("source-code");
            source.value = '{\n  string a\n  a = \"str\ning\"\n  print(a)\n} $';
        };
        Utils.unexpectedToken = function () {
            var source = document.getElementById("source-code");
            source.value = '{\n  int a\n  a == 5 + 1\n  print(a)\n} $';
        };
        Utils.projectTwoExample = function () {
            var source = document.getElementById("source-code");
            source.value = '{\n int a \n boolean b \n { \n string c \n ' +
                'a = 5 \n b = true \n c = "inta" \n print(c) \n ' +
                '} \n print(b) \n print(a) \n } $';
        };
        Utils.parentScope = function () {
            var source = document.getElementById("source-code");
            source.value = '{\n  int a\n  a = 5\n  {\n    print(a)\n  }\n} $';
        };
        Utils.undeclaredIdentifier = function () {
            var source = document.getElementById("source-code");
            source.value = '{\n  a = 5\n} $';
        };
        Utils.unusedVariable = function () {
            var source = document.getElementById("source-code");
            source.value = '{\n  string a\n  int b\n  a = "true"\n  print(a)\n} $';
        };
        Utils.badStringAssignment = function () {
            var source = document.getElementById("source-code");
            source.value = '{\n  string a\n  a = true\n} $';
        };
        Utils.badBooleanAssignment = function () {
            var source = document.getElementById("source-code");
            source.value = '{\n  boolean a\n  a = "true"\n} $';
        };
        Utils.goodIntAssignment = function () {
            var source = document.getElementById("source-code");
            source.value = '{\n  int a\n  a = 5\n} $';
        };
        return Utils;
    })();
    TSC.Utils = Utils;
})(TSC || (TSC = {}));
