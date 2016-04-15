module TSC {
    export class CodeTable {
        private table: string[];
        
        constructor() {
            for (var i = 0; i < 256; i++) {
                this.table[i] = "";
            }
        }
    }
    
    export class CodeTableItem {
        
    }
}