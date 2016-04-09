module TSC {
    export class SemanticAnalyser {
        private static abstractSyntaxTree: Tree;

        public static performAnalysis(cst: Tree): void {
            _Logger.logIgnoringVerboseMode("Beginning Semantic Analysis.");
            this.abstractSyntaxTree = new Tree();

            // First, we take the CST and build the AST with it
            this.buildAST(cst.getRoot());

            // Next, we build the symbol table

            // Do some type checking

        }

        // Used when analyzing a block
        public static isRootDefined(): boolean {
            if (this.abstractSyntaxTree.getRoot()) {
                return false;
            } else {
                return true;
            }
        }

        public static buildAST(root: Node): void {
            this.analyzeProgram(root);
        }

        public static analyzeProgram(node: Node): void {
            // Only one thing to do here
            this.analyzeBlock(node.children[0]);
        }

        public static analyzeBlock(cstNode: Node, astNode?: Node): void {
            var newNode = new Node("Block");

            // We have to define the root of the AST the first time,
            // so we'll check if its been set
            if (this.isRootDefined()) {
                astNode.children.push(newNode);
                astNode = astNode.getLastChild();
            } else {
                this.abstractSyntaxTree.setRoot(newNode);
                astNode = newNode;
            }

            // Statement list is up next
            this.analyzeStatementList(cstNode.children[1], astNode);
        }

        public static analyzeStatementList(cstNode: Node, astNode: Node): void {
            // Handle the epsilon production
            if (!cstNode) {
                return;
            }

            this.analyzeStatement(cstNode.children[0], astNode);
            this.analyzeStatementList(cstNode.children[1], astNode);
        }

        public static analyzeStatement(cstNode: Node, astNode: Node): void {
            switch (cstNode.type) {
                case "Print Statement":
                    this.analyzePrintStatement(cstNode, astNode);
                    break;
                case "Assignment Statement":
                    this.analyzeAssignmentStatement(cstNode, astNode);
                    break;
                case "Variable Declaration":
                    this.analyzeVariableDeclaration(cstNode, astNode);
                    break;
                case "While Statement":
                    this.analyzeWhileStatement(cstNode, astNode);
                    break;
                case "If Statement":
                    this.analyzeIfStatement(cstNode, astNode);
                    break;
                case "Block":
                    this.analyzeBlock(cstNode, astNode);
                    break;
                default:
                    // TODO: Log and throw error
                    break;
            }
        }

        public static analyzePrintStatement(cstNode: Node, astNode: Node): void {
            var newNode = new Node("Print Statement");
            astNode.addChild(newNode);
            astNode = astNode.getLastChild();
            this.analyzeExpression(cstNode.children[2], astNode);
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