module TSC {
    export class Node {

        // Define properties
        public type: String;
        public value: String;
        public children: Node[];
        public parent: Node;
        public lineNumber: number;
        public isLeafNode: boolean;

        constructor() {
            this.type = "";
            this.value = "";
            this.children = null;
            this.parent = null;
            this.lineNumber = 0;
            this.isLeafNode = false;
        }


    }
}