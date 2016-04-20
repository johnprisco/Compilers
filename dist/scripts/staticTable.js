var TSC;
(function (TSC) {
    var StaticTable = (function () {
        function StaticTable() {
            this.items = [];
            this.prefix = "T";
            this.suffix = 0;
        }
        StaticTable.prototype.getCurrentTemp = function () {
            return this.prefix + this.suffix.toString();
        };
        StaticTable.prototype.getNextTemp = function () {
            this.suffix++;
            return this.prefix + this.suffix.toString();
        };
        StaticTable.prototype.getItems = function () {
            return this.items;
        };
        StaticTable.prototype.getItemAtIndex = function (index) {
            return this.items[index];
        };
        StaticTable.prototype.addItem = function (item) {
            this.items.push(item);
        };
        StaticTable.prototype.findItemWithIdentifier = function (id) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].getId() === id) {
                    return this.items[i];
                }
            }
        };
        StaticTable.prototype.incrementTemp = function () {
            this.suffix++;
        };
        return StaticTable;
    })();
    TSC.StaticTable = StaticTable;
    var StaticTableItem = (function () {
        function StaticTableItem(temp, id, address) {
            this.temp = temp;
            this.id = id;
            this.address = address;
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
        return StaticTableItem;
    })();
    TSC.StaticTableItem = StaticTableItem;
})(TSC || (TSC = {}));
