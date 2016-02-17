var TSC;
(function (TSC) {
    var Token = (function () {
        function Token(type, string, line) {
            this.type = type;
            this.string = string;
            this.line = line;
        }
        return Token;
    })();
    TSC.Token = Token;
})(TSC || (TSC = {}));
//# sourceMappingURL=token.js.map