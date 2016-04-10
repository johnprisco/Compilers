module TSC {
    export class Token {
        constructor(public type: string, public value: string, public line: number) {
            this.type = type;
            this.value = value;
            this.line = line;
        }

        public static makeNewToken(type, value, lineNumber) {
            var token = new Token(type, value, lineNumber);
            return token;
        }
    }
}