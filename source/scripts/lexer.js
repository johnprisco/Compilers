/* lexer.ts  */
/// <reference path="token.ts"/>
var TSC;
(function (TSC) {
    var Lexer = (function () {
        function Lexer() {
        }
        Lexer.lex = function () {
            _Logger.logMessage("Beginning Lexical Analysis.");
            var keywordStrings = ['while', 'print', 'if', 'int', 'string', 'boolean', 'true', 'false'];
            var symbolStrings = ['{', '}', '(', ')', '=', '!=', '==', '"', '$', '+'];
            var lexingString = false;
            // This is the regex that makes it simpler to determine tokens
            // /S is pretty helpful; just have to define whats longer than one character
            // and try to catch strings as a single unit, so spaces aren't stripped
            var matchRegex = /[a-z]+|[1-9]|(==)|(!=)|"[^"]*"|(\S)/g;
            var identifierRegex = /^[a-z]+$/;
            var digitRegex = /0|(^[1-9]([0-9])*)$/;
            var stringRegex = /^"[a-z\s]*"$/;
            // Grab the "raw" source code.
            var sourceCode = document.getElementById("source-code").value;
            // Trim the leading and trailing spaces.
            sourceCode = TSC.Utils.trim(sourceCode);
            // Helpful compilers will correct some mistakes
            // Checking to make sure the program ends with a $
            if (sourceCode[sourceCode.length - 1] != '$') {
                _Logger.logWarning("Adding an End of Program character to end of program.");
                document.getElementById("source-code").value += '$';
                sourceCode += '$';
            }
            // Create array of source split by new lines
            var sourceByLines = sourceCode.split('\n');
            // Trim the leading and trailing white space from the split source code
            for (var i = 0; i < sourceByLines.length; i++) {
                sourceByLines[i] = TSC.Utils.trim(sourceByLines[i]);
            }
            // Loop through the code line by line, splitting it based on the characters entered.
            // This will make it easier to create tokens
            for (var i = 0; i < sourceByLines.length; i++) {
                var matched = sourceByLines[i].match(matchRegex);
                // If one of the indices is null, that means it was a blank line.
                // Skip those.
                if (!(matched === null)) {
                    // Now, look at each line's possible tokens
                    for (var j = 0; j < matched.length; j++) {
                        // Try to create a token for each item
                        // i will also be the token's line number
                        var currentToken = matched[j];
                        // First, check if its a keyword
                        if (keywordStrings.indexOf(currentToken) > -1) {
                            for (var keywordIndex = 0; keywordIndex < _Keywords.length; keywordIndex++) {
                                if (currentToken === _Keywords[keywordIndex].value) {
                                    // i + 1 to get the line number; lines don't start at zero
                                    var token = TSC.Token.makeNewToken(_Keywords[keywordIndex].type, _Keywords[keywordIndex].value, i + 1);
                                    _Tokens.push(token);
                                    _Logger.logMessage("Created " + token.value + " token.");
                                }
                            }
                        }
                        else if (identifierRegex.test(currentToken)) {
                            // Its a string of characters. Make IDs out of each of them.
                            for (var idIndex = 0; idIndex < currentToken.length; idIndex++) {
                                if (lexingString) {
                                    var token = TSC.Token.makeNewToken('CHARACTER', currentToken[idIndex], i + 1);
                                    _Logger.logMessage("Created '" + token.value + "' character token.");
                                }
                                else {
                                    var token = TSC.Token.makeNewToken('IDENTIFIER', currentToken[idIndex], i + 1);
                                    _Logger.logMessage("Created '" + token.value + "' identifier token.");
                                }
                                _Tokens.push(token);
                            }
                        }
                        else if (digitRegex.test(currentToken)) {
                            // String of digits. Makes Digits tokens out of them.
                            for (var digitIndex = 0; digitIndex < currentToken.length; digitIndex++) {
                                var token = TSC.Token.makeNewToken('DIGIT', currentToken[digitIndex], i + 1);
                                _Tokens.push(token);
                                _Logger.logMessage("Created " + token.value + " token.");
                            }
                        }
                        else if (symbolStrings.indexOf(currentToken) > -1) {
                            for (var symbolIndex = 0; symbolIndex < _Punctuation.length; symbolIndex++) {
                                if (currentToken === _Punctuation[symbolIndex].value) {
                                    var token = TSC.Token.makeNewToken(_Punctuation[symbolIndex].type, _Punctuation[symbolIndex].value, i + 1);
                                    if ((token.type === QUOTE.type) && (lexingString === false)) {
                                        // This is an error. Can't have new lines in quotes
                                        _Logger.logError('New line characters not valid in strings.', i + 1, 'Lexer');
                                        return _Tokens;
                                    }
                                    else if ((token.type === QUOTE.type) && (lexingString === true)) {
                                        _Tokens.push(token);
                                        lexingString = !lexingString;
                                        _Logger.logMessage("Created " + token.value + " token.");
                                    }
                                    else {
                                        _Tokens.push(token);
                                        _Logger.logMessage("Created " + token.value + " token.");
                                    }
                                }
                            }
                        }
                        else if (stringRegex.test(currentToken)) {
                            // currentToken === "testing space"
                            lexingString = !lexingString;
                            this.tokenizeString(currentToken, i + 1);
                            lexingString = !lexingString;
                        }
                        else {
                            // Something that isn't defined in our language.
                            // Throw an error and break
                            _Logger.logError("Character '" + currentToken + "' not valid.", i + 1, 'Lexer');
                            throw new Error("Character not valid. Ending execution.");
                        }
                    }
                }
            }
            _Logger.logTokens();
            return _Tokens;
        };
        Lexer.tokenizeString = function (str, line) {
            for (var i = 0; i < str.length; i++) {
                // Strings are made up of three things...
                // Quotes...
                if (str[i] === '"') {
                    var token = TSC.Token.makeNewToken(QUOTE.type, str[i], line);
                    _Tokens.push(token);
                    _Logger.logMessage("Created " + token.value + " token.");
                }
                else if (str[i] === ' ') {
                    var token = TSC.Token.makeNewToken(SPACE.type, str[i], line);
                    _Tokens.push(token);
                    _Logger.logMessage("Created '" + token.value + "' character token.");
                }
                else {
                    var token = TSC.Token.makeNewToken(CHARACTER.type, str[i], line);
                    _Tokens.push(token);
                    _Logger.logMessage("Created '" + token.value + "' character token.");
                }
            }
        };
        return Lexer;
    })();
    TSC.Lexer = Lexer;
})(TSC || (TSC = {}));
//# sourceMappingURL=lexer.js.map