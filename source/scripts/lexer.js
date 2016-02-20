/* lexer.ts  */
var TSC;
(function (TSC) {
    var Lexer = (function () {
        function Lexer() {
        }
        Lexer.lex = function () {
            // Grab the "raw" source code.
            var sourceCode = document.getElementById("taSourceCode").value;
            // Trim the leading and trailing spaces.
            sourceCode = TSC.Utils.trim(sourceCode);
            // Create array of source split by new lines
            var sourceByLines = sourceCode.split('\n');
            // This is the regex that makes it simpler to determine tokens
            // /S is pretty helpful; just have to define whats longer than one character
            // and try to catch strings as a single unit, so white space isn't stripped
            var matchRegex = /[a-z]+|[1-9]|(==)|(!=)|("[^"]*")|(\S)/g;
            // Trim the leading and trailing white space from the split source code
            for (var i = 0; i < sourceByLines.length; i++) {
                sourceByLines[i] = TSC.Utils.trim(sourceByLines[i]);
            }
            console.log(sourceByLines);
            // Loop through the code line by line, splitting it based on the characters entered.
            // This will make it easier to create tokens
            for (var i = 0; i < sourceByLines.length; i++) {
                //console.log(i + ": " + sourceByLines[i]);
                var matched = sourceByLines[i].match(matchRegex);
                // Debugging statements, checking if results are as expected.
                console.log("Iteration #" + i + ": " + matched);
            }
            return sourceCode;
            // return _Tokens
        };
        return Lexer;
    })();
    TSC.Lexer = Lexer;
})(TSC || (TSC = {}));
//# sourceMappingURL=lexer.js.map