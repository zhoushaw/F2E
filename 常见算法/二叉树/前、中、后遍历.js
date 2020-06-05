function Node(val) {
    this.left = this.right = null;
    this.val = val;
}

var node4 = { left: null, right: null, val: 4 };
var node5 = { left: null, right: null, val: 5 };
var node6 = { left: null, right: null, val: 6 };
var node7 = { left: null, right: null, val: 7 };
var node3 = { left: node6, right: node7, val: 3 };
var node2 = { left: node4, right: node5, val: 2 };
var node1 = { left: node2, right: node3, val: 1 };
//     1
//    /\
//   2  3
//  /\  /\
// 4 5 6  7

// function preorderTraversal(root) {
//     if (!root) {
//         return;
//     }
//     console.log(root.val);
//     var left = root.left;
//     var right = root.right;
//     left && preorderTraversal(left);
//     right && preorderTraversal(right);
// }
// preorderTraversal(node1); //1 2 4 5 3 6 7 

function preorderwhileTraversal(root){
    if(!root) return;
    let stack = [root];
    while(stack.length>0){
        let node = stack.shift();
        console.log(node.val);
        if (node.right) stack.unshift(node.right);
        if (node.left) stack.unshift(node.left);
    }
}

preorderwhileTraversal(node1);


// function middleorderTraversal(root){
//     if(!root) return;
//     middleorderTraversal(root.left);
//     console.log(root.val);
//     middleorderTraversal(root.right);
// }

// middleorderTraversal(node1);