///<reference path='codeTable.ts' />
///<reference path='staticTable.ts' />
///<reference path='jumpTable.ts' />
///<reference path='scope.ts' />
///<reference path='node.ts' />
///<reference path='globals.ts' />
///<reference path='utils.ts' />
var TSC;
(function (TSC) {
    var CodeGenerator = (function () {
        function CodeGenerator() {
        }
        CodeGenerator.generateCode = function (node, scope) {
            this.staticTable = new TSC.StaticTable();
            this.codeTable = new TSC.CodeTable();
            this.jumpTable = new TSC.JumpTable();
            this.generateCodeFromNode(node, scope);
            this.break();
            // console.log(this.staticTable);
            console.log(this.codeTable.toString());
        };
        CodeGenerator.generateCodeFromNode = function (node, scope) {
            // TODO: We need to pass scope appropriately throw each of the calls
            switch (node.getType()) {
                case "Block":
                    this.generateCodeForBlock(node, scope);
                    break;
                case "While Statement":
                    this.generateCodeForWhileStatement(node, scope);
                    break;
                case "If Statement":
                    // console.log(node);
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
            var firstTableEntry = this.staticTable.findItemWithIdentifier(node.children[0].children[0].getType());
            this.loadXRegisterFromMemory(firstTableEntry.getTemp(), "XX");
            var secondTableEntry = this.staticTable.findItemWithIdentifier(node.children[0].children[1].getType());
            this.compareByte(secondTableEntry.getTemp(), "XX");
            var jumpEntry = new TSC.JumpTableItem(this.jumpTable.getCurrentTemp());
            this.jumpTable.addItem(jumpEntry);
            this.branch(jumpEntry.getTemp());
            this.jumpTable.incrementTemp();
            // Lastly, generateBlock
            this.generateCodeForBlock(node.children[1], scope);
        };
        CodeGenerator.generateCodeForPrintStatement = function (node, scope) {
            var tableEntry = this.staticTable.findItemWithIdentifier(node.children[0].getType());
            this.loadYRegisterFromMemory(tableEntry.getTemp(), "XX");
            this.loadXRegisterWithConstant("01");
            this.systemCall();
        };
        CodeGenerator.generateCodeForVariableDeclaration = function (node, scope) {
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
        };
        CodeGenerator.generateCodeForIntDeclaration = function (node, scope) {
            // console.log("Scope Logging");
            // console.log(scope);
            // Initialize to zero
            this.loadAccumulatorWithConstant("00");
            this.storeAccumulatorInMemory(this.staticTable.getCurrentTemp(), "XX");
            // Make entry in static table
            // TODO: Fix what to put for address in item
            var item = new TSC.StaticTableItem(this.staticTable.getCurrentTemp(), node.children[1].getType(), scope.getNameAsInt(), this.staticTable.getOffset());
            this.staticTable.addItem(item);
            this.staticTable.incrementTemp();
        };
        CodeGenerator.generateCodeForStringDeclaration = function (node, scope) {
        };
        CodeGenerator.generateCodeForBooleanDeclaration = function (node, scope) {
        };
        CodeGenerator.generateCodeForAssignmentStatement = function (node, scope) {
            // lookup the ID in the static table. 
            if (node.children[1].getIdentifier()) {
                // Setting an ID to another ID's value
                var firstTableEntry = this.staticTable.findItemWithIdentifier(node.children[1].getType());
                var secondTableEntry = this.staticTable.findItemWithIdentifier(node.children[0].getType());
                this.loadAccumulatorFromMemory(firstTableEntry.getTemp(), "XX");
                this.storeAccumulatorInMemory(secondTableEntry.getTemp(), "XX");
            }
            else {
                var tableEntry = this.staticTable.findItemWithIdentifier(node.children[0].getType());
                var value = TSC.Utils.leftPad(node.children[1].getType(), 2);
                this.loadAccumulatorWithConstant(value);
                this.storeAccumulatorInMemory(tableEntry.getTemp(), "XX");
            }
        };
        CodeGenerator.loadAccumulatorWithConstant = function (constant) {
            this.codeTable.addByte('A9');
            this.codeTable.addByte(constant);
        };
        CodeGenerator.loadAccumulatorFromMemory = function (atAddress, fromAddress) {
            this.codeTable.addByte('AD');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        };
        CodeGenerator.storeAccumulatorInMemory = function (atAddress, fromAddress) {
            this.codeTable.addByte('8D');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        };
        CodeGenerator.addWithCarry = function (atAddress, fromAddress) {
            this.codeTable.addByte('6D');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        };
        CodeGenerator.loadXRegisterWithConstant = function (constant) {
            this.codeTable.addByte('A2');
            this.codeTable.addByte(constant);
        };
        CodeGenerator.loadXRegisterFromMemory = function (atAddress, fromAddress) {
            this.codeTable.addByte('AE');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        };
        CodeGenerator.loadYRegisterWithConstant = function (constant) {
            this.codeTable.addByte('A0');
            this.codeTable.addByte(constant);
        };
        CodeGenerator.loadYRegisterFromMemory = function (atAddress, fromAddress) {
            this.codeTable.addByte('AC');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        };
        CodeGenerator.noOperation = function () {
            this.codeTable.addByte('EA');
        };
        CodeGenerator.break = function () {
            this.codeTable.addByte('00');
        };
        CodeGenerator.compareByte = function (atAddress, fromAddress) {
            this.codeTable.addByte('EC');
            this.codeTable.addByte(atAddress);
            this.codeTable.addByte(fromAddress);
        };
        CodeGenerator.branch = function (comparisonByte) {
            this.codeTable.addByte('D0');
            this.codeTable.addByte(comparisonByte);
        };
        // TODO: I don't remember this one
        CodeGenerator.incrementByte = function () {
            // this.codeTable.addBytech('EE');
        };
        CodeGenerator.systemCall = function () {
            this.codeTable.addByte('FF');
        };
        CodeGenerator.jumpTableCounter = 0;
        return CodeGenerator;
    })();
    TSC.CodeGenerator = CodeGenerator;
})(TSC || (TSC = {}));
