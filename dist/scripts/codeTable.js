var TSC;
(function (TSC) {
    var CodeTable = (function () {
        function CodeTable() {
            this.table = [];
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
            byte = byte.toUpperCase();
            this.table[address] = byte;
        };
        CodeTable.prototype.getCurrentAddress = function () {
            return this.currentAddress;
        };
        CodeTable.prototype.toString = function () {
            var output = "";
            for (var i = 0; i < this.table.length; i++) {
                output += this.table[i] + " ";
            }
            return output.trim();
        };
        CodeTable.prototype.zeroOutEmptySlots = function () {
            for (var i = 0; i < 256; i++) {
                if (this.table[i] === "") {
                    this.table[i] = "00";
                }
            }
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
