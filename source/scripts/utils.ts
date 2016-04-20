/* --------  
   Utils.ts

   Utility functions.
   -------- */

module TSC {

    export class Utils {

        public static trim(str)      // Use a regular expression to remove leading and trailing spaces.
        {
            return str.replace(/^\s+ | \s+$/g, "");
            /*
             Huh?  Take a breath.  Here we go:
             - The "|" separates this into two expressions, as in A or B.
             - "^\s+" matches a sequence of one or more whitespace characters at the beginning of a string.
             - "\s+$" is the same thing, but at the end of the string.
             - "g" makes is global, so we get all the whitespace.
             - "" is nothing, which is what we replace the whitespace with.
             */

        }

        public static rot13(str)     // An easy-to understand implementation of the famous and common Rot13 obfuscator.
        {                       // You can do this in three lines with a complex regular experssion, but I'd have
            var retVal = "";    // trouble explaining it in the future.  There's a lot to be said for obvious code.
            for (var i in str) {
                var ch = str[i];
                var code = 0;
                if ("abcedfghijklmABCDEFGHIJKLM".indexOf(ch) >= 0) {
                    code = str.charCodeAt(i) + 13;  // It's okay to use 13.  It's not a magic number, it's called rot13.
                    retVal = retVal + String.fromCharCode(code);
                }
                else if ("nopqrstuvwxyzNOPQRSTUVWXYZ".indexOf(ch) >= 0) {
                    code = str.charCodeAt(i) - 13;  // It's okay to use 13.  See above.
                    retVal = retVal + String.fromCharCode(code);
                }
                else {
                    retVal = retVal + ch;
                }
            }
            return retVal;
        }


        public static setVerbose() {
            // If its on, turn it off and vice verse.
            document.getElementById('verbose-button').classList.toggle("btn-success");
            document.getElementById('verbose-button').classList.toggle("btn-danger");
            _VerboseMode = !_VerboseMode;
        }

        public static compile() {
            // Reset globals
            _Tokens = [];
            _CurrentToken = null;
            _TokenIndex = 0;
            var log: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("log-output");
            var source: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");
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
            SemanticAnalyzer.performAnalysis()
        }

        public static clearTable(element: string) {
            var table = <HTMLTableElement> document.getElementById(element);
            var length = table.rows.length;

            if (length > 1) {
                // Remove rows from the bottom up
                // Otherwise, they'll be removed out of order or some will be skipped
                for (var i = length - 1; i > 0; i--) {
                    table.deleteRow(i);
                }
            }
        }

        public static missingEoP() {
            var source: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");
            source.value = '{ \n  int a \n  a = 2 \n  print(a) \n} ';
        }

        public static invalidSymbol() {
            var source: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");
            source.value = '{ \n  int a \n  a = 2 \n  print(a - 2) \n} $';
        }

        public static everything() {
            var source:HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");

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
        }

        public static basicProgram() {
            var source: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");
            source.value = '{}$';
        }

        public static newLineString() {
            var source: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");
            source.value = '{\n  string a\n  a = \"str\ning\"\n  print(a)\n} $';
        }

        public static unexpectedToken() {
            var source: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");
            source.value = '{\n  int a\n  a == 5 + 1\n  print(a)\n} $';
        }

        public static projectTwoExample() {
            var source: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");
            source.value = '{\n int a \n boolean b \n { \n string c \n ' +
                'a = 5 \n b = true \n c = "inta" \n print(c) \n ' +
                '} \n print(b) \n print(a) \n } $';
        }

        public static parentScope() {
            var source: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");
            source.value = '{\n  int a\n  a = 5\n  {\n    print(a)\n  }\n} $';
        }

        public static undeclaredIdentifier() {
            var source: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");
            source.value = '{\n  a = 5\n} $';
        }

        public static unusedVariable() {
            var source: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");
            source.value = '{\n  string a\n  int b\n  a = "true"\n  print(a)\n} $';
        }

        public static badStringAssignment() {
            var source: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");
            source.value = '{\n  string a\n  a = true\n} $';
        }

        public static badBooleanAssignment() {
            var source: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");
            source.value = '{\n  boolean a\n  a = "true"\n} $';
        }

        public static goodIntAssignment() {
            var source: HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("source-code");
            source.value = '{\n  int a\n  a = 5\n} $';
        }
    }
}
