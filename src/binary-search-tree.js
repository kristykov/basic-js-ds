const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
const tree = new BinarySearchTree();
tree.root().data
tree.add(1);

*/
module.exports = class BinarySearchTree {
  constructor() {
    this.r = null;
  }

  root() {
    return this.r;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.r) {
      this.r = newNode;
      return;
    }

    let currentNode = this.r;

    while (currentNode) {
      if (newNode.data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }

    }
  }

  has(data) {
    let currentNode = this.r;

    while (currentNode) {
      if (data === currentNode.data) {
        return true;
      }
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  find(data) {
    let currentNode = this.r;

    while (currentNode.data !== data) {
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
      if (currentNode === null) {
        return null;
      }
    }
    return currentNode;
  }

  remove(data) {
    const removeNode = (currentNode, data) => {
      if (currentNode === null) {
        return null;
      }
      if (data == currentNode.data) {
        if (currentNode.left == null && currentNode.right == null) {
          return null;
        }
        if (currentNode.left == null) {
          return currentNode.right;
        }
        if (currentNode.right == null) {
          return currentNode.left;
        }

        let tempNode = currentNode.right;

        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        currentNode.data = tempNode.data;
        currentNode.right = removeNode(currentNode.right, tempNode.data);
        return currentNode;
      } else if (data < currentNode.data) {
        currentNode.left = removeNode(currentNode.left, data);
        return currentNode;
      } else {
        currentNode.right = removeNode(currentNode.right, data);
        return currentNode;
      }
    }
    this.r = removeNode(this.r, data);
  }

  min() {
    let currentNode = this.r;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    let currentNode = this.r;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }

}