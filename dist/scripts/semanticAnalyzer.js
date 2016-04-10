var TSC;
(function (TSC) {
    var SemanticAnalyzer = (function () {
        function SemanticAnalyzer() {
        }
        SemanticAnalyzer.performAnalysis = function () {
            _Logger.logIgnoringVerboseMode("Beginning Semantic Analysis.");
            this.abstractSyntaxTree = new TSC.Tree();
            // First, we take the CST and build the AST with it
            this.buildAST(_CST.getRoot());
            _Logger.logAST(this.abstractSyntaxTree.toStringAST());
            console.log(this.abstractSyntaxTree.getRoot());
        };
        SemanticAnalyzer.buildAST = function (root) {
            this.analyzeProgram(root);
        };
        SemanticAnalyzer.analyzeProgram = function (node) {
            // Only one thing to do here
            this.analyzeBlock(node.children[0]);
        };
        SemanticAnalyzer.analyzeBlock = function (cstNode, astNode) {
            var newNode = new TSC.Node("Block");
            // We have to define the root of the AST the first time,
            // so we'll check if its been set
            if (this.abstractSyntaxTree.getRoot() != null) {
                astNode.addChild(newNode);
                astNode = newNode;
            }
            else {
                this.abstractSyntaxTree.setRoot(newNode);
                astNode = newNode;
            }
            // Statement list is up next, if there is one
            if (cstNode.children.length > 2) {
                this.analyzeStatementList(cstNode.children[1], astNode);
            }
        };
        SemanticAnalyzer.analyzeStatementList = function (cstNode, astNode) {
            // Handle the epsilon production
            if (!cstNode) {
                return;
            }
            this.analyzeStatement(cstNode.children[0], astNode);
            this.analyzeStatementList(cstNode.children[1], astNode);
        };
        SemanticAnalyzer.analyzeStatement = function (cstNode, astNode) {
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
        };
        SemanticAnalyzer.analyzePrintStatement = function (cstNode, astNode) {
            var newNode = new TSC.Node("Print Statement");
            astNode.addChild(newNode);
            astNode = newNode;
            //console.log(cstNode.children[2]);
            this.analyzeExpression(cstNode.children[2], astNode);
        };
        SemanticAnalyzer.analyzeAssignmentStatement = function (cstNode, astNode) {
            //console.log("!!! Assignment CST Node !!!");
            //console.log(cstNode);
            var newNode = new TSC.Node("Assignment Statement");
            // Add the identifier to the AST
            var id = new TSC.Node(cstNode.children[0].children[0].value);
            newNode.addChild(id);
            astNode.addChild(newNode);
            astNode = newNode;
            this.analyzeExpression(cstNode.children[2], astNode);
        };
        SemanticAnalyzer.analyzeVariableDeclaration = function (cstNode, astNode) {
            var newNode = new TSC.Node("Variable Declaration");
            // Add the type and value of the variable to the AST
            var type = new TSC.Node(cstNode.children[0].value);
            var value = new TSC.Node(cstNode.children[1].children[0].value);
            newNode.addChild(type);
            newNode.addChild(value);
            astNode.addChild(newNode);
        };
        SemanticAnalyzer.analyzeWhileStatement = function (cstNode, astNode) {
            var newNode = new TSC.Node("While Statement");
            astNode.addChild(newNode);
            astNode = newNode;
            this.analyzeBooleanExpression(cstNode.children[1], astNode);
            this.analyzeBlock(cstNode.children[2], astNode);
        };
        SemanticAnalyzer.analyzeIfStatement = function (cstNode, astNode) {
            var newNode = new TSC.Node("If Statement");
            astNode.addChild(newNode);
            astNode = newNode;
            this.analyzeBooleanExpression(cstNode.children[1], astNode);
            this.analyzeBlock(cstNode.children[2], astNode);
        };
        SemanticAnalyzer.analyzeExpression = function (cstNode, astNode) {
            switch (cstNode.children[0].type) {
                case "Int Expression":
                    this.analyzeIntExpression(cstNode.children[0], astNode);
                    break;
                case "String Expression":
                    this.analyzeStringExpression(cstNode.children[0], astNode);
                    break;
                case "Boolean Expression":
                    this.analyzeBooleanExpression(cstNode.children[0], astNode);
                    break;
                case "Identifier":
                    //console.log(cstNode.children[0]);
                    var id = new TSC.Node(cstNode.children[0].children[0].value);
                    astNode.addChild(id);
                    break;
                default:
                    // TODO: Handle an error here
                    break;
            }
        };
        SemanticAnalyzer.analyzeIntExpression = function (cstNode, astNode) {
            if (cstNode.children.length === 1) {
                var value = new TSC.Node(cstNode.children[0].value);
                astNode.addChild(value);
            }
            else {
                var value = new TSC.Node(cstNode.children[0].value);
                astNode.addChild(value);
                var plus = new TSC.Node("+");
                astNode.addChild(plus);
                astNode = plus;
                this.analyzeExpression(cstNode.children[2], astNode);
            }
        };
        SemanticAnalyzer.analyzeStringExpression = function (cstNode, astNode) {
            this.analyzeCharList(cstNode.children[1], astNode, "");
        };
        SemanticAnalyzer.analyzeBooleanExpression = function (cstNode, astNode) {
            if (cstNode.children.length > 1) {
                // The next node is going to be the boolop
                var newNode = new TSC.Node(cstNode.children[2].value);
                astNode.addChild(newNode);
                astNode = newNode;
                // then we need to evaluate the expressions on both sides of it
                this.analyzeExpression(cstNode.children[1], astNode);
                this.analyzeExpression(cstNode.children[3], astNode);
            }
            else {
                var newNode = new TSC.Node(cstNode.children[0].value);
                astNode.addChild(newNode);
            }
        };
        SemanticAnalyzer.analyzeCharList = function (cstNode, astNode, string) {
            if (cstNode.children.length === 1) {
                string += cstNode.children[0].value;
                var newNode = new TSC.Node(string);
                astNode.addChild(newNode);
            }
            else {
                string += cstNode.children[0].value;
                this.analyzeCharList(cstNode.children[1], astNode, string);
            }
        };
        SemanticAnalyzer.scopeName = 0;
        return SemanticAnalyzer;
    })();
    TSC.SemanticAnalyzer = SemanticAnalyzer;
})(TSC || (TSC = {}));
