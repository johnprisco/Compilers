module TSC {
    export class Scope {
        private name: number;
        private symbols: Symbol[] = [];
        private children: Scope[] = [];
        private parent: Scope = null;

        constructor(name: number) {
            this.setName(name);
        }

        public getName(): string {
            return this.name.toString();
        }

        public setName(name: number): void {
            this.name = name;
        }

        public addSymbol(symbol: Symbol): void {
            var id = symbol.getName();
            var scopeCheck = this.findIdentifierInCurrentScope(id);
            if (!scopeCheck) {
                this.symbols.push(symbol);
            } else {
                _Logger.logError("Identifier '" + id + "' already declared in scope.", parseInt(symbol.getLine()), "Semantic Analyzer");
                throw new Error("ID already in scope");
            }
        }

        public getSymbols(): Symbol[] {
            return this.symbols;
        }

        public getChildren(): Scope[] {
            return this.children;
        }

        public addChild(child: Scope): void {
            this.children.push(child);
        }

        public getParent(): Scope {
            return this.parent;
        }

        public setParent(parent: Scope): void {
            this.parent = parent;
        }

        public getTypeOfSymbol(id: string): string {
            for (var i = 0; i < this.symbols.length; i++) {
                if (this.symbols[i].getName() === id) {
                    return this.symbols[i].getType();
                }
            }

            if (this.getParent() != null) {
                return this.getTypeOfSymbolInScope(id, this.getParent());
            }
        }

        public getTypeOfSymbolInScope(id: string, scope: Scope): string {
            for (var i = 0; i < scope.symbols.length; i++) {
                if (scope.symbols[i].getName() === id) {
                    return scope.symbols[i].getType();
                }
            }

            if (scope.getParent() != null) {
                return this.getTypeOfSymbolInScope(id, scope.getParent());
            }
        }

        public confirmType(id: string, value): boolean {

            var type = this.getTypeOfSymbol(id);

            if (type) {
                switch (type) {
                    case "int":
                        return !isNaN(value);
                    case "string":
                        return (typeof value === 'string');
                    case "boolean":
                        return (value === "false" || value === "true");
                    default:
                        // TODO: Handle this
                        break;
                }
            } else {
                console.log("Not found");
                // TODO: Not declared, log and throw error
            }
        }

        public findIdentifier(id: string): boolean {
            for (var i = 0; i < this.symbols.length; i++) {
                if (this.symbols[i].getName() === id) {
                    return true;
                }
            }

            if (this.getParent() != null) {
                return this.findIdentifierInScope(id, this.getParent());
            } else {
                return false;
            }
        }

        public findIdentifierInScope(id: string, scope: Scope): boolean {
            for (var i = 0; i < scope.symbols.length; i++) {
                if (scope.symbols[i].getName() === id) {
                    return true;
                }
            }

            if (scope.getParent() != null) {
                return this.findIdentifierInScope(id, scope.getParent());
            } else {
                return false;
            }
        }

        public findIdentifierInCurrentScope(id: string): boolean {
            for (var i = 0; i < this.symbols.length; i++) {
                if (this.symbols[i].getName() === id) {
                    return true;
                }
            }
            return false;
        }
    }
}