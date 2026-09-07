import fs from 'fs';
import path from 'path';

export const cppCourse = {
  id: "course-test-4-cpp",
  title: "Mastering Modern C++ & Object-Oriented Architecture (Hinglish)",
  subtitle: "Fast, Powerful & Modern — Memory Mechanics, OOP Pillars, STL Containers & Smart Pointers",
  description: "Modern C++ (C++11 se C++20 tak) ka sabse comprehensive aur practical course Hinglish mein! Object-Oriented Programming (Classes, Objects, Inheritance, Polymorphism), STL Containers (Vector, Map, Set), Memory Management, Smart Pointers, Templates aur Game Engine architecture ko zero se advanced level tak seekhein.",
  category: "Technology",
  difficulty: "Intermediate",
  thumbnail_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
  is_premium: false,
  total_modules: 12,
  estimated_hours: 45,
  created_at: "2026-03-01T00:00:00Z",
  modules: [
    {
      id: "test4-mod-1",
      course_id: "course-test-4-cpp",
      module_number: 1,
      title: "Module 1: C++ Foundations & Modern Syntax Enhancements",
      description: "C++ ki shuruat, Streams (cin/cout), Namespaces, References (&), auto keyword, aur range-based for loops.",
      order_index: 1,
      lessons: [
        {
          id: "test4-l-1-1",
          module_id: "test4-mod-1",
          lesson_number: 1,
          title: "Lesson 1.1: C++ Introduction, Streams & Namespaces",
          order_index: 1,
          duration_minutes: 20,
          content_type: "text",
          starter_code: `#include <iostream>

int main() {
    std::cout << "Namaste C++ World! 🚀" << std::endl;
    std::cout << "C++ mein high performance + high-level OOP dono milta hai." << std::endl;
    return 0;
}`,
          sandbox_language: "cpp",
          challenge: {
            task: "Ek program likhein jo pehli line par 'Modern C++ Masterclass' aur doosri line par 'Fast & Efficient' print kare.",
            hint: "std::cout << \"Modern C++ Masterclass\\n\"; ke baad doosra cout use karein.",
            expected_output: "Modern C++ Masterclass\nFast & Efficient"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">⚡</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>C++ = C with Superpowers + Classes + Type Safety!</strong> Bjarne Stroustrup ne C++ ko banaya taaki developers ko C ki blazing-fast speed mile, aur saath mein large applications organize karne ke liye Object-Oriented tools aur STL mil sake.</p>
  </div>
</div>

<div class="pipeline-flow">
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#e0f2fe; color:#0369a1;">Feature 01</span>
    <div class="pipeline-title">📤 std::cout & std::cin</div>
    <p class="pipeline-desc">Type-safe stream operators (<code>&lt;&lt;</code> insertion aur <code>&gt;&gt;</code> extraction) jo automatically data type detect karte hain.</p>
  </div>
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#fef3c7; color:#b45309;">Feature 02</span>
    <div class="pipeline-title">🏷️ Namespaces</div>
    <p class="pipeline-desc">Name collision se bachne ke liye scope containers. <code>std::</code> standard C++ library ka global namespace hai.</p>
  </div>
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#ede9fe; color:#6d28d9;">Feature 03</span>
    <div class="pipeline-title">🚀 Zero-Cost Abstractions</div>
    <p class="pipeline-desc">C++ ka golden rule: Jis feature ka aap use nahi karte, uski performance cost aapko pay nahi karni padti.</p>
  </div>
</div>

<div class="code-editor">
  <div class="code-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="filename">main.cpp</span>
  </div>
  <pre><code><span class="kw">#include</span> <span class="str">&lt;iostream&gt;</span>
<span class="kw">using namespace</span> <span class="var">std</span>;

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="var">string</span> <span class="var">name</span> = <span class="str">"Sourav"</span>;
    <span class="kw">int</span> <span class="var">level</span> = <span class="num">99</span>;

    <span class="var">cout</span> &lt;&lt; <span class="str">"Player: "</span> &lt;&lt; <span class="var">name</span> &lt;&lt; <span class="str">" | Level: "</span> &lt;&lt; <span class="var">level</span> &lt;&lt; <span class="var">endl</span>;
    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre>
</div>
<p class="caption">Figure 1.1: C++ Standard I/O using iostream & stream insertion operator.</p>

<div class="pitfall-box">
  <div class="pitfall-title">⚠️ using namespace std; in Header Files</div>
  <p>Practice programs mein <code>using namespace std;</code> theek hai, lekin large production code ya header files mein ise avoid karein taaki namespace pollution aur name collision na ho.</p>
</div>

<div class="pro-tip">
  <div class="pro-tip-title">💡 Pro-Tip: '\n' vs std::endl</div>
  <p><code>std::endl</code> output print karne ke baad I/O buffer ko forcefully <strong>flush</strong> karta hai, jo thoda slow ho sakta hai. High-speed competitive programming mein <code>\n</code> use karna zyada fast hota hai.</p>
</div>`
        },
        {
          id: "test4-l-1-2",
          module_id: "test4-mod-1",
          lesson_number: 2,
          title: "Lesson 1.2: References (&) vs Pointers & auto Keyword",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <iostream>

void doubleValue(int &ref) {
    ref = ref * 2; // Original variable seedhe modify ho jayega!
}

int main() {
    int score = 50;
    std::cout << "Pehle Score: " << score << std::endl;
    
    doubleValue(score);
    std::cout << "Double hone ke baad Score: " << score << std::endl;
    
    auto language = "Modern C++";
    std::cout << "Auto detected language: " << language << std::endl;
    return 0;
}`,
          sandbox_language: "cpp",
          challenge: {
            task: "Ek function swapValues(int &a, int &b) banayein jo reference ka use karke do integers ki values swap kare.",
            hint: "int temp = a; a = b; b = temp; reference ki wajah se original values swap ho jayengi.",
            expected_output: "Pehle: 10 20\nBaad mein: 20 10"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔗</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Reference ek existing variable ka doosra naam (Alias) hota hai!</strong> Pointer memory address store karta hai jise <code>*</code> se dereference karna padta hai, lekin Reference direct usi memory cell par point karta hai bina kisi extra pointer syntax ke.</p>
  </div>
</div>

<div class="pipeline-flow">
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#e0f2fe; color:#0369a1;">Concept 01</span>
    <div class="pipeline-title">📌 Reference (int &ref)</div>
    <p class="pipeline-desc">Hamesha initialize hona zaroori hai, kabhi NULL nahi ho sakta, aur re-assign nahi kiya ja sakta.</p>
  </div>
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#fef3c7; color:#b45309;">Concept 02</span>
    <div class="pipeline-title">✨ auto Type Inference</div>
    <p class="pipeline-desc">C++11 mein aaya auto keyword compiler ko variable ka type automatically right-side expression se derive karne deta hai.</p>
  </div>
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#dcfce7; color:#15803d;">Concept 03</span>
    <div class="pipeline-title">🔁 Range-based For Loop</div>
    <p class="pipeline-desc"><code>for(auto x : collection)</code> bina indices ke elements par iterate karne ka safe tareeka deta hai.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-cpp-1-1",
            question: "C++ mein 'std::endl' aur '\\n' mein primary technical farak kya hai?",
            options: [
              "Dono mein koi farak nahi hai",
              "std::endl new line add karne ke saath output stream buffer ko flush karta hai",
              "\\n sirf numbers ke liye kaam karta hai",
              "std::endl program ko terminate karta hai"
            ],
            correct_index: 1,
            explanation: "std::endl new line add karne ke baad OS output buffer ko forcefully flush karta hai, jabki \\n sirf newline character print karta hai."
          },
          {
            id: "q-cpp-1-2",
            question: "C++ Reference (&) ke baare mein kaunsa statement SAHI hai?",
            options: [
              "Reference ko NULL initialize kiya ja sakta hai",
              "Reference declare karte waqt initialise hona zaroori hai aur ye kisi existing variable ka alias hota hai",
              "Reference ko baad mein kisi doosre variable par re-bind kiya ja sakta hai",
              "Reference hamesha 8 bytes extra heap memory leta hai"
            ],
            correct_index: 1,
            explanation: "Reference ek alias hota hai jo declaration ke time hi bind hona zaroori hai aur kabhi NULL nahi ho sakta."
          },
          {
            id: "q-cpp-1-3",
            question: "Modern C++ (C++11) mein 'auto' keyword ka primary kaam kya hai?",
            options: [
              "Variable ko automatically delete karna",
              "Variable ka data type uski initial assigned value se automatically deduce (infer) karna",
              "Variables ko dynamic memory (Heap) mein allocate karna",
              "Function ko fast execute karna"
            ],
            correct_index: 1,
            explanation: "auto keyword compiler ko bolta hai ki variable ka type initialize hone wali value se compile-time par determine kare."
          },
          {
            id: "q-cpp-1-4",
            question: "Agar kisi function mein parameter 'const string &str' pass kiya jaye, toh iska kya faayda hai?",
            options: [
              "String ka naya copy banega jo fast hota hai",
              "String bina copy hue (zero-overhead) pass hogi aur function usme koi modification nahi kar sakta (read-only)",
              "Ye program ko crash kar dega",
              "Ye string ko number mein convert karega"
            ],
            correct_index: 1,
            explanation: "const reference pass karne se memory copy ka overhead bach jata hai aur const ensure karta hai ki data accidentally modify na ho."
          },
          {
            id: "q-cpp-1-5",
            question: "C++ kis programming paradigm ko support karta hai?",
            options: [
              "Sirf Pure Object Oriented",
              "Sirf Procedural (like C)",
              "Multi-paradigm (Procedural, Object-Oriented, Generic, Functional)",
              "Sirf Assembly scripting"
            ],
            correct_index: 2,
            explanation: "C++ ek multi-paradigm language hai jo Procedural, OOP, Generic (Templates), aur Functional styles sabhi ko seamlessly support karti hai."
          }
        ]
      }
    },
    {
      id: "test4-mod-2",
      course_id: "course-test-4-cpp",
      module_number: 2,
      title: "Module 2: Object-Oriented Programming (Classes & Objects)",
      description: "Classes, Objects, Access Specifiers (public, private, protected), Constructors, Destructors aur 'this' pointer.",
      order_index: 2,
      lessons: [
        {
          id: "test4-l-2-1",
          module_id: "test4-mod-2",
          lesson_number: 1,
          title: "Lesson 2.1: Classes, Access Specifiers & Constructors",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <iostream>
#include <string>

class BankAccount {
private:
    std::string accountNumber;
    double balance;

public:
    // Parameterized Constructor
    BankAccount(std::string accNum, double initialBal) {
        accountNumber = accNum;
        balance = initialBal;
    }

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            std::cout << "Deposited: ₹" << amount << " | New Balance: ₹" << balance << std::endl;
        }
    }

    void display() {
        std::cout << "Account: " << accountNumber << " | Balance: ₹" << balance << std::endl;
    }
};

int main() {
    BankAccount myAcc("SBIN001928", 15000.0);
    myAcc.display();
    myAcc.deposit(5000.0);
    return 0;
}`,
          sandbox_language: "cpp",
          challenge: {
            task: "Ek Student class banayein jisme private 'name' aur 'rollNo' ho, aur public constructor aur display() method ho.",
            hint: "class Student { private: string name; int roll; public: Student(string n, int r): name(n), roll(r) {} void display() { ... } };",
            expected_output: "Student: Rahul | Roll: 101"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🏛️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Class ek Blueprint hai, aur Object us blueprint se bana Real-World Ghar hai!</strong> C++ mein Class ke andar data (attributes) aur functions (methods) ek saath encapsulated rehte hain, jisse unauthorized data access prevent hota hai.</p>
  </div>
</div>

<div class="pipeline-flow">
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#fee2e2; color:#b91c1c;">private</span>
    <div class="pipeline-title">🔒 Private Members</div>
    <p class="pipeline-desc">Sirf class ke apne member functions access kar sakte hain. Bahar se direct access blocked hota hai.</p>
  </div>
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#dcfce7; color:#15803d;">public</span>
    <div class="pipeline-title">🌍 Public Members</div>
    <p class="pipeline-desc">Program ka koi bhi part (jaise <code>main()</code>) in methods ya variables ko directly call kar sakta hai.</p>
  </div>
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#fef3c7; color:#b45309;">Constructor</span>
    <div class="pipeline-title">🏗️ Auto-Initializer</div>
    <p class="pipeline-desc">Jaise hi object banta hai, constructor automatically execute hokar initial state set karta hai.</p>
  </div>
</div>`
        },
        {
          id: "test4-l-2-2",
          module_id: "test4-mod-2",
          lesson_number: 2,
          title: "Lesson 2.2: Destructors, 'this' Pointer & RAII Foundation",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <iostream>

class ResourceHolder {
private:
    std::string resourceName;

public:
    ResourceHolder(std::string name) : resourceName(name) {
        std::cout << "[Resource Acquired]: " << resourceName << std::endl;
    }

    ~ResourceHolder() {
        // Jab object scope se bahar jata hai, destructor auto-run hota hai
        std::cout << "[Resource Released Cleanly]: " << resourceName << std::endl;
    }

    void use() {
        std::cout << "Using resource: " << this->resourceName << std::endl;
    }
};

int main() {
    std::cout << "Main scope start" << std::endl;
    {
        ResourceHolder file("Database_Connection_Pool");
        file.use();
    } // Block end hote hi Destructor automatically run hoga!
    std::cout << "Main scope end" << std::endl;
    return 0;
}`,
          sandbox_language: "cpp",
          challenge: {
            task: "Ek class banayein jo creation par 'Connected' aur destruction (~Destructor) par 'Disconnected' print kare.",
            hint: "~MyClass() { std::cout << \"Disconnected\\n\"; }",
            expected_output: "Connected\nDisconnected"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🧹</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>RAII (Resource Acquisition Is Initialization) C++ ka sabse powerful concept hai!</strong> Destructor (<code>~ClassName()</code>) ek aisi safety net hai jo object ke out-of-scope hote hi memory, file handles, aur network sockets ko bina kisi memory leak ke automatically clean kar deta hai.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-cpp-2-1",
            question: "C++ class mein agar koi access specifier specify na kiya jaye, toh default access level kya hota hai?",
            options: ["public", "private", "protected", "global"],
            correct_index: 1,
            explanation: "C++ class ke saare members by default private hote hain (jabki 'struct' mein by default public hote hain)."
          },
          {
            id: "q-cpp-2-2",
            question: "Destructor (e.g. ~MyClass()) kab call hota hai?",
            options: [
              "Jab object create hota hai",
              "Jab object scope se bahar chala jata hai ya delete kiya jata hai",
              "Sirf jab user explicitly ~MyClass() likhe",
              "Sirf compiler error aane par"
            ],
            correct_index: 1,
            explanation: "Destructor automatically call hota hai jab object scope se bahar exit hota hai ya dynamically allocated object ko delete kiya jata hai."
          },
          {
            id: "q-cpp-2-3",
            question: "'this' pointer ka C++ member functions mein kya matlab hota hai?",
            options: [
              "Ye next class ka pointer hota hai",
              "Ye current calling object ka memory address hold karta hai (Pointer to current instance)",
              "Ye global memory address hota hai",
              "Ye operating system kernel ka reference hota hai"
            ],
            correct_index: 1,
            explanation: "'this' pointer implicit pointer hota hai jo us specific object ke address ko point karta hai jisne function ko call kiya hai."
          },
          {
            id: "q-cpp-2-4",
            question: "Constructor ka return type kya hota hai?",
            options: ["void", "int", "Class name", "Constructor ka koi return type nahi hota (not even void)"],
            correct_index: 3,
            explanation: "Constructor ka koi return type nahi hota, yahan tak ki 'void' bhi nahi."
          },
          {
            id: "q-cpp-2-5",
            question: "Constructor Member Initializer List (e.g. `MyClass(int a): x(a) {}`) use karne ka primary advantage kya hai?",
            options: [
              "Ye syntax error avoid karta hai",
              "Ye members ko direct initialize karta hai (default construction + assignment ka extra overhead bachta hai)",
              "Ye code ko private bana deta hai",
              "Ye compiler ko disable kar deta hai"
            ],
            correct_index: 1,
            explanation: "Initializer list direct initialization karti hai jo performance-wise faster hoti hai aur const/reference members ke liye mandatory hoti hai."
          }
        ]
      }
    },
    {
      id: "test4-mod-3",
      course_id: "course-test-4-cpp",
      module_number: 3,
      title: "Module 3: Inheritance, Polymorphism & Virtual Functions",
      description: "Code reusability, Base & Derived classes, Function Overriding, Virtual Functions, vtable mechanics aur Abstract Classes.",
      order_index: 3,
      lessons: [
        {
          id: "test4-l-3-1",
          module_id: "test4-mod-3",
          lesson_number: 1,
          title: "Lesson 3.1: Inheritance Pillars & Base-Derived Mechanics",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <iostream>
#include <string>

// Base Class
class Vehicle {
protected:
    std::string brand;
    int maxSpeed;

public:
    Vehicle(std::string b, int speed) : brand(b), maxSpeed(speed) {}
    
    void honk() {
        std::cout << brand << " is honking: Beep Beep! 🚗" << std::endl;
    }
};

// Derived Class
class ElectricCar : public Vehicle {
private:
    int batteryCapacity;

public:
    ElectricCar(std::string b, int speed, int battery) 
        : Vehicle(b, speed), batteryCapacity(battery) {}

    void displayStatus() {
        std::cout << "EV Brand: " << brand << " | Speed: " << maxSpeed 
                  << "km/h | Battery: " << batteryCapacity << "kWh" << std::endl;
    }
};

int main() {
    ElectricCar myTesla("Tesla Model S", 250, 100);
    myTesla.honk();
    myTesla.displayStatus();
    return 0;
}`,
          sandbox_language: "cpp",
          challenge: {
            task: "Ek Employee base class banayein aur Developer derived class banayein jo 'name' aur 'programmingLanguage' print kare.",
            hint: "class Developer : public Employee { ... };",
            expected_output: "Dev Name: Amit | Language: C++"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🧬</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Inheritance = Code Reusability & Real-world Hierarchy!</strong> Child class (Derived class) parent class (Base class) ke features ko automatically inherit karti hai aur apna custom logic add kar sakti hai.</p>
  </div>
</div>`
        },
        {
          id: "test4-l-3-2",
          module_id: "test4-mod-3",
          lesson_number: 2,
          title: "Lesson 3.2: Runtime Polymorphism, Virtual Functions & Pure Virtual",
          order_index: 2,
          duration_minutes: 30,
          content_type: "text",
          starter_code: `#include <iostream>

// Abstract Base Class
class Shape {
public:
    // Pure virtual function
    virtual void draw() = 0; 
    virtual double area() = 0;
    virtual ~Shape() {} // Virtual Destructor is critical!
};

class Circle : public Shape {
private:
    double radius;
public:
    Circle(double r) : radius(r) {}
    void draw() override { std::cout << "Drawing Circle 🔴" << std::endl; }
    double area() override { return 3.14159 * radius * radius; }
};

class Rectangle : public Shape {
private:
    double w, h;
public:
    Rectangle(double width, double height) : w(width), h(height) {}
    void draw() override { std::cout << "Drawing Rectangle 🟦" << std::endl; }
    double area() override { return w * h; }
};

int main() {
    Shape* s1 = new Circle(5.0);
    Shape* s2 = new Rectangle(4.0, 6.0);

    s1->draw();
    std::cout << "Circle Area: " << s1->area() << std::endl;

    s2->draw();
    std::cout << "Rectangle Area: " << s2->area() << std::endl;

    delete s1;
    delete s2;
    return 0;
}`,
          sandbox_language: "cpp",
          challenge: {
            task: "Ek PaymentMethod abstract class banayein jisme pure virtual function 'pay(double amt)' ho aur UpiPayment class implement kare.",
            hint: "class PaymentMethod { public: virtual void pay(double amt) = 0; };",
            expected_output: "Paid ₹500 via UPI"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🎭</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Polymorphism = One Interface, Multiple Behaviors!</strong> C++ runtime polymorphism <code>virtual</code> keyword aur <strong>vtable (Virtual Method Table)</strong> ke zariye kaam karta hai, jisse Base pointer exact child class ka method runtime par execute karta hai.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-cpp-3-1",
            question: "C++ mein 'virtual' keyword function ke aage lagane se kya hota hai?",
            options: [
              "Function private ban jata hai",
              "Runtime Polymorphism (Dynamic Dispatch) enable hota hai via vtable",
              "Function compile time par gayab ho jata hai",
              "Function memory release nahi karta"
            ],
            correct_index: 1,
            explanation: "virtual functions dynamic dispatch allow karte hain taaki base class pointer call hone par actual child object ka method execute ho."
          },
          {
            id: "q-cpp-3-2",
            question: "Pure Virtual Function kaise declare kiya jata hai?",
            options: [
              "virtual void func() = 0;",
              "pure void func();",
              "virtual void func() = null;",
              "abstract void func();"
            ],
            correct_index: 0,
            explanation: "C++ mein pure virtual function syntax 'virtual returnType funcName() = 0;' hota hai."
          },
          {
            id: "q-cpp-3-3",
            question: "Jis class mein kam se kam ek pure virtual function ho, use kya kehte hain?",
            options: ["Final Class", "Abstract Class", "Static Class", "Singleton Class"],
            correct_index: 1,
            explanation: "Abstract Class ka direct object instantiate nahi kiya ja sakta; child class ko methods implement karne padte hain."
          },
          {
            id: "q-cpp-3-4",
            question: "Polymorphic Base Class ka Destructor hamesha 'virtual' kyu hona chahiye?",
            options: [
              "Compilation fast karne ke liye",
              "Taaki base pointer se 'delete' call hone par derived class ka destructor bhi properly execute ho aur memory leak na ho",
              "Syntax requirement hoti hai",
              "Taaki class copy ho sake"
            ],
            correct_index: 1,
            explanation: "Virtual destructor ensure karta hai ki derived class ki allocated memory bhi clean ho jab base pointer se delete kiya jaye."
          },
          {
            id: "q-cpp-3-5",
            question: "C++11 mein 'override' specifier ka kya benefit hai?",
            options: [
              "Ye function ko automatically optimize karta hai",
              "Ye compile-time check karta hai ki function sach mein base class ke virtual function ko override kar raha hai ya typo hai",
              "Ye function ko override hone se block karta hai",
              "Ye static methods ke liye mandatory hota hai"
            ],
            correct_index: 1,
            explanation: "'override' keyword compiler ko signature match verify karne bolta hai, jisse subtle signature mismatch bugs pakde jate hain."
          }
        ]
      }
    },
    {
      id: "test4-mod-4",
      course_id: "course-test-4-cpp",
      module_number: 4,
      title: "Module 4: Standard Template Library (STL) — Containers & Iterators",
      description: "std::vector, std::list, std::map, std::unordered_map, std::set, pair, iterators aur algorithm operations.",
      order_index: 4,
      lessons: [
        {
          id: "test4-l-4-1",
          module_id: "test4-mod-4",
          lesson_number: 1,
          title: "Lesson 4.1: Dynamic Arrays with std::vector & Iterators",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {45, 12, 89, 23, 7};

    // Naya element add karein
    numbers.push_back(99);

    std::cout << "Vector size: " << numbers.size() << std::endl;

    // Sort karein
    std::sort(numbers.begin(), numbers.end());

    std::cout << "Sorted elements: ";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;

    return 0;
}`,
          sandbox_language: "cpp",
          challenge: {
            task: "Ek vector mein 5 numbers dalein, push_back se ek aur number jodein aur unka sum calculate karke print karein.",
            hint: "int sum = 0; for (int x : vec) sum += x; cout << \"Total: \" << sum;",
            expected_output: "Total Sum: 150"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📦</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>std::vector C++ ka most-used contiguous dynamic array hai!</strong> Normal C-array fixed size ka hota hai, lekin vector automatically memory resize karta hai jab naye elements add hote hain (Amortized O(1) push_back).</p>
  </div>
</div>`
        },
        {
          id: "test4-l-4-2",
          module_id: "test4-mod-4",
          lesson_number: 2,
          title: "Lesson 4.2: Associative Containers — std::map & std::unordered_map",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <iostream>
#include <string>
#include <unordered_map>

int main() {
    // Key-Value Hash Map (O(1) Average Lookup)
    std::unordered_map<std::string, double> productPrices;

    productPrices["MacBook Pro"] = 199990.00;
    productPrices["Wireless Mouse"] = 1499.00;
    productPrices["Mechanical Keyboard"] = 4999.00;

    std::string searchItem = "Wireless Mouse";
    if (productPrices.find(searchItem) != productPrices.end()) {
        std::cout << searchItem << " ki price: ₹" << productPrices[searchItem] << std::endl;
    }

    std::cout << "\nSaare Products:" << std::endl;
    for (const auto &pair : productPrices) {
        std::cout << "• " << pair.first << " -> ₹" << pair.second << std::endl;
    }

    return 0;
}`,
          sandbox_language: "cpp",
          challenge: {
            task: "Ek unordered_map banayein jo student name ko uske marks se map kare aur kisi specific student ke marks print kare.",
            hint: "unordered_map<string, int> marks; marks[\"Pooja\"] = 95;",
            expected_output: "Pooja Marks: 95"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🗺️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>std::map = Red-Black Balanced BST (Sorted, O(log N))</strong> aur <strong>std::unordered_map = Hash Table (Unordered, O(1) Instant lookup)!</strong> Real-world database indexing aur caching systems inhi par built hote hain.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-cpp-4-1",
            question: "std::vector mein push_back() operation ki amortized time complexity kya hoti hai?",
            options: ["O(N)", "O(1)", "O(log N)", "O(N^2)"],
            correct_index: 1,
            explanation: "std::vector capacity double karta hai jab full hota hai, isliye amortized push_back cost O(1) constant time hoti hai."
          },
          {
            id: "q-cpp-4-2",
            question: "std::map aur std::unordered_map mein internal implementation ka kya farak hai?",
            options: [
              "std::map hash table use karta hai jabki unordered_map array use karta hai",
              "std::map Self-Balancing Red-Black Tree (O(log N)) use karta hai aur sorted rehta hai; unordered_map Hash Table (O(1)) use karta hai",
              "Dono exact same hote hain",
              "std::map sirf strings store kar sakta hai"
            ],
            correct_index: 1,
            explanation: "std::map internally Red-Black Tree se sorted data store karta hai, jabki std::unordered_map hashing se O(1) average access deta hai."
          },
          {
            id: "q-cpp-4-3",
            question: "STL algorithm 'std::sort()' ki average time complexity kya hoti hai?",
            options: ["O(N)", "O(N log N)", "O(N^2)", "O(log N)"],
            correct_index: 1,
            explanation: "std::sort IntroSort (QuickSort + HeapSort + InsertionSort) use karta hai jiski worst aur average complexity O(N log N) hoti hai."
          },
          {
            id: "q-cpp-4-4",
            question: "Vector ka contiguous memory hona CPU cache ke liye kyu bohot beneficial hai?",
            options: [
              "Ye compilation error reduce karta hai",
              "CPU spatial locality ka benefit utha pata hai jisse Cache Hits maximum hote hain aur speed superfast milti hai",
              "Ye RAM ko compress karta hai",
              "Ye pointers ko block karta hai"
            ],
            correct_index: 1,
            explanation: "Contiguous elements RAM mein ek sath hote hain, jisse CPU hardware prefetcher data ko L1/L2/L3 cache mein instantly load kar leta hai."
          },
          {
            id: "q-cpp-4-5",
            question: "std::set container ki specialty kya hai?",
            options: [
              "Ye duplicate elements store karta hai",
              "Ye hamesha unique sorted elements store karta hai",
              "Ye sirf single character leta hai",
              "Ye FIFO queue ki tarah kaam karta hai"
            ],
            correct_index: 1,
            explanation: "std::set hamesha unique elements store karta hai aur automatically sorted order maintain karta hai."
          }
        ]
      }
    },
    {
      id: "test4-mod-5",
      course_id: "course-test-4-cpp",
      module_number: 5,
      title: "Module 5: Modern Memory Management & Smart Pointers",
      description: "Raw Pointers ki problems, Memory Leaks, std::unique_ptr, std::shared_ptr, std::weak_ptr aur Modern C++ RAII.",
      order_index: 5,
      lessons: [
        {
          id: "test4-l-5-1",
          module_id: "test4-mod-5",
          lesson_number: 1,
          title: "Lesson 5.1: std::unique_ptr & Exclusive Ownership",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <iostream>
#include <memory>

class Player {
public:
    Player() { std::cout << "Player Spawned in Game 🎮" << std::endl; }
    ~Player() { std::cout << "Player Destroyed & Memory Freed 💥" << std::endl; }
    void attack() { std::cout << "Player attacked: 50 Damage!" << std::endl; }
};

int main() {
    std::cout << "--- Smart Pointer Scope Start ---" << std::endl;
    {
        // std::make_unique safe aur efficient memory allocate karta hai
        std::unique_ptr<Player> p1 = std::make_unique<Player>();
        p1->attack();
        // Kisi 'delete' keyword ki zaroorat nahi hai!
    }
    std::cout << "--- Smart Pointer Scope End ---" << std::endl;
    return 0;
}`,
          sandbox_language: "cpp",
          challenge: {
            task: "std::make_unique ka use karke ek dynamic integer array ya object allocate karein aur value print karein.",
            hint: "auto ptr = std::make_unique<int>(100); cout << *ptr;",
            expected_output: "Pointer Value: 100"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🛡️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Smart Pointers = Zero Memory Leaks!</strong> Modern C++ mein manual <code>new</code> aur <code>delete</code> use karna banned practice maani jaati hai. <code>std::unique_ptr</code> object ka sole owner hota hai aur scope khatam hote hi memory clean kar deta hai.</p>
  </div>
</div>`
        },
        {
          id: "test4-l-5-2",
          module_id: "test4-mod-5",
          lesson_number: 2,
          title: "Lesson 5.2: std::shared_ptr & Reference Counting",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <iostream>
#include <memory>

class Texture {
public:
    Texture() { std::cout << "GPU Texture Loaded 🖼️" << std::endl; }
    ~Texture() { std::cout << "GPU Texture Unloaded from VRAM 🗑️" << std::endl; }
};

int main() {
    std::shared_ptr<Texture> tex1 = std::make_shared<Texture>();
    std::cout << "Reference Count: " << tex1.use_count() << std::endl;

    {
        std::shared_ptr<Texture> tex2 = tex1; // Ownership shared!
        std::cout << "Reference Count (Inside inner block): " << tex1.use_count() << std::endl;
    } // tex2 out of scope, count decrements by 1

    std::cout << "Reference Count (After inner block): " << tex1.use_count() << std::endl;
    return 0;
} // Last owner (tex1) out of scope -> Texture destroyed!`,
          sandbox_language: "cpp",
          challenge: {
            task: "Do shared_ptr banayein jo same resource share karein aur use_count() print karein.",
            hint: "auto p1 = make_shared<int>(42); auto p2 = p1; cout << p1.use_count();",
            expected_output: "Active Owners: 2"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">👥</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>std::shared_ptr Reference Counting use karta hai!</strong> Jab multiple objects ko same resource ki need hoti hai (jaise game texture ya audio file), shared_ptr track karta hai ki kitne active owners hain. Jab last owner khatam hota hai (count = 0), tab resource delete hota hai.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-cpp-5-1",
            question: "std::unique_ptr ke baare mein kaunsa statement SAHI hai?",
            options: [
              "Ise freely copy kiya ja sakta hai",
              "Iska sirf ek exclusive owner ho sakta hai; copy disallowed hoti hai lekin move (std::move) kiya ja sakta hai",
              "Ise delete karne ke liye manually 'delete ptr' likhna padta hai",
              "Ye multi-threading mein memory leak karta hai"
            ],
            correct_index: 1,
            explanation: "std::unique_ptr exclusive ownership enforce karta hai isliye copy constructor deleted hota hai, sirf move semantics allowed hoti hai."
          },
          {
            id: "q-cpp-5-2",
            question: "std::shared_ptr resource ko kab delete karta hai?",
            options: [
              "Jab pehla pointer delete hota hai",
              "Jab internal reference count 0 ho jata hai (koi bhi active owner nahi bachta)",
              "Har 5 seconds mein",
              "Sirf program close hone par"
            ],
            correct_index: 1,
            explanation: "shared_ptr reference count maintain karta hai aur jaise hi last owner out of scope hota hai (use_count() == 0), resource delete hota hai."
          },
          {
            id: "q-cpp-5-3",
            question: "Cyclic reference (circular dependency) se shared_ptr mein memory leak hone se bachane ke liye kya use karte hain?",
            options: ["std::raw_ptr", "std::weak_ptr", "std::auto_ptr", "std::danger_ptr"],
            correct_index: 1,
            explanation: "std::weak_ptr non-owning reference provide karta hai jo reference count ko increment nahi karta, jisse circular dependency leak solve hoti hai."
          },
          {
            id: "q-cpp-5-4",
            question: "Smart pointer create karne ke liye 'new' ke muqable 'std::make_unique' / 'std::make_shared' use karna kyu recommended hai?",
            options: [
              "Single memory allocation hoti hai (cache-friendly) aur exception safety milti hai",
              "Ye program ka size kam karta hai",
              "Ye C language code banata hai",
              "Ye pointers ko numbers mein convert karta hai"
            ],
            correct_index: 0,
            explanation: "make_shared control block aur object ko single memory chunk mein allocate karta hai jo fast aur exception-safe hota hai."
          },
          {
            id: "q-cpp-5-5",
            question: "RAII ka full form kya hai?",
            options: [
              "Resource Acquisition Is Initialization",
              "Rapid Array Iteration Interface",
              "Random Access Instruction Index",
              "Runtime Application Instance Identifier"
            ],
            correct_index: 0,
            explanation: "RAII = Resource Acquisition Is Initialization (Resource lifecycle object lifetime se tied hoti hai)."
          }
        ]
      }
    },
    {
      id: "test4-mod-6",
      course_id: "course-test-4-cpp",
      module_number: 6,
      title: "Module 6: Capstone Project — High-Performance Game Entity & Inventory System",
      description: "Polymorphic Entities, Inventory Management with STL Containers, Smart Pointers aur Exception Safety.",
      order_index: 6,
      lessons: [
        {
          id: "test4-l-6-1",
          module_id: "test4-mod-6",
          lesson_number: 1,
          title: "Lesson 6.1: Building the OOP Game Engine & Inventory",
          order_index: 1,
          duration_minutes: 35,
          content_type: "text",
          starter_code: `#include <iostream>
#include <string>
#include <vector>
#include <memory>

// Base Class for Game Items
class Item {
protected:
    std::string name;
    int value;

public:
    Item(std::string n, int v) : name(n), value(v) {}
    virtual void use() = 0;
    virtual void display() {
        std::cout << "Item: " << name << " | Value: ₹" << value << std::endl;
    }
    virtual ~Item() {}
};

// Derived: Weapon
class Weapon : public Item {
private:
    int damage;
public:
    Weapon(std::string n, int v, int dmg) : Item(n, v), damage(dmg) {}
    void use() override {
        std::cout << "⚔️ Equipping " << name << " — Dealing " << damage << " Damage!" << std::endl;
    }
};

// Derived: Potion
class HealthPotion : public Item {
private:
    int healAmount;
public:
    HealthPotion(std::string n, int v, int heal) : Item(n, v), healAmount(heal) {}
    void use() override {
        std::cout << "🧪 Drank " << name << " — Restored +" << healAmount << " HP!" << std::endl;
    }
};

// Player with Dynamic Smart-Pointer Inventory
class Player {
private:
    std::string username;
    int health;
    std::vector<std::unique_ptr<Item>> inventory;

public:
    Player(std::string name) : username(name), health(100) {}

    void addItem(std::unique_ptr<Item> item) {
        inventory.push_back(std::move(item));
    }

    void showInventory() {
        std::cout << "\n🎒 " << username << "'s Inventory (" << inventory.size() << " items):" << std::endl;
        for (const auto &item : inventory) {
            item->display();
        }
    }

    void useAllItems() {
        std::cout << "\n⚡ Activating All Inventory Items:" << std::endl;
        for (const auto &item : inventory) {
            item->use();
        }
    }
};

int main() {
    Player hero("Sourav");

    hero.addItem(std::make_unique<Weapon>("Excalibur Sword", 5000, 150));
    hero.addItem(std::make_unique<HealthPotion>("Elixir of Life", 500, 75));

    hero.showInventory();
    hero.useAllItems();

    std::cout << "\n✅ Game Session Closed Safely (All Memory Auto-Cleaned via Smart Pointers)!" << std::endl;
    return 0;
}`,
          sandbox_language: "cpp",
          challenge: {
            task: "Ek naya derived class 'Armor' add karein aur player ke inventory mein Shield item equip karein.",
            hint: "class Armor : public Item { ... void use() override { ... } };",
            expected_output: "Item: Dragon Shield"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🏆</div>
  <div>
    <div class="mental-title">Capstone Architecture Overview</div>
    <p class="mental-text">Is capstone project mein aapne <strong>Polymorphism</strong>, <strong>Pure Virtual Methods</strong>, <strong>std::vector</strong>, <strong>std::unique_ptr Move Semantics</strong>, aur <strong>RAII Memory Safety</strong> ko combine karke ek production-grade game inventory system build kiya hai!</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-cpp-6-1",
            question: "std::vector<std::unique_ptr<Item>> mein element add karne ke liye 'std::move' kyu zaroori hai?",
            options: [
              "Kyunki unique_ptr copy nahi ho sakta, uski ownership transfer (move) karni padti hai",
              "Kyunki move karne se element delete ho jata hai",
              "Kyunki vector sirf integers accept karta hai",
              "Move keyword syntax mandatory error bypass karne ke liye hai"
            ],
            correct_index: 0,
            explanation: "std::unique_ptr copy-constructible nahi hota, isliye vector mein store karne ke liye std::move se ownership transfer ki jaati hai."
          },
          {
            id: "q-cpp-6-2",
            question: "Jab vector destroy hoga, toh uske andar ke unique_ptr items ka kya hoga?",
            options: [
              "Memory leak ho jayegi",
              "Saare objects ke destructors automatically call honge aur heap memory safely clean ho jayegi",
              "Program freeze ho jayega",
              "User ko manually free() call karna padega"
            ],
            correct_index: 1,
            explanation: "Vector ke destruction par har unique_ptr ka destructor run hoga jo apne respective heap object ko clean karega."
          },
          {
            id: "q-cpp-6-3",
            question: "Modern C++ mein dynamic polymorphism achieve karne ke liye kya best practice hai?",
            options: [
              "Raw pointers (Item*) aur manual delete",
              "Smart pointers (std::unique_ptr<Base> / std::shared_ptr<Base>) aur virtual functions",
              "C-style void pointers (void*)",
              "Global variables"
            ],
            correct_index: 1,
            explanation: "Smart pointers ke sath virtual functions zero-leak runtime dynamic polymorphism provide karte hain."
          },
          {
            id: "q-cpp-6-4",
            question: "C++ project ko modular aur production-ready banane ke liye declarations aur definitions kahan rakhi jaati hain?",
            options: [
              "Declarations .h/.hpp header files mein aur implementations .cpp source files mein",
              "Sab kuch single main.cpp mein",
              "Files ko .txt mein save kiya jata hai",
              "Sirf database mein store hoti hain"
            ],
            correct_index: 0,
            explanation: "Header files (.h/.hpp) interface contract define karti hain aur .cpp files implementation carry karti hain."
          },
          {
            id: "q-cpp-6-5",
            question: "Move constructor (ClassName(ClassName&& other) noexcept) ka kya purpose hai?",
            options: [
              "Deep copy banana",
              "Source object ke resources ko steal/transfer karna bina expensive memory allocation ke",
              "Objects ko encrypt karna",
              "File save karna"
            ],
            correct_index: 1,
            explanation: "Move semantics pointers aur buffers ko transfer karti hai bina naya heap block allocate aur copy kiye, jo extreme speed boost deta hai."
          }
        ]
      }
    }
  ],
  final_exam: {
    passing_score: 60,
    time_limit_minutes: 30,
    questions: [
      {
        id: "fe-cpp-1",
        question: "C++ mein Stack memory aur Heap memory mein primary technical difference kya hai?",
        options: [
          "Stack memory slow hoti hai jabki Heap superfast hoti hai",
          "Stack memory compiler automatically manage karta hai (LIFO, fast, fixed size) jabki Heap dynamic allocation (manual/smart pointers) ke liye hoti hai",
          "Heap memory sirf numbers store kar sakti hai",
          "Stack memory kabhi destroy nahi hoti"
        ],
        correct_index: 1,
        explanation: "Stack function call frames aur local variables ke liye automatic memory hoti hai, jabki Heap dynamic large objects ke liye hoti hai."
      },
      {
        id: "fe-cpp-2",
        question: "Virtual Method Table (vtable) C++ compiler kab generate karta hai?",
        options: [
          "Jab class mein kam se kam ek 'virtual' function hota hai",
          "Har normal C function ke liye",
          "Sirf templates use karne par",
          "Sirf #include <iostream> likhne par"
        ],
        correct_index: 0,
        explanation: "vtable compiler un classes ke liye banata hai jinme virtual functions hote hain, taaki runtime par correct function pointer resolve ho sake."
      },
      {
        id: "fe-cpp-3",
        question: "std::unordered_map mein hash collision hone par standard C++ implementations generally kya use karti hain?",
        options: ["Separate Chaining (Linked Lists / Buckets)", "Database Rollback", "Application Crash", "Program Restart"],
        correct_index: 0,
        explanation: "Separate chaining buckets allow karti hai collision wale elements ko same hash index par store karne ke liye."
      },
      {
        id: "fe-cpp-4",
        question: "'Rule of Five' in Modern C++ mein kaunse 5 special member functions shamil hote hain?",
        options: [
          "5 normal functions",
          "Destructor, Copy Constructor, Copy Assignment, Move Constructor, Move Assignment",
          "5 virtual methods",
          "5 private variables"
        ],
        correct_index: 1,
        explanation: "Rule of Five custom resource management classes ke 5 core lifecycle functions ko define karta hai."
      },
      {
        id: "fe-cpp-5",
        question: "Modern C++ applications mein memory leaks eliminate karne ka ultimate solution kya hai?",
        options: [
          "Har line ke baad sleep() lagana",
          "Strict RAII aur Smart Pointers (std::unique_ptr, std::shared_ptr) ka exclusive use",
          "Sirf global pointers banana",
          "Manual free() likhna"
        ],
        correct_index: 1,
        explanation: "RAII aur smart pointers ensure karte hain ki resources automatically clean ho jayein jaise hi unka scope khatam hota hai."
      }
    ]
  }
};

const outputPath = path.join(process.cwd(), 'Courses', 'test-4.json');
fs.writeFileSync(outputPath, JSON.stringify(cppCourse, null, 2), 'utf-8');
console.log(`✅ C++ Course generated at ${outputPath}`);
