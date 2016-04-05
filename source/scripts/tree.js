var TSC;
(function (TSC) {
    var Tree = (function () {
        function Tree() {
            this.root = null;
            this.currentNode = null;
        }
        Tree.addBranchNode = function (type) {
            // Create a node to be added
            var node = new Node();
            node.type = type;
            if (this.root === null || (!this.root)) {
                this.root = node;
                this.currentNode = node;
            }
            else {
                this.currentNode.children.push(node);
                this.currentNode = node;
            }
        };
        Tree.addLeafNode = function (value) {
        };
        Tree.toString = function () {
        };
        return Tree;
    })();
    TSC.Tree = Tree;
})(TSC || (TSC = {}));
//# sourceMappingURL=tree.js.map