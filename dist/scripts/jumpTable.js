var TSC;
(function (TSC) {
    var JumpTable = (function () {
        function JumpTable() {
            this.items = [];
            this.prefix = "J";
            this.suffix = 0;
        }
        JumpTable.prototype.getCurrentTemp = function () {
            return this.prefix + this.suffix.toString();
        };
        JumpTable.prototype.getNextTemp = function () {
            this.suffix++;
            return this.prefix + this.suffix.toString();
        };
        JumpTable.prototype.getItems = function () {
            return this.items;
        };
        JumpTable.prototype.getItemAtIndex = function (index) {
            return this.items[index];
        };
        JumpTable.prototype.addItem = function (item) {
            this.items.push(item);
        };
        JumpTable.prototype.incrementTemp = function () {
            this.suffix++;
        };
        return JumpTable;
    })();
    TSC.JumpTable = JumpTable;
    var JumpTableItem = (function () {
        function JumpTableItem(temp) {
            this.temp = temp;
        }
        JumpTableItem.prototype.getTemp = function () {
            return this.temp;
        };
        JumpTableItem.prototype.setTemp = function (temp) {
            this.temp = temp;
        };
        JumpTableItem.prototype.getDistance = function () {
            return this.distance;
        };
        JumpTableItem.prototype.setDistance = function (distance) {
            this.distance = distance;
        };
        return JumpTableItem;
    })();
    TSC.JumpTableItem = JumpTableItem;
})(TSC || (TSC = {}));
