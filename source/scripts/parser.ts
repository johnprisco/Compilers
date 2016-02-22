module TSC {
    export class Parser {
        public static parse() {
            _CurrentToken = _Tokens[_TokenIndex];
            this.parseProgram();
        }

        public static parseProgram() {
            console.log("Parsing program");
            this.parseBlock();
            this.match(END_OF_PROGRAM.type);
        }

        public static parseBlock() {
            console.log("Parsing block");
            this.match(LEFT_BRACE.type);
            this.parseStatementList();
            this.match(RIGHT_BRACE.type);
        }

        public static parseStatementList() {
            // checking for: print, identifier, int, boolean, string, {, 'while', 'if'
            console.log("Parsing statement list");

            if (_CurrentToken.type === PRINT.type ||
                _CurrentToken.type === IDENTIFIER.type ||
                _CurrentToken.type === INT.type ||
                _CurrentToken.type === BOOLEAN.type ||
                _CurrentToken.type === STRING.type ||
                _CurrentToken.type === LEFT_BRACE.type ||
                _CurrentToken.type === WHILE.type ||
                _CurrentToken.type === IF.type
            ) {
                this.parseStatement();
                this.parseStatementList()
            }
            // otherwise, do nothing
        }

        public static parseStatement() {
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
        }

        public static parsePrintStatement() {
            console.log("Parsing print statement");

            this.match(PRINT.type);
            this.match(LEFT_PAREN.type);
            this.parseExpr();
            this.match(RIGHT_PAREN.type);
        }

        public static parseAssignmentStatement() {
            console.log("Parsing assignment statement");

            this.parseId();
            this.match(ASSIGNMENT.type);
            this.parseExpr();
        }

        public static parseVarDecl() {
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
                    // TODO: Log some kind of error
            }
        }

        public static parseWhileStatement() {
            console.log("Parsing while statement");

            this.match(WHILE.type);
            this.parseBooleanExpr();
            this.parseBlock();
        }

        public static parseIfStatement() {
            console.log("Parsing if statement");

            this.match(IF.type);
            this.parseBooleanExpr();
            this.parseBlock();
        }

        public static parseExpr() {
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
                    // TODO: Log an error message

            }
        }

        public static parseIntExpr() {
            console.log("Parsing int expr");

            if (_CurrentToken.type === DIGIT.type) {
                this.match(DIGIT.type);
                if (_CurrentToken.type === PLUS.type) {
                    this.match(PLUS.type);
                    this.parseExpr();
                }
            }
        }

        public static parseStringExpr() {
            console.log("Parsing string expr");

            this.match(QUOTE.type);
            this.parseCharList();
            this.match(QUOTE.type);
        }

        public static parseBooleanExpr() {
            console.log("Parsing boolean expr");

            if (_CurrentToken.type === TRUE.type) {
                this.match(TRUE.type);
            } else if (_CurrentToken.type === FALSE.type) {
                this.match(FALSE.type);
            } else {
                this.match(LEFT_PAREN.type);
                this.parseExpr();

            }
        }

        public static parseId() {
            console.log("Parsing id");

            this.match(IDENTIFIER.type);
        }

        public static parseCharList() {
            console.log("Parsing char list");

            if (_CurrentToken.type === CHARACTER.type) {
                this.match(CHARACTER.type);
                this.parseCharList();
            } else if (_CurrentToken.type === SPACE.type) {
                this.match(SPACE.type);
                this.parseCharList();
            }
            // otherwise, do nothing
        }

        public static match(type) {
            if (_CurrentToken.type === type) {
                console.log('success in matching type ' + type);
                // this is some kind of success
            } else {
                console.log('broke in matching type ' + type);

                // TODO: Log an error and exit
            }

            if (_TokenIndex < _Tokens.length) {
                _CurrentToken = _Tokens[_TokenIndex + 1];
                _TokenIndex++;
            }
        }
    }
}