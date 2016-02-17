/* lexer.ts  */

module TSC {
	export class Lexer {
		public static lex() {
		    {
		        // Grab the "raw" source code.
		        var sourceCode = (<HTMLInputElement>document.getElementById("taSourceCode")).value;
		        // Trim the leading and trailing spaces.
		        sourceCode = TSC.Utils.trim(sourceCode);
                // Create array of source split by new lines
                var sourceByLines: Array<string> = sourceCode.split('\n');

                // TODO: This doesn't account for 0s
                var matchRegex: RegExp = /[a-z]+|^[1-9]\d*$|(==)|(!=)|(\S)/g;
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
                    console.log("Iteration #" + i + ": " + matched);
                }

		        return sourceCode;
		    }
		}
	}
}
