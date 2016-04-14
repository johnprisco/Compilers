module TSC {
    export class CodeGenerator {
        private staticTable;
        private jumpTable;
       
        public static generateCode(node: Node, scope: Scope): void {
            this.generateCodeFromNode(node, scope);
        }
        
        public static generateCodeFromNode(node: Node, scope: Scope): void {
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
        }
        
        public static generateCodeForBlock(node: Node, scope: Scope): void {
            // ?? Not sure what to do here, have to look over notes
            for (var i = 0; i < node.children.length; i++) {
                this.generateCodeFromNode(node.children[i], scope);
            }
        }
        
        public static generateCodeForWhileStatement(node: Node, scope: Scope): void {
            
        }
        
        public static generateCodeForIfStatement(node: Node, scope: Scope): void {
            
        }
        
        public static generateCodeForPrintStatement(node: Node, scope: Scope): void {
            
        }
        
        public static generateCodeForVariableDeclaration(node: Node, scope: Scope): void {
            
        }
        
        public static generateCodeForIntDeclaration(node: Node, scope: Scope): void {
            
        }
        
        public static generateCodeForStringDeclaration(node: Node, scope: Scope): void {
            
        }
        
        public static generateCodeForBooleanDeclaration(node: Node, scope: Scope): void {
            
        }
        
        public static generateCodeForAssignmentStatement(node: Node, scope: Scope): void {
            
        }
    }
}