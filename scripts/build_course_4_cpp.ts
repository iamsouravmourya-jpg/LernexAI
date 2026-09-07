import fs from 'fs';
import { makeLesson } from './helpers';

export const cppCourse = {
  id: "course-test-4-cpp",
  title: "Mastering Modern C++ & Object-Oriented Architecture (Hinglish)",
  subtitle: "From Zero-Cost Abstractions to High-Performance Systems (C++20)",
  description: "Master modern C++ (C++17/C++20) from namespaces, references, RAII, operator overloading, templates, move semantics (&&), STL algorithms, smart pointers to high-performance game engine systems in conversational Hinglish.",
  category: "Systems & Architecture",
  difficulty: "Intermediate to Advanced",
  thumbnail_url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=80",
  is_premium: false,
  total_modules: 12,
  estimated_hours: 60,
  created_at: "2026-03-01T00:00:00Z",
  modules: [
    // Mod 1: 3 lessons
    {
      id: "test4-mod-1",
      course_id: "course-test-4-cpp",
      module_number: 1,
      title: "Module 1: C++ Foundations, Namespaces & Standard Streams",
      description: "C++ compilation model, std::cout/std::cin streams, namespaces, auto type deduction, and constexpr compile-time calculations.",
      order_index: 1,
      lessons: [
        makeLesson("test4-l-1-1", "test4-mod-1", 1, "Lesson 1.1: C++ Architecture, Namespaces & std::cout Streams", 1, 25, "cpp",
`#include <iostream>

namespace Engine {
    void initialize() {
        std::cout << "High-Performance C++20 Engine Booted!" << std::endl;
    }
}

int main() {
    std::cout << "Hello Modern C++ Developer!" << std::endl;
    Engine::initialize();
    return 0;
}`,
          { task: "Print 'Hello C++' using std::cout.", hint: "std::cout << \"Hello C++\" << std::endl;", expected_output: "Hello C++" },
          "C++ zero-cost abstractions provide karta hai jisme high-level features machine code level par zero runtime overhead ke sath compile hote hain.",
          [
            { tag: "Zero-Cost", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "C++ Abstraction", desc: "Pay only for what you use at runtime." }
          ],
          `<div class="theory-card"><h3>Namespaces & Streams</h3><p>Namespaces prevent identifier collisions across large codebases.</p></div>`
        ),
        makeLesson("test4-l-1-2", "test4-mod-1", 2, "Lesson 1.2: Modern auto Type Deduction & Uniform Initialization {}", 2, 20, "cpp",
`#include <iostream>
#include <vector>

int main() {
    // Uniform brace initialization {} prevents narrowing conversions
    int count{42};
    auto score = 98.5; // Inferred as double
    auto name = "Antigravity"; // const char*

    std::cout << "Count: " << count << " | Score: " << score << std::endl;
    return 0;
}`,
          { task: "Declare auto x = 100; and print x with std::cout.", hint: "auto x = 100; std::cout << x << std::endl;", expected_output: "100" },
          "Modern C++ mein `auto` compiler ko exact type deduce karne deta hai compile-time par without any runtime speed penalty.",
          [
            { tag: "auto Deduction", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Compile-Time auto", desc: "Type safety without redundant type boilerplate." }
          ],
          `<div class="theory-card"><h3>Uniform Initialization</h3><p>Braced init {} prevents accidental narrowing loss (e.g. float to int).</p></div>`
        ),
        makeLesson("test4-l-1-3", "test4-mod-1", 3, "Lesson 1.3: constexpr & Compile-Time Metaprogramming in C++", 3, 25, "cpp",
`#include <iostream>

constexpr int factorial(int n) {
    return (n <= 1) ? 1 : (n * factorial(n - 1));
}

int main() {
    // Computed 100% at compile-time by the compiler
    constexpr int fact5 = factorial(5);
    std::cout << "Compile-Time 5! = " << fact5 << std::endl;
    return 0;
}`,
          { task: "Calculate constexpr square(4) = 16 and print it.", hint: "constexpr int sq(int x){ return x*x; } std::cout << sq(4);", expected_output: "16" },
          "constexpr functions compile time par execute hoti hain, zero CPU runtime cost par complex mathematical tables calculate kar sakti hain.",
          [
            { tag: "Compile-Time", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "constexpr Math", desc: "Precomputes values directly into the binary." }
          ],
          `<div class="theory-card"><h3>Compile-Time Computation</h3><p>Eliminates runtime initialization overhead completely.</p></div>`
        )
      ]
    },

    // Mod 2: 4 lessons
    {
      id: "test4-mod-2",
      course_id: "course-test-4-cpp",
      module_number: 2,
      title: "Module 2: References, Memory Model & Pointers",
      description: "References (&), const references for zero-cost parameter passing, new/delete, and nullptr safety.",
      order_index: 2,
      lessons: [
        makeLesson("test4-l-2-1", "test4-mod-2", 1, "Lesson 2.1: C++ References (&) vs Pointers (Zero-Null Guarantee)", 1, 25, "cpp",
`#include <iostream>

void modifyValue(int &ref) {
    ref += 100; // Mutates caller's original variable without pointer syntax
}

int main() {
    int target = 50;
    int &alias = target; // Reference cannot be null, cannot be reseated

    modifyValue(target);
    std::cout << "Modified Value: " << target << std::endl;
    return 0;
}`,
          { task: "Pass int x = 10 by reference to a function adding 5. Print x.", hint: "void add(int &a){a+=5;} int x=10; add(x); std::cout << x;", expected_output: "15" },
          "References non-reseatable aliases hote hain jo null nahi ho sakte, pointers se zyada safe aur clean syntax provide karte hain.",
          [
            { tag: "References", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "C++ Reference (&)", desc: "Guaranteed non-null alias to existing object." }
          ],
          `<div class="theory-card"><h3>Reference Safety</h3><p>Eliminates raw pointer null checks in modern C++ API design.</p></div>`
        ),
        makeLesson("test4-l-2-2", "test4-mod-2", 2, "Lesson 2.2: const References (const &) for Zero-Cost Parameter Passing", 2, 25, "cpp",
`#include <iostream>
#include <string>

// Zero-copy pass by reference with read-only const protection
void printMetrics(const std::string &report) {
    std::cout << "Report Content: " << report << std::endl;
}

int main() {
    std::string largeData = "Enterprise Performance Metrics 2026";
    printMetrics(largeData);
    return 0;
}`,
          { task: "Pass const std::string & to a function and print it.", hint: "void f(const std::string &s){ std::cout << s; }", expected_output: "Enterprise Performance Metrics 2026" },
          "Large objects (strings, vectors, custom structs) ko hamesha 'const Type &' ke roop mein pass karein taki zero-copy speed mile aur original object protect rahe.",
          [
            { tag: "Zero-Copy", color: "rgba(16, 185, 129, 0.15); #10b981", title: "const Ref Idiom", desc: "Pass-by-reference speed + read-only safety." }
          ],
          `<div class="theory-card"><h3>Performance Idiom</h3><p>The standard way to pass objects in C++.</p></div>`
        ),
        makeLesson("test4-l-2-3", "test4-mod-2", 3, "Lesson 2.3: Dynamic Allocation with new/delete & Heap Mechanics", 3, 25, "cpp",
`#include <iostream>

int main() {
    // Raw heap allocation in C++
    int *dynamicInt = new int(42);
    int *dynamicArray = new int[3]{10, 20, 30};

    std::cout << "Dynamic Value: " << *dynamicInt << std::endl;

    delete dynamicInt;       // Delete single object
    delete[] dynamicArray;   // Delete array
    return 0;
}`,
          { task: "Allocate int on heap with new int(99), print value, and delete.", hint: "int *p = new int(99); std::cout << *p; delete p;", expected_output: "99" },
          "C++ mein `new` constructor call karta hai aur `delete` destructor invoke karke memory release karta hai.",
          [
            { tag: "Heap Operators", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "new & delete", desc: "Type-safe heap allocation invoking ctors/dtors." }
          ],
          `<div class="theory-card"><h3>new[] vs delete[]</h3><p>Always pair new[] with delete[] to prevent heap corruption.</p></div>`
        ),
        makeLesson("test4-l-2-4", "test4-mod-2", 4, "Lesson 2.4: nullptr Safety vs C-Style NULL", 4, 20, "cpp",
`#include <iostream>

void process(int num) { std::cout << "Integer overload: " << num << std::endl; }
void process(int *ptr) { std::cout << "Pointer overload active." << std::endl; }

int main() {
    // nullptr is strictly of type std::nullptr_t, resolving overload ambiguity
    process(nullptr);
    return 0;
}`,
          { task: "Call process(nullptr) and observe unambiguous pointer overload resolution.", hint: "process(nullptr);", expected_output: "Pointer overload active." },
          "C++11 ka `nullptr` strongly typed keyword hai jo 0/NULL ki integer overload ambiguity ko eliminate karta hai.",
          [
            { tag: "Type Safety", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "nullptr_t", desc: "Strongly-typed null pointer constant." }
          ],
          `<div class="theory-card"><h3>Null Safety</h3><p>Never use NULL in modern C++.</p></div>`
        )
      ]
    },

    // Mod 3: 2 lessons
    {
      id: "test4-mod-3",
      course_id: "course-test-4-cpp",
      module_number: 3,
      title: "Module 3: Functions, Overloading & Lambdas",
      description: "Function overloading, default arguments, inline functions, and modern C++ lambda capture clauses.",
      order_index: 3,
      lessons: [
        makeLesson("test4-l-3-1", "test4-mod-3", 1, "Lesson 3.1: Function Overloading & Default Argument Values", 1, 25, "cpp",
`#include <iostream>

void renderWindow(int width = 1920, int height = 1080, bool fullscreen = true) {
    std::cout << "Window: " << width << "x" << height << " | Fullscreen: " << (fullscreen ? "YES" : "NO") << std::endl;
}

int main() {
    renderWindow(); // Uses all defaults
    renderWindow(1280, 720, false); // Overrides defaults
    return 0;
}`,
          { task: "Call renderWindow() with default parameters and check output.", hint: "renderWindow();", expected_output: "Window: 1920x1080 | Fullscreen: YES" },
          "Default arguments right-to-left assign hote hain aur call-site par clean expressive API provide karte hain.",
          [
            { tag: "API Design", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Default Args", desc: "Right-associative default parameter values." }
          ],
          `<div class="theory-card"><h3>Function Overloading</h3><p>Resolved at compile-time via name mangling.</p></div>`
        ),
        makeLesson("test4-l-3-2", "test4-mod-3", 2, "Lesson 3.2: Modern C++ Lambdas & Capture Clauses ([=], [&], [this])", 2, 25, "cpp",
`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    int threshold = 50;
    std::vector<int> numbers = {10, 65, 30, 85, 45};

    // Lambda capturing 'threshold' by value [=] or reference [&]
    int count = std::count_if(numbers.begin(), numbers.end(), [threshold](int n) {
        return n > threshold;
    });

    std::cout << "Numbers > " << threshold << ": " << count << std::endl;
    return 0;
}`,
          { task: "Write a lambda auto doubleVal = [](int x){ return x*2; }; and print doubleVal(7).", hint: "auto d = [](int x){return x*2;}; std::cout << d(7);", expected_output: "14" },
          "C++ Lambdas anonymous closure objects hote hain jo compiler generated functor classes mein transform hote hain with zero performance overhead.",
          [
            { tag: "Lambdas", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Modern Closures", desc: "Inlined functor generation by the compiler." }
          ],
          `<div class="theory-card"><h3>Capture Clause Mechanics</h3><p>[] empty, [=] copy all, [&] reference all, [val] explicit copy.</p></div>`
        )
      ]
    },

    // Mod 4: 5 lessons
    {
      id: "test4-mod-4",
      course_id: "course-test-4-cpp",
      module_number: 4,
      title: "Module 4: Classes, Constructors & RAII",
      description: "Class architecture, member initializer lists, explicit constructors, destructors, and RAII resource management.",
      order_index: 4,
      lessons: [
        makeLesson("test4-l-4-1", "test4-mod-4", 1, "Lesson 4.1: Classes, Methods & The this Pointer", 1, 25, "cpp",
`#include <iostream>
#include <string>

class Player {
private:
    std::string name;
    int health;

public:
    Player(std::string name, int health) {
        this->name = name;
        this->health = health;
    }

    void display() const {
        std::cout << "Player: " << this->name << " [HP: " << this->health << "]" << std::endl;
    }
};

int main() {
    Player p1("ShadowKnight", 100);
    p1.display();
    return 0;
}`,
          { task: "Instantiate Player with 'Hero', 150 and call display().", hint: "Player p(\"Hero\", 150); p.display();", expected_output: "Player: Hero [HP: 150]" },
          "Classes object blueprints hoti hain jaha 'this' current invoking instance object ka typed pointer hota hai.",
          [
            { tag: "OOP C++", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "this Pointer", desc: "Implicit pointer to the receiving instance." }
          ],
          `<div class="theory-card"><h3>Class Memory Layout</h3><p>Member functions live in code memory (.text); only data fields occupy object bytes.</p></div>`
        ),
        makeLesson("test4-l-4-2", "test4-mod-4", 2, "Lesson 4.2: Member Initializer Lists & In-Class Member Defaults", 2, 25, "cpp",
`#include <iostream>
#include <string>

class ServerConfig {
private:
    const int port;
    std::string host;

public:
    // Member Initializer List directly initializes fields before body runs
    ServerConfig(int p, std::string h) : port(p), host(h) {}

    void print() const {
        std::cout << "Binding to " << host << ":" << port << std::endl;
    }
};

int main() {
    ServerConfig cfg(8080, "0.0.0.0");
    cfg.print();
    return 0;
}`,
          { task: "Create ServerConfig(3000, 'localhost') and call print().", hint: "ServerConfig c(3000, \"localhost\"); c.print();", expected_output: "Binding to localhost:3000" },
          "Member Initializer List 'const' aur 'reference' members ko initialize karne ka ekmaatra tareeqa hai aur default constructor double-calls prevent karta hai.",
          [
            { tag: "Initializer List", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Direct Initialization", desc: "Constructs members directly without temporary copies." }
          ],
          `<div class="theory-card"><h3>Initialization Order</h3><p>Members initialize strictly in order of class declaration, not list order.</p></div>`
        ),
        makeLesson("test4-l-4-3", "test4-mod-4", 3, "Lesson 4.3: The explicit Specifier & Preventing Implicit Conversions", 3, 25, "cpp",
`#include <iostream>

class MemoryBuffer {
private:
    size_t capacity;

public:
    // explicit keyword prevents implicit conversion from integer
    explicit MemoryBuffer(size_t size) : capacity(size) {}

    size_t getCapacity() const { return capacity; }
};

void allocate(const MemoryBuffer &buf) {
    std::cout << "Buffer allocated with size: " << buf.getCapacity() << " bytes." << std::endl;
}

int main() {
    MemoryBuffer b(1024);
    allocate(b);
    return 0;
}`,
          { task: "Construct MemoryBuffer(512) and call allocate.", hint: "allocate(MemoryBuffer(512));", expected_output: "Buffer allocated with size: 512 bytes." },
          "'explicit' constructors implicit type coercion bugs (jaise function(10) converting silently to object) ko compile-time par block karte hain.",
          [
            { tag: "Safety Guard", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "explicit Constructor", desc: "Guards against unintended implicit type casting." }
          ],
          `<div class="theory-card"><h3>Type Coercion Defense</h3><p>Mandatory for single-argument constructors in modern C++.</p></div>`
        ),
        makeLesson("test4-l-4-4", "test4-mod-4", 4, "Lesson 4.4: Destructors & The Core RAII Idiom (Resource Acquisition Is Initialization)", 4, 30, "cpp",
`#include <iostream>

class ScopedResource {
public:
    ScopedResource() {
        std::cout << "[RAII] Resource Acquired & Locked." << std::endl;
    }
    ~ScopedResource() {
        std::cout << "[RAII] Resource Automatically Released on Scope Exit!" << std::endl;
    }
};

int main() {
    {
        ScopedResource res; // Stack allocation
        std::cout << "Inside local execution block..." << std::endl;
    } // Destructor fires automatically right here!
    std::cout << "Outside scope block." << std::endl;
    return 0;
}`,
          { task: "Observe automatic destructor execution on scope exit.", hint: "RAII scoped execution block.", expected_output: "[RAII] Resource Acquired & Locked.\nInside local execution block...\n[RAII] Resource Automatically Released on Scope Exit!\nOutside scope block." },
          "RAII (Resource Acquisition Is Initialization) C++ ka sabse powerful concept hai — resource constructor mein acquire hota hai aur scope khatam hone par destructor mein automatically release ho jata hai.",
          [
            { tag: "RAII Philosophy", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Deterministic Cleanup", desc: "Zero memory/file leaks guaranteed by C++ stack unwinding." }
          ],
          `<div class="theory-card"><h3>RAII Architecture</h3><p>The foundation of smart pointers, mutex locks, and database handles.</p></div>`
        ),
        makeLesson("test4-l-4-5", "test4-mod-4", 5, "Lesson 4.5: Copy Constructors & Deep Copying Heap Memory", 5, 25, "cpp",
`#include <iostream>

class DynamicString {
public:
    int *data;
    DynamicString(int val) {
        data = new int(val);
    }
    // Deep Copy Constructor
    DynamicString(const DynamicString &other) {
        data = new int(*other.data);
    }
    ~DynamicString() {
        delete data;
    }
};

int main() {
    DynamicString s1(100);
    DynamicString s2 = s1; // Deep copy
    std::cout << "s1 data: " << *s1.data << " | s2 data: " << *s2.data << std::endl;
    return 0;
}`,
          { task: "Instantiate and deep copy DynamicString.", hint: "Deep copy constructor verification.", expected_output: "s1 data: 100 | s2 data: 100" },
          "Agar class ke paas raw pointers hain to default shallow copy double-free crash generate karti hai; Deep Copy Constructor naya memory block allocate karta hai.",
          [
            { tag: "Deep Copy", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Copy Constructor", desc: "Clones underlying heap allocations safely." }
          ],
          `<div class="theory-card"><h3>Copy Semantics</h3><p>Essential when managing dynamic resource lifetimes.</p></div>`
        )
      ]
    },

    // Mod 5: 3 lessons
    {
      id: "test4-mod-5",
      course_id: "course-test-4-cpp",
      module_number: 5,
      title: "Module 5: Operator Overloading & Custom Math Types",
      description: "Overloading arithmetic operators (+, -), stream insertion (<<), subscript ([]) and copy assignment (=).",
      order_index: 5,
      lessons: [
        makeLesson("test4-l-5-1", "test4-mod-5", 1, "Lesson 5.1: Vector2D Math & Arithmetic Operator Overloading (+, -)", 1, 25, "cpp",
`#include <iostream>

class Vector2D {
public:
    float x, y;
    Vector2D(float x = 0, float y = 0) : x(x), y(y) {}

    // Overloading + operator
    Vector2D operator+(const Vector2D &other) const {
        return Vector2D(this->x + other.x, this->y + other.y);
    }
};

int main() {
    Vector2D v1(10.0f, 20.0f);
    Vector2D v2(5.0f, 15.0f);
    Vector2D v3 = v1 + v2;

    std::cout << "Vector Sum: (" << v3.x << ", " << v3.y << ")" << std::endl;
    return 0;
}`,
          { task: "Add Vector2D(1, 2) + Vector2D(3, 4) and print (4, 6).", hint: "v1 + v2 operator test.", expected_output: "Vector Sum: (4, 6)" },
          "Operator overloading custom mathematical types (Vectors, Matrices, Complex numbers) ko native types ki tarah natural syntax deta hai.",
          [
            { tag: "Custom Math", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "operator+ Overload", desc: "Expressive mathematical notation for user classes." }
          ],
          `<div class="theory-card"><h3>Operator Syntax</h3><p>Transforms a + b into a.operator+(b).</p></div>`
        ),
        makeLesson("test4-l-5-2", "test4-mod-5", 2, "Lesson 5.2: Stream Insertion Operator Overloading (operator<<)", 2, 25, "cpp",
`#include <iostream>

class Point {
private:
    int x, y;
public:
    Point(int x, int y) : x(x), y(y) {}

    // Friend function to allow std::cout << point syntax
    friend std::ostream& operator<<(std::ostream &os, const Point &p) {
        os << "Point(" << p.x << ", " << p.y << ")";
        return os;
    }
};

int main() {
    Point pt(15, 30);
    std::cout << "Formatted Coordinate: " << pt << std::endl;
    return 0;
}`,
          { task: "Print Point(10, 20) with std::cout << pt.", hint: "Stream operator friend function.", expected_output: "Formatted Coordinate: Point(15, 30)" },
          "Stream insertion operator `operator<<` ko friend function ke roop mein overload karke objects ko direct std::cout stream mein pipe kiya ja sakta hai.",
          [
            { tag: "Stream I/O", color: "rgba(16, 185, 129, 0.15); #10b981", title: "operator<<", desc: "Seamless integration with std::ostream pipeline." }
          ],
          `<div class="theory-card"><h3>Chained Stream Output</h3><p>Returning ostream& allows chaining multiple << operators in a single line.</p></div>`
        ),
        makeLesson("test4-l-5-3", "test4-mod-5", 3, "Lesson 5.3: Array Subscript Operator (operator[]) & Bounds Checking", 3, 25, "cpp",
`#include <iostream>

class SafeArray {
private:
    int data[5]{10, 20, 30, 40, 50};
public:
    int& operator[](size_t index) {
        if (index >= 5) throw std::out_of_range("Index out of bounds!");
        return data[index];
    }
};

int main() {
    SafeArray arr;
    arr[2] = 99; // Lvalue write access via reference return
    std::cout << "arr[2] = " << arr[2] << std::endl;
    return 0;
}`,
          { task: "Access arr[1] and print its value 20.", hint: "SafeArray operator[] test.", expected_output: "arr[2] = 99" },
          "operator[] reference return karta hai jisse array index syntax ke sath direct read aur write dono operations naturally perform hote hain.",
          [
            { tag: "Subscript", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "operator[]", desc: "Enables natural container indexing with safety checks." }
          ],
          `<div class="theory-card"><h3>Lvalue Indexing</h3><p>Returning int& allows arr[i] = value assignment.</p></div>`
        )
      ]
    },

    // Mod 6: 4 lessons
    {
      id: "test4-mod-6",
      course_id: "course-test-4-cpp",
      module_number: 6,
      title: "Module 6: Inheritance & Virtual Polymorphism",
      description: "Class inheritance, virtual functions, vtable dispatch, override/final specifiers, and pure virtual abstract interfaces.",
      order_index: 6,
      lessons: [
        makeLesson("test4-l-6-1", "test4-mod-6", 1, "Lesson 6.1: Inheritance Hierarchies & Access Control (public/protected)", 1, 25, "cpp",
`#include <iostream>
#include <string>

class Entity {
protected:
    std::string name;
public:
    Entity(std::string n) : name(n) {}
};

class Monster : public Entity {
public:
    Monster(std::string n) : Entity(n) {}
    void roar() const {
        std::cout << name << " roars fiercely!" << std::endl;
    }
};

int main() {
    Monster dragon("Smaug");
    dragon.roar();
    return 0;
}`,
          { task: "Instantiate Monster('Goblin') and call roar().", hint: "Monster m(\"Goblin\"); m.roar();", expected_output: "Smaug roars fiercely!" },
          "Inheritance child class ko parent class ke protected fields aur methods reuse karne allow karti hai.",
          [
            { tag: "Inheritance", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "public Inheritance", desc: "'Is-a' relationship modeling." }
          ],
          `<div class="theory-card"><h3>Access Hierarchy</h3><p>private (class only) -> protected (class & children) -> public (all).</p></div>`
        ),
        makeLesson("test4-l-6-2", "test4-mod-6", 2, "Lesson 6.2: Virtual Functions & The VTable Dispatch Table", 2, 30, "cpp",
`#include <iostream>

class BaseWeapon {
public:
    virtual void attack() const {
        std::cout << "Base weapon attack." << std::endl;
    }
    virtual ~BaseWeapon() = default; // Essential virtual destructor
};

class Bow : public BaseWeapon {
public:
    void attack() const override {
        std::cout << "Bow fires an arrow silently!" << std::endl;
    }
};

int main() {
    BaseWeapon *w = new Bow();
    w->attack(); // Dispatched via VTable at runtime
    delete w;
    return 0;
}`,
          { task: "Create polymorphic BaseWeapon* pointing to Bow and call attack().", hint: "BaseWeapon *w = new Bow(); w->attack(); delete w;", expected_output: "Bow fires an arrow silently!" },
          "virtual keyword compiler ko VTable (virtual method table) create karne bolta hai, jisse dynamic runtime dispatch enable hota hai.",
          [
            { tag: "VTable", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Virtual Table", desc: "Array of function pointers for runtime polymorphism." }
          ],
          `<div class="theory-card"><h3>Virtual Destructor Rule</h3><p>Always declare base class destructors virtual to prevent memory leaks when deleting via base pointer.</p></div>`
        ),
        makeLesson("test4-l-6-3", "test4-mod-6", 3, "Lesson 6.3: Modern override and final Specifiers (C++11)", 3, 20, "cpp",
`#include <iostream>

class BaseService {
public:
    virtual void start() = 0;
};

class ProductionService final : public BaseService {
public:
    void start() override {
        std::cout << "Production Service Booted Securely." << std::endl;
    }
};

int main() {
    ProductionService s;
    s.start();
    return 0;
}`,
          { task: "Instantiate ProductionService and call start().", hint: "ProductionService s; s.start();", expected_output: "Production Service Booted Securely." },
          "'override' compile-time typo protection deta hai aur 'final' aage sub-classing ko block karke devirtualization optimizations allow karta hai.",
          [
            { tag: "Modern C++", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "override & final", desc: "Compile-time signature validation and devirtualization." }
          ],
          `<div class="theory-card"><h3>Devirtualization</h3><p>Compilers optimize final classes into direct native calls bypassing vtable.</p></div>`
        ),
        makeLesson("test4-l-6-4", "test4-mod-6", 4, "Lesson 6.4: Pure Virtual Functions (= 0) & Abstract Interface Classes", 4, 25, "cpp",
`#include <iostream>

class ILogger {
public:
    virtual void log(const std::string &msg) = 0; // Pure virtual function
    virtual ~ILogger() = default;
};

class ConsoleLogger : public ILogger {
public:
    void log(const std::string &msg) override {
        std::cout << "[SYSTEM LOG] " << msg << std::endl;
    }
};

int main() {
    ConsoleLogger logger;
    logger.log("High-priority alert received");
    return 0;
}`,
          { task: "Invoke log on ConsoleLogger with 'Test Log'.", hint: "ConsoleLogger l; l.log(\"Test Log\");", expected_output: "[SYSTEM LOG] High-priority alert received" },
          "Pure virtual functions (= 0) class ko abstract banati hain, jo C++ mein pure Interface contracts create karne ka tareeqa hai.",
          [
            { tag: "Interfaces", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Abstract Contract", desc: "Enforces concrete implementation in subclasses." }
          ],
          `<div class="theory-card"><h3>Interface Design</h3><p>Decouples high-level business modules from low-level implementations.</p></div>`
        )
      ]
    },

    // Mod 7: 3 lessons
    {
      id: "test4-mod-7",
      course_id: "course-test-4-cpp",
      module_number: 7,
      title: "Module 7: Templates & Generic Metaprogramming",
      description: "Function templates, class templates, template specialization, and C++20 Concepts.",
      order_index: 7,
      lessons: [
        makeLesson("test4-l-7-1", "test4-mod-7", 1, "Lesson 7.1: Function Templates & Automatic Type Deduction", 1, 25, "cpp",
`#include <iostream>

template <typename T>
T getMaximum(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << "Max int: " << getMaximum(10, 20) << std::endl;
    std::cout << "Max double: " << getMaximum(5.5, 2.3) << std::endl;
    return 0;
}`,
          { task: "Call getMaximum(100, 50) and print result.", hint: "std::cout << getMaximum(100, 50);", expected_output: "Max int: 20\nMax double: 5.5" },
          "Templates compile-time code generators hote hain jo har concrete type ke liye highly optimized machine code generate karte hain.",
          [
            { tag: "Templates", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Function Template", desc: "Generic compile-time algorithm generation." }
          ],
          `<div class="theory-card"><h3>Template Instantiation</h3><p>Compiler generates separate specialized functions per invoked type.</p></div>`
        ),
        makeLesson("test4-l-7-2", "test4-mod-7", 2, "Lesson 7.2: Class Templates & Generic Data Container Design", 2, 25, "cpp",
`#include <iostream>

template <typename T, size_t Size>
class StaticBuffer {
private:
    T buffer[Size];
public:
    size_t capacity() const { return Size; }
};

int main() {
    StaticBuffer<int, 64> intBuf;
    StaticBuffer<double, 128> dblBuf;

    std::cout << "Int Buffer Capacity: " << intBuf.capacity() << std::endl;
    std::cout << "Double Buffer Capacity: " << dblBuf.capacity() << std::endl;
    return 0;
}`,
          { task: "Instantiate StaticBuffer<char, 256> and print capacity.", hint: "StaticBuffer<char, 256> b; std::cout << b.capacity();", expected_output: "Int Buffer Capacity: 64\nDouble Buffer Capacity: 128" },
          "Class templates generic data structures (jaise std::vector, std::array) build karne ki foundation hain.",
          [
            { tag: "Containers", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Class Templates", desc: "Type-safe compile-time generic data structures." }
          ],
          `<div class="theory-card"><h3>Non-Type Parameters</h3><p>size_t Size is a compile-time constant integer parameter.</p></div>`
        ),
        makeLesson("test4-l-7-3", "test4-mod-7", 3, "Lesson 7.3: Template Specialization & C++20 Concepts Constraints", 3, 25, "cpp",
`#include <iostream>
#include <concepts>

// C++20 Concept constraining template to numeric types only
template <typename T>
requires std::integral<T> || std::floating_point<T>
T addNumbers(T a, T b) {
    return a + b;
}

int main() {
    std::cout << "Constrained Math: " << addNumbers(15, 25) << std::endl;
    return 0;
}`,
          { task: "Invoke addNumbers(50, 50) and print result.", hint: "std::cout << addNumbers(50, 50);", expected_output: "Constrained Math: 40" },
          "C++20 Concepts template error messages ko crystal clear aur readable banate hain by constraining types at compile-time.",
          [
            { tag: "C++20 Concepts", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Concepts & Requires", desc: "Type constraints with readable compile error diagnostics." }
          ],
          `<div class="theory-card"><h3>Concepts Revolution</h3><p>Replaces complex SFINAE with clean declarative type constraints.</p></div>`
        )
      ]
    },

    // Mod 8: 5 lessons
    {
      id: "test4-mod-8",
      course_id: "course-test-4-cpp",
      module_number: 8,
      title: "Module 8: Move Semantics (&&) & The Rule of 5",
      description: "Rvalue references (&&), std::move, Move Constructors, Move Assignment, Rule of 5, and perfect forwarding.",
      order_index: 8,
      lessons: [
        makeLesson("test4-l-8-1", "test4-mod-8", 1, "Lesson 8.1: Rvalue References (&&) & std::move Mechanics", 1, 25, "cpp",
`#include <iostream>
#include <string>
#include <utility>

int main() {
    std::string original = "Gigantic String Data Buffer";
    
    // std::move casts lvalue to rvalue reference (&&), enabling pointer pilfering
    std::string moved = std::move(original);

    std::cout << "Moved Content: " << moved << std::endl;
    std::cout << "Original Size after Move: " << original.size() << " (Pointers stolen!)" << std::endl;
    return 0;
}`,
          { task: "Move string using std::move and print size of original.", hint: "std::string s = \"data\"; std::string m = std::move(s); std::cout << s.size();", expected_output: "Moved Content: Gigantic String Data Buffer\nOriginal Size after Move: 0 (Pointers stolen!)" },
          "Move semantics deep copying ke bajaye internal memory heap pointers ko 'steal' kar lete hain — O(N) copy se O(1) pointer swap!",
          [
            { tag: "Move Semantics", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "std::move", desc: "Zero-copy resource ownership transfer." }
          ],
          `<div class="theory-card"><h3>Rvalue Reference</h3><p>Type&& binds to temporary disposable objects.</p></div>`
        ),
        makeLesson("test4-l-8-2", "test4-mod-8", 2, "Lesson 8.2: The Complete Modern Rule of 5 & Rule of 0", 2, 30, "cpp",
`#include <iostream>

class HeavyBuffer {
private:
    int *data;
    size_t size;

public:
    HeavyBuffer(size_t s) : size(s), data(new int[s]) {}
    ~HeavyBuffer() { delete[] data; } // 1. Destructor

    HeavyBuffer(const HeavyBuffer &o) : size(o.size), data(new int[o.size]) {} // 2. Copy Ctor
    HeavyBuffer& operator=(const HeavyBuffer &o) { // 3. Copy Assign
        if (this != &o) { delete[] data; size = o.size; data = new int[size]; }
        return *this;
    }

    HeavyBuffer(HeavyBuffer &&o) noexcept : size(o.size), data(o.data) { // 4. Move Ctor
        o.data = nullptr; o.size = 0;
    }
    HeavyBuffer& operator=(HeavyBuffer &&o) noexcept { // 5. Move Assign
        if (this != &o) { delete[] data; data = o.data; size = o.size; o.data = nullptr; o.size = 0; }
        return *this;
    }
};

int main() {
    HeavyBuffer b1(1000);
    HeavyBuffer b2 = std::move(b1); // Move constructor fires
    std::cout << "Rule of 5 Move Constructor Successfully Executed!" << std::endl;
    return 0;
}`,
          { task: "Verify Rule of 5 move constructor execution.", hint: "Move constructor check.", expected_output: "Rule of 5 Move Constructor Successfully Executed!" },
          "Rule of 5 ke mutabiq agar aap Destructor, Copy Ctor, Copy Assign, Move Ctor, ya Move Assign mein se koi bhi define karte hain, to sabhi 5 ko explicitly define karna chahiye.",
          [
            { tag: "Rule of 5", color: "rgba(16, 185, 129, 0.15); #10b981", title: "C++ Rule of 5", desc: "Complete memory and lifecycle ownership contract." }
          ],
          `<div class="theory-card"><h3>Rule of Zero</h3><p>Prefer using smart pointers and std containers to write zero custom destructors.</p></div>`
        ),
        makeLesson("test4-l-8-3", "test4-mod-8", 3, "Lesson 8.3: Perfect Forwarding with std::forward & Universal References", 3, 25, "cpp",
`#include <iostream>
#include <utility>

void process(int &x) { std::cout << "Lvalue reference processed." << std::endl; }
void process(int &&x) { std::cout << "Rvalue reference processed." << std::endl; }

template <typename T>
void relay(T &&arg) { // Universal Reference / Forwarding Reference
    process(std::forward<T>(arg)); // Perfectly preserves lvalue vs rvalue category
}

int main() {
    int val = 10;
    relay(val); // Passes lvalue
    relay(20);  // Passes rvalue
    return 0;
}`,
          { task: "Call relay(val) and relay(20) to observe perfect forwarding.", hint: "std::forward preserves value category.", expected_output: "Lvalue reference processed.\nRvalue reference processed." },
          "std::forward template arguments ke exact value category (lvalue vs rvalue) ko un-mutated preserve karta hai factory constructors ke liye (jaise std::make_unique).",
          [
            { tag: "std::forward", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Perfect Forwarding", desc: "Preserves value categories in generic wrappers." }
          ],
          `<div class="theory-card"><h3>Universal References</h3><p>T&& in template deduction binds to both lvalues and rvalues.</p></div>`
        ),
        makeLesson("test4-l-8-4", "test4-mod-8", 4, "Lesson 8.4: Universal References (T&&) in Template Deduction", 4, 25, "cpp",
`#include <iostream>
#include <type_traits>

template <typename T>
void inspect(T &&arg) {
    if (std::is_lvalue_reference<T>::value) {
        std::cout << "Deduced as Lvalue Reference" << std::endl;
    } else {
        std::cout << "Deduced as Rvalue" << std::endl;
    }
}

int main() {
    int x = 50;
    inspect(x);
    inspect(100);
    return 0;
}`,
          { task: "Test inspect(x) and inspect(100).", hint: "Template universal reference deduction.", expected_output: "Deduced as Lvalue Reference\nDeduced as Rvalue" },
          "Reference collapsing rules (& + & -> &, & + && -> &, && + && -> &&) decide how universal references resolve.",
          [
            { tag: "Reference Collapsing", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "T&& Deduction", desc: "Compile-time reference category deduction." }
          ],
          `<div class="theory-card"><h3>Collapsing Rules</h3><p>Guarantees no invalid double references.</p></div>`
        ),
        makeLesson("test4-l-8-5", "test4-mod-8", 5, "Lesson 8.5: Zero-Copy Buffer Transfers & noexcept Move Guarantee", 5, 25, "cpp",
`#include <iostream>
#include <vector>

class FastPacket {
public:
    FastPacket() = default;
    FastPacket(FastPacket&&) noexcept { // noexcept enables std::vector fast reallocation
        std::cout << "Zero-copy move executed with noexcept guarantee." << std::endl;
    }
};

int main() {
    std::vector<FastPacket> vec;
    vec.reserve(2);
    vec.push_back(FastPacket());
    return 0;
}`,
          { task: "Verify noexcept move constructor on FastPacket.", hint: "FastPacket move check.", expected_output: "Zero-copy move executed with noexcept guarantee." },
          "std::vector tabhi elements ko move karta hai jab Move Constructor `noexcept` ho; warna safety ke liye slow copy fallback use hota hai.",
          [
            { tag: "noexcept", color: "rgba(16, 185, 129, 0.15); #10b981", title: "noexcept Move", desc: "Mandatory for std::vector capacity growth optimization." }
          ],
          `<div class="theory-card"><h3>Vector Optimization</h3><p>Always mark move constructors and move assignment operators noexcept.</p></div>`
        )
      ]
    },

    // Mod 9: 2 lessons
    {
      id: "test4-mod-9",
      course_id: "course-test-4-cpp",
      module_number: 9,
      title: "Module 9: STL Containers Deep Dive (Vector, Map, Set & Deque)",
      description: "std::vector memory reallocation, reserve() optimization, std::map (Red-Black Trees), and std::unordered_map (Hash Tables).",
      order_index: 9,
      lessons: [
        makeLesson("test4-l-9-1", "test4-mod-9", 1, "Lesson 9.1: std::vector Growth Mechanics & Reserve Optimization", 1, 25, "cpp",
`#include <iostream>
#include <vector>

int main() {
    std::vector<int> nums;
    nums.reserve(100); // Pre-allocates memory buffer, preventing reallocations

    nums.push_back(10);
    nums.push_back(20);
    nums.emplace_back(30); // Constructs element in-place

    std::cout << "Vector Size: " << nums.size() << " | Capacity: " << nums.capacity() << std::endl;
    return 0;
}`,
          { task: "Reserve vector for 50 items, push 1, 2, print capacity.", hint: "std::vector<int> v; v.reserve(50); std::cout << v.capacity();", expected_output: "Vector Size: 3 | Capacity: 100" },
          "reserve() capacity pre-allocate karta hai jisse dynamic growth ke dauran CPU heap reallocation aur copy cycles eliminate ho jaate hain.",
          [
            { tag: "std::vector", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Vector Capacity", desc: "Contiguous memory with geometric 2x growth factor." }
          ],
          `<div class="theory-card"><h3>emplace_back vs push_back</h3><p>emplace_back constructs objects directly in vector memory without temporaries.</p></div>`
        ),
        makeLesson("test4-l-9-2", "test4-mod-9", 2, "Lesson 9.2: Associative Containers (std::map vs std::unordered_map)", 2, 25, "cpp",
`#include <iostream>
#include <map>
#include <unordered_map>

int main() {
    // std::map is O(log N) Self-Balancing Red-Black Tree (Sorted keys)
    std::map<std::string, int> sortedScores;
    sortedScores["Charlie"] = 80;
    sortedScores["Alice"] = 95;

    // std::unordered_map is O(1) Hash Table
    std::unordered_map<int, std::string> sessionMap;
    sessionMap[101] = "ActiveUser";

    std::cout << "First Sorted Map Entry: " << sortedScores.begin()->first << std::endl;
    std::cout << "Hash Map Lookup 101: " << sessionMap[101] << std::endl;
    return 0;
}`,
          { task: "Check first key of std::map with Alice and Charlie. Print key.", hint: "std::map sorted check.", expected_output: "First Sorted Map Entry: Alice\nHash Map Lookup 101: ActiveUser" },
          "std::map keys ko sorted order mein rakhta hai (Red-Black Tree), jabki std::unordered_map O(1) average hash lookup deta hai.",
          [
            { tag: "Hash vs Tree", color: "rgba(16, 185, 129, 0.15); #10b981", title: "STL Maps", desc: "std::map (O(log N) tree) vs std::unordered_map (O(1) hash)." }
          ],
          `<div class="theory-card"><h3>Container Decision Matrix</h3><p>Choose unordered_map for high-frequency point lookups.</p></div>`
        )
      ]
    },

    // Mod 10: 4 lessons
    {
      id: "test4-mod-10",
      course_id: "course-test-4-cpp",
      module_number: 10,
      title: "Module 10: STL Algorithms, Iterators & Modern Ranges",
      description: "std::sort, std::find, lambda predicates, and modern C++20 Ranges (| std::views::filter | std::views::transform).",
      order_index: 10,
      lessons: [
        makeLesson("test4-l-10-1", "test4-mod-10", 1, "Lesson 10.1: STL Algorithms & Custom Predicates (std::sort & std::find)", 1, 25, "cpp",
`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> data = {50, 20, 90, 10, 40};

    // Sort descending with lambda comparator
    std::sort(data.begin(), data.end(), [](int a, int b) { return a > b; });

    std::cout << "Sorted Descending: ";
    for (int n : data) std::cout << n << " ";
    std::cout << std::endl;
    return 0;
}`,
          { task: "Sort vector {3, 1, 2} ascending and print first item.", hint: "std::sort(v.begin(), v.end()); std::cout << v[0];", expected_output: "Sorted Descending: 90 50 40 20 10 " },
          "STL algorithms iterator abstraction use karke containers aur algorithms ko completely decouple karte hain.",
          [
            { tag: "Algorithms", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "std::sort", desc: "IntroSort (Quicksort + Heapsort + Insertion Sort hybrid)." }
          ],
          `<div class="theory-card"><h3>IntroSort Architecture</h3><p>Guaranteed O(N log N) worst-case time complexity.</p></div>`
        ),
        makeLesson("test4-l-10-2", "test4-mod-10", 2, "Lesson 10.2: C++20 Ranges & Modern Views Pipelining", 2, 25, "cpp",
`#include <iostream>
#include <vector>
#include <ranges>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8};

    // C++20 Ranges: Lazy functional pipeline using pipe operator '|'
    auto results = numbers 
                 | std::views::filter([](int n) { return n % 2 == 0; })
                 | std::views::transform([](int n) { return n * n; });

    std::cout << "Even Squares via Ranges: ";
    for (int v : results) std::cout << v << " ";
    std::cout << std::endl;
    return 0;
}`,
          { task: "Iterate C++20 range pipeline and observe even squares.", hint: "C++20 ranges pipeline test.", expected_output: "Even Squares via Ranges: 4 16 36 64 " },
          "C++20 Ranges intermediate memory buffers allocate kiye bina data stream ko lazily transform aur filter karte hain.",
          [
            { tag: "C++20 Ranges", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Views Pipelining", desc: "Lazy composable data transformation pipelines." }
          ],
          `<div class="theory-card"><h3>Lazy Pipeline</h3><p>Elements evaluated on-demand during iteration without memory allocation.</p></div>`
        ),
        makeLesson("test4-l-10-3", "test4-mod-10", 3, "Lesson 10.3: Numeric Algorithms (std::accumulate & std::transform)", 3, 20, "cpp",
`#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> vals = {10, 20, 30, 40};
    int total = std::accumulate(vals.begin(), vals.end(), 0);

    std::cout << "Total Sum via std::accumulate: " << total << std::endl;
    return 0;
}`,
          { task: "Sum vector {5, 5, 10} with std::accumulate and print.", hint: "std::cout << std::accumulate(v.begin(), v.end(), 0);", expected_output: "Total Sum via std::accumulate: 100" },
          "Numeric algorithms parallel SIMD vectorization capabilities ke sath numbers crunch karte hain.",
          [
            { tag: "Numerics", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "std::accumulate", desc: "Fold/reduce operations across sequence ranges." }
          ],
          `<div class="theory-card"><h3>Reduction Pipeline</h3><p>Standard library reduction and aggregation utilities.</p></div>`
        ),
        makeLesson("test4-l-10-4", "test4-mod-10", 4, "Lesson 10.4: Custom Comparators & Struct Sorting Pipelines", 4, 25, "cpp",
`#include <iostream>
#include <vector>
#include <algorithm>

struct PlayerScore {
    std::string name;
    int score;
};

int main() {
    std::vector<PlayerScore> leaderboard = { {"Sam", 85}, {"Zara", 98}, {"Leo", 72} };

    std::sort(leaderboard.begin(), leaderboard.end(), [](const PlayerScore &a, const PlayerScore &b) {
        return a.score > b.score; // Higher score first
    });

    std::cout << "Leaderboard #1: " << leaderboard[0].name << " (" << leaderboard[0].score << " pts)" << std::endl;
    return 0;
}`,
          { task: "Sort leaderboard and print rank 1 player name.", hint: "Custom comparator test.", expected_output: "Leaderboard #1: Zara (98 pts)" },
          "Custom lambda comparators business domain structs ko arbitrary sorting metrics par order karne ki ability dete hain.",
          [
            { tag: "Comparators", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Strict Weak Ordering", desc: "Guarantees deterministic sorting order." }
          ],
          `<div class="theory-card"><h3>Custom Ordering</h3><p>Must satisfy strict weak ordering invariants.</p></div>`
        )
      ]
    },

    // Mod 11: 3 lessons
    {
      id: "test4-mod-11",
      course_id: "course-test-4-cpp",
      module_number: 11,
      title: "Module 11: Modern Memory Management & Smart Pointers",
      description: "std::unique_ptr (exclusive zero-cost ownership), std::shared_ptr (atomic reference count), and std::weak_ptr.",
      order_index: 11,
      lessons: [
        makeLesson("test4-l-11-1", "test4-mod-11", 1, "Lesson 11.1: std::unique_ptr & Exclusive Zero-Cost Ownership", 1, 25, "cpp",
`#include <iostream>
#include <memory>

class AudioEngine {
public:
    void playSound() { std::cout << "Playing sound effect..." << std::endl; }
    ~AudioEngine() { std::cout << "AudioEngine destroyed and heap freed automatically!" << std::endl; }
};

int main() {
    // std::make_unique provides exception-safe allocation with zero overhead
    std::unique_ptr<AudioEngine> audio = std::make_unique<AudioEngine>();
    audio->playSound();
    return 0; // Heap memory released automatically right here
}`,
          { task: "Create unique_ptr to AudioEngine and call playSound.", hint: "std::unique_ptr allocation.", expected_output: "Playing sound effect...\nAudioEngine destroyed and heap freed automatically!" },
          "std::unique_ptr exclusive single-owner ownership represent karta hai jisme raw pointer ke barabar 0-byte extra memory overhead hota hai.",
          [
            { tag: "Zero-Overhead", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "std::unique_ptr", desc: "Exclusive ownership with zero runtime memory penalty." }
          ],
          `<div class="theory-card"><h3>Smart Pointer Rule</h3><p>Always make unique_ptr your default choice for dynamically allocated objects.</p></div>`
        ),
        makeLesson("test4-l-11-2", "test4-mod-11", 2, "Lesson 11.2: std::shared_ptr & Atomic Reference Counting Control Block", 2, 25, "cpp",
`#include <iostream>
#include <memory>

class TextureResource {
public:
    std::string textureName;
    TextureResource(std::string name) : textureName(name) {}
    ~TextureResource() { std::cout << "Texture '" << textureName << "' unloaded from GPU memory." << std::endl; }
};

int main() {
    std::shared_ptr<TextureResource> tex1 = std::make_shared<TextureResource>("diffuse_map.png");
    {
        std::shared_ptr<TextureResource> tex2 = tex1; // Shared ownership, ref_count = 2
        std::cout << "Active Reference Count: " << tex1.use_count() << std::endl;
    } // tex2 goes out of scope, ref_count = 1
    std::cout << "Active Reference Count after inner scope: " << tex1.use_count() << std::endl;
    return 0;
}`,
          { task: "Check use_count() of shared_ptr.", hint: "shared_ptr reference count test.", expected_output: "Active Reference Count: 2\nActive Reference Count after inner scope: 1\nTexture 'diffuse_map.png' unloaded from GPU memory." },
          "std::shared_ptr multi-owner shared reference counting manage karta hai; jab count 0 hota hai tabhi resource destruct hota hai.",
          [
            { tag: "Shared Ownership", color: "rgba(16, 185, 129, 0.15); #10b981", title: "std::shared_ptr", desc: "Thread-safe atomic reference counting control block." }
          ],
          `<div class="theory-card"><h3>Control Block</h3><p>Allocated once via std::make_shared to minimize heap fragmentation.</p></div>`
        ),
        makeLesson("test4-l-11-3", "test4-mod-11", 3, "Lesson 11.3: std::weak_ptr & Breaking Circular Reference Memory Leaks", 3, 25, "cpp",
`#include <iostream>
#include <memory>

struct NodeB;
struct NodeA {
    std::shared_ptr<NodeB> b_ptr;
    ~NodeA() { std::cout << "NodeA destroyed safely." << std::endl; }
};

struct NodeB {
    std::weak_ptr<NodeA> a_weak; // Weak pointer breaks circular reference cycle!
    ~NodeB() { std::cout << "NodeB destroyed safely." << std::endl; }
};

int main() {
    auto a = std::make_shared<NodeA>();
    auto b = std::make_shared<NodeB>();
    a->b_ptr = b;
    b->a_weak = a; // Non-owning reference
    std::cout << "Circular graph constructed with weak_ptr guard." << std::endl;
    return 0;
}`,
          { task: "Observe clean destruction of cyclic nodes with weak_ptr.", hint: "std::weak_ptr test.", expected_output: "Circular graph constructed with weak_ptr guard.\nNodeA destroyed safely.\nNodeB destroyed safely." },
          "std::weak_ptr non-owning reference hold karta hai bina reference count increment kiye, circular reference memory leaks ko permanently solve karta hai.",
          [
            { tag: "Cycle Prevention", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "std::weak_ptr", desc: "Non-owning observer breaking shared_ptr cycles." }
          ],
          `<div class="theory-card"><h3>Cyclic Graph Safety</h3><p>Essential for DOM trees, scene graphs, and observer patterns.</p></div>`
        )
      ]
    },

    // Mod 12: 2 lessons
    {
      id: "test4-mod-12",
      course_id: "course-test-4-cpp",
      module_number: 12,
      title: "Module 12: Capstone Project — High-Performance Game Engine & Inventory",
      description: "Building a high-performance Entity Component System (ECS) game engine with RAII inventory management and move semantics.",
      order_index: 12,
      lessons: [
        makeLesson("test4-l-12-1", "test4-mod-12", 1, "Lesson 12.1: Game Engine ECS Architecture & Memory Management", 1, 25, "cpp",
`#include <iostream>
#include <vector>
#include <memory>

struct TransformComponent { float x, y, z; };
struct HealthComponent { int hp; int maxHp; };

class GameObject {
public:
    std::string name;
    TransformComponent transform{0, 0, 0};
    HealthComponent health{100, 100};

    GameObject(std::string n) : name(n) {}
};

int main() {
    GameObject player("Hero_Player");
    std::cout << "Entity: " << player.name << " initialized at (" << player.transform.x << ", " << player.transform.y << ")" << std::endl;
    return 0;
}`,
          { task: "Initialize GameObject and verify transform.", hint: "GameObject ECS test.", expected_output: "Entity: Hero_Player initialized at (0, 0)" },
          "ECS (Entity Component System) game development standard hai jaha entities simple IDs hoti hain aur data components contiguous memory buffers mein process hote hain.",
          [
            { tag: "Game Engine", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "ECS Paradigm", desc: "Cache-friendly data-oriented game architecture." }
          ],
          `<div class="theory-card"><h3>Data-Oriented Design</h3><p>Maximizes CPU cache throughput in rendering loops.</p></div>`
        ),
        makeLesson("test4-l-12-2", "test4-mod-12", 2, "Lesson 12.2: Complete Capstone Showcase — High-Performance Inventory Engine", 2, 30, "cpp",
`#include <iostream>
#include <vector>
#include <memory>

class InventorySystem {
private:
    std::vector<std::string> items;
public:
    void addItem(std::string item) {
        items.push_back(std::move(item)); // Zero-copy move
    }
    void render() const {
        std::cout << "=== PLAYER INVENTORY ===" << std::endl;
        for (const auto &item : items) {
            std::cout << "[ITEM] " << item << std::endl;
        }
    }
};

int main() {
    InventorySystem inv;
    inv.addItem("Excalibur Sword");
    inv.addItem("Mana Potion");
    inv.render();
    std::cout << "C++20 Game Engine & Inventory Architecture 100% Operational!" << std::endl;
    return 0;
}`,
          { task: "Execute complete C++ capstone showcase.", hint: "Run inventory system render.", expected_output: "=== PLAYER INVENTORY ===\n[ITEM] Excalibur Sword\n[ITEM] Mana Potion\nC++20 Game Engine & Inventory Architecture 100% Operational!" },
          "Mubarak ho! Aapne zero-cost abstractions, RAII, templates, move semantics (&&), STL algorithms, smart pointers aur complete game engine architecture master kar liya hai!",
          [
            { tag: "C++ Master", color: "rgba(16, 185, 129, 0.15); #10b981", title: "C++ Architect", desc: "Production-grade modern C++ systems engineering readiness achieved." }
          ],
          `<div class="theory-card"><h3>Mastery Achievement</h3><p>Elite C++ systems engineering skills unlocked!</p></div>`
        )
      ]
    }
  ]
};

fs.writeFileSync('Courses/test-4.json', JSON.stringify(cppCourse, null, 2));
console.log("✅ Course 4 (C++) fully built with pure, unique C++ content!");
