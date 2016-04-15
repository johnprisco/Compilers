///<reference path='codeTable.ts' />
///<reference path='staticTable.ts' />
///<reference path='jumpTable.ts' />
///<reference path='scope.ts' />
///<reference path='node.ts' />
///<reference path='globals.ts' />

module TSC {
    export class CodeGenerator {
        private codeTable: CodeTable;
        private staticTable: StaticTable;
        private jumpTable: JumpTable;
       
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
        
        public loadAccumulatorWithConstant(constant: string): void {
            this.codeTable.addByte('A9');
            this.codeTable.addByte(constant);
        }
        
        public loadAccumulatorFromMemory(atAddress: string, fromAddress: string): void {
            this.codeTable.addByte('AD');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        }
        
        public storeAccumulatorInMemory(atAddress: string, fromAddress: string): void {
            this.codeTable.addByte('8D');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        }
        
        public addWithCarry(atAddress: string, fromAddress: string): void {
            this.codeTable.addByte('6D');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        }
        
        public loadXRegisterWithConstant(constant: string): void {
            this.codeTable.addByte('A2');
            this.codeTable.addByte(constant);
        }
        
        public loadXRegisterFromMemory(atAddress: string, fromAddress: string): void {
            this.codeTable.addByte('AE');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        }
        
        public loadYRegisterWithConstant(constant: string): void {
            this.codeTable.addByte('A0');
            this.codeTable.addByte(constant);
        }
        
        public loadYRegisterFromMemory(atAddress: string, fromAddress: string): void {
            this.codeTable.addByte('AC');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        }
        
        public noOperation(): void {
            this.codeTable.addByte('EA');
        }
        
        public break(): void {
            this.codeTable.addByte('00');
        }
        
        public compareByte(atAddress: string, fromAddress: string): void {
            this.codeTable.addByte('EC');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        }
        
        public branch(comparisonByte: string): void {
            this.codeTable.addByte('D0');
            this.codeTable.addByte(comparisonByte)
        }
        
        // TODO: I don't remember this one
        public incrementByte(): void {
            // this.codeTable.addByte('EE');
            // this.codeTable.addByte
        }
        
        public systemCall(): void {
            this.codeTable.addByte('FF');
        }
    }
}