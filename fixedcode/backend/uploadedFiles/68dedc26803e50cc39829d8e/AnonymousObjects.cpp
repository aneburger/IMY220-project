class A {
  // all the class stuff
};

class B {
  public:
    B(A* in) { a = in; };
    virtual ~B() {delete a; };
  private:
    A* a;
};

int main() {
  
// Some client code

  B b(new A());


  return 0;
}
