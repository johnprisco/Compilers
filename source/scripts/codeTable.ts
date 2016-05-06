module TSC {
    export class CodeTable {
        public table: string[] = [];
        private currentAddress: number = 0;
        
        constructor() {
            for (var i = 0; i < 256; i++) {
                this.table[i] = "";
            }
        }
        
        public addByte(byte: string): void {
            this.table[this.currentAddress] = byte;
            this.currentAddress++;
        }
        
        public addByteAtAddress(byte: string, address: string): void {
            byte = byte.toUpperCase();
            this.table[address] = byte;
        }
        
        public getCurrentAddress(): number {
            return this.currentAddress;
        }
        
        public toString(): string {
            var output: string = "";
            for (var i = 0; i < this.table.length; i++) {
                output += this.table[i] + " ";
            }
            return output.trim();
        }
        
        public zeroOutEmptySlots(): void {
            for (var i = 0; i < 256; i++) {
                if (this.table[i] === "") {
                    this.table[i] = "00";
                }
            }
        }
    }
    
    export class CodeTableItem {
        
    }
}