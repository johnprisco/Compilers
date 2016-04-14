var TSC;
(function (TSC) {
    var CodeGenerator = (function () {
        function CodeGenerator() {
        }
        CodeGenerator.generateCode = function (node, scope) {
            this.generateCodeFromNode(node, scope);
        };
        CodeGenerator.generateCodeFromNode = function (node, scope) {
            switch (node.getType()) {
                case "Block":
                    this.generateCodeForBlock(node, scope);
                    break;
                case "While Statement":
                    this.generateCodeForWhileStatement(node, scope);
                    break;
                case "If Statement":
                    this.generateCodeForIfStatement(node, scope);
                    break;
                case "Print Statement":
                    this.generateCodeForPrintStatement(node, scope);
                    break;
                case "Variable Declaration":
                    this.generateCodeForVariableDeclaration(node, scope);
                    break;
                case "Assignment Statement":
                    this.generateCodeForAssignmentStatement(node, scope);
                    break;
                default:
                    _Logger.logError("Node has unidentified type.", node.getLineNumber(), "Code Generator");
                    throw new Error("Unidentified type of node in Code Gen.");
            }
        };
        CodeGenerator.generateCodeForBlock = function (node, scope) {
            // ?? Not sure what to do here, have to look over notes
            for (var i = 0; i < node.children.length; i++) {
                this.generateCodeFromNode(node.children[i], scope);
            }
        };
        CodeGenerator.generateCodeForWhileStatement = function (node, scope) {
        };
        CodeGenerator.generateCodeForIfStatement = function (node, scope) {
        };
        CodeGenerator.generateCodeForPrintStatement = function (node, scope) {
        };
        CodeGenerator.generateCodeForVariableDeclaration = function (node, scope) {
        };
        CodeGenerator.generateCodeForIntDeclaration = function (node, scope) {
        };
        CodeGenerator.generateCodeForStringDeclaration = function (node, scope) {
        };
        CodeGenerator.generateCodeForBooleanDeclaration = function (node, scope) {
        };
        CodeGenerator.generateCodeForAssignmentStatement = function (node, scope) {
        };
        return CodeGenerator;
    })();
    TSC.CodeGenerator = CodeGenerator;
})(TSC || (TSC = {}));
