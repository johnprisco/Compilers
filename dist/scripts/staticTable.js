var TSC;
(function (TSC) {
    var StaticTable = (function () {
        function StaticTable() {
        }
        return StaticTable;
    })();
    TSC.StaticTable = StaticTable;
    var StaticTableItem = (function () {
        function StaticTableItem() {
        }
        StaticTableItem.prototype.getTemp = function () {
            return this.temp;
        };
        StaticTableItem.prototype.setTemp = function (temp) {
            this.temp = temp;
        };
        StaticTableItem.prototype.getId = function () {
            return this.id;
        };
        StaticTableItem.prototype.setId = function (id) {
            this.id = id;
        };
        StaticTableItem.prototype.getAddress = function () {
            return this.address;
        };
        StaticTableItem.prototype.setAddress = function (address) {
            this.address = address;
        };
        return StaticTableItem;
    })();
    TSC.StaticTableItem = StaticTableItem;
})(TSC || (TSC = {}));
