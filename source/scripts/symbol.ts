module TSC {
    export class Symbol {
        private name: string;
        private type: string;
        private line: number;

        constructor(name: string, type: string, line: number) {
            this.setName(name);
            this.setType(type);
            this.setLine(line);
        }

        public getName(): string {
            return this.name;
        }

        public setName(name: string): void {
            this.name = name;
        }

        public getType(): string {
            return this.type;
        }

        public setType(type: string) {
            this.type = type;
        }

        public getLine(): string {
            return this.line.toString();
        }

        public setLine(line: number) {
            this.line = line;
        }
    }
}