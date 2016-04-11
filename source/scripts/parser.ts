module TSC {
    export class Parser {
        public static parse() {
            _CurrentToken = _Tokens[_TokenIndex];
            _CST = new Tree();
            this.parseProgram();
        }

        public static parseProgram() {
            _Logger.logIgnoringVerboseMode("\nParsing program.\n");
            _CST.addBranchNode("Program");
            this.parseBlock();
            this.match(END_OF_PROGRAM.type);
            _CST.endChildren();
        }

        public static parseBlock() {
            _CST.addBranchNode("Block");
            this.match(LEFT_BRACE.type);
            this.parseStatementList();
            this.match(RIGHT_BRACE.type);
            _CST.endChildren();

        }

        public static parseStatementList() {
            // checking for: print, identifier, int, boolean, string, {, 'while', 'if'
            if (_CurrentToken.type === PRINT.type ||
                _CurrentToken.type === IDENTIFIER.type ||
                _CurrentToken.type === INT.type ||
                _CurrentToken.type === BOOLEAN.type ||
                _CurrentToken.type === STRING.type ||
                _CurrentToken.type === LEFT_BRACE.type ||
                _CurrentToken.type === WHILE.type ||
                _CurrentToken.type === IF.type
            ) {
                _CST.addBranchNode("Statement List");
                this.parseStatement();
                this.parseStatementList();
                _CST.endChildren();
            }
            // otherwise, do nothing
        }

        public static parseStatement() {
            _CST.addBranchNode("Statement");
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
        }

        public static parsePrintStatement() {
            _CST.addBranchNode("Print Statement");
            this.match(PRINT.type);
            this.match(LEFT_PAREN.type);
            this.parseExpr();
            this.match(RIGHT_PAREN.type);
            _CST.endChildren();

        }

        public static parseAssignmentStatement() {
            _CST.addBranchNode("Assignment Statement");
            this.parseId();
            this.match(ASSIGNMENT.type);
            this.parseExpr();
            _CST.endChildren();

        }

        public static parseVarDecl() {
            _CST.addBranchNode("Variable Declaration");
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
                    _Logger.logError("We should never have gotten to this point.", _CurrentToken.line, 'Parser')
                    throw new Error("Something broke in parser.");
            }
            _CST.endChildren();

        }

        public static parseWhileStatement() {
            _CST.addBranchNode("While Statement");
            this.match(WHILE.type);
            this.parseBooleanExpr();
            this.parseBlock();
            _CST.endChildren();
        }

        public static parseIfStatement() {
            _CST.addBranchNode("If Statement");
            this.match(IF.type);
            this.parseBooleanExpr();
            this.parseBlock();
            _CST.endChildren();
        }

        public static parseExpr() {
            _CST.addBranchNode("Expression");
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
                    _Logger.logError("We should never have gotten to this point.", _CurrentToken.line, 'Parser')
                    throw new Error("Something broke in parser.");
            }
            _CST.endChildren();
        }

        public static parseIntExpr() {
            _CST.addBranchNode("Int Expression");
            if (_CurrentToken.type === DIGIT.type) {
                this.match(DIGIT.type);
                if (_CurrentToken.type === PLUS.type) {
                    this.match(PLUS.type);
                    this.parseExpr();
                }
            }
            _CST.endChildren();
        }

        public static parseStringExpr() {
            _CST.addBranchNode("String Expression");
            this.match(QUOTE.type);
            this.parseCharList();
            this.match(QUOTE.type);
            _CST.endChildren();
        }

        public static parseBooleanExpr() {
            _CST.addBranchNode("Boolean Expression");
            if (_CurrentToken.type === TRUE.type) {
                this.match(TRUE.type);
            } else if (_CurrentToken.type === FALSE.type) {
                this.match(FALSE.type);
            } else {
                this.match(LEFT_PAREN.type);
                this.parseExpr();

                if (_CurrentToken.type === EQUAL.type) {
                    this.match(EQUAL.type);
                    this.parseExpr();
                    this.match(RIGHT_PAREN.type);
                } else if (_CurrentToken.type === NOT_EQUAL.type) {
                    this.match(NOT_EQUAL.type);
                    this.parseExpr();
                    this.match(RIGHT_PAREN.type);
                }
            }
            _CST.endChildren();
        }

        public static parseId() {
            _CST.addBranchNode("Identifier");
            this.match(IDENTIFIER.type);
            _CST.endChildren();
        }

        public static parseCharList() {
            if (_CurrentToken.type === CHARACTER.type) {
                _CST.addBranchNode("Char List");
                this.match(CHARACTER.type);
                this.parseCharList();
                _CST.endChildren();
            } else if (_CurrentToken.type === SPACE.type) {
                _CST.addBranchNode("Char List");
                this.match(SPACE.type);
                this.parseCharList();
                _CST.endChildren();
            }
            // otherwise, do nothing
        }

        public static match(type) {
            if (_CurrentToken.type === type) {

                _CST.addLeafNode(_CurrentToken);
                _Logger.logMessage("Successfully matched " + type + " token.");
            } else {
                _Logger.logError("Expected " + type + ", found " + _CurrentToken.type, _CurrentToken.line, 'Parser');
                throw new Error("Error in Parse. Ending execution.");
            }

            if (_TokenIndex < _Tokens.length) {
                _CurrentToken = _Tokens[_TokenIndex + 1];
                _TokenIndex++;
            }
        }
    }
}