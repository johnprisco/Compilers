var TSC;
(function (TSC) {
    var SemanticAnalyser = (function () {
        function SemanticAnalyser() {
        }
        SemanticAnalyser.performAnalysis = function (cst) {
            _Logger.logIgnoringVerboseMode("Beginning Semantic Analysis.");
            this.abstractSyntaxTree = new TSC.Tree();
            // First, we take the CST and build the AST with it
            this.buildAST(cst.getRoot());
            // Next, we build the symbol table
            // Do some type checking
        };
        // Used when analyzing a block
        SemanticAnalyser.isRootDefined = function () {
            if (this.abstractSyntaxTree.getRoot()) {
                return false;
            }
            else {
                return true;
            }
        };
        SemanticAnalyser.buildAST = function (root) {
            this.analyzeProgram(root);
        };
        SemanticAnalyser.analyzeProgram = function (node) {
            // Only one thing to do here
            this.analyzeBlock(node.children[0]);
        };
        SemanticAnalyser.analyzeBlock = function (cstNode, astNode) {
            var newNode = new TSC.Node("Block");
            // We have to define the root of the AST the first time,
            // so we'll check if its been set
            if (this.isRootDefined()) {
                astNode.children.push(newNode);
                astNode = astNode.getLastChild();
            }
            else {
                this.abstractSyntaxTree.setRoot(newNode);
                astNode = newNode;
            }
            // Statement list is up next
            this.analyzeStatementList(cstNode.children[1], astNode);
        };
        SemanticAnalyser.analyzeStatementList = function (cstNode, astNode) {
            // Handle the epsilon production
            if (!cstNode) {
                return;
            }
            this.analyzeStatement(cstNode.children[0], astNode);
            this.analyzeStatementList(cstNode.children[1], astNode);
        };
        SemanticAnalyser.analyzeStatement = function (cstNode, astNode) {
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
        };
        SemanticAnalyser.analyzePrintStatement = function (cstNode, astNode) {
            var newNode = new TSC.Node("Print Statement");
            astNode.addChild(newNode);
            astNode = astNode.getLastChild();
            this.analyzeExpression(cstNode.children[2], astNode);
        };
        SemanticAnalyser.analyzeAssignmentStatement = function (cstNode, astNode) {
        };
        SemanticAnalyser.analyzeVariableDeclaration = function (cstNode, astNode) {
        };
        SemanticAnalyser.analyzeWhileStatement = function (cstNode, astNode) {
        };
        SemanticAnalyser.analyzeIfStatement = function (cstNode, astNode) {
        };
        SemanticAnalyser.analyzeExpression = function (cstNode, astNode) {
        };
        SemanticAnalyser.analyzeIntExpression = function (cstNode, astNode) {
        };
        SemanticAnalyser.analyzeStringExpression = function (cstNode, astNode) {
        };
        SemanticAnalyser.analyzeBooleanExpression = function (cstNode, astNode) {
        };
        SemanticAnalyser.analyzeCharList = function (cstNode, astNode) {
        };
        return SemanticAnalyser;
    })();
    TSC.SemanticAnalyser = SemanticAnalyser;
})(TSC || (TSC = {}));
