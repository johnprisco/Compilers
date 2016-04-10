module TSC {
    export class Node {

        // Define properties
        public type: string;
        public value: string;
        public children: Node[];
        public parent: Node;
        public lineNumber: number;
        public isLeafNode: boolean;

        constructor(type?: string) {
            if (type) {
                this.type = type;
            } else {
                this.type = "";
            }

            this.value = "";
            this.children = [];
            this.parent = null;
            this.lineNumber = 0;
            this.isLeafNode = false;
        }

        public getLastChild(): Node {
            var position = this.children.length - 1;
            return this.children[position];
        }

        public addChild(node: Node): void {
            this.children.push(node);
        }
    }
}