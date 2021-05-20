#include <iostream>
using namespace std;

class Node {
private:
    int data;
    Node* par;
    Node* left;
    Node* right;

public:

    Node(int data) {
        this->data = data;
        this->par = NULL;
        this->left = NULL;
        this->right = NULL;

    }
    void setLeft(Node* node) {
        if (node == NULL) {
            this->left = NULL;
        }
        else {
            this->left = node;
            node->par = this;
        }
    }
    void setRight(Node* node) {
        if (node == NULL) {
            this->right = NULL;
        }
        else {
            this->right = node;
            node->par = this;
        }
    }

    friend class BST;
};

class BST {
public:
    Node* root;
    int a;
    BST() {
        this->root = NULL;
        a = 0;
    }
    Node* search(int data) {
        Node* curN = this->root;
        while (curN != NULL) {
            if (data == curN->data)return curN;
            else if (data > curN->data) curN = curN->right;
            else curN = curN->left;
        }
        return NULL;
    }
    void insert(int data) {
        Node* node = new Node(data);
        if (this->root == NULL) {
            this->root = node;
            return;
        }
        Node* parN = NULL;
        Node* curN = this->root;

        while (curN != NULL) {
            if (data > curN->data) {
                parN = curN;
                curN = curN->right;
            }
            else {
                parN = curN;
                curN = curN->left;
            }
        }
        if (data > parN->data) {
            parN->setRight(node);
        }
        else if (data < parN->data) parN->setLeft(node);

    }
    void remove(int data) {
        Node* node = this->search(data);
        Node* parN;
        if (node != root) {
            parN = node->par;
        }
        else {
            parN = nullptr;
        }


        if (node->left == NULL && node->right == NULL) { //external node
            if (parN != nullptr) {
                if (node == parN->left) {
                    parN->left = NULL;
                }
                else {
                    parN->right = NULL;
                }
                node->par = NULL;
            }
            else {
                root = NULL;
            }


        }
        else if (node->left == NULL && node->right != NULL) { //오른쪽만 자식 있을 때
            //node->right->par = parN;
            if (parN == nullptr) {
                this->root = node->right;
            }
            else {
                if (node == parN->left) {
                    parN->left = node->right;
                }
                else {
                    parN->right = node->right;
                    
                }
                node->right->par = parN;
            }
            //delete node;
            node->par = NULL;

        }
        else if (node->left != NULL && node->right == NULL) {
            //node->left->par = parN;
            if (parN == nullptr) {
                this->root = node->left;
            }
            else {
                if (node == parN->left) {
                    parN->left = node->left;
                }
                else {
                    parN->right = node->left;
                }
            }
            delete node;

        }
        else { //자식이 2개일때
            Node* min = node->right;
            while (min->left != NULL) {
                min = min->left;
            }
            //min은 왼쪽에서 최솟값
            int val = min->data;
            this->remove(val);
            node->data = val;
        }
    }
    void inorder(Node* root) {
        if (root != NULL) {
           inorder(root->left);
            //cout << root->data << " ";
            ++a;
            inorder(root->right);
        }

    }
    void seta() {
        a = 0;
    }
    int geta() {
        return a;
    }
    /* void sub(int a) {
         Node* ans = search(a);
         if (ans == NULL) {
             cout << 0 << endl;
         }
         else {
             cout << ans->ss << endl;
         }
     }*/
     //void solution(int);
};

int main() {
    int num;
    cin >> num;
    BST b;
    while (num != 0) {
        string ss;
        cin >> ss;
        if (ss == "insert") {
            int k;
            cin >> k;
            b.insert(k);
        }
        if (ss == "delete") {
            int j;
            cin >> j;
            b.remove(j);
        }
        if (ss == "sub") {
            int j;
            cin >> j;
            Node* a = b.search(j);
            b.inorder(a);
            //cout << endl << "A의 값은?";
            cout << b.geta() << endl;
            b.seta();
        }
        if (ss == "subroot") {
            b.inorder(b.root);
        }
        num--;
    }


    //while (num != 0) {
    //    int k;
    //    cin >> k;
    //    b.insert(k);
    //    num--;
    //}
    //b.inorder(b.root);
    //b.remove(43);
    //cout << endl;
    //b.inorder(b.root);
}
