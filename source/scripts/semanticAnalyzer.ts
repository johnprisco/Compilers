module TSC {
    export class SemanticAnalyzer {
        private static abstractSyntaxTree: Tree;

        public static performAnalysis(): void {
            _Logger.logIgnoringVerboseMode("Beginning Semantic Analysis.");
            this.abstractSyntaxTree = new Tree();

            // First, we take the CST and build the AST with it
            this.buildAST(_CST.getRoot());
            _Logger.logAST(this.abstractSyntaxTree.toStringAST());

            // Next, we build the symbol table

            // Do some type checking
            console.log(this.abstractSyntaxTree.getRoot());
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
            if (this.abstractSyntaxTree.getRoot() != null) {
                astNode.addChild(newNode);
                astNode = newNode;
            } else {
                this.abstractSyntaxTree.setRoot(newNode);
                astNode = newNode;
            }
            // Statement list is up next, if there is one
            if (cstNode.children.length > 2) {
                this.analyzeStatementList(cstNode.children[1], astNode);
            }
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
            //console.log("!!! Statement CST Node !!!");
            //console.log(cstNode);
            switch (cstNode.children[0].type) {
                case "Print Statement":
                    this.analyzePrintStatement(cstNode.children[0], astNode);
                    break;
                case "Assignment Statement":
                    this.analyzeAssignmentStatement(cstNode.children[0], astNode);
                    break;
                case "Variable Declaration":
                    this.analyzeVariableDeclaration(cstNode.children[0], astNode);
                    break;
                case "While Statement":
                    this.analyzeWhileStatement(cstNode.children[0], astNode);
                    break;
                case "If Statement":
                    this.analyzeIfStatement(cstNode.children[0], astNode);
                    break;
                case "Block":
                    this.analyzeBlock(cstNode.children[0], astNode);
                    break;
                default:
                    // TODO: Log and throw error
                    break;
            }
        }

        public static analyzePrintStatement(cstNode: Node, astNode: Node): void {
            var newNode = new Node("Print Statement");
            astNode.addChild(newNode);
            astNode = newNode;
            this.analyzeExpression(cstNode.children[2], astNode);
        }

        public static analyzeAssignmentStatement(cstNode: Node, astNode: Node): void {
            var newNode = new Node("Assignment Statement");


            // Add the identifier to the AST
            var id = new Node(cstNode.children[0].value);
            newNode.addChild(id);

            astNode.addChild(newNode);
            astNode = newNode;
            this.analyzeExpression(cstNode.children[2], astNode);
        }

        public static analyzeVariableDeclaration(cstNode: Node, astNode: Node): void {
            var newNode = new Node("Variable Declaration");


            // Add the type and value of the variable to the AST
            var type = new Node(cstNode.children[0].value);
            var value = new Node(cstNode.children[1].value);
            newNode.addChild(type);
            newNode.addChild(value);
            astNode.addChild(newNode);

        }

        public static analyzeWhileStatement(cstNode: Node, astNode: Node): void {
            var newNode = new Node("While Statement");
            astNode.addChild(newNode);
            astNode = newNode;

            this.analyzeBooleanExpression(cstNode.children[1], astNode);
            this.analyzeBlock(cstNode.children[2], astNode);
        }

        public static analyzeIfStatement(cstNode: Node, astNode: Node): void {
            var newNode = new Node("If Statement");
            astNode.addChild(newNode);
            astNode = newNode;

            this.analyzeBooleanExpression(cstNode.children[1], astNode);
            this.analyzeBlock(cstNode.children[2], astNode);
        }

        public static analyzeExpression(cstNode: Node, astNode: Node): void {
            switch (cstNode.type) {
                case "Int Expression":
                    this.analyzeIntExpression(cstNode, astNode);
                    break;
                case "String Expression":
                    this.analyzeStringExpression(cstNode, astNode);
                    break;
                case "Boolean Expression":
                    this.analyzeBooleanExpression(cstNode, astNode);
                    break;
                case "Identifier":
                    var newNode = new Node("Identifier");


                    var id = new Node(cstNode.value);
                    newNode.addChild(id);
                    astNode.addChild(newNode);
                    astNode = newNode;
                    break;
                default:
                    // TODO: Handle an error here
                    break;
            }
        }

        public static analyzeIntExpression(cstNode: Node, astNode: Node): void {
            var newNode = new Node("Int Expression");
            astNode.addChild(newNode);
            astNode = newNode;

            if (cstNode.children.length === 1) {
                var value = new Node(cstNode.children[0].value);
                newNode.addChild(value);
            } else {
                var value = new Node(cstNode.children[0].value);
                newNode.addChild(value);

                var plus = new Node("+");
                astNode.addChild(plus);
                astNode = plus;

                this.analyzeExpression(cstNode.children[2], astNode);
            }
        }

        public static analyzeStringExpression(cstNode: Node, astNode: Node): void {
            this.analyzeCharList(cstNode.children[1], astNode, "");
        }

        public static analyzeBooleanExpression(cstNode: Node, astNode: Node): void {
            console.log("Yup this hasn't been implemented yet");
        }

        public static analyzeCharList(cstNode: Node, astNode: Node, string: string): void {
            if (cstNode.children.length === 1) {
                string += cstNode.children[0].value;
                var newNode = new Node(string);
                astNode.addChild(newNode);
            } else {
                string += cstNode.children[0].value;
                this.analyzeCharList(cstNode.children[1], astNode, string);
            }
        }
    }
}