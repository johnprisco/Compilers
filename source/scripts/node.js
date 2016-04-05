var TSC;
(function (TSC) {
    var Node = (function () {
        function Node() {
            this.type = "";
            this.value = "";
            this.children = null;
            this.parent = null;
            this.lineNumber = 0;
            this.isLeafNode = false;
        }
        return Node;
    })();
    TSC.Node = Node;
})(TSC || (TSC = {}));
//# sourceMappingURL=node.js.map