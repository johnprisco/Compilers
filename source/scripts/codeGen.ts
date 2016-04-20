///<reference path='codeTable.ts' />
///<reference path='staticTable.ts' />
///<reference path='jumpTable.ts' />
///<reference path='scope.ts' />
///<reference path='node.ts' />
///<reference path='globals.ts' />
///<reference path='utils.ts' />

module TSC {
    export class CodeGenerator {
        private static codeTable: CodeTable;
        private static staticTable: StaticTable;
        private static jumpTable: JumpTable;
       
        public static generateCode(node: Node, scope: Scope): void {
            this.staticTable = new StaticTable();
            this.codeTable = new CodeTable();
            this.jumpTable = new JumpTable();
            this.generateCodeFromNode(node, scope);
            this.break();
            console.log(this.codeTable);
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
                    console.log(node);
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
            var firstTableEntry = this.staticTable.findItemWithIdentifier(node.children[0].children[0].getType());
            this.loadXRegisterFromMemory(firstTableEntry.getTemp(), "XX");
            
            var secondTableEntry = this.staticTable.findItemWithIdentifier(node.children[0].children[1].getType());
            this.compareByte(secondTableEntry.getTemp(), "XX");
            
            var jumpEntry = new JumpTableItem(this.jumpTable.getCurrentTemp());
            this.jumpTable.addItem(jumpEntry);
            this.branch(jumpEntry.getTemp());
            this.jumpTable.incrementTemp();
            
            // Lastly, generateBlock
            this.generateCodeForBlock(node.children[1], scope);
        }
        
        public static generateCodeForPrintStatement(node: Node, scope: Scope): void {
            var tableEntry = this.staticTable.findItemWithIdentifier(node.children[0].getType());
            this.loadYRegisterFromMemory(tableEntry.getTemp(), "XX");
            this.loadXRegisterWithConstant("01");
            this.systemCall();
        }
        
        public static generateCodeForVariableDeclaration(node: Node, scope: Scope): void {
            switch (node.children[0].getType()) {
                case "int":
                    this.generateCodeForIntDeclaration(node, scope);
                    break;
                case "boolean":
                    this.generateCodeForBooleanDeclaration(node, scope);
                    break;
                case "string":
                    this.generateCodeForStringDeclaration(node, scope);
                    break;
                default:
                    throw new Error("BROKEN");
            }
        }
        
        public static generateCodeForIntDeclaration(node: Node, scope: Scope): void {
            // Initialize to zero
            this.loadAccumulatorWithConstant("00");
            this.storeAccumulatorInMemory(this.staticTable.getCurrentTemp(), "XX");
            
            // Make entry in static table
            // TODO: Fix what to put for address in item
            var item = new StaticTableItem(this.staticTable.getCurrentTemp(), node.children[1].getType(), "+0");
            this.staticTable.addItem(item);
            this.staticTable.incrementTemp();
        }
        
        public static generateCodeForStringDeclaration(node: Node, scope: Scope): void {
            
        }
        
        public static generateCodeForBooleanDeclaration(node: Node, scope: Scope): void {
            
        }
        
        public static generateCodeForAssignmentStatement(node: Node, scope: Scope): void {
            // lookup the ID in the static table. 
            if (node.children[1].getIdentifier()) {
                // Setting an ID to another ID's value
                var firstTableEntry = this.staticTable.findItemWithIdentifier(node.children[1].getType());
                var secondTableEntry = this.staticTable.findItemWithIdentifier(node.children[0].getType())
                this.loadAccumulatorFromMemory(firstTableEntry.getTemp(), "XX");
                this.storeAccumulatorInMemory(secondTableEntry.getTemp(), "XX");
            } else {
                var tableEntry = this.staticTable.findItemWithIdentifier(node.children[0].getType());
                var value = Utils.leftPad(node.children[1].getType(), 2);
                
                this.loadAccumulatorWithConstant(value);
                this.storeAccumulatorInMemory(tableEntry.getTemp(), "XX");
            }
        }
        
        public static loadAccumulatorWithConstant(constant: string): void {
            this.codeTable.addByte('A9');
            this.codeTable.addByte(constant);
        }
        
        public static loadAccumulatorFromMemory(atAddress: string, fromAddress: string): void {
            this.codeTable.addByte('AD');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        }
        
        public static storeAccumulatorInMemory(atAddress: string, fromAddress: string): void {
            this.codeTable.addByte('8D');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        }
        
        public static addWithCarry(atAddress: string, fromAddress: string): void {
            this.codeTable.addByte('6D');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        }
        
        public static loadXRegisterWithConstant(constant: string): void {
            this.codeTable.addByte('A2');
            this.codeTable.addByte(constant);
        }
        
        public static loadXRegisterFromMemory(atAddress: string, fromAddress: string): void {
            this.codeTable.addByte('AE');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        }
        
        public static loadYRegisterWithConstant(constant: string): void {
            this.codeTable.addByte('A0');
            this.codeTable.addByte(constant);
        }
        
        public static loadYRegisterFromMemory(atAddress: string, fromAddress: string): void {
            this.codeTable.addByte('AC');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        }
        
        public static noOperation(): void {
            this.codeTable.addByte('EA');
        }
        
        public static break(): void {
            this.codeTable.addByte('00');
        }
        
        public static compareByte(atAddress: string, fromAddress: string): void {
            this.codeTable.addByte('EC');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        }
        
        public static branch(comparisonByte: string): void {
            this.codeTable.addByte('D0');
            this.codeTable.addByte(comparisonByte)
        }
        
        // TODO: I don't remember this one
        public static incrementByte(): void {
            // this.codeTable.addBytech('EE');
        }
        
        public static systemCall(): void {
            this.codeTable.addByte('FF');
        }
    }
}