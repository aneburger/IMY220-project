#include <iostream>
#include <vector>

using namespace std;
// Component
class Tree {
public:
	virtual void add(Tree*) = 0;
	virtual void print() = 0;
    virtual ~Tree() {}; // Added
};

// Leaf
class BaseNode : public Tree {
public:
	BaseNode(int v) : value(v) {};
	virtual void print() {
		cout << " " << value << " ";
	};
	virtual void add(Tree*) {};      
	virtual ~BaseNode() {}; // Added
private:
	int value;
};

// Composite
class IntermediateNode : public Tree {
public:
	IntermediateNode(int v) : value(v) {};
	virtual void add(Tree*);
	virtual void print();
	virtual ~IntermediateNode(); // Added
private:
	int value;
	vector<Tree*> next;
};

void IntermediateNode::add(Tree* t){
	next.push_back(t);
}

void IntermediateNode::print(){
	cout << "-" << value << "[";
	vector<Tree*>:: iterator it;
	
	for (it = next.begin(); it != next.end(); ++it)
		(*it)->print();
	cout << "]";
}

IntermediateNode::~IntermediateNode(){
  vector<Tree*>:: iterator it;
  
  for (it = next.begin(); it != next.end(); ++it)
    delete *it;
}


int main(){
	
	Tree* t = new IntermediateNode(10);
	Tree* b = new BaseNode(5);
	t->add(new BaseNode(5)); // anonymous allocation
	Tree* l1 = new IntermediateNode(20);
	l1->add(new BaseNode(67)); // anonymous allocation
	l1->add(new BaseNode(20)); // anonymous allocation
	t->add(l1);
	t->print();
	cout<<endl;    
	// deallcoate memory in reverse order of allocation
//   delete l1;  // Linked into the tree.
   delete b; // Not linked into Tree t and therefore needs to be deleted separately
   delete t;
   // This does not delete the anonymous allocations -> Deletion needs to be done by composite
   // Implication is that the composite must implement destructors and that the base class destructor
   //    MUST be virtual
	l1 = null;  // Required so that it is not accidentally deleted twice.

	return 0;
}
