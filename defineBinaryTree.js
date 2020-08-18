//定义排序二叉树
//
function BinaryTree () {
  var Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  var root = null;

  var insertNode = function (node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode
      } else {
        insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        insertNode(node.right, newNode)
      }
    }
  }
  this.insert = function (key) {
    var newNode = new Node(key)
    if (root === null) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
  }
  //中序遍历二叉树
  //中序遍历是先遍历左子树，然后访问根节点，然后遍历右子树
  var inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback)
      callback(node.key)
      inOrderTraverseNode(node.right, callback)
    }
  }
  this.inOrderTraverse = function (callback) {
    inOrderTraverseNode(root, callback)
  }

  //前序遍历二叉树 --复制二叉树
  //前序遍历首先访问根节点，然后遍历左子树，最后遍历右子树
  var preOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      callback(node.key)
      preOrderTraverseNode(node.left, callback)
      preOrderTraverseNode(node.right, callback)
    }
  }
  this.preOrderTraverse = function (callback) {
    preOrderTraverseNode(root, callback)
  }

  //后序遍历二叉树 -操作系统文件夹里面的文件的遍历
  //后序遍历是先遍历左子树，然后遍历右子树，最后访问树的根节点
  var postOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback)
      postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }
  this.postOrderTraverse = function (callback) {
    postOrderTraverseNode(root, callback)
  }

  //查找遍历二叉树的最小值。
  var minNode = (node) => {
    if (node) {
      while (node && node.left !== null) {
        node = node.left
      }
      return node.key
    }
    return null
  }

  this.min = function () {
    return minNode(root);
  }

  //查找遍历二叉树的最大值。
  var maxNode = (node) => {
    if (node) {
      while (node && node.right !== null) {
        node = node.right
      }
      return node.key
    }
    return null
  }

  this.max = function () {
    return maxNode(root);
  }

  //查找二叉树的某个节点值
  var searchNode = (node, key) => {
    if (node === null) {
      return false
    }
    if (node.key < key) {
      return searchNode(node.right, key)
    } else if (node.key > key) {
      return searchNode(node.left, key)
    } else {
      return true
    }
  }

  this.search = function (key) {
    return searchNode(root, key)
  }
  //移除节点
  var findMinNode = function (node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left
      }
      return node
    }
    return null
  }
  var removeNode = function (node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = removeNode(node.right, key)
      return node
    } else {
      //删除叶子节点
      if (node.left === null && node.right === null) {
        node = null
        return node
      }
      //删除中间节点（此中间节点只有一个子节点哦）
      if (node.left === null) {
        node = node.right
        return node
      }
      if (node.right === null) {
        node = node.left
        return node
      }
      //中间节点（左右子集都有值,需要补位，移除补位的值，保持平衡）
      var aux = findMinNode(node.right)
      node.key = aux.key
      node.right = removeNode(node.right, aux.key)
      return node
    }
  }

  this.remove = function (key) {
    console.log(root)//前后对比
    root = removeNode(root, key)
    console.log(root)//前后对比
  }


}

var nodes = [ 8, 3, 10, 1, 6, 14, 4, 7, 13 ]
var binaryTree = new BinaryTree();

nodes.forEach(function (key) {
  binaryTree.insert(key)
  console.log(binaryTree)
})

//测试中序
var callback = (key) => {
  console.log(key, "--中序")
}
binaryTree.inOrderTraverse(callback)

//测试前序
var callback2 = (key) => {
  console.log(key, "--前序")
}
binaryTree.preOrderTraverse(callback2)

//测试后序
var callback3 = (key) => {
  console.log(key, "--后序")
}
binaryTree.postOrderTraverse(callback3)

//查找最小值
console.log(binaryTree.min(), "--最小值")

//查找最大值
console.log(binaryTree.max(), "--最大值")

//查找某个节点
console.log(binaryTree.search(5), "--是否存在4节点")

//移除中间节点
binaryTree.remove(6)