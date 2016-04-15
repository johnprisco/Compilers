var TSC;
(function (TSC) {
    var JumpTable = (function () {
        function JumpTable() {
        }
        return JumpTable;
    })();
    TSC.JumpTable = JumpTable;
    var JumpTableItem = (function () {
        function JumpTableItem() {
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
