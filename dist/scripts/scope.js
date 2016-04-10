var TSC;
(function (TSC) {
    var Scope = (function () {
        //private children: Scope[] = [];
        //private parent: Scope;
        function Scope(name) {
            this.symbols = [];
            this.setName(name);
        }
        Scope.prototype.getName = function () {
            return this.name.toString();
        };
        Scope.prototype.setName = function (name) {
            this.name = name;
        };
        Scope.prototype.addSymbol = function (symbol) {
            this.symbols.push(symbol);
        };
        Scope.prototype.getSymbols = function () {
            return this.symbols;
        };
        return Scope;
    })();
    TSC.Scope = Scope;
})(TSC || (TSC = {}));
