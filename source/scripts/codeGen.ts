///<reference path='codeTable.ts' />
///<reference path='staticTable.ts' />
///<reference path='jumpTable.ts' />
///<reference path='scope.ts' />
///<reference path='node.ts' />
///<reference path='globals.ts' />
///<reference path='utils.ts' />
///<reference path='logger.ts' />

module TSC {
    export class CodeGenerator {
        private static codeTable: CodeTable;
        private static staticTable: StaticTable;
        private static jumpTable: JumpTable;
        private static jumpTableCounter: number = 0;
        
        public static generateCode(node: Node, scope: Scope): void {
            _Logger.logIgnoringVerboseMode("Beginning Code Generation.");
            this.staticTable = new StaticTable();
            this.codeTable = new CodeTable();
            this.jumpTable = new JumpTable();
            this.generateCodeFromNode(node, scope);
            this.break();
            this.codeTable.zeroOutEmptySlots();
            this.staticTable.removeTempsInCodeTable(this.codeTable);
            this.jumpTable.removeTempsInCodeTable(this.codeTable);
            _Logger.logCodeTable(this.codeTable);
            _Logger.logIgnoringVerboseMode("Code Generation complete.");
        }
        
        public static generateCodeFromNode(node: Node, scope: Scope): void {
            // TODO: We need to pass scope appropriately throw each of the calls
            _Logger.logMessage("Generating code for " + node.getType());
            console.log(node);
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
                console.log(node.children[i]);
                this.generateCodeFromNode(node.children[i], scope);
            }
        }
        
        public static generateCodeForWhileStatement(node: Node, scope: Scope): void {
            var current = this.codeTable.getCurrentAddress();
            this.generateCodeForBooleanExpression(node.children[0], scope);
            
            // create the entry in the jump table
            var jumpTemp = this.jumpTable.getNextTemp();
            var jumpItem = new JumpTableItem(jumpTemp);
            this.jumpTable.addItem(jumpItem);
            this.branch(Utils.leftPad(this.codeTable.getCurrentAddress().toString(16), 2));
            
            // code gen for block within while loop
            console.log(node);
            this.generateCodeForBlock(node.children[1], scope);
            
            this.loadAccumulatorWithConstant("00");
            this.storeAccumulatorInMemory("00", "00");
            this.loadXRegisterWithConstant("01");
            this.compareByte("00", "00");
            
            var toLeftPad = (256 - (this.codeTable.getCurrentAddress() - current + 2));
            var leftPadded = Utils.leftPad(toLeftPad.toString(16), 2);
            this.branch(leftPadded);
        }
        
        public static generateCodeForIfStatement(node: Node, scope: Scope): void {   
            
            // comparing two identifiers   
            if (node.children[0].children[0].getIdentifier() && node.children[0].children[1].getIdentifier()) {
                console.log(node);
                var firstTableEntry = this.staticTable.findItemWithIdentifier(node.children[0].children[0].getType());
                this.loadXRegisterFromMemory(firstTableEntry.getTemp(), "XX");
            
                var secondTableEntry = this.staticTable.findItemWithIdentifier(node.children[0].children[1].getType());
            
                this.compareByte(secondTableEntry.getTemp(), "XX");
                
                var jumpEntry = new JumpTableItem(this.jumpTable.getCurrentTemp());
                this.jumpTable.addItem(jumpEntry);
                var start = this.codeTable.getCurrentAddress();
                this.branch(jumpEntry.getTemp());
                this.jumpTable.incrementTemp();
            
                // Lastly, generate block
                this.generateCodeForBlock(node.children[1], scope);
            
                // Update the jump distance for the new entry
                console.log(this.codeTable.getCurrentAddress() - start + 1);
                this.jumpTable.setDistanceForItem(jumpEntry, this.codeTable.getCurrentAddress() - start + 1)
            } else if (node.children.length === 1 && node.children[0].getType() === "true") {
                this.generateCodeForBlock(node.children[1], scope);
            }
            
        }
        
        public static generateCodeForPrintStatement(node: Node, scope: Scope): void {
            console.log(node);
            if (node.children[0].getIdentifier()) {
                // printing an id's value
                var tableEntry = this.staticTable.findItemWithIdentifier(node.children[0].getType());
                this.loadYRegisterFromMemory(tableEntry.getTemp(), "XX");
                
                // change x register if we're printing a string or an int
                if (tableEntry.getType() === "int") {
                    this.loadXRegisterWithConstant("01");
                } else {
                    this.loadXRegisterWithConstant("02");
                }
                
                this.systemCall();
            } else if (node.children[0].getInt()) {
                // printing an int
                this.generateCodeForIntExpression(node.children[0], scope);
                this.storeAccumulatorInMemory("00", "00");
                // system call to print int
                this.loadXRegisterWithConstant("01");
                this.loadYRegisterFromMemory("00", "00");
                this.systemCall();
            } else if (node.children[0].checkBoolean()) {
                // printing a boolean
                
            } else {
                // otherwise, its a string
                // write it to the heap
                var heapPosition = this.codeTable.writeStringToHeap(node.children[0].getType());
                // load accumulator with its position in the heap
                this.loadAccumulatorWithConstant(heapPosition.toString(16).toUpperCase());
                this.storeAccumulatorInMemory("00", "00");
                // system call to print string
                this.loadXRegisterWithConstant("02");
                this.loadYRegisterFromMemory("00", "00");
                this.systemCall();
            }            
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
                    _Logger.logError("Variable type undefined.", node.getLineNumber(), "Code Generator");
                    throw new Error("BROKEN");
            }
        }
        
        public static generateCodeForIntDeclaration(node: Node, scope: Scope): void {
            // console.log("Scope Logging");
            // console.log(scope);
            // Initialize to zero
            this.loadAccumulatorWithConstant("00");
            this.storeAccumulatorInMemory(this.staticTable.getCurrentTemp(), "XX");
            
            // Make entry in static table
            // TODO: Fix what to put for address in item
            var item = new StaticTableItem(this.staticTable.getCurrentTemp(), node.children[1].getType(), scope.getNameAsInt(), this.staticTable.getOffset(), "int");
            this.staticTable.addItem(item);
            this.staticTable.incrementTemp();
        }
        
        public static generateCodeForStringDeclaration(node: Node, scope: Scope): void {
            
            var item = new StaticTableItem(this.staticTable.getNextTemp(), node.children[1].getType(), scope.getNameAsInt(), this.staticTable.getOffset() + 1, "string");
            this.staticTable.addItem(item);
        }
        
        public static generateCodeForBooleanDeclaration(node: Node, scope: Scope): void {
            var item = new StaticTableItem(this.staticTable.getCurrentTemp(), node.children[1].getType(), scope.getNameAsInt(), this.staticTable.getOffset(), "boolean");
            this.staticTable.addItem(item);
            this.staticTable.incrementTemp();
        }
        
        public static generateCodeForBooleanExpression(node: Node, scope: Scope) {
            console.log(node);
            switch (node.getType()) {
                case "==":
                    console.log("==");
                    this.generateCodeForEquivalencyStatement(node, scope);
                    break;
                case "!=":
                    console.log("!=");
                    break;
                case "true":
                    console.log("true");
                    break;
                case "false":
                    this.loadXRegisterWithConstant("01");
                    this.loadAccumulatorWithConstant("00");
                    this.storeAccumulatorInMemory("00", "00");
                    this.compareByte("00", "00");
                    break;
                default:
                    _Logger.logError("Undefined boolean type.", node.getLineNumber(), "Code Generator");
                    throw new Error("broken");
            }
        }
        
        public static generateCodeForAssignmentStatement(node: Node, scope: Scope): void {
            // lookup the ID in the static table. 
            console.log(node);
            if (node.children[1].getIdentifier()) {
                // Setting an ID to another ID's value
                var firstTableEntry = this.staticTable.findItemWithIdentifier(node.children[1].getType());
                var secondTableEntry = this.staticTable.findItemWithIdentifier(node.children[0].getType())
                this.loadAccumulatorFromMemory(firstTableEntry.getTemp(), "XX");
                this.storeAccumulatorInMemory(secondTableEntry.getTemp(), "XX");
            } else if (node.children[1].getInt()) {
                // int assignment    
                var tableEntry = this.staticTable.findItemWithIdentifier(node.children[0].getType());
                var value = Utils.leftPad(node.children[1].getType(), 2);
            
                this.loadAccumulatorWithConstant(value);
                this.storeAccumulatorInMemory(tableEntry.getTemp(), "XX"); 
            } else if (node.children[1].checkBoolean()) {
                // boolean assignment
                // i don't know how to do this
                
            } else {
                // string
                // short cut for now, not the best way to check for this
                // we need to write the string in to the "heap"
                // so the end of the code table, entered backwards in hex ascii values
                // string: node.children[1].getType()
                var entry = this.staticTable.findItemWithIdentifier(node.children[0].getType());

                var pointer = this.codeTable.writeStringToHeap(node.children[1].getType());
                this.loadAccumulatorWithConstant(pointer.toString(16).toUpperCase());
                
                this.storeAccumulatorInMemory(entry.getTemp(), "XX");
            }
        }
        
        public static generateCodeForEquivalencyStatement(node: Node, scope: Scope): void {
            
        }
        
        public static generateCodeForIntExpression(node: Node, scope: Scope): void {
            
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