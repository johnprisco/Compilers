///<reference path='tree.ts' />
///<reference path='scope.ts' />
///<reference path='globals.ts' />
///<reference path='node.ts' />
///<reference path='symbol.ts' />
///<reference path='codeGen.ts' />

module TSC {
    export class SemanticAnalyzer {
        private static abstractSyntaxTree: Tree;
        private static scopes: Scope[];
        private static scopeName: number;

        public static performAnalysis(): void {
            _Logger.logIgnoringVerboseMode("\nBeginning Semantic Analysis.\n");
            this.scopes = [];
            this.scopeName = 0;
            this.abstractSyntaxTree = new Tree();

            this.buildAST(_CST.getRoot());
            _Logger.logAST(this.abstractSyntaxTree.toStringAST());
            _Logger.logSymbolTable(this.scopes);
            _Logger.logIgnoringVerboseMode("Semantic Analysis complete.");
            // console.log(this.abstractSyntaxTree.getRoot());
            CodeGenerator.generateCode(this.abstractSyntaxTree.getRoot(), this.scopes[0]);

        }

        public static buildAST(root: Node): void {
            this.analyzeProgram(root);
        }

        public static analyzeProgram(node: Node): void {
            // Only one thing to do here
            var newScope = new Scope(this.scopeName);
            _Logger.logMessage("Created Scope " + newScope.getName() + ".");
            this.scopeName++;
            this.analyzeBlock(node.children[0], newScope);
        }

        public static analyzeBlock(cstNode: Node, scope: Scope, astNode?: Node): void {
            var newNode = new Node("Block");

            // We have to define the root of the AST the first time,
            // so we'll check if its been set
            if (this.abstractSyntaxTree.getRoot() != null) {
                astNode.addChild(newNode);
                astNode = newNode;

                var newScope = new Scope(this.scopeName);
                _Logger.logMessage("Created Scope " + newScope.getName() + ".");
                this.scopeName++;
                newScope.setParent(scope);
                this.scopes.push(newScope);
                // Statement list is up next, if there is one
                if (cstNode.children.length > 2) {
                    this.analyzeStatementList(cstNode.children[1], astNode, newScope)
                }

            } else {
                this.abstractSyntaxTree.setRoot(newNode);
                astNode = newNode;

                this.scopes.push(scope);
                // Statement list is up next, if there is one
                if (cstNode.children.length > 2) {
                    this.analyzeStatementList(cstNode.children[1], astNode, scope)
                }
            }
        }

        public static analyzeStatementList(cstNode: Node, astNode: Node, scope: Scope): void {
            // Handle the epsilon production
            if (!cstNode) {
                return;
            }

            this.analyzeStatement(cstNode.children[0], astNode, scope);
            this.analyzeStatementList(cstNode.children[1], astNode, scope);
        }

        public static analyzeStatement(cstNode: Node, astNode: Node, scope: Scope): void {
            switch (cstNode.children[0].getType()) {
                case "Print Statement":
                    this.analyzePrintStatement(cstNode.children[0], astNode, scope);
                    break;
                case "Assignment Statement":
                    this.analyzeAssignmentStatement(cstNode.children[0], astNode, scope);
                    break;
                case "Variable Declaration":
                    this.analyzeVariableDeclaration(cstNode.children[0], astNode, scope);
                    break;
                case "While Statement":
                    this.analyzeWhileStatement(cstNode.children[0], astNode, scope);
                    break;
                case "If Statement":
                    this.analyzeIfStatement(cstNode.children[0], astNode, scope);
                    break;
                case "Block":
                    this.analyzeBlock(cstNode.children[0], scope, astNode);
                    break;
                default:
                    _Logger.logError("Statement undefined.", cstNode.getLineNumber(), "Semantic Analyzer");
                    throw new Error("Undefined statement passed to analyzeStatement(). This shouldn't happen.");
            }
        }

        public static analyzePrintStatement(cstNode: Node, astNode: Node, scope: Scope): void {
            var newNode = new Node("Print Statement");
            astNode.addChild(newNode);
            astNode = newNode;
            this.analyzeExpression(cstNode.children[2], astNode, scope);
        }

        public static analyzeAssignmentStatement(cstNode: Node, astNode: Node, scope: Scope): void {
            // console.log(cstNode);
            var newNode = new Node("Assignment Statement");
            // Add the identifier to the AST
            var id = new Node(cstNode.children[0].children[0].getValue());
            newNode.addChild(id);
            newNode.setLineNumber(cstNode.children[0].children[0].getLineNumber());
            astNode.addChild(newNode);
            astNode = newNode;

            this.analyzeExpression(cstNode.children[2], astNode, scope);

            // First, make sure the ID exists
            _Logger.logMessage("Checking for identifier '" + cstNode.children[0].children[0].getValue() + "' in Scope " + scope.getName() + ".");
            var scopeCheck = scope.findIdentifier(cstNode.children[0].children[0].getValue());
            if (!scopeCheck) {
                _Logger.logError("Identifier '" + cstNode.children[0].children[0].getValue() + "' not in scope.", astNode.getLineNumber(),
                                 "Semantic Analyzer");
                throw new Error("ID not in scope, breaking.");
            }
            _Logger.logMessage("Found '" + cstNode.children[0].children[0].getValue() + "' in Scope " + scope.getName() + ".");

            // Then, type check it
            _Logger.logMessage("Checking if identifier '" + cstNode.children[0].children[0].getValue() + "' is being assigned the type it was declared.");
            var typeCheck = scope.confirmType(cstNode.children[0].children[0].getValue(), astNode.children[1]);
            if (!typeCheck) {
                _Logger.logError("Type mismatch. Expected " + scope.getTypeOfSymbol(cstNode.children[0].children[0].getValue()) + ".",
                                 astNode.getLineNumber(), "Semantic Analyzer");
                throw new Error("Type mismatch, breaking.");
            }
            _Logger.logMessage("Identifier assigned successfully.");
        }

        public static analyzeVariableDeclaration(cstNode: Node, astNode: Node, scope: Scope): void {
            var newNode = new Node("Variable Declaration");

            // Add the type and value of the variable to the AST
            var type = new Node(cstNode.children[0].getValue());
            var value = new Node(cstNode.children[1].children[0].getValue());
            newNode.addChild(type);
            newNode.addChild(value);
            astNode.addChild(newNode);

            var newSymbol = new Symbol(cstNode.children[1].children[0].getValue(), cstNode.children[0].getValue(), cstNode.children[0].getLineNumber());
            scope.addSymbol(newSymbol);
            _Logger.logMessage("Item added to Symbol Table: " + newSymbol.getType() + " " + newSymbol.getName() +
                               " in Scope " + scope.getName() + ".")
        }

        public static analyzeWhileStatement(cstNode: Node, astNode: Node, scope: Scope): void {
            var newNode = new Node("While Statement");
            astNode.addChild(newNode);
            astNode = newNode;

            this.analyzeBooleanExpression(cstNode.children[1], astNode, scope);
            this.analyzeBlock(cstNode.children[2], scope, astNode);
        }

        public static analyzeIfStatement(cstNode: Node, astNode: Node, scope: Scope): void {
            var newNode = new Node("If Statement");
            astNode.addChild(newNode);
            astNode = newNode;

            this.analyzeBooleanExpression(cstNode.children[1], astNode, scope);
            this.analyzeBlock(cstNode.children[2], scope, astNode);
        }

        public static analyzeExpression(cstNode: Node, astNode: Node, scope: Scope): void {
            switch (cstNode.children[0].getType()) {
                case "Int Expression":
                    this.analyzeIntExpression(cstNode.children[0], astNode, scope);
                    break;
                case "String Expression":
                    this.analyzeStringExpression(cstNode.children[0], astNode, scope);
                    break;
                case "Boolean Expression":
                    this.analyzeBooleanExpression(cstNode.children[0], astNode, scope);
                    break;
                case "Identifier":
                    var id = new Node(cstNode.children[0].children[0].getValue());
                    id.setIdentifier(true);
                    astNode.addChild(id);
                    var search = scope.findIdentifier(cstNode.children[0].children[0].getValue());
                    if (!search) {
                        _Logger.logError("Identifier '" + cstNode.children[0].children[0].getValue() + "' not found.",
                                         cstNode.children[0].children[0].getLineNumber(), "Semantic Analysis");
                        throw new Error("ID not found.");
                    }
                    break;
                default:
                    _Logger.logError("Undefined expression.", cstNode.getLineNumber(), "Semantic Analyzer");
                    throw new Error("Undefined expression. This shouldn't happen.");
            }
        }

        public static analyzeIntExpression(cstNode: Node, astNode: Node, scope: Scope): void {
            if (cstNode.children.length === 1) {
                var value = new Node(cstNode.children[0].getValue());
                value.setInt(true);
                astNode.addChild(value);
            } else {
                
                var value = new Node(cstNode.children[0].getValue());
                value.setInt(true);
                astNode.addChild(value);

                var plus = new Node("+");
                astNode.addChild(plus);
                astNode = plus;
                console.log(cstNode.children[2].children[0]);
                // So the grammar says it can be an expression, but thats not exactly true
                // It can be an Identifier or an Int Expression
                // So if we check which it is, and call the appropriate function, we'll
                // fix the bug
                var typeCheck = cstNode.children[2].children[0];
                if (typeCheck.getType() === "Boolean Expression" || typeCheck.getType() === "String Expression") {
                    _Logger.logError("Type mismatch, expected Int Expression.", typeCheck.getLineNumber(), "Semantic Analyzer");
                    throw new Error("Type mismatch.");
                } 
                
                
                this.analyzeExpression(cstNode.children[2], astNode, scope);
            }
        }

        public static analyzeStringExpression(cstNode: Node, astNode: Node, scope: Scope): void {
            if (cstNode.children.length > 2) {
                this.analyzeCharList(cstNode.children[1], astNode, "", scope);
            } else {
                var newNode = new Node("");
                astNode.addChild(newNode);
            }
        }

        public static analyzeBooleanExpression(cstNode: Node, astNode: Node, scope: Scope): void {
            if (cstNode.children.length > 1) {
                // The next node is going to be the boolop
                var newNode = new Node(cstNode.children[2].getValue());
                astNode.addChild(newNode);
                astNode = newNode;

                // then we need to evaluate the expressions on both sides of it
                this.analyzeExpression(cstNode.children[1], astNode, scope);
                this.analyzeExpression(cstNode.children[3], astNode, scope);
            } else {
                var newNode = new Node(cstNode.children[0].getValue());
                newNode.setBoolean(true);
                astNode.addChild(newNode);
            }
        }

        public static analyzeCharList(cstNode: Node, astNode: Node, string: string, scope: Scope): void {
            if (cstNode.children.length === 1) {
                string += cstNode.children[0].getValue();
                var newNode = new Node(string);
                astNode.addChild(newNode);
            } else {
                string += cstNode.children[0].getValue();
                this.analyzeCharList(cstNode.children[1], astNode, string, scope);
            }
        }
    }
}