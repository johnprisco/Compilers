module TSC {
    export class SemanticAnalyser {
        private static abstractSyntaxTree: Tree;

        public static performAnalysis(cst: Tree): void {
            _Logger.logIgnoringVerboseMode("Beginning Semantic Analysis.");
            this.abstractSyntaxTree = new Tree();

            // First, we take the CST and build the AST with it
            this.buildAST(cst.getRoot(), this.abstractSyntaxTree);

            // Next, we build the symbol table

            // Do some type checking

        }

        public static buildAST(root: Node, ast: Tree): void {

        }

        public static analyzeProgram(cstNode: Node, astNode: Node): void {

        }

        public static analyzeBlock(cstNode: Node, astNode: Node): void {

        }

        public static analyzeStatementList(cstNode: Node, astNode: Node): void {

        }

        public static analyzeStatement(cstNode: Node, astNode: Node): void {

        }

        public static analyzePrintStatement(cstNode: Node, astNode: Node): void {

        }

        public static analyzeAssignmentStatement(cstNode: Node, astNode: Node): void {

        }

        public static analyzeVariableDeclaration(cstNode: Node, astNode: Node): void {

        }

        public static analyzeWhileStatement(cstNode: Node, astNode: Node): void {

        }

        public static analyzeIfStatement(cstNode: Node, astNode: Node): void {

        }

        public static analyzeExpression(cstNode: Node, astNode: Node): void {

        }

        public static analyzeIntExpression(cstNode: Node, astNode: Node): void {

        }

        public static analyzeStringExpression(cstNode: Node, astNode: Node): void {

        }

        public static analyzeBooleanExpression(cstNode: Node, astNode: Node): void {

        }

        public static analyzeCharList(cstNode: Node, astNode: Node): void {

        }

    }
}