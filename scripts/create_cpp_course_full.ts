import fs from 'fs';
import path from 'path';

function makeLesson(id: string, moduleId: string, lessonNum: number, title: string, orderIndex: number, duration: number, starterCode: string, challenge: { task: string; hint: string; expected_output: string }, mentalModel: string, points: Array<{ tag: string; color: string; title: string; desc: string }>, htmlContent: string) {
  return {
    id,
    module_id: moduleId,
    lesson_number: lessonNum,
    title,
    order_index: orderIndex,
    duration_minutes: duration,
    content_type: "text",
    starter_code: starterCode,
    sandbox_language: "cpp" as const,
    challenge,
    content: `<div class="mental-model-box">
  <div class="mental-icon">⚡</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text">${mentalModel}</p>
  </div>
</div>

<div class="pipeline-flow">
  ${points.map(p => `
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:${p.color.split(';')[0]}; color:${p.color.split(';')[1]};">${p.tag}</span>
    <div class="pipeline-title">${p.title}</div>
    <p class="pipeline-desc">${p.desc}</p>
  </div>`).join('')}
</div>

${htmlContent}`
  };
}

export const cppFullCourse = {
  id: "course-test-4-cpp",
  title: "Mastering Modern C++ & Object-Oriented Architecture (Hinglish)",
  subtitle: "C++20/C++23 Standards, Zero-Cost Abstractions, RAII, Move Semantics & STL Mastery",
  description: "Modern C++ (C++11 se lekar C++20/C++23) ko zero se production systems engineer level tak master karein natural Hinglish mein! Memory layouts, References vs Pointers, Deep RAII, Operator Overloading, Move Semantics (&&), Rule of 5, Template Metaprogramming, STL Algorithms, Smart Pointers aur High-Performance Game Engine architecture live sandboxed execution ke sath seekhein.",
  category: "Systems & Architecture",
  difficulty: "Intermediate",
  thumbnail_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
  is_premium: false,
  total_modules: 12,
  estimated_hours: 55,
  created_at: "2026-03-01T00:00:00Z",
  modules: [
    {
      id: "test4-mod-1",
      course_id: "course-test-4-cpp",
      module_number: 1,
      title: "Module 1: C++ Foundations, Streams & Modern Syntax",
      description: "C++ vs C history, Zero-Cost Abstraction principle, std::cout/std::cin streams, namespaces aur modern auto type inference.",
      order_index: 1,
      lessons: [
        makeLesson("test4-l-1-1", "test4-mod-1", 1, "Lesson 1.1: C++ Shuruat & Zero-Cost Abstraction", 1, 25,
`#include <iostream>
#include <string>

int main() {
    std::string engineer = "Aryan";
    std::cout << "🚀 Namaste Modern C++ World! Developer: " << engineer << std::endl;
    std::cout << "C++ aapko direct hardware speed + high-level OOP clean syntax deta hai!" << std::endl;
    return 0;
}`, {
          task: "Ek program likhein jo std::cout se 'Modern C++ 20' print kare.",
          hint: "std::cout << \"Modern C++ 20\" << std::endl;",
          expected_output: "Modern C++ 20"
        },
        "<strong>C++ = C ki raw memory speed + High-Level OOP Abstractions!</strong> Bjarne Stroustrup ne C++ ko 'C with Classes' ke roop mein invent kiya tha taaki software scale hone par bhi performance 1 nanosecond bhi drop na ho.",
        [
          { tag: "Core 01", color: "#e0f2fe;#0369a1", title: "⚡ Zero-Cost Abstraction", desc: "Aap jo feature use nahi karte uski 0% runtime penalty hoti hai." },
          { tag: "Core 02", color: "#dcfce7;#15803d", title: "🌊 Streams vs printf", desc: "Type-safe `std::cout <<` stream pipeline format specifiers (%d) ki zarurat khatam karta hai." }
        ],
        ""
        ),
        makeLesson("test4-l-1-2", "test4-mod-1", 2, "Lesson 1.2: Namespaces, Scope Resolution & auto Inference", 2, 25,
`#include <iostream>

namespace EngineCore {
    int maxFrameRate = 120;
    void render() {
        std::cout << "Rendering at " << maxFrameRate << " FPS" << std::endl;
    }
}

int main() {
    auto score = 95.5; // Compiler automatically deduces double
    EngineCore::render();
    std::cout << "Player Score: " << score << std::endl;
    return 0;
}`, {
          task: "Ek custom namespace 'MathTools' banayein jisme int PI = 3 ho aur use print karein.",
          hint: "namespace MathTools { int PI = 3; } ... std::cout << MathTools::PI;",
          expected_output: "3"
        },
        "<strong>Namespaces global naming conflicts ko solve karte hain!</strong> Jab 2 libraries mein same function name ho, namespace boundary clashes ko prevent karti hai.",
        [
          { tag: "Namespace", color: "#e0f2fe;#0369a1", title: "🏷️ namespace & ::", desc: "Scope resolution operator (::) specific module/package access karta hai." },
          { tag: "auto", color: "#fef3c7;#b45309", title: "✨ auto Type Deduction", desc: "Compile-time par compiler khud variable ka type infer karta hai bina runtime overhead ke." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-cpp-1-1", question: "C++ mein 'Zero-Cost Abstraction' principle ka kya matlab hota hai?", options: ["Jo features aap use nahi karte, unki koi runtime speed penalty nahi hoti", "C++ compiler free mein milta hai", "Code likhne ka koi cost nahi hota", "Variables memory nahi lete"], correct_index: 0, explanation: "Zero-overhead principle ensure karta hai ki high-level C++ abstractions hand-written C assembly jitni hi fast hoti hain." },
          { id: "q-cpp-1-2", question: "C++ mein `std::endl` aur `\\n` mein technical difference kya hai?", options: ["`std::endl` newline add karne ke sath output buffer ko forcibly flush karta hai", "Dono bilkul same hain", "`\\n` error throw karta hai", "`std::endl` memory leak karta hai"], correct_index: 0, explanation: "std::endl buffer flush karta hai jo heavy loops mein performance slow kar sakta hai, isliye '\\n' fast hota hai." },
          { id: "q-cpp-1-3", question: "Global namespace pollution prevent karne ke liye C++ mein kya use hota hai?", options: ["`namespace` blocks", "`#define` macros", "`void` pointers", "`malloc`"], correct_index: 0, explanation: "Namespaces functions aur classes ko modular scope mein encapsulate karte hain." },
          { id: "q-cpp-1-4", question: "`auto` keyword C++11 ke baad kya karta hai?", options: ["Compile-time par initializer expression se variable type automatically deduce karta hai", "Automatic memory free karta hai", "Variable ko global banata hai", "Code restart karta hai"], correct_index: 0, explanation: "auto compile-time type deduction karta hai with 0 runtime penalty." },
          { id: "q-cpp-1-5", question: "`using namespace std;` ko production header files (.h) mein avoid kyu karna chahiye?", options: ["Ye header include karne wale saare files mein name collision risk create karta hai", "Syntax error deta hai", "Compilation slow karta hai 10x", "Memory corrupt karta hai"], correct_index: 0, explanation: "Header files mein 'using namespace std;' daalne se pure translation unit mein symbol ambiguity paida hoti hai." }
        ]
      }
    },
    {
      id: "test4-mod-2",
      course_id: "course-test-4-cpp",
      module_number: 2,
      title: "Module 2: References (&), Pointers & Memory Layout",
      description: "Pass-by-value vs Pass-by-reference (&), const references for high-speed performance, pointer vs reference differences, Memory segmentation.",
      order_index: 2,
      lessons: [
        makeLesson("test4-l-2-1", "test4-mod-2", 1, "Lesson 2.1: C++ References (&) vs Raw Pointers", 1, 30,
`#include <iostream>

void doubleValue(int& ref) {
    ref *= 2; // Original variable directly modify hoga!
}

int main() {
    int health = 50;
    std::cout << "Initial Health: " << health << std::endl;
    
    doubleValue(health);
    std::cout << "Boosted Health: " << health << std::endl;
    return 0;
}`, {
          task: "Ek function 'addTen(int& num)' banayein jo number mein 10 add kare aur verify karein.",
          hint: "void addTen(int& num) { num += 10; }",
          expected_output: "10"
        },
        "<strong>Reference (&) = Existing variable ka permanent Alias (doosra naam)!</strong> Pointer ki tarah isme NULL hone ya dereference (*) karne ka jhanjhat nahi hota. Direct safe memory access!",
        [
          { tag: "Ref", color: "#e0f2fe;#0369a1", title: "🔗 int& ref", desc: "No copy overhead, zero memory allocation, syntax jaise normal variable ho." },
          { tag: "Const Ref", color: "#dcfce7;#15803d", title: "🛡️ const int& ref", desc: "Read-only pass-by-reference jo large objects ki copying 100% prevent karta hai." }
        ],
        ""
        ),
        makeLesson("test4-l-2-2", "test4-mod-2", 2, "Lesson 2.2: Pass-by-Const-Reference & Memory Optimization", 2, 25,
`#include <iostream>
#include <string>

// const reference: Zero copy penalty + Immutability guarantee!
void printUserProfile(const std::string& name, const int& level) {
    std::cout << "Player: " << name << " | Level: " << level << std::endl;
}

int main() {
    std::string playerName = "Vikram_Pro";
    int playerLevel = 45;
    printUserProfile(playerName, playerLevel);
    return 0;
}`, {
          task: "Ek function banayein jo 'const std::string& text' accept karke use print kare.",
          hint: "void display(const std::string& text) { std::cout << text << std::endl; }",
          expected_output: "const std::string&"
        },
        "<strong>Const Reference = The Golden Rule of Modern C++ Arguments!</strong> Large strings ya objects ko pass karte waqt deep copy bachane ke liye hamesha <code>const Type&</code> use karein.",
        [
          { tag: "Perf", color: "#dcfce7;#15803d", title: "⚡ 0 Copy Overhead", desc: "GBs of data ko bina copy kiye 8-byte address ke zariye instant pass karta hai." },
          { tag: "Safety", color: "#ede9fe;#6d28d9", title: "🔒 Read-Only Contract", desc: "Caller ko guarantee milti hai ki function unke data ko modify nahi karega." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-cpp-2-1", question: "C++ mein Reference (&) aur Pointer (*) mein kya fundamental farak hai?", options: ["Reference ko initialize karna compulsory hai aur wo kabhi NULL ya re-bound nahi ho sakta", "Pointer fast hota hai", "Reference heap par banta hai", "Dono identical hain"], correct_index: 0, explanation: "References are safe immutable aliases that cannot be re-assigned or set to null." },
          { id: "q-cpp-2-2", question: "`void print(const std::string& text)` pattern modern C++ mein kyu standard mana jata hai?", options: ["Ye string ki heavy copy hone se roktahai (0% copy cost) aur read-only safety deta hai", "Ye string delete kar deta hai", "Ye string ko uppercase karta hai", "Compilation error se bachata hai"], correct_index: 0, explanation: "Pass-by-const-reference large objects ko bina copy overhead ke safely share karta hai." },
          { id: "q-cpp-2-3", question: "`int a = 10; int& b = a; b = 20;` ke baad `a` ki value kya hogi?", options: ["20", "10", "Garbage value", "Compile error"], correct_index: 0, explanation: "b a ka hi alias hai, isliye b ko update karne se a bhi 20 ho jata hai." },
          { id: "q-cpp-2-4", question: "Dangling reference kab create hoti hai?", options: ["Jab reference kisi temporary local stack variable ko point kare jo function return hone par destroy ho chuka ho", "Jab memory full ho", "Jab zero se divide karein", "Jab pointer NULL ho"], correct_index: 0, explanation: "Local stack variable ka reference return karne se undefined behavior (dangling ref) hota hai." },
          { id: "q-cpp-2-5", question: "`sizeof(int&)` kya return karega?", options: ["Underlying type (int) ka size yaani 4 bytes", "Reference table ka size", "0 bytes", "8 bytes always"], correct_index: 0, explanation: "C++ standard ke mutabiq reference par sizeof call karne se referenced type ka size milta hai." }
        ]
      }
    },
    {
      id: "test4-mod-3",
      course_id: "course-test-4-cpp",
      module_number: 3,
      title: "Module 3: Functions, Default Arguments, Overloading & Lambdas",
      description: "Function Overloading, Default parameter rules, Inline functions, Lambda expressions ([capture](args){body}), aur constexpr compile-time functions.",
      order_index: 3,
      lessons: [
        makeLesson("test4-l-3-1", "test4-mod-3", 1, "Lesson 3.1: Function Overloading & Default Arguments", 1, 25,
`#include <iostream>

// Function Overloading: Same name, different signatures
int calculateArea(int side) {
    return side * side; // Square
}

int calculateArea(int length, int breadth) {
    return length * breadth; // Rectangle
}

// Default Arguments (must be at the end)
void logMessage(const std::string& msg, int priority = 1) {
    std::cout << "[Priority " << priority << "] " << msg << std::endl;
}

int main() {
    std::cout << "Square Area: " << calculateArea(5) << std::endl;
    std::cout << "Rect Area: " << calculateArea(4, 6) << std::endl;
    logMessage("System booting...");
    logMessage("CRITICAL ERROR DETECTED!", 5);
    return 0;
}`, {
          task: "Overloaded function 'add(int, int)' aur 'add(double, double)' implement karein.",
          hint: "int add(int a, int b) { return a+b; } double add(double a, double b) { return a+b; }",
          expected_output: "Overloaded"
        },
        "<strong>Polymorphism at Compile-Time!</strong> Function overloading se aap same intuitive function name use kar sakte hain alag-alag data types ya parameter counts ke liye.",
        [
          { tag: "Overload", color: "#e0f2fe;#0369a1", title: "⚙️ Name Mangling", desc: "Compiler internal level par function name + argument types ko hash karke unique identifier banata hai." },
          { tag: "Defaults", color: "#dcfce7;#15803d", title: "🎯 Default Parameters", desc: "Right-to-left order mein default values define ki jaati hain." }
        ],
        ""
        ),
        makeLesson("test4-l-3-2", "test4-mod-3", 2, "Lesson 3.2: Modern C++ Lambda Expressions & constexpr", 2, 30,
`#include <iostream>

int main() {
    int multiplier = 5;

    // Modern Lambda: [capture](params) -> return_type { body }
    auto scale = [multiplier](int value) {
        return value * multiplier;
    };

    std::cout << "Scaled 10 by 5: " << scale(10) << std::endl;
    std::cout << "Scaled 7 by 5: " << scale(7) << std::endl;
    return 0;
}`, {
          task: "Ek lambda banayein jo number ka cube return kare: auto cube = [](int n) { return n*n*n; };",
          hint: "auto cube = [](int n) { return n*n*n; }; std::cout << cube(3);",
          expected_output: "27"
        },
        "<strong>Lambdas = Anonymous Inline Functions!</strong> Modern C++ mein algorithms (jaise sort, filter) ko pass karne ke liye lambdas sabse powerful tool hain.",
        [
          { tag: "Capture", color: "#e0f2fe;#0369a1", title: "📦 [=] vs [&]", desc: "Value capture `[=]` copy leta hai, reference capture `[&]` outer state modify kar sakta hai." },
          { tag: "constexpr", color: "#fef3c7;#b45309", title: "⚡ constexpr", desc: "Pure compile-time execution jo runtime CPU cycles zero kar deta hai." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-cpp-3-1", question: "C++ compiler function overloading ko kaise distinguish karta hai?", options: ["Function ke parameters ke number, order aur types (Signature) ke base par", "Sirf return type ke base par", "Function ke variable names se", "Random order se"], correct_index: 0, explanation: "Overloading sirf parameter signature par depend karta hai, sirf return type change karne se overloading valid nahi hoti." },
          { id: "q-cpp-3-2", question: "Lambda syntax `[x, &y](int z) { ... }` mein `[x, &y]` ka kya role hota hai?", options: ["x ko pass-by-value capture karna aur y ko pass-by-reference capture karna", "Syntax error", "Array initialize karna", "Memory allocate karna"], correct_index: 0, explanation: "Capture clause outer scope ke variables ko lambda body ke andar accessible banata hai." },
          { id: "q-cpp-3-3", question: "`constexpr` function ka primary benefit kya hota hai?", options: ["Agar arguments compile-time constants hon, toh function calculation compile-time par hi evaluate ho jaati hai", "Code encrypt hota hai", "Virtual memory badhti hai", "Execution slow hota hai"], correct_index: 0, explanation: "constexpr computation ko runtime se compile-time par shift karke runtime performance maximize karta hai." },
          { id: "q-cpp-3-4", question: "Default arguments function declaration mein kahan place hone chahiye?", options: ["Hamesha parameter list ke end (Rightmost side) par", "Hamesha sabse pehle (Leftmost)", "Kahin bhi", "Sirf main() ke andar"], correct_index: 0, explanation: "C++ rules: Default arguments hamesha trailing (rightmost) parameters par hone chahiye." },
          { id: "q-cpp-3-5", question: "`inline` keyword compiler ko kya request karta hai?", options: ["Function call overhead bachane ke liye function code ko call site par directly paste/substitute karne ka hint", "Function delete karna", "Function ko thread mein chalana", "File save karna"], correct_index: 0, explanation: "inline function call jump overhead ko eliminate karne ke liye compiler hint deta hai." }
        ]
      }
    },
    {
      id: "test4-mod-4",
      course_id: "course-test-4-cpp",
      module_number: 4,
      title: "Module 4: Classes, Encapsulation, Constructors & RAII",
      description: "Class vs Struct, private/public encapsulation, Member initializer lists, Default/Parameterized/Copy constructors, Destructors & RAII principle.",
      order_index: 4,
      lessons: [
        makeLesson("test4-l-4-1", "test4-mod-4", 1, "Lesson 4.1: Encapsulation & Member Initializer Lists", 1, 30,
`#include <iostream>
#include <string>

class BankAccount {
private:
    std::string accountHolder;
    double balance;

public:
    // Modern Member Initializer List (Faster than assignment in body)
    BankAccount(std::string name, double initialDeposit)
        : accountHolder(name), balance(initialDeposit) {}

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    void display() const {
        std::cout << "Holder: " << accountHolder << " | Balance: Rs." << balance << std::endl;
    }
};

int main() {
    BankAccount myAcc("Rahul Verma", 25000.0);
    myAcc.deposit(5000.0);
    myAcc.display();
    return 0;
}`, {
          task: "Ek class 'Player' banayein jisme private 'score' aur public 'addScore(int s)' method ho.",
          hint: "class Player { private: int score = 0; public: void addScore(int s) { score += s; } };",
          expected_output: "Player"
        },
        "<strong>Classes = Data + Behavior ka Protected Capsule!</strong> Private data ko bahar ke direct corruption se protect karna aur Member Initializer List se efficient initialization karna C++ OOP ka base hai.",
        [
          { tag: "Access", color: "#e0f2fe;#0369a1", title: "🔒 private vs public", desc: "Data hiding and interface separation." },
          { tag: "Init List", color: "#dcfce7;#15803d", title: "⚡ : member(val)", desc: "Default construction + assignment ki double cost bypass karta hai." }
        ],
        ""
        ),
        makeLesson("test4-l-4-2", "test4-mod-4", 2, "Lesson 4.2: Destructors & The Legendary RAII Principle", 2, 30,
`#include <iostream>

class ScopedResource {
public:
    ScopedResource() {
        std::cout << "🟢 Resource acquired (File opened / Mutex locked)" << std::endl;
    }

    ~ScopedResource() {
        std::cout << "🔴 Resource released automatically on scope exit!" << std::endl;
    }
};

int main() {
    {
        std::cout << "Entering inner scope..." << std::endl;
        ScopedResource res;
        std::cout << "Working with resource..." << std::endl;
    } // Here destructor is automatically invoked by C++!

    std::cout << "Exited inner scope cleanly with zero memory leaks!" << std::endl;
    return 0;
}`, {
          task: "Ek class 'Logger' banayein jiska destructor '~Logger()' 'Logger Closed' print kare.",
          hint: "class Logger { public: ~Logger() { std::cout << \"Logger Closed\\n\"; } };",
          expected_output: "Logger Closed"
        },
        "<strong>RAII (Resource Acquisition Is Initialization) = C++ Ka Sabse Bada Superpower!</strong> Constructor mein resource acquire karo, aur jaise hi object scope se bahar jaye, Destructor automatically resource free kar dega. Zero memory leaks!",
        [
          { tag: "RAII", color: "#e0f2fe;#0369a1", title: "🛡️ RAII Guarantee", desc: "Chahe normal exit ho ya exception throw ho, destructor hamesha execute hota hai." },
          { tag: "Destructor", color: "#fee2e2;#b91c1c", title: "🧹 ~ClassName()", desc: "No arguments, no return type, pure automatic cleanup." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-cpp-4-1", question: "C++ mein `class` aur `struct` mein kya single difference hota hai?", options: ["class ke members default mein private hote hain; struct ke default mein public hote hain", "struct mein methods nahi ho sakte", "class heap par banti hai", "struct fast hoti hai"], correct_index: 0, explanation: "In C++, structs and classes are identical except default member access and inheritance visibility." },
          { id: "q-cpp-4-2", question: "Member Initializer List `: var(val)` constructor body ke andar `var = val;` se faster kyu hoti hai?", options: ["Ye default constructor + assignment operator ki double calculation ko avoid karke direct construct karti hai", "Ye code compress karti hai", "Ye heap bypass karti hai", "Ye multithreading enable karti hai"], correct_index: 0, explanation: "Initializer lists directly construct the object in-place without dummy default initialization." },
          { id: "q-cpp-4-3", question: "C++ mein RAII (Resource Acquisition Is Initialization) ka primary benefit kya hai?", options: ["Stack unwind hone par destructor automatically resources (memory/files/mutex) free kar deta hai bina leak ke", "Garbage collector on karta hai", "Compile speed badhata hai", "Pointers delete karta hai"], correct_index: 0, explanation: "RAII ties resource lifecycle to object lifetime for guaranteed exception-safe cleanup." },
          { id: "q-cpp-4-4", question: "Const member function `void display() const` kya enforce karta hai?", options: ["Ye method class ke kisi bhi member variable ko modify nahi kar sakta (Read-Only)", "Ye sirf ek baar call ho sakta hai", "Ye variable delete karta hai", "Ye fast execute hota hai"], correct_index: 0, explanation: "const methods guarantee that the internal state of the 'this' object remains unmodified." },
          { id: "q-cpp-4-5", question: "Ek class mein Destructor kitne parameters le sakta hai?", options: ["Zero (Destructors cannot take any parameters or return any values)", "Max 1 parameter", "Unlimited parameters", "Sirf void"], correct_index: 0, explanation: "Destructors take no arguments and cannot be overloaded because they are invoked automatically by the runtime." }
        ]
      }
    },
    {
      id: "test4-mod-5",
      course_id: "course-test-4-cpp",
      module_number: 5,
      title: "Module 5: Inheritance Pillars, Access Control & Lifecycles",
      description: "Single, Multiple, Multi-level & Hierarchical Inheritance, protected access modifier, Constructor/Destructor execution order.",
      order_index: 5,
      lessons: [
        makeLesson("test4-l-5-1", "test4-mod-5", 1, "Lesson 5.1: Inheritance Hierarchy & Protected Access", 1, 30,
`#include <iostream>
#include <string>

class Entity {
protected:
    std::string name;
    int health;

public:
    Entity(std::string n, int h) : name(n), health(h) {
        std::cout << "🟢 Entity Base Constructor for: " << name << std::endl;
    }
};

class Player : public Entity {
private:
    int level;

public:
    Player(std::string n, int h, int lvl) 
        : Entity(n, h), level(lvl) {
        std::cout << "🎮 Player Derived Constructor (Level " << level << ")" << std::endl;
    }

    void showStatus() {
        // 'name' and 'health' are directly accessible because of 'protected' access!
        std::cout << "Player: " << name << " | HP: " << health << " | Level: " << level << std::endl;
    }
};

int main() {
    Player p1("Sourav", 100, 10);
    p1.showStatus();
    return 0;
}`, {
          task: "Ek Derived class 'Car' banayein jo Base class 'Vehicle' ko publicly inherit kare.",
          hint: "class Car : public Vehicle { ... };",
          expected_output: "public Vehicle"
        },
        "<strong>Inheritance = Code Reusability & Hierarchy!</strong> Base class common functionality provide karti hai, aur Derived class use specialize karti hai.",
        [
          { tag: "protected", color: "#e0f2fe;#0369a1", title: "🛡️ protected modifier", desc: "Outside world ke liye private, lekin derived child classes ke liye accessible." },
          { tag: "Order", color: "#dcfce7;#15803d", title: "⏳ Lifecycle Order", desc: "Base Constructor PEHLE chalta hai, Derived Destructor PEHLE destroy hota hai." }
        ],
        ""
        ),
        makeLesson("test4-l-5-2", "test4-mod-5", 2, "Lesson 5.2: Multiple Inheritance & The Diamond Problem (virtual Base)", 2, 25,
`#include <iostream>

// Virtual inheritance solves Diamond of Death!
class Device {
public:
    void powerOn() { std::cout << "Device Powered ON" << std::endl; }
};

class Printer : virtual public Device {};
class Scanner : virtual public Device {};

class Copier : public Printer, public Scanner {};

int main() {
    Copier c;
    c.powerOn(); // No ambiguity because of 'virtual public Device'!
    return 0;
}`, {
          task: "Diamond problem fix karne ke liye 'virtual public' inheritance use karein.",
          hint: "class A : virtual public Base {};",
          expected_output: "Device Powered ON"
        },
        "<strong>The Diamond Problem!</strong> Jab do derived classes same base class se inherit karti hain aur ek fourth class dono se inherit kare, toh <code>virtual public</code> single shared base instance ensure karta hai.",
        [
          { tag: "Diamond", color: "#fee2e2;#b91c1c", title: "💎 Diamond of Death", desc: "Duplicate copies of base class members creating ambiguity." },
          { tag: "Virtual", color: "#dcfce7;#15803d", title: "✨ virtual public", desc: "Guarantees only 1 single unified base subobject in memory." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-cpp-5-1", question: "Inheritance mein Constructor aur Destructor ka execution order kya hota hai?", options: ["Constructor: Base -> Derived; Destructor: Derived -> Base", "Constructor: Derived -> Base; Destructor: Base -> Derived", "Dono random", "Dono simultaneously"], correct_index: 0, explanation: "Base pehle build hoti hai taaki derived use use kar sake, aur destruction reverse order (LIFO) mein hoti hai." },
          { id: "q-cpp-5-2", question: "`protected` access modifier ka kya significance hai?", options: ["Class ke bahar inaccessible (private) rehta hai, lekin derived child classes use freely access kar sakti hain", "Public jaisa hota hai", "Sirf static functions ke liye", "Memory free karta hai"], correct_index: 0, explanation: "Protected members provide controlled inheritance visibility without exposing internals to the outside world." },
          { id: "q-cpp-5-3", question: "Diamond Problem ko C++ mein kaise resolve kiya jata hai?", options: ["`virtual` base class inheritance use karke (`class B : virtual public A`)", "Class delete karke", "Multiple inheritance ban karke", "Templates se"], correct_index: 0, explanation: "Virtual inheritance ensure karta hai ki most-derived class mein base class ka sirf 1 single shared instance baney." },
          { id: "q-cpp-5-4", question: "Public Inheritance (`class Dog : public Animal`) kya establish karta hai?", options: ["'Is-A' relationship (Dog is an Animal)", "'Has-A' relationship", "'Uses-A' relationship", "No relationship"], correct_index: 0, explanation: "Public inheritance represents standard subtyping 'Is-A' relationship in OOP design." },
          { id: "q-cpp-5-5", question: "Agar Base class ka default constructor na ho, toh Derived class constructor ko kya karna hoga?", options: ["Member Initializer List mein explicitly Base class constructor call karna padega", "Code compile nahi ho sakta", "Destructor private banana padega", "Program crash hoga"], correct_index: 0, explanation: "Derived constructor must explicitly invoke the parameterized Base constructor via its initializer list." }
        ]
      }
    },
    {
      id: "test4-mod-6",
      course_id: "course-test-4-cpp",
      module_number: 6,
      title: "Module 6: Polymorphism, Virtual Functions & VTable Mechanics",
      description: "Runtime Polymorphism, virtual keyword, override & final specifiers, Virtual Destructors, VTable & VPtr memory mechanics, Abstract classes & Pure virtual functions (=0).",
      order_index: 6,
      lessons: [
        makeLesson("test4-l-6-1", "test4-mod-6", 1, "Lesson 6.1: Virtual Functions, override & Dynamic Dispatch", 1, 35,
`#include <iostream>
#include <vector>

class Shape {
public:
    // Virtual function enables Dynamic Dispatch (Late Binding)
    virtual void draw() const {
        std::cout << "Drawing generic shape" << std::endl;
    }

    // MANDATORY: Virtual Destructor in Base Classes!
    virtual ~Shape() {
        std::cout << "Shape base destroyed" << std::endl;
    }
};

class Circle : public Shape {
public:
    void draw() const override {
        std::cout << "🔴 Drawing a smooth Circle" << std::endl;
    }
    ~Circle() override {
        std::cout << "Circle cleaned up" << std::endl;
    }
};

int main() {
    Shape* s = new Circle();
    s->draw(); // Calls Circle::draw() via VTable!
    delete s;  // Clean polymorphic deletion
    return 0;
}`, {
          task: "Ek abstract base class 'Animal' banayein jisme pure virtual function 'virtual void makeSound() = 0;' ho.",
          hint: "class Animal { public: virtual void makeSound() = 0; };",
          expected_output: "virtual void makeSound() = 0;"
        },
        "<strong>Polymorphism = Same Interface, Different Behaviors!</strong> Base class pointer se call karne par actual derived object ka method execute hona runtime polymorphism kehlata hai.",
        [
          { tag: "VTable", color: "#e0f2fe;#0369a1", title: "📊 Virtual Method Table (VTable)", desc: "Array of function pointers jo compiler har polymorphic class ke liye generate karta hai." },
          { tag: "vptr", color: "#dcfce7;#15803d", title: "📌 Hidden VPtr", desc: "Object ke andar 8-byte pointer jo uske class ki VTable ko point karta hai." },
          { tag: "Pure Virtual", color: "#fee2e2;#b91c1c", title: "🎯 = 0 (Abstract Class)", desc: "Pure virtual function derived class ko implement karne ke liye force karta hai." }
        ],
        ""
        ),
        makeLesson("test4-l-6-2", "test4-mod-6", 2, "Lesson 6.2: Pure Virtual Functions & C++ Interface Contracts", 2, 25,
`#include <iostream>

// Interface: Pure Abstract Base Class
class IAudioEngine {
public:
    virtual void playSound(const std::string& track) = 0; // Pure Virtual!
    virtual void stopSound() = 0;
    virtual ~IAudioEngine() = default;
};

class FModAudio : public IAudioEngine {
public:
    void playSound(const std::string& track) override {
        std::cout << "🔊 FMod Playing: " << track << std::endl;
    }
    void stopSound() override {
        std::cout << "🔇 FMod Audio Stopped" << std::endl;
    }
};

int main() {
    IAudioEngine* audio = new FModAudio();
    audio->playSound("epic_theme.mp3");
    audio->stopSound();
    delete audio;
    return 0;
}`, {
          task: "Ek pure virtual method 'virtual double getArea() = 0;' define karein.",
          hint: "virtual double getArea() = 0;",
          expected_output: "= 0"
        },
        "<strong>Interfaces = Architectural Contracts!</strong> C++ mein Java ya C# jaisa alag `interface` keyword nahi hota; 100% pure virtual functions wali class ko hi Interface kehte hain.",
        [
          { tag: "Contract", color: "#e0f2fe;#0369a1", title: "📜 Strict Contract", desc: "Derived class tab tak instantiate nahi ho sakti jab tak saare pure virtual methods implement na ho." },
          { tag: "Decoupling", color: "#dcfce7;#15803d", title: "🧩 Loose Coupling", desc: "Implementation badal do bina client code ko break kiye." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-cpp-6-1", question: "Base class mein Destructor ko `virtual` banana kyu CRITICAL rule hai?", options: ["Base pointer se derived object delete karne par derived class ka destructor call hona ensure karne ke liye (Memory leak prevention)", "Syntax requirement hai", "Destructor speed 2x karne ke liye", "Virtual memory on karne ke liye"], correct_index: 0, explanation: "Without virtual destructor, deleting a derived object via base pointer invokes undefined behavior and leaks derived memory." },
          { id: "q-cpp-6-2", question: "Pure Virtual Function (`virtual void run() = 0;`) ka kya effect hota hai?", options: ["Class ko Abstract bana deta hai (Direct object instantiate nahi ho sakta) aur derived classes ko implementation provide karna mandatory hota hai", "Method delete ho jata hai", "Program crash hota hai", "Variable 0 ho jata hai"], correct_index: 0, explanation: "Classes with at least one pure virtual function become abstract interfaces." },
          { id: "q-cpp-6-3", question: "VTable (Virtual Table) runtime par kaise work karti hai?", options: ["Har polymorphic object ke paas hidden `vptr` hota hai jo class ke function pointers table ko lookup karta hai", "Hash map use hota hai", "OS kernel dispatch karta hai", "Stack memory scan hoti hai"], correct_index: 0, explanation: "Dynamic dispatch resolves the actual function address via the object's vptr -> VTable lookup at runtime." },
          { id: "q-cpp-6-4", question: "Modern C++ mein `override` specifier lagane ka kya benefit hai?", options: ["Compiler verify karta hai ki method actually base class ke virtual function ko override kar raha hai (Typo errors prevent karta hai)", "Code format karta hai", "Compile time reduce karta hai", "Override keyword mandatory nahi hai"], correct_index: 0, explanation: "override catches signature mismatches and spelling mistakes at compile time." },
          { id: "q-cpp-6-5", question: "`final` specifier class ya virtual method par lagane se kya hota hai?", options: ["Further inheritance ya method overriding ko strictly prohibit kar deta hai", "Class crash hoti hai", "Memory double hoti hai", "Variable constant ho jata hai"], correct_index: 0, explanation: "final prevents any downstream class from inheriting or overriding the marked entity." }
        ]
      }
    },
    {
      id: "test4-mod-7",
      course_id: "course-test-4-cpp",
      module_number: 7,
      title: "Module 7: Operator Overloading & Deep vs Shallow Copy",
      description: "Overloading arithmetic (+, -), Stream (<<, >>), Subscript ([]), Shallow vs Deep Copy disaster, Copy Constructor & Copy Assignment operator (Rule of 3).",
      order_index: 7,
      lessons: [
        makeLesson("test4-l-7-1", "test4-mod-7", 1, "Lesson 7.1: Overloading Arithmetic & Stream (<<) Operators", 1, 30,
`#include <iostream>

class Vector2D {
public:
    float x, y;
    Vector2D(float x = 0, float y = 0) : x(x), y(y) {}

    // Overload '+' operator
    Vector2D operator+(const Vector2D& other) const {
        return Vector2D(x + other.x, y + other.y);
    }

    // Overload '<<' for direct std::cout stream printing
    friend std::ostream& operator<<(std::ostream& os, const Vector2D& v) {
        os << "(" << v.x << ", " << v.y << ")";
        return os;
    }
};

int main() {
    Vector2D pos(10.0f, 20.0f);
    Vector2D velocity(5.0f, -2.0f);
    Vector2D nextPos = pos + velocity; // Natural math syntax!
    std::cout << "Next Position: " << nextPos << std::endl;
    return 0;
}`, {
          task: "Vector2D class mein '-' (minus) operator overload karein.",
          hint: "Vector2D operator-(const Vector2D& other) const { return Vector2D(x - other.x, y - other.y); }",
          expected_output: "operator-"
        },
        "<strong>Make Custom Classes Feel Like Built-In Primitives!</strong> Operator overloading se aap apni physics vectors, complex numbers, ya matrix classes par natural `+`, `-`, `<<` operators allow karte hain.",
        [
          { tag: "Math", color: "#e0f2fe;#0369a1", title: "➕ operator+", desc: "Member function jo current instance ko left operand manta hai." },
          { tag: "Stream", color: "#dcfce7;#15803d", title: "📺 friend operator<<", desc: "Allows seamless `std::cout << obj` printing." }
        ],
        ""
        ),
        makeLesson("test4-l-7-2", "test4-mod-7", 2, "Lesson 7.2: Deep Copy vs Shallow Copy & The Rule of 3", 2, 30,
`#include <iostream>
#include <cstring>

class DynamicString {
private:
    char* data;
    size_t length;

public:
    DynamicString(const char* str) {
        length = strlen(str);
        data = new char[length + 1];
        strcpy(data, str);
    }

    // Deep Copy Constructor (Allocates its OWN independent buffer!)
    DynamicString(const DynamicString& other) {
        length = other.length;
        data = new char[length + 1];
        strcpy(data, other.data);
    }

    ~DynamicString() {
        delete[] data; // Safe cleanup!
    }

    void print() const { std::cout << data << std::endl; }
};

int main() {
    DynamicString s1("Deep Copy Safe");
    DynamicString s2 = s1; // Deep copy constructor called!
    s2.print();
    return 0;
}`, {
          task: "Deep copy constructor implement karein jo new memory allocate kare.",
          hint: "data = new char[length + 1];",
          expected_output: "new char"
        },
        "<strong>Shallow Copy Disaster (Double Free Crash)!</strong> Default copy sirf pointer address copy karta hai. Jab dono objects destroy hote hain, same memory do baar delete hone se program crash hota hai. Deep copy fresh heap block allocate karti hai!",
        [
          { tag: "Rule of 3", color: "#fee2e2;#b91c1c", title: "📜 Rule of 3", desc: "Agar custom Destructor hai, toh Copy Constructor aur Copy Assignment bhi manually define karo." },
          { tag: "Deep Copy", color: "#dcfce7;#15803d", title: "🧬 Deep Copy", desc: "Independent memory blocks jo double-free bugs 100% eliminate karte hain." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-cpp-7-1", question: "Shallow Copy ke sath pointer data hone par program crash kyu hota hai?", options: ["Dono objects same memory address point karte hain, aur destruction ke waqt Double Free error create hota hai", "Pointer NULL ho jata hai", "Stack overflow hota hai", "Speed slow hoti hai"], correct_index: 0, explanation: "Shallow copy duplicates the raw pointer, leading to double-free corruption upon destructor execution." },
          { id: "q-cpp-7-2", question: "C++ Rule of 3 kin teen special member functions ke bare mein hai?", options: ["Destructor, Copy Constructor, Copy Assignment Operator", "Constructor, Getter, Setter", "Virtual, Override, Final", "Malloc, Calloc, Free"], correct_index: 0, explanation: "If a class manages raw resources, you must explicitly implement Destructor, Copy Constructor, and Copy Assignment." },
          { id: "q-cpp-7-3", question: "`operator<<` overload karte waqt use `friend` kyu banaya jata hai?", options: ["Kyunki left operand `std::ostream` hota hai jo hamari custom class ka member nahi ho sakta", "Speed badhane ke liye", "Memory free karne ke liye", "Syntax sugar hai"], correct_index: 0, explanation: "std::ostream is the left-hand operand, so stream operators must be non-member friend functions." },
          { id: "q-cpp-7-4", question: "`operator[]` subscript operator overloading ka kya use hai?", options: ["Custom container class ke elements ko array index `obj[i]` syntax se access karne ke liye", "Array delete karne ke liye", "Multiplication ke liye", "Memory allocate karne ke liye"], correct_index: 0, explanation: "operator[] allows custom collections to provide natural array-like bracket indexing." },
          { id: "q-cpp-7-5", question: "Self-assignment check (`if (this == &other) return *this;`) copy assignment operator mein kyu zaroori hota hai?", options: ["Agar koi `a = a;` kare toh apni hi memory delete hone se prevent karne ke liye", "Performance 10x karne ke liye", "Loop rokne ke liye", "Format check karne ke liye"], correct_index: 0, explanation: "Self-assignment check prevents deallocating existing resources before copying from oneself." }
        ]
      }
    },
    {
      id: "test4-mod-8",
      course_id: "course-test-4-cpp",
      module_number: 8,
      title: "Module 8: Move Semantics, Rvalue References (&&) & Rule of 5",
      description: "Lvalues vs Rvalues, std::move mechanics, Move Constructor, Move Assignment operator, Rule of 5 & Rule of 0.",
      order_index: 8,
      lessons: [
        makeLesson("test4-l-8-1", "test4-mod-8", 1, "Lesson 8.1: Rvalue References (&&) & std::move Mechanics", 1, 35,
`#include <iostream>
#include <vector>

class HugeBuffer {
public:
    int* data;
    size_t size;

    HugeBuffer(size_t s) : size(s), data(new int[s]) {
        std::cout << "📦 Allocated buffer of size " << size << std::endl;
    }

    // Move Constructor: Steals the pointer from temporary rvalue!
    HugeBuffer(HugeBuffer&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr; // Leave source in safe empty state
        other.size = 0;
        std::cout << "⚡ MOVED buffer instantly (Zero Copy! 0 nanoseconds)" << std::endl;
    }

    ~HugeBuffer() {
        delete[] data;
    }
};

int main() {
    HugeBuffer b1(1000000);
    HugeBuffer b2 = std::move(b1); // Pointer stolen! b1 is now empty.
    return 0;
}`, {
          task: "Move constructor signature likhein jo 'noexcept' marked ho.",
          hint: "HugeBuffer(HugeBuffer&& other) noexcept",
          expected_output: "HugeBuffer&& other"
        },
        "<strong>Move Semantics = Resource Copying Ke Bajaye Direct Pointer Transfer!</strong> C++11 ki sabse revolutionary invention jisme temporary objects ko duplicate karne ke bajaye unka pointer 'chura' (steal) liya jata hai.",
        [
          { tag: "std::move", color: "#e0f2fe;#0369a1", title: "🚚 std::move", desc: "Variable ko lvalue se rvalue reference (`&&`) mein cast karta hai." },
          { tag: "Steal", color: "#dcfce7;#15803d", title: "⚡ Shallow Pointer Steal", desc: "10GB memory copy karne ke bajaye 8-byte pointer reassign hota hai (Instant!)." }
        ],
        ""
        ),
        makeLesson("test4-l-8-2", "test4-mod-8", 2, "Lesson 8.2: The Complete Modern Rule of 5 & Rule of 0", 2, 25,
`#include <iostream>

class CompleteResource {
private:
    int* ptr;

public:
    CompleteResource() : ptr(new int(100)) {}
    
    // Rule of 5 Members:
    // 1. Destructor
    ~CompleteResource() { delete ptr; }
    
    // 2. Copy Constructor
    CompleteResource(const CompleteResource& o) : ptr(new int(*o.ptr)) {}
    
    // 3. Copy Assignment
    CompleteResource& operator=(const CompleteResource& o) {
        if (this != &o) { *ptr = *o.ptr; }
        return *this;
    }
    
    // 4. Move Constructor
    CompleteResource(CompleteResource&& o) noexcept : ptr(o.ptr) { o.ptr = nullptr; }
    
    // 5. Move Assignment
    CompleteResource& operator=(CompleteResource&& o) noexcept {
        if (this != &o) { delete ptr; ptr = o.ptr; o.ptr = nullptr; }
        return *this;
    }
};

int main() {
    CompleteResource r1;
    CompleteResource r2 = std::move(r1); // Move constructed!
    return 0;
}`, {
          task: "Rule of 5 mein Move Assignment operator signature likhein.",
          hint: "CompleteResource& operator=(CompleteResource&& o) noexcept",
          expected_output: "operator=(CompleteResource&&"
        },
        "<strong>Rule of 5 vs Rule of 0!</strong> Modern C++ mein agar aap raw pointers ke bajaye smart pointers use karein, toh compiler saare 5 special members khud safely generate karta hai (Rule of 0).",
        [
          { tag: "Rule 5", color: "#e0f2fe;#0369a1", title: "5️⃣ Rule of 5", desc: "Destructor, Copy Ctor, Copy Assign, Move Ctor, Move Assign." },
          { tag: "Rule 0", color: "#dcfce7;#15803d", title: "0️⃣ Rule of 0", desc: "Use std::vector / smart pointers and write 0 boilerplate constructors!" }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-cpp-8-1", question: "C++11 mein `std::move(var)` actual mein kya karta hai?", options: ["Ye koi data move nahi karta; ye sirf variable ko rvalue reference (`Type&&`) mein static_cast karta hai", "Ye memory delete karta hai", "Ye thread start karta hai", "Ye RAM transfer karta hai"], correct_index: 0, explanation: "std::move is purely a compile-time static_cast to an rvalue reference enabling move semantics." },
          { id: "q-cpp-8-2", question: "Rvalue Reference (`&&`) aur Lvalue Reference (`&`) mein kya difference hai?", options: ["Lvalue persistent named memory location ko refer karta hai; Rvalue temporary/expiring values ko bind karta hai", "Dono identical hain", "Rvalue slow hota hai", "Lvalue sirf numbers ke liye hota hai"], correct_index: 0, explanation: "Lvalues have identifiable persistent identity, while Rvalues are transient temporaries ready for pilfering." },
          { id: "q-cpp-8-3", question: "Rule of 5 mein kin 5 special member functions ko implement kiya jata hai?", options: ["Destructor, Copy Constructor, Copy Assignment, Move Constructor, Move Assignment", "Getter, Setter, Print, Read, Write", "New, Delete, Malloc, Free, Calloc", "Main, Init, Run, Stop, Destroy"], correct_index: 0, explanation: "The Rule of 5 defines full ownership semantics for modern C++ resource managers." },
          { id: "q-cpp-8-4", question: "Move Constructor ko `noexcept` mark karna kyu strongly recommended hai?", options: ["Taaki `std::vector` resize hone par slow copy ke bajaye safely move constructor use kare", "Speed 100x karne ke liye", "Bina noexcept ke program crash ho jata hai", "Syntax rule hai"], correct_index: 0, explanation: "std::vector will fall back to copying elements during reallocation if the move constructor is not noexcept." },
          { id: "q-cpp-8-5", question: "Modern C++ mein 'Rule of Zero' ka kya principle hai?", options: ["Raw pointers ke bajaye standard library containers / smart pointers use karein taaki 0 custom copy/move/destructor likhna pade", "Classes mein zero methods hon", "Memory 0 byte use karein", "Pointers 0 set karein"], correct_index: 0, explanation: "Rule of Zero advises relying on standard RAII members so the compiler generates flawless default operations." }
        ]
      }
    },
    {
      id: "test4-mod-9",
      course_id: "course-test-4-cpp",
      module_number: 9,
      title: "Module 9: STL Containers Deep Dive (Vector, Map, Set & Deque)",
      description: "Sequence Containers (std::vector, std::deque, std::list), Associative Containers (std::map, std::set - Red-Black Trees O(log N)), Unordered Hash Maps O(1), Capacity vs Size mechanics.",
      order_index: 9,
      lessons: [
        makeLesson("test4-l-9-1", "test4-mod-9", 1, "Lesson 9.1: std::vector Growth Mechanics & Reserve Optimization", 1, 30,
`#include <iostream>
#include <vector>

int main() {
    std::vector<int> numbers;
    numbers.reserve(100); // Pre-allocate memory to prevent reallocations!

    std::cout << "Initial Capacity: " << numbers.capacity() << " | Size: " << numbers.size() << std::endl;

    for (int i = 1; i <= 5; ++i) {
        numbers.push_back(i * 10);
    }

    std::cout << "After Insertion - Size: " << numbers.size() << " | Elements: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    return 0;
}`, {
          task: "std::vector create karein aur 'push_back(100)' call karein.",
          hint: "std::vector<int> v; v.push_back(100);",
          expected_output: "push_back"
        },
        "<strong>std::vector = Modern C++ Ka #1 Default Container!</strong> Contiguous memory layout CPU cache lines ko 100% exploit karta hai, jisse dynamic arrays lightning-fast iterate hote hain.",
        [
          { tag: "Capacity", color: "#e0f2fe;#0369a1", title: "📊 Capacity vs Size", desc: "Size = actual elements count, Capacity = total allocated heap slots." },
          { tag: "reserve", color: "#dcfce7;#15803d", title: "⚡ reserve(N)", desc: "Repeated heap reallocations aur element copy overhead ko khatam karta hai." }
        ],
        ""
        ),
        makeLesson("test4-l-9-2", "test4-mod-9", 2, "Lesson 9.2: Associative Containers (std::map vs std::unordered_map)", 2, 25,
`#include <iostream>
#include <map>
#include <unordered_map>
#include <string>

int main() {
    // std::map: Self-Balancing Red-Black Tree (Always Sorted, O(log N))
    std::map<std::string, int> inventory;
    inventory["GoldCoins"] = 500;
    inventory["HealthPotion"] = 3;
    inventory["Arrow"] = 50;

    std::cout << "--- Sorted Map (O(log N)) ---" << std::endl;
    for (const auto& [item, qty] : inventory) {
        std::cout << item << ": " << qty << std::endl;
    }

    // std::unordered_map: Hash Table (Average O(1) Lookup)
    std::unordered_map<int, std::string> userCache;
    userCache[101] = "Vikram";
    userCache[102] = "Anjali";
    std::cout << "User 101: " << userCache[101] << std::endl;
    return 0;
}`, {
          task: "std::unordered_map create karein jo string key ko int value se map kare.",
          hint: "std::unordered_map<std::string, int> scores;",
          expected_output: "unordered_map"
        },
        "<strong>Tree vs Hash Table!</strong> <code>std::map</code> Red-Black Tree use karta hai (Sorted order, O(log N)), jabki <code>std::unordered_map</code> Hash Table use karta hai (Unsorted, Average O(1) speed).",
        [
          { tag: "std::map", color: "#e0f2fe;#0369a1", title: "🌲 Red-Black Tree", desc: "Guaranteed O(log N) operations with natural sorted key ordering." },
          { tag: "Hash Map", color: "#dcfce7;#15803d", title: "⚡ O(1) Hash Table", desc: "Ultra-fast lookups when sorting order is not required." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-cpp-9-1", question: "`std::vector::reserve(n)` aur `std::vector::resize(n)` mein kya difference hai?", options: ["`reserve` sirf capacity allocate karta hai bina elements banaye; `resize` actual elements create karke default initialize karta hai", "Dono same hain", "`reserve` slow hota hai", "`resize` capacity nahi badhata"], correct_index: 0, explanation: "reserve adjusts capacity to eliminate reallocations without changing the logical vector size." },
          { id: "q-cpp-9-2", question: "`std::map` aur `std::unordered_map` ka internal data structure kya hota hai?", options: ["`std::map` Red-Black Tree (O(log N)) hota hai; `std::unordered_map` Hash Table (O(1) avg) hota hai", "Dono arrays hote hain", "Dono linked list hote hain", "Dono heap hote hain"], correct_index: 0, explanation: "std::map maintains sorted keys via balanced search trees; unordered_map uses bucket hashing." },
          { id: "q-cpp-9-3", question: "`std::vector` elements ko memory mein kaise store karta hai?", options: ["Contiguous memory buffer mein (CPU cache friendly O(1) random access)", "Scattered nodes mein", "Disk par", "Stack frames mein"], correct_index: 0, explanation: "Vectors store elements in contiguous arrays maximizing CPU cache locality." },
          { id: "q-cpp-9-4", question: "Vector mein `emplace_back(...)` function `push_back(...)` se behtar kyu hai?", options: ["Ye object ko vector memory ke andar directly in-place construct karta hai bina temporary create kiye", "Ye vector ko reverse karta hai", "Ye sorting karta hai", "Ye error check karta hai"], correct_index: 0, explanation: "emplace_back forwards constructor arguments to build the element in-place without redundant copies." },
          { id: "q-cpp-9-5", question: "`std::set` mein duplicate values insert karne par kya hota hai?", options: ["Duplicate silently ignore ho jata hai (Set maintains strictly unique keys)", "Program crash ho jata hai", "Array format ho jata hai", "Exception throw hoti hai"], correct_index: 0, explanation: "std::set enforces uniqueness of keys; duplicates are rejected." }
        ]
      }
    },
    {
      id: "test4-mod-10",
      course_id: "course-test-4-cpp",
      module_number: 10,
      title: "Module 10: STL Algorithms, Iterators & Modern Ranges",
      description: "std::sort, std::find_if, std::transform, std::accumulate, Iterator categories, C++20 std::ranges::views pipelining.",
      order_index: 10,
      lessons: [
        makeLesson("test4-l-10-1", "test4-mod-10", 1, "Lesson 10.1: STL Algorithms & Custom Predicates", 1, 30,
`#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> scores = {45, 92, 78, 88, 60, 99, 82};

    // Sort descending with lambda predicate
    std::sort(scores.begin(), scores.end(), [](int a, int b) {
        return a > b;
    });

    std::cout << "Sorted Scores (High to Low): ";
    for (int s : scores) std::cout << s << " ";
    std::cout << std::endl;

    // Sum all scores with std::accumulate
    int total = std::accumulate(scores.begin(), scores.end(), 0);
    std::cout << "Total Class Score: " << total << std::endl;
    return 0;
}`, {
          task: "std::sort call karein scores vector par: std::sort(scores.begin(), scores.end());",
          hint: "std::sort(scores.begin(), scores.end());",
          expected_output: "std::sort"
        },
        "<strong>Don't Write Raw For Loops — Use STL Algorithms!</strong> STL algorithms heavily optimized assembly routines hain jo CPU vectorization (SIMD) aur parallel execution support karte hain.",
        [
          { tag: "Iterators", color: "#e0f2fe;#0369a1", title: "🧭 .begin() & .end()", desc: "Half-open ranges `[begin, end)` jo container independence provide karte hain." },
          { tag: "Transforms", color: "#dcfce7;#15803d", title: "⚙️ std::transform & accumulate", desc: "Functional map-reduce operations in clean C++." }
        ],
        ""
        ),
        makeLesson("test4-l-10-2", "test4-mod-10", 2, "Lesson 10.2: C++20 Ranges & Modern Views Pipelining", 2, 25,
`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    std::cout << "Even Numbers: ";
    // Modern C++ algorithm with lambda search
    auto it = std::find_if(numbers.begin(), numbers.end(), [](int n) {
        return n % 2 == 0;
    });

    while (it != numbers.end()) {
        std::cout << *it << " ";
        it = std::find_if(it + 1, numbers.end(), [](int n) { return n % 2 == 0; });
    }
    std::cout << std::endl;
    return 0;
}`, {
          task: "std::find_if algorithm ka use karke pehla even number search karein.",
          hint: "std::find_if(v.begin(), v.end(), [](int n) { return n % 2 == 0; });",
          expected_output: "std::find_if"
        },
        "<strong>Modern Ranges = Composable Data Pipelines!</strong> C++20 Ranges se aap bina raw iterators ke seedhe containers par functional pipelines run kar sakte hain.",
        [
          { tag: "Ranges", color: "#e0f2fe;#0369a1", title: "🌊 std::ranges", desc: "Direct container pass without separate .begin() and .end()." },
          { tag: "Views", color: "#dcfce7;#15803d", title: "⚡ Lazy Evaluation", desc: "Zero memory allocation lazy transforms using pipeline operator (|)." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-cpp-10-1", question: "STL ranges `[begin, end)` half-open interval kyu hoti hain?", options: ["`begin` first element ko include karta hai aur `end` last element ke theek baad (past-the-end) point karta hai", "Dono elements excluded hote hain", "Dono included hote hain", "End pehle element ko point karta hai"], correct_index: 0, explanation: "Half-open ranges allow clean loop termination conditions and zero-element range handling." },
          { id: "q-cpp-10-2", question: "`std::sort` algorithm ki computational time complexity kya hoti hai?", options: ["O(N log N) IntroSort (Quicksort + Heapsort + Insertion sort)", "O(N^2) Bubble sort", "O(N) Linear", "O(1) Instant"], correct_index: 0, explanation: "std::sort uses IntroSort guaranteeing O(N log N) worst-case time complexity." },
          { id: "q-cpp-10-3", question: "`std::accumulate` function kis header file mein define hota hai?", options: ["`<numeric>`", "`<algorithm>`", "`<vector>`", "`<iostream>`"], correct_index: 0, explanation: "Mathematical sequence operations like accumulate and inner_product live in <numeric>." },
          { id: "q-cpp-10-4", question: "C++20 Ranges ka primary advantage kya hai?", options: ["Iterators (.begin(), .end()) likhe bina clean syntax aur lazy views pipelining (`| std::views::filter(...)`)", "Compile error hide karna", "Memory 0 karna", "Pointers remove karna"], correct_index: 0, explanation: "Ranges simplify algorithm calls by taking whole containers and enabling composable view pipelines." },
          { id: "q-cpp-10-5", question: "`std::find_if` algorithm kya return karta hai?", options: ["First matching element ka Iterator (ya agar na mile toh `end()` iterator)", "Boolean True/False", "Element ka index number", "Total count"], correct_index: 0, explanation: "find_if returns an iterator pointing to the first element satisfying the predicate." }
        ]
      }
    },
    {
      id: "test4-mod-11",
      course_id: "course-test-4-cpp",
      module_number: 11,
      title: "Module 11: Modern Memory Management & Smart Pointers",
      description: "std::unique_ptr (Exclusive Ownership & Zero Cost), std::shared_ptr (Reference Counting), std::weak_ptr (Breaking Circular References), std::make_unique vs std::make_shared.",
      order_index: 11,
      lessons: [
        makeLesson("test4-l-11-1", "test4-mod-11", 1, "Lesson 11.1: std::unique_ptr & Exclusive Zero-Cost Ownership", 1, 30,
`#include <iostream>
#include <memory>

class AudioClip {
public:
    std::string trackName;
    AudioClip(std::string name) : trackName(name) {
        std::cout << "🎵 Loaded sound track: " << trackName << std::endl;
    }
    ~AudioClip() {
        std::cout << "🔇 Unloaded sound track from RAM: " << trackName << std::endl;
    }
    void play() { std::cout << "▶️ Playing: " << trackName << std::endl; }
};

int main() {
    // Unique ownership: Zero memory overhead compared to raw pointer!
    std::unique_ptr<AudioClip> clip = std::make_unique<AudioClip>("battle_theme.wav");
    clip->play();

    // Ownership can only be MOVED, never copied!
    std::unique_ptr<AudioClip> newOwner = std::move(clip);
    newOwner->play();

    // Automatically destroyed when newOwner exits scope!
    return 0;
}`, {
          task: "std::make_unique se integer smart pointer banayein.",
          hint: "auto ptr = std::make_unique<int>(42);",
          expected_output: "make_unique"
        },
        "<strong>Never write 'delete' in Modern C++!</strong> <code>std::unique_ptr</code> compile-time exclusive ownership manage karta hai jisme 0 byte extra runtime cost hoti hai aur memory leak impossible ho jata hai.",
        [
          { tag: "make_unique", color: "#e0f2fe;#0369a1", title: "⚡ std::make_unique", desc: "Exception-safe single allocation." },
          { tag: "Move Only", color: "#fee2e2;#b91c1c", title: "🚫 No Copies Allowed", desc: "Copy constructor is deleted; ownership must be transferred with std::move." }
        ],
        ""
        ),
        makeLesson("test4-l-11-2", "test4-mod-11", 2, "Lesson 11.2: std::shared_ptr & std::weak_ptr Mechanics", 2, 30,
`#include <iostream>
#include <memory>

class Texture {
public:
    std::string filename;
    Texture(std::string name) : filename(name) {
        std::cout << "🖼️ Texture loaded: " << filename << std::endl;
    }
    ~Texture() {
        std::cout << "🗑️ Texture released from GPU: " << filename << std::endl;
    }
};

int main() {
    // Shared Ownership: Reference counted pointer
    std::shared_ptr<Texture> t1 = std::make_shared<Texture>("player_skin.png");
    std::cout << "Reference Count: " << t1.use_count() << std::endl;

    {
        std::shared_ptr<Texture> t2 = t1; // Shared ownership!
        std::cout << "Ref Count inside inner scope: " << t1.use_count() << std::endl;
    } // t2 destroyed, count decremented to 1

    std::cout << "Ref Count after inner scope: " << t1.use_count() << std::endl;
    return 0;
}`, {
          task: "std::shared_ptr create karein aur uska use_count() print karein.",
          hint: "auto sp = std::make_shared<int>(10); std::cout << sp.use_count();",
          expected_output: "make_shared"
        },
        "<strong>Shared Ownership & Reference Counting!</strong> <code>std::shared_ptr</code> tracks how many owners exist. When the last owner dies (use_count == 0), the resource is automatically freed.",
        [
          { tag: "shared_ptr", color: "#e0f2fe;#0369a1", title: "👥 Reference Counting", desc: "Atomic control block tracking active owners." },
          { tag: "weak_ptr", color: "#fef3c7;#b45309", title: "⛓️ std::weak_ptr", desc: "Breaks circular reference memory leaks without incrementing ref count." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-cpp-11-1", question: "`std::unique_ptr` copy karne ki koshish karne par kya hota hai?", options: ["Compile-time error aati hai kyunki copy constructor deleted (`= delete`) hota hai", "Program crash hota hai", "Deep copy banti hai", "Memory leak hota hai"], correct_index: 0, explanation: "unique_ptr strictly enforces single unique ownership; it is move-only." },
          { id: "q-cpp-11-2", question: "`std::shared_ptr` underlying resource ko kab deallocate karta hai?", options: ["Jab uska reference count drop hokar exactly 0 ho jata hai (Last owner destroyed)", "Har function return par", "Jaise hi pehla pointer destroy ho", "Operating system reboot par"], correct_index: 0, explanation: "shared_ptr maintains an atomic reference count; the managed object is destroyed when use_count reaches 0." },
          { id: "q-cpp-11-3", question: "`std::weak_ptr` ka primary use case kya hai?", options: ["Circular references ko break karke shared_ptr memory leaks ko prevent karna", "Fast execution", "File saving", "Raw pointer banana"], correct_index: 0, explanation: "weak_ptr references a shared object without incrementing its ownership reference count, preventing cyclical deadlocks." },
          { id: "q-cpp-11-4", question: "`std::make_shared<T>()` raw `new` use karne se behtar kyu hai?", options: ["Ye managed object aur control block ko single contiguous heap chunk mein allocate karta hai (Better cache locality + 1 single allocation)", "Code readable banata hai", "Security double karta hai", "Compile time reduce karta hai"], correct_index: 0, explanation: "make_shared merges object allocation and control block allocation into a single memory block." },
          { id: "q-cpp-11-5", question: "Modern C++ guideline: Kise default smart pointer ki tarah choose karna chahiye?", options: ["`std::unique_ptr` (Zero overhead, clear ownership)", "`std::shared_ptr` always", "Raw pointer always", "`void*` pointer"], correct_index: 0, explanation: "Standard C++ guidelines: Always default to std::unique_ptr, and upgrade to std::shared_ptr only when true shared ownership is required." }
        ]
      }
    },
    {
      id: "test4-mod-12",
      course_id: "course-test-4-cpp",
      module_number: 12,
      title: "Module 12: Capstone Project — High-Performance Game Engine & Inventory",
      description: "Polymorphic Entity Component System, Smart Pointer Lifecycle, RAII inventory, Operator Overloading, Move semantics in a fully functional console game engine.",
      order_index: 12,
      lessons: [
        makeLesson("test4-l-12-1", "test4-mod-12", 1, "Lesson 12.1: Game Engine ECS Architecture & Memory Management", 1, 40,
`#include <iostream>
#include <vector>
#include <memory>
#include <string>

// Abstract GameObject
class GameObject {
public:
    std::string name;
    GameObject(std::string n) : name(n) {}
    virtual void update() = 0;
    virtual void render() const = 0;
    virtual ~GameObject() = default;
};

class Hero : public GameObject {
private:
    int hp;
    int mana;

public:
    Hero(std::string n, int h, int m) : GameObject(n), hp(h), mana(m) {}

    void update() override {
        std::cout << "⚔️ [Hero Update] " << name << " regenerating mana (+5)" << std::endl;
        mana += 5;
    }

    void render() const override {
        std::cout << "🛡️ [Render] " << name << " | HP: " << hp << " | Mana: " << mana << std::endl;
    }
};

int main() {
    std::cout << "🎮 === Starting Modern C++ Game Engine ===" << std::endl;
    std::vector<std::unique_ptr<GameObject>> scene;
    scene.push_back(std::make_unique<Hero>("Aragorn", 100, 50));

    for (const auto& obj : scene) {
        obj->update();
        obj->render();
    }
    std::cout << "✅ Game Loop cycle finished with zero leaks!" << std::endl;
    return 0;
}`, {
          task: "Scene vector mein ek naya Hero instantiate karein std::make_unique ka use karke.",
          hint: "scene.push_back(std::make_unique<Hero>(\"Legolas\", 90, 80));",
          expected_output: "scene.push_back"
        },
        "<strong>Capstone Project Architecture!</strong> Is comprehensive project mein aapne <strong>Smart Pointers</strong>, <strong>Polymorphic Dynamic Dispatch</strong>, <strong>RAII Memory Management</strong>, aur <strong>Zero-Cost STL Containers</strong> ko combine karke production-grade game architecture create kiya hai!",
        [
          { tag: "Architecture", color: "#e0f2fe;#0369a1", title: "🏆 Enterprise C++ Capstone", desc: "Full polymorphic game loop engine." }
        ],
        ""
        ),
        makeLesson("test4-l-12-2", "test4-mod-12", 2, "Lesson 12.2: Inventory Management System with RAII & Move Semantics", 2, 35,
`#include <iostream>
#include <vector>
#include <memory>
#include <string>

class Item {
public:
    std::string title;
    int power;
    Item(std::string t, int p) : title(t), power(p) {}
};

class Inventory {
private:
    std::vector<std::unique_ptr<Item>> slots;

public:
    void addItem(std::unique_ptr<Item> item) {
        std::cout << "🎒 Adding item: " << item->title << " (Power " << item->power << ")" << std::endl;
        slots.push_back(std::move(item)); // Ownership moved into inventory!
    }

    void listItems() const {
        std::cout << "--- Inventory Items ---" << std::endl;
        for (const auto& it : slots) {
            std::cout << "• " << it->title << " [Power: " << it->power << "]" << std::endl;
        }
    }
};

int main() {
    Inventory bag;
    bag.addItem(std::make_unique<Item>("Excalibur Sword", 99));
    bag.addItem(std::make_unique<Item>("Elixir of Life", 50));
    bag.listItems();
    return 0;
}`, {
          task: "Inventory mein ek naya Shield item add karein.",
          hint: "bag.addItem(std::make_unique<Item>(\"Mythril Shield\", 75));",
          expected_output: "bag.addItem"
        },
        "<strong>Inventory Ownership Flow!</strong> Har inventory item ka ek single exclusive owner hota hai, aur items ko transfer karte waqt Move Semantics (<code>std::move</code>) memory allocations ko 100% eliminate karta hai.",
        [
          { tag: "Move", color: "#dcfce7;#15803d", title: "⚡ std::move Transfer", desc: "Zero allocations when picking or dropping inventory items." },
          { tag: "RAII", color: "#e0f2fe;#0369a1", title: "🛡️ Automatic Destruction", desc: "Inventory destruct hone par saare items clean memory sweep karte hain." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-cpp-12-1", question: "Game Engine architecture mein `std::vector<std::unique_ptr<GameObject>>` use karne ka main benefit kya hota hai?", options: ["Polymorphic dynamic dispatch support karta hai aur scene clear hone par objects automatically free ho jaate hain", "Game ko 4K render karta hai", "Graphics card unlock karta hai", "Hard drive fast karta hai"], correct_index: 0, explanation: "Vector of unique_ptr provides polymorphic storage with guaranteed automatic lifecycle management." },
          { id: "q-cpp-12-2", question: "Game loop execution pipeline ka standard sequence kya hota hai?", options: ["Process Input -> Update Game State -> Render Graphics Frame", "Render -> Exit -> Input", "Compile -> Restart -> Render", "Delete -> Draw -> Input"], correct_index: 0, explanation: "Standard game engines process user input first, update world physics/AI next, and render the resulting frame." },
          { id: "q-cpp-12-3", question: "Inventory system mein items transfer karte waqt `std::move` kyu use hota hai?", options: ["Item ka single exclusive ownership bag ko transfer karne ke liye bina expensive heap allocation kiye", "Item duplicate karne ke liye", "Item delete karne ke liye", "Sound effect play karne ke liye"], correct_index: 0, explanation: "std::move transfers the unique_ptr ownership directly into the inventory slot without duplicating heap data." },
          { id: "q-cpp-12-4", question: "Modern C++ systems code mein raw pointers kab use kiye jane chahiye?", options: ["Non-owning observational access ke liye (Jahan pointer memory lifecycle control nahi karta)", "Hamesha har jagah", "Kabhi nahi", "Sirf main() mein"], correct_index: 0, explanation: "Raw pointers are acceptable as non-owning observers when ownership is strictly managed by smart pointers/RAII." },
          { id: "q-cpp-12-5", question: "C++ Enterprise Codebase build karte waqt memory leak detect karne ke liye industry standard tools kaunse hain?", options: ["Valgrind & AddressSanitizer (ASan)", "Notepad", "Antivirus", "Task Manager"], correct_index: 0, explanation: "AddressSanitizer (ASan) and Valgrind are the gold standard tools for diagnosing memory leaks and heap corruption." }
        ]
      }
    }
  ],
  final_exam: {
    passing_score: 60,
    time_limit_minutes: 30,
    questions: [
      { id: "fe-cpp-1", question: "Modern C++ vs Legacy C++ mein sabse fundamental difference kya hai?", options: ["Modern C++ (C++11+) mein RAII, Move Semantics, Smart Pointers aur STL algorithms raw manual pointer/memory operations ko eliminate karte hain", "Modern C++ slow hai", "Legacy C++ mein classes nahi hoti", "Dono identical hain"], correct_index: 0, explanation: "Modern C++ emphasizes safe ownership models, zero-cost abstractions, and value semantics." },
      { id: "fe-cpp-2", question: "C++ Compilation pipeline mein 'Linker' ka exact role kya hota hai?", options: ["Multiple translation units ke compiled object files (.o) aur external libraries ko combine karke final executable banana", "Syntax check karna", "Variables initialize karna", "Memory allocate karna"], correct_index: 0, explanation: "The Linker resolves cross-file symbols and connects object files into a runnable binary." },
      { id: "fe-cpp-3", question: "Move Semantics runtime speed ko kaise drastically boost karti hai?", options: ["Expensive deep memory copy karne ke bajaye directly pointers swap/steal karti hai (O(1) time complexity)", "CPU clock speed badhati hai", "Memory double karti hai", "Threads lock karti hai"], correct_index: 0, explanation: "Move semantics transforms O(N) buffer allocations into instant O(1) pointer transfers." },
      { id: "fe-cpp-4", question: "Virtual Destructor Base class mein na lagane se kya fatal issue create hota hai?", options: ["Base pointer se delete karne par Derived class ke resources clean nahi hote aur Undefined Behavior / Memory Leaks hote hain", "Syntax error compile time par aati hai", "Code run nahi hota", "File corrupt ho jaati hai"], correct_index: 0, explanation: "Deleting via a base pointer with a non-virtual destructor bypasses derived class destruction logic." },
      { id: "fe-cpp-5", question: "Resource Allocation Is Initialization (RAII) ka golden rule kya hai?", options: ["Resources (memory, files, sockets, locks) object ke lifetime se bandhe hone chahiye aur destructor mein automatically release hone chahiye", "Har variable global hona chahiye", "Har class singleton honi chahiye", "Memory manual free karni chahiye"], correct_index: 0, explanation: "RAII guarantees deterministic, leak-free resource cleanup through stack unwinding." }
    ]
  }
};

const outputPath = path.join(process.cwd(), 'Courses', 'test-4.json');
fs.writeFileSync(outputPath, JSON.stringify(cppFullCourse, null, 2), 'utf-8');
console.log(`✅ Full 12-Module C++ Course (2 Units per module) generated at ${outputPath}`);
