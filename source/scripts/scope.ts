module TSC {
    export class Scope {
        private name: number;
        private symbols: Symbol[] = [];
        //private children: Scope[] = [];
        //private parent: Scope;

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

        //public getChildren(): Scope[] {
        //    return this.children;
        //}
        //
        //public addChild(child: Scope): void {
        //    this.children.push(child);
        //}
        //
        //public getParent(): Scope {
        //    return this.parent;
        //}
        //
        //public setParent(parent: Scope): void {
        //    this.parent = parent;
        //}
    }
}