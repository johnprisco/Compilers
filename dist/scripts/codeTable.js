var TSC;
(function (TSC) {
    var CodeTable = (function () {
        function CodeTable() {
            for (var i = 0; i < 256; i++) {
                this.table[i] = "";
            }
        }
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
