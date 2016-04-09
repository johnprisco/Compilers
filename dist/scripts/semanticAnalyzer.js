var TSC;
(function (TSC) {
    var SemanticAnalyser = (function () {
        function SemanticAnalyser() {
        }
        SemanticAnalyser.performAnalysis = function (cst) {
            _Logger.logIgnoringVerboseMode("Beginning Semantic Analysis.");
            this.abstractSyntaxTree = new TSC.Tree();
            // First, we take the CST and build the AST with it
            this.buildAST(cst.getRoot(), this.abstractSyntaxTree);
            // Next, we build the symbol table
            // Do some type checking
        };
        SemanticAnalyser.buildAST = function (root, ast) {
        };
        SemanticAnalyser.analyzeProgram = function (cstNode, astNode) {
        };
        SemanticAnalyser.analyzeBlock = function (cstNode, astNode) {
        };
        SemanticAnalyser.analyzeStatementList = function (cstNode, astNode) {
        };
        SemanticAnalyser.analyzeStatement = function (cstNode, astNode) {
        };
        SemanticAnalyser.analyzePrintStatement = function (cstNode, astNode) {
        };
        SemanticAnalyser.analyzeAssignmentStatement = function (cstNode, astNode) {
        };
        return SemanticAnalyser;
    })();
    TSC.SemanticAnalyser = SemanticAnalyser;
})(TSC || (TSC = {}));
