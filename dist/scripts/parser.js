var TSC;
(function (TSC) {
    var Parser = (function () {
        function Parser() {
        }
        Parser.parse = function () {
            _CurrentToken = _Tokens[_TokenIndex];
            _CST = new TSC.Tree();
            this.parseProgram();
        };
        Parser.parseProgram = function () {
            _Logger.logIgnoringVerboseMode("Parsing program.");
            _CST.addBranchNode("PROGRAM");
            this.parseBlock();
            this.match(END_OF_PROGRAM.type);
            _CST.endChildren();
        };
        Parser.parseBlock = function () {
            _CST.addBranchNode("BLOCK");
            this.match(LEFT_BRACE.type);
            this.parseStatementList();
            this.match(RIGHT_BRACE.type);
            _CST.endChildren();
        };
        Parser.parseStatementList = function () {
            // checking for: print, identifier, int, boolean, string, {, 'while', 'if'
            _CST.addBranchNode("STATEMENT LIST");
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
            _CST.endChildren();
            // otherwise, do nothing
        };
        Parser.parseStatement = function () {
            _CST.addBranchNode("STATEMENT");
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
            _CST.endChildren();
        };
        Parser.parsePrintStatement = function () {
            _CST.addBranchNode("PRINT STATEMENT");
            this.match(PRINT.type);
            this.match(LEFT_PAREN.type);
            this.parseExpr();
            this.match(RIGHT_PAREN.type);
            _CST.endChildren();
        };
        Parser.parseAssignmentStatement = function () {
            _CST.addBranchNode("ASSIGNMENT STATEMENT");
            this.parseId();
            this.match(ASSIGNMENT.type);
            this.parseExpr();
            _CST.endChildren();
        };
        Parser.parseVarDecl = function () {
            _CST.addBranchNode("VAR DECL");
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
                    _Logger.logError("We should never have gotten to this point.", _CurrentToken.line, 'Parser');
                    throw new Error("Something broke in parser.");
            }
            _CST.endChildren();
        };
        Parser.parseWhileStatement = function () {
            _CST.addBranchNode("WHILE STATEMENT");
            this.match(WHILE.type);
            this.parseBooleanExpr();
            this.parseBlock();
            _CST.endChildren();
        };
        Parser.parseIfStatement = function () {
            _CST.addBranchNode("IF STATEMENT");
            this.match(IF.type);
            this.parseBooleanExpr();
            this.parseBlock();
            _CST.endChildren();
        };
        Parser.parseExpr = function () {
            _CST.addBranchNode("EXPR");
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
                    _Logger.logError("We should never have gotten to this point.", _CurrentToken.line, 'Parser');
                    throw new Error("Something broke in parser.");
            }
            _CST.endChildren();
        };
        Parser.parseIntExpr = function () {
            _CST.addBranchNode("INT EXPR");
            if (_CurrentToken.type === DIGIT.type) {
                this.match(DIGIT.type);
                if (_CurrentToken.type === PLUS.type) {
                    this.match(PLUS.type);
                    this.parseExpr();
                }
            }
            _CST.endChildren();
        };
        Parser.parseStringExpr = function () {
            _CST.addBranchNode("STRING EXPR");
            this.match(QUOTE.type);
            this.parseCharList();
            this.match(QUOTE.type);
            _CST.endChildren();
        };
        Parser.parseBooleanExpr = function () {
            _CST.addBranchNode("BOOLEAN EXPR");
            if (_CurrentToken.type === TRUE.type) {
                this.match(TRUE.type);
            }
            else if (_CurrentToken.type === FALSE.type) {
                this.match(FALSE.type);
            }
            else {
                this.match(LEFT_PAREN.type);
                this.parseExpr();
                if (_CurrentToken.type === EQUAL.type) {
                    this.match(EQUAL.type);
                    this.parseExpr();
                    this.match(RIGHT_PAREN.type);
                }
                else if (_CurrentToken.type === NOT_EQUAL.type) {
                    this.match(NOT_EQUAL.type);
                    this.parseExpr();
                    this.match(RIGHT_PAREN.type);
                }
            }
            _CST.endChildren();
        };
        Parser.parseId = function () {
            _CST.addBranchNode("IDENTIFIER");
            this.match(IDENTIFIER.type);
            _CST.endChildren();
        };
        Parser.parseCharList = function () {
            _CST.addBranchNode("CHAR LIST");
            if (_CurrentToken.type === CHARACTER.type) {
                this.match(CHARACTER.type);
                this.parseCharList();
            }
            else if (_CurrentToken.type === SPACE.type) {
                this.match(SPACE.type);
                this.parseCharList();
            }
            // otherwise, do nothing
            _CST.endChildren();
        };
        Parser.match = function (type) {
            if (_CurrentToken.type === type) {
                _CST.addLeafNode(_CurrentToken);
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
