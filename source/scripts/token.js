var TSC;
(function (TSC) {
    var Token = (function () {
        function Token(type, value, line) {
            this.type = type;
            this.value = value;
            this.line = line;
            this.type = type;
            this.value = value;
            this.line = line;
        }
        Token.makeNewToken = function (type, value, lineNumber) {
            var token = new Token(type, value, lineNumber);
            return token;
        };
        return Token;
    })();
    TSC.Token = Token;
})(TSC || (TSC = {}));
//# sourceMappingURL=token.js.map