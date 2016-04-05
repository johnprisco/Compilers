var TSC;
(function (TSC) {
    var Tree = (function () {
        function Tree() {
            this.root = null;
            this.currentNode = null;
        }
        Tree.prototype.addBranchNode = function (type) {
            // Create a node to be added
            var node = new TSC.Node();
            node.type = type;
            if (this.root === null || (!this.root)) {
                this.root = node;
                this.currentNode = node;
            }
            else {
                this.currentNode.children.push(node);
                node.parent = this.currentNode;
                this.currentNode = node;
            }
        };
        Tree.prototype.addLeafNode = function (token) {
            var node = new TSC.Node();
            node.type = token.type;
            node.value = token.value;
            node.isLeafNode = true;
            node.lineNumber = token.line;
            if (this.root === null || (!this.root)) {
            }
            else {
                this.currentNode.children.push(node);
                node.parent = this.currentNode;
            }
        };
        Tree.prototype.endChildren = function () {
            if ((this.currentNode.parent !== null) && (this.currentNode.parent.type !== undefined)) {
                this.currentNode = this.currentNode.parent;
            }
            else {
            }
        };
        Tree.prototype.toString = function () {
        };
        return Tree;
    })();
    TSC.Tree = Tree;
})(TSC || (TSC = {}));
