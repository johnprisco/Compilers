module TSC {
    export class StaticTable {
        
    }
    
    export class StaticTableItem {
        private temp: string;
        private id: string;
        private address: string;
        
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
        
        public setAddress(address: string): void {
            this.address = address;
        }
    }
}