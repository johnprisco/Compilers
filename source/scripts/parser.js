var TSC;
(function (TSC) {
    var Parser = (function () {
        function Parser() {
        }
        Parser.parse = function () {
            this.parseProgram();
        };
        Parser.parseProgram = function () {
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
                case STRING.type || INT.type || BOOLEAN.type:
                    this.parseVarDecl();
                    break;
                case WHIlE.type:
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
        };
        Parser.parseAssignmentStatement = function () {
        };
        Parser.parseVarDecl = function () {
        };
        Parser.parseWhileStatement = function () {
        };
        Parser.parseIfStatement = function () {
        };
        Parser.parseExpr = function () {
        };
        Parser.parseIntExpr = function () {
        };
        Parser.parseStringExpr = function () {
        };
        Parser.parseBooleanExpr = function () {
        };
        Parser.parseId = function () {
        };
        Parser.parseCharList = function () {
        };
        Parser.match = function (type) {
        };
        return Parser;
    })();
    TSC.Parser = Parser;
})(TSC || (TSC = {}));
//# sourceMappingURL=parser.js.map