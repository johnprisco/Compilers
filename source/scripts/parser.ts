module TSC {
    export class Parser {
        public static parse() {
            this.parseProgram();
        }

        public static parseProgram() {
            this.parseBlock();
            this.match(END_OF_PROGRAM.type);
        }

        public static parseBlock() {
            this.match(LEFT_BRACE.type);
            this.parseStatementList();
            this.match(RIGHT_BRACE.type);
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
                this.parseStatement();
                this.parseStatementList()
            }
            // otherwise, do nothing
        }

        public static parseStatement() {
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
        }

        public static parsePrintStatement() {
            this.match(PRINT.type);
            this.match(LEFT_PAREN.type);
            this.parseExpr();
            this.match(RIGHT_PAREN.type);
        }

        public static parseAssignmentStatement() {
            this.parseId();
            this.match(ASSIGNMENT.type);
            this.parseExpr();
        }

        public static parseVarDecl() {
            // TODO:  need to first match int, string, or boolean
            this.parseId();
        }

        public static parseWhileStatement() {
            this.match(WHILE.type);
            this.parseBooleanExpr();
            this.parseBlock();
        }

        public static parseIfStatement() {
            this.match(IF.type);
            this.parseBooleanExpr();
            this.parseBlock();
        }

        public static parseExpr() {
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
                    // TODO: Error message

            }
        }

        public static parseIntExpr() {

        }

        public static parseStringExpr() {
            this.match(QUOTE.type);
            this.parseCharList();
            this.match(QUOTE.type);
        }

        public static parseBooleanExpr() {

        }

        public static parseId() {
            this.match(IDENTIFIER.type);
        }

        public static parseCharList() {

        }

        public static match(type) {

        }
    }
}