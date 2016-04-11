var TSC;
(function (TSC) {
    var Scope = (function () {
        function Scope(name) {
            this.symbols = [];
            this.children = [];
            this.parent = null;
            this.setName(name);
        }
        Scope.prototype.getName = function () {
            return this.name.toString();
        };
        Scope.prototype.setName = function (name) {
            this.name = name;
        };
        Scope.prototype.addSymbol = function (symbol) {
            var id = symbol.getName();
            var scopeCheck = this.findIdentifierInCurrentScope(id);
            if (!scopeCheck) {
                this.symbols.push(symbol);
            }
            else {
                _Logger.logError("Identifier '" + id + "' already declared in scope.", parseInt(symbol.getLine()), "Semantic Analyzer");
                throw new Error("ID already in scope");
            }
        };
        Scope.prototype.getSymbols = function () {
            return this.symbols;
        };
        Scope.prototype.getChildren = function () {
            return this.children;
        };
        Scope.prototype.addChild = function (child) {
            this.children.push(child);
        };
        Scope.prototype.getParent = function () {
            return this.parent;
        };
        Scope.prototype.setParent = function (parent) {
            this.parent = parent;
        };
        Scope.prototype.getTypeOfSymbol = function (id) {
            for (var i = 0; i < this.symbols.length; i++) {
                if (this.symbols[i].getName() === id) {
                    return this.symbols[i].getType();
                }
            }
            if (this.getParent() != null) {
                return this.getTypeOfSymbolInScope(id, this.getParent());
            }
        };
        Scope.prototype.getTypeOfSymbolInScope = function (id, scope) {
            for (var i = 0; i < scope.symbols.length; i++) {
                if (scope.symbols[i].getName() === id) {
                    return scope.symbols[i].getType();
                }
            }
            if (scope.getParent() != null) {
                return this.getTypeOfSymbolInScope(id, scope.getParent());
            }
        };
        Scope.prototype.confirmType = function (id, value) {
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
            }
            else {
                console.log("Not found");
            }
        };
        Scope.prototype.findIdentifier = function (id) {
            for (var i = 0; i < this.symbols.length; i++) {
                if (this.symbols[i].getName() === id) {
                    this.symbols[i].setInitialized(true);
                    return true;
                }
            }
            if (this.getParent() != null) {
                return this.findIdentifierInScope(id, this.getParent());
            }
            else {
                return false;
            }
        };
        Scope.prototype.findIdentifierInScope = function (id, scope) {
            for (var i = 0; i < scope.symbols.length; i++) {
                if (scope.symbols[i].getName() === id) {
                    this.symbols[i].setInitialized(true);
                    return true;
                }
            }
            if (scope.getParent() != null) {
                return this.findIdentifierInScope(id, scope.getParent());
            }
            else {
                return false;
            }
        };
        Scope.prototype.findIdentifierInCurrentScope = function (id) {
            for (var i = 0; i < this.symbols.length; i++) {
                if (this.symbols[i].getName() === id) {
                    return true;
                }
            }
            return false;
        };
        return Scope;
    })();
    TSC.Scope = Scope;
})(TSC || (TSC = {}));
