module TSC {
    export class Tree {

        private root: Node;
        private currentNode: Node;

        constructor() {
            this.root = null;
            this.currentNode = null;
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

        }

    }
}