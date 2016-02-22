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
            console.log("Parsing program");
            this.parseBlock();
            this.match(END_OF_PROGRAM.type);
        };
        Parser.parseBlock = function () {
            console.log("Parsing block");
            this.match(LEFT_BRACE.type);
            this.parseStatementList();
            this.match(RIGHT_BRACE.type);
        };
        Parser.parseStatementList = function () {
            // checking for: print, identifier, int, boolean, string, {, 'while', 'if'
            console.log("Parsing statement list");
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
            console.log("Parsing statement");
            switch (_CurrentToken.type) {
                case PRINT.type:
                    this.parsePrintStatement();
                    break;
                case IDENTIFIER.type:
                    this.parseAssignmentStatement();
                    break;
                case STRING.type || INT.type || BOOLEAN.type:
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
            console.log("Parsing print statement");
            this.match(PRINT.type);
            this.match(LEFT_PAREN.type);
            this.parseExpr();
            this.match(RIGHT_PAREN.type);
        };
        Parser.parseAssignmentStatement = function () {
            console.log("Parsing assignment statement");
            this.parseId();
            this.match(ASSIGNMENT.type);
            this.parseExpr();
        };
        Parser.parseVarDecl = function () {
            console.log("Parsing var decl");
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
            console.log("Parsing while statement");
            this.match(WHILE.type);
            this.parseBooleanExpr();
            this.parseBlock();
        };
        Parser.parseIfStatement = function () {
            console.log("Parsing if statement");
            this.match(IF.type);
            this.parseBooleanExpr();
            this.parseBlock();
        };
        Parser.parseExpr = function () {
            console.log("Parsing expr");
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
                case LEFT_PAREN.type || TRUE.type || FALSE.type:
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
            console.log("Parsing int expr");
            if (_CurrentToken.type === DIGIT.type) {
                this.match(DIGIT.type);
                if (_CurrentToken.type === PLUS.type) {
                    this.match(PLUS.type);
                    this.parseExpr();
                }
            }
        };
        Parser.parseStringExpr = function () {
            console.log("Parsing string expr");
            this.match(QUOTE.type);
            this.parseCharList();
            this.match(QUOTE.type);
        };
        Parser.parseBooleanExpr = function () {
            console.log("Parsing boolean expr");
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
            console.log("Parsing id");
            this.match(IDENTIFIER.type);
        };
        Parser.parseCharList = function () {
            console.log("Parsing char list");
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
                console.log('success in matching type ' + type);
            }
            else {
                console.log('broke in matching type ' + type);
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