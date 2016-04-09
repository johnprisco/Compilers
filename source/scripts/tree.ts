module TSC {
    export class Tree {

        private root: Node;
        private currentNode: Node;

        constructor() {
            this.root = null;
            this.currentNode = null;
        }

        public getRoot(): Node {
            return this.root;
        }

        public addBranchNode(type: string): void {
            // Create a node to be added
            var node: Node = new Node();
            node.type = type;

            if (this.root === null || (!this.root)) {
                this.root = node;
                this.currentNode = node;
            } else {
                this.currentNode.children.push(node);
                node.parent = this.currentNode;
                this.currentNode = node;
            }
        }

        public addLeafNode(token: Token): void {
            var node: Node = new Node();
            node.type = token.type;
            node.value = token.value;
            node.isLeafNode = true;
            node.lineNumber = token.line;

            if (this.root === null || (!this.root)) {
                // log an error message, throw error

            } else {
                this.currentNode.children.push(node);
                node.parent = this.currentNode;
            }
        }

        public endChildren(): void {
            if ((this.currentNode.parent !== null) && (this.currentNode.parent.type !== undefined))
            {
                this.currentNode = this.currentNode.parent;
            }
            else
            {
                // TODO: Some sort of error logging.
                // This really should not happen, but it will, of course.
            }
        }

        public toString() {
            var traversalResult = "";

            // Recursive function to handle the expansion of the nodes.
            function expand(node, depth)
            {
                // Space out based on the current depth so
                // this looks at least a little tree-like.
                for (var i = 0; i < depth; i++)
                {
                    traversalResult += "-";
                }

                // If there are no children (i.e., leaf nodes)...
                if (!node.children || node.children.length === 0)
                {
                    // ... note the leaf node.
                    traversalResult += "[ " + node.value + " ]";
                    traversalResult += "\n";
                }
                else
                {
                    // There are children, so note these interior/branch nodes and ...
                    traversalResult += "< " + node.type + " > \n";
                    // .. recursively expand them.
                    for (var i = 0; i < node.children.length; i++)
                    {
                        expand(node.children[i], depth + 1);
                    }
                }
            }
            // Make the initial call to expand from the root.
            expand(this.root, 0);
            // Return the result.
            return traversalResult;
        }

    }
}