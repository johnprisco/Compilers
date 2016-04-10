var TSC;
(function (TSC) {
    var Tree = (function () {
        function Tree() {
            this.root = null;
            this.currentNode = null;
        }
        Tree.prototype.getRoot = function () {
            return this.root;
        };
        Tree.prototype.setRoot = function (node) {
            this.root = node;
        };
        Tree.prototype.addBranchNode = function (type) {
            // Create a node to be added
            var node = new TSC.Node();
            node.type = type;
            if (this.root === null || (!this.root)) {
                this.root = node;
                this.currentNode = node;
            }
            else {
                this.currentNode.addChild(node);
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
                this.currentNode.addChild(node);
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
            var traversalResult = "";
            // Recursive function to handle the expansion of the nodes.
            function expand(node, depth) {
                // Space out based on the current depth so
                // this looks at least a little tree-like.
                for (var i = 0; i < depth; i++) {
                    traversalResult += "-";
                }
                // If there are no children (i.e., leaf nodes)...
                if (!node.children || node.children.length === 0) {
                    // ... note the leaf node.
                    traversalResult += "[ " + node.value + " ]";
                    traversalResult += "\n";
                }
                else {
                    // There are children, so note these interior/branch nodes and ...
                    traversalResult += "< " + node.type + " > \n";
                    // .. recursively expand them.
                    for (var i = 0; i < node.children.length; i++) {
                        expand(node.children[i], depth + 1);
                    }
                }
            }
            // Make the initial call to expand from the root.
            expand(this.root, 0);
            // Return the result.
            return traversalResult;
        };
        Tree.prototype.toStringAST = function () {
            var traversalResult = "";
            // Recursive function to handle the expansion of the nodes.
            function expand(node, depth) {
                // Space out based on the current depth so
                // this looks at least a little tree-like.
                for (var i = 0; i < depth; i++) {
                    traversalResult += "-";
                }
                // If there are no children (i.e., leaf nodes)...
                if (!node.children || node.children.length === 0) {
                    // ... note the leaf node.
                    traversalResult += "[ " + node.type + " ]";
                    traversalResult += "\n";
                }
                else {
                    // There are children, so note these interior/branch nodes and ...
                    traversalResult += "< " + node.type + " > \n";
                    // .. recursively expand them.
                    for (var i = 0; i < node.children.length; i++) {
                        expand(node.children[i], depth + 1);
                    }
                }
            }
            // Make the initial call to expand from the root.
            expand(this.root, 0);
            // Return the result.
            return traversalResult;
        };
        return Tree;
    })();
    TSC.Tree = Tree;
})(TSC || (TSC = {}));
