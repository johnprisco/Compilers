module TSC {
    export class StaticTable {
        private items: StaticTableItem[] = [];
        private prefix: string = "T";
        private suffix: number = 0;
        
        public getCurrentTemp(): string {
            return this.prefix + this.suffix.toString();
        }
        
        public getNextTemp(): string {
            this.suffix++;
            return this.prefix + this.suffix.toString();
        }
        
        public getItems(): StaticTableItem[] {
            return this.items;
        }
        
        public getItemAtIndex(index: number): StaticTableItem {
            return this.items[index];
        }
        
        public addItem(item: StaticTableItem): void {
            this.items.push(item);
        }
        
        public findItemWithIdentifier(id: string): StaticTableItem {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].getId() === id) {
                    return this.items[i];
                }
            }
        }
        
        public incrementTemp() {
            this.suffix++;
        }
    }
    
    export class StaticTableItem {
        private temp: string;
        private id: string;
        private address: string;
        
        constructor(temp: string, id: string, address: string) {
            this.temp = temp;
            this.id = id;
            this.address = address;
        }
        
        public getTemp(): string {
            return this.temp;
        }
        
        public setTemp(temp: string): void {
            this.temp = temp;
        }
        
        public getId(): string {
            return this.id;
        }
        
        public setId(id: string): void {
            this.id = id;
        }
        
        public getAddress(): string {
            return this.address;
        }
    }
}