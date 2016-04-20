module TSC {
    export class JumpTable {
        private items: JumpTableItem[] = [];
        private prefix: string = "J";
        private suffix: number = 0;
        
        public getCurrentTemp(): string {
            return this.prefix + this.suffix.toString();
        }
        
        public getNextTemp(): string {
            this.suffix++;
            return this.prefix + this.suffix.toString();
        }
        
        public getItems(): JumpTableItem[] {
            return this.items;
        }
        
        public getItemAtIndex(index: number): JumpTableItem {
            return this.items[index];
        }
        
        public addItem(item: JumpTableItem): void {
            this.items.push(item);
        }
        
        public incrementTemp() {
            this.suffix++;
        }
    }
    
    export class JumpTableItem {
        private temp: string;
        private distance: number;
        
        constructor(temp: string) {
            this.temp = temp;
        }
        
        public getTemp(): string {
            return this.temp;
        }
        
        public setTemp(temp: string): void {
            this.temp = temp;
        }
        
        public getDistance(): number {
            return this.distance;
        }
        
        public setDistance(distance: number): void {
            this.distance = distance;
        }
    }
}