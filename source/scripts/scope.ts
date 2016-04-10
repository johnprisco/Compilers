module TSC {
    export class Scope {
        private name: number;
        private symbols: Symbol[];

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
            this.symbols.push(symbol);
        }

        public getSymbols(): Symbol[] {
            return this.symbols;
        }
    }
}