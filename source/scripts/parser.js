var TSC;
(function (TSC) {
    var Parser = (function () {
        function Parser() {
        }
        Parser.parse = function () {
            _CurrentToken = _Tokens[_TokenIndex];
            this.parseProgram();
        };
        Parser.parseProgram = function () {
            _Logger.logMessage("Parsing program.");
            this.parseBlock();
            this.match(END_OF_PROGRAM.type);
        };
        Parser.parseBlock = function () {
            this.match(LEFT_BRACE.type);
            this.parseStatementList();
            this.match(RIGHT_BRACE.type);
        };
        Parser.parseStatementList = function () {
            // checking for: print, identifier, int, boolean, string, {, 'while', 'if'
            if (_CurrentToken.type === PRINT.type ||
                _CurrentToken.type === IDENTIFIER.type ||
                _CurrentToken.type === INT.type ||
                _CurrentToken.type === BOOLEAN.type ||
                _CurrentToken.type === STRING.type ||
                _CurrentToken.type === LEFT_BRACE.type ||
                _CurrentToken.type === WHILE.type ||
                _CurrentToken.type === IF.type) {
                this.parseStatement();
                this.parseStatementList();
            }
            // otherwise, do nothing
        };
        Parser.parseStatement = function () {
            switch (_CurrentToken.type) {
                case PRINT.type:
                    this.parsePrintStatement();
                    break;
                case IDENTIFIER.type:
                    this.parseAssignmentStatement();
                    break;
                case STRING.type:
                case INT.type:
                case BOOLEAN.type:
                    this.parseVarDecl();
                    break;
                case WHILE.type:
                    this.parseWhileStatement();
                    break;
                case IF.type:
                    this.parseIfStatement();
                    break;
                default:
                    this.parseBlock();
            }
        };
        Parser.parsePrintStatement = function () {
            this.match(PRINT.type);
            this.match(LEFT_PAREN.type);
            this.parseExpr();
            this.match(RIGHT_PAREN.type);
        };
        Parser.parseAssignmentStatement = function () {
            this.parseId();
            this.match(ASSIGNMENT.type);
            this.parseExpr();
        };
        Parser.parseVarDecl = function () {
            switch (_CurrentToken.type) {
                case STRING.type:
                    this.match(STRING.type);
                    this.parseId();
                    break;
                case INT.type:
                    this.match(INT.type);
                    this.parseId();
                    break;
                case BOOLEAN.type:
                    this.match(BOOLEAN.type);
                    this.parseId();
                    break;
                default:
            }
        };
        Parser.parseWhileStatement = function () {
            this.match(WHILE.type);
            this.parseBooleanExpr();
            this.parseBlock();
        };
        Parser.parseIfStatement = function () {
            this.match(IF.type);
            this.parseBooleanExpr();
            this.parseBlock();
        };
        Parser.parseExpr = function () {
            switch (_CurrentToken.type) {
                // IntExpr
                case DIGIT.type:
                    this.parseIntExpr();
                    break;
                // StringExpr
                case QUOTE.type:
                    this.parseStringExpr();
                    break;
                // BooleanExpr
                case LEFT_PAREN.type:
                case TRUE.type:
                case FALSE.type:
                    this.parseBooleanExpr();
                    break;
                // Id
                case IDENTIFIER.type:
                    this.parseId();
                    break;
                default:
            }
        };
        Parser.parseIntExpr = function () {
            if (_CurrentToken.type === DIGIT.type) {
                this.match(DIGIT.type);
                if (_CurrentToken.type === PLUS.type) {
                    this.match(PLUS.type);
                    this.parseExpr();
                }
            }
        };
        Parser.parseStringExpr = function () {
            this.match(QUOTE.type);
            this.parseCharList();
            this.match(QUOTE.type);
        };
        Parser.parseBooleanExpr = function () {
            if (_CurrentToken.type === TRUE.type) {
                this.match(TRUE.type);
            }
            else if (_CurrentToken.type === FALSE.type) {
                this.match(FALSE.type);
            }
            else {
                this.match(LEFT_PAREN.type);
                this.parseExpr();
            }
        };
        Parser.parseId = function () {
            this.match(IDENTIFIER.type);
        };
        Parser.parseCharList = function () {
            if (_CurrentToken.type === CHARACTER.type) {
                this.match(CHARACTER.type);
                this.parseCharList();
            }
            else if (_CurrentToken.type === SPACE.type) {
                this.match(SPACE.type);
                this.parseCharList();
            }
            // otherwise, do nothing
        };
        Parser.match = function (type) {
            if (_CurrentToken.type === type) {
                _Logger.logMessage("Successfully matched " + type + " token.");
            }
            else {
                _Logger.logError("Expected " + type + ", found " + _CurrentToken.type, _CurrentToken.line, 'Parser');
                throw new Error("Error in Parse. Ending execution.");
            }
            if (_TokenIndex < _Tokens.length) {
                _CurrentToken = _Tokens[_TokenIndex + 1];
                _TokenIndex++;
            }
        };
        return Parser;
    })();
    TSC.Parser = Parser;
})(TSC || (TSC = {}));
//# sourceMappingURL=parser.js.map