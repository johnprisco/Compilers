var TSC;
(function (TSC) {
    var CodeTable = (function () {
        function CodeTable() {
            this.currentAddress = 0;
            for (var i = 0; i < 256; i++) {
                this.table[i] = "";
            }
        }
        CodeTable.prototype.addByte = function (byte) {
            this.table[this.currentAddress] = byte;
            this.currentAddress++;
        };
        CodeTable.prototype.addByteAtAddress = function (byte, address) {
            this.table[address] = byte;
            this.currentAddress++;
        };
        return CodeTable;
    })();
    TSC.CodeTable = CodeTable;
    var CodeTableItem = (function () {
        function CodeTableItem() {
        }
        return CodeTableItem;
    })();
    TSC.CodeTableItem = CodeTableItem;
})(TSC || (TSC = {}));
