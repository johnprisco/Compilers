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

        }

        public static parseAssignmentStatement() {

        }

        public static parseVarDecl() {

        }

        public static parseWhileStatement() {

        }

        public static parseIfStatement() {

        }

        public static parseExpr() {

        }

        public static parseIntExpr() {

        }

        public static parseStringExpr() {

        }

        public static parseBooleanExpr() {

        }

        public static parseId() {

        }

        public static parseCharList() {

        }

        public static match(type) {

        }
    }
}