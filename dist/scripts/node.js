var TSC;
(function (TSC) {
    var Node = (function () {
        function Node(type) {
            if (type) {
                this.type = type;
            }
            else {
                this.type = "";
            }
            this.value = "";
            this.children = [];
            this.parent = null;
            this.lineNumber = 0;
            this.isLeafNode = false;
        }
        Node.prototype.getLastChild = function () {
            var position = this.children.length - 1;
            return this.children[position];
        };
        Node.prototype.addChild = function (node) {
            this.children.push(node);
        };
        return Node;
    })();
    TSC.Node = Node;
})(TSC || (TSC = {}));
