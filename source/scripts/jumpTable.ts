module TSC {
    export class JumpTable {
        private table: JumpTableItem[];
    }
    
    export class JumpTableItem {
        private temp: string;
        private distance: number;
        
        constructor() {
            
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