import fs from 'fs';
import path from 'path';
import { makeLesson } from './helpers';

// Helper to rebuild course cleanly
export function enrichCourses() {
  console.log("Loading all 6 courses...");

  const test1 = JSON.parse(fs.readFileSync('Courses/test-1.json', 'utf-8'));
  const test2 = JSON.parse(fs.readFileSync('Courses/test-2.json', 'utf-8'));
  const test3 = JSON.parse(fs.readFileSync('Courses/test-3.json', 'utf-8'));
  const test4 = JSON.parse(fs.readFileSync('Courses/test-4.json', 'utf-8'));
  const test5 = JSON.parse(fs.readFileSync('Courses/test-5.json', 'utf-8'));
  const test6 = JSON.parse(fs.readFileSync('Courses/test-6.json', 'utf-8'));

  // ============================================================
  // COURSE 2: Java Masterclass
  // Desired Counts: [4, 3, 5, 2, 4, 3, 5, 3, 4, 3]
  // ============================================================
  // Mod 1 (JVM, Variables): ensure 4 lessons
  while (test2.modules[0].lessons.length < 4) {
    const lIdx = test2.modules[0].lessons.length + 1;
    test2.modules[0].lessons.push(
      makeLesson(
        `test2-l-1-${lIdx}`, "test2-mod-1", lIdx,
        `Lesson 1.${lIdx}: Type Casting & Primitive Memory Footprint in Java`, lIdx, 25, "java",
        `public class Main {
    public static void main(String[] args) {
        // Widening Casting (Implicit) - byte -> short -> int -> long -> float -> double
        int myInt = 9;
        double myDouble = myInt; // Automatic casting
        
        // Narrowing Casting (Explicit)
        double price = 99.99;
        int roundedPrice = (int) price; // Manual truncation
        
        System.out.println("Original int: " + myInt);
        System.out.println("Widened double: " + myDouble);
        System.out.println("Truncated price: " + roundedPrice);
    }
}`,
        {
          task: "Cast a double value 45.78 to an int and print the result.",
          hint: "double d = 45.78; int i = (int) d; System.out.println(i);",
          expected_output: "45"
        },
        "Java strongly typed language hai. Jab aap smaller data type ko larger type mein dalte hain (e.g. int -> double) toh JVM bina data loss ke automatically convert kar deta hai (Widening). Lekin reverse case mein manual cast lagana padta hai (Narrowing).",
        [
          { tag: "Memory Safe", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Widening Casting", desc: "No data loss, JVM automatically promotes smaller types." },
          { tag: "Explicit", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Narrowing Casting", desc: "Possible precision loss, requires explicit (targetType) syntax." }
        ],
        `<div class="theory-card"><p>Primitive types stack memory mein exact bit width ke sath store hote hain (byte: 8-bit, int: 32-bit, double: 64-bit).</p></div>`
      )
    );
  }

  // Mod 2 (Conditionals): ensure 3 lessons
  while (test2.modules[1].lessons.length < 3) {
    const lIdx = test2.modules[1].lessons.length + 1;
    test2.modules[1].lessons.push(
      makeLesson(
        `test2-l-2-${lIdx}`, "test2-mod-2", lIdx,
        `Lesson 2.${lIdx}: Modern Enhanced Switch Expressions (Java 14+)`, lIdx, 20, "java",
        `public class Main {
    public static void main(String[] args) {
        String day = "MONDAY";
        
        // Modern Java switch expression with arrow syntax and return value
        int workHours = switch (day) {
            case "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" -> 8;
            case "SATURDAY" -> 4;
            case "SUNDAY" -> 0;
            default -> throw new IllegalArgumentException("Invalid day: " + day);
        };
        
        System.out.println(day + " Work Hours: " + workHours);
    }
}`,
        {
          task: "Write a modern switch expression that returns 'Weekend' for SATURDAY and 'Weekday' for MONDAY.",
          hint: "String type = switch(day) { case \"SATURDAY\", \"SUNDAY\" -> \"Weekend\"; default -> \"Weekday\"; };",
          expected_output: "Weekday"
        },
        "Traditional switch statements mein fall-through bugs aur multiple break statements ki zaroorat hoti thi. Modern Java switch expressions concise hote hain aur directly values return kar sakte hain.",
        [
          { tag: "Java 14+", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Arrow Syntax", desc: "No fallthrough bug risk, concise clean expressions." }
        ],
        `<div class="theory-card"><p>Switch expressions yield values cleanly without mutating outer variables.</p></div>`
      )
    );
  }

  // Mod 3 (Loops): ensure 5 lessons
  while (test2.modules[2].lessons.length < 5) {
    const lIdx = test2.modules[2].lessons.length + 1;
    test2.modules[2].lessons.push(
      makeLesson(
        `test2-l-3-${lIdx}`, "test2-mod-3", lIdx,
        `Lesson 3.${lIdx}: Advanced Iteration: Enhanced For-Each & Labeled Loops in Java`, lIdx, 25, "java",
        `public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 99, 6},
            {7, 8, 9}
        };
        
        // Labeled break to escape multi-level nested loops instantly
        searchLoop:
        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] == 99) {
                    System.out.println("Found target 99 at [" + r + "][" + c + "]! Exiting all loops.");
                    break searchLoop;
                }
            }
        }
    }
}`,
        {
          task: "Use an enhanced for-each loop to compute the sum of int[] arr = {10, 20, 30} and print it.",
          hint: "int sum = 0; for(int num : arr) sum += num; System.out.println(sum);",
          expected_output: "60"
        },
        "Nested loops mein deep search karte waqt regular 'break' sirf innermost loop ko terminate karta hai. 'Labeled break' aapko ek single instruction se pure multi-level loop structure se bahar nikal deta hai.",
        [
          { tag: "Loop Control", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Labeled Jump", desc: "Directly breaks out of the named outer iteration loop." }
        ],
        `<div class="theory-card"><p>Clean iteration patterns avoid unnecessary flag boolean variables.</p></div>`
      )
    );
  }

  // Mod 4 (Methods): 2 lessons
  test2.modules[3].lessons = test2.modules[3].lessons.slice(0, 2);

  // Mod 5 (Arrays): ensure 4 lessons
  while (test2.modules[4].lessons.length < 4) {
    const lIdx = test2.modules[4].lessons.length + 1;
    test2.modules[4].lessons.push(
      makeLesson(
        `test2-l-5-${lIdx}`, "test2-mod-5", lIdx,
        `Lesson 5.${lIdx}: Java Arrays Class Utilities & Jagged Arrays`, lIdx, 25, "java",
        `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {45, 12, 89, 2, 67};
        
        // Built-in Dual-Pivot Quicksort
        Arrays.sort(numbers);
        System.out.println("Sorted: " + Arrays.toString(numbers));
        
        // Binary Search in O(log N)
        int index = Arrays.binarySearch(numbers, 45);
        System.out.println("Found 45 at index: " + index);
    }
}`,
        {
          task: "Create array int[] arr = {5, 3, 1}, sort it using Arrays.sort, and print using Arrays.toString(arr).",
          hint: "Arrays.sort(arr); System.out.println(Arrays.toString(arr));",
          expected_output: "[1, 3, 5]"
        },
        "Arrays utility class Java heap arrays ke sath kaam karne ke liye optimized searching, sorting, copying, aur deep equality checks provide karti hai.",
        [
          { tag: "java.util", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Arrays Helper", desc: "Dual-pivot quicksort and binary search methods." }
        ],
        `<div class="theory-card"><p>Standard library implementations offer maximum cache efficiency.</p></div>`
      )
    );
  }

  // Mod 6 (Classes & OOP): 3 lessons
  test2.modules[5].lessons = test2.modules[5].lessons.slice(0, 3);

  // Mod 7 (Inheritance & Polymorphism): ensure 5 lessons
  while (test2.modules[6].lessons.length < 5) {
    const lIdx = test2.modules[6].lessons.length + 1;
    test2.modules[6].lessons.push(
      makeLesson(
        `test2-l-7-${lIdx}`, "test2-mod-7", lIdx,
        `Lesson 7.${lIdx}: Abstract Classes vs Interface Contracts in Java`, lIdx, 25, "java",
        `abstract class PaymentProcessor {
    // Concrete method with shared business logic
    public void logTransaction(double amount) {
        System.out.println("Auditing transaction amount: Rs." + amount);
    }
    
    // Abstract contract to be implemented by child gateways
    public abstract boolean processPayment(double amount);
}

class UPIPayment extends PaymentProcessor {
    @Override
    public boolean processPayment(double amount) {
        logTransaction(amount);
        System.out.println("UPI transfer completed successfully.");
        return true;
    }
}

public class Main {
    public static void main(String[] args) {
        PaymentProcessor gateway = new UPIPayment();
        gateway.processPayment(1500.0);
    }
}`,
        {
          task: "Instantiate UPIPayment through PaymentProcessor interface reference and invoke processPayment.",
          hint: "PaymentProcessor p = new UPIPayment(); p.processPayment(500);",
          expected_output: "UPI transfer completed successfully."
        },
        "Abstract classes partial implementation aur state (fields) share karne ke liye use hoti hain, jabki interfaces pure architectural contracts define karti hain.",
        [
          { tag: "Polymorphic", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Abstract Contract", desc: "Enforces standard API signatures across all concrete subclasses." }
        ],
        `<div class="theory-card"><p>Loose coupling enables pluggable business engines in enterprise apps.</p></div>`
      )
    );
  }

  // Mod 8 (Interfaces): 3 lessons
  test2.modules[7].lessons = test2.modules[7].lessons.slice(0, 3);

  // Mod 9 (Exceptions): ensure 4 lessons
  while (test2.modules[8].lessons.length < 4) {
    const lIdx = test2.modules[8].lessons.length + 1;
    test2.modules[8].lessons.push(
      makeLesson(
        `test2-l-9-${lIdx}`, "test2-mod-9", lIdx,
        `Lesson 9.${lIdx}: AutoCloseable & Try-With-Resources Architecture`, lIdx, 25, "java",
        `import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Try-with-resources automatically closes stream resources even on exceptions
        try (ByteArrayInputStream stream = new ByteArrayInputStream("Hello Java Stream".getBytes())) {
            int data = stream.read();
            System.out.println("Read first byte ASCII: " + data);
        } catch (IOException e) {
            System.err.println("Stream error: " + e.getMessage());
        }
        System.out.println("Stream closed automatically by JVM!");
    }
}`,
        {
          task: "Implement a try-with-resources block with ByteArrayInputStream and print 'Closed cleanly'.",
          hint: "try(ByteArrayInputStream b = new ByteArrayInputStream(new byte[]{1})) { System.out.println(\"Closed cleanly\"); }",
          expected_output: "Closed cleanly"
        },
        "Java 7 se Try-With-Resources ne manual finally { stream.close(); } boilerplate ko completely eliminate kar diya. Jo bhi class AutoCloseable implement karti hai, JVM uska disposal guarantee karta hai.",
        [
          { tag: "Resource Safety", color: "rgba(16, 185, 129, 0.15); #10b981", title: "AutoCloseable", desc: "Guaranteed memory & socket leak prevention." }
        ],
        `<div class="theory-card"><p>Modern resource safety in enterprise microservices.</p></div>`
      )
    );
  }

  // Mod 10 (Collections & Capstone): 3 lessons
  test2.modules[9].lessons = test2.modules[9].lessons.slice(0, 3);

  // Renumber test2
  test2.modules.forEach((m: any, mIdx: number) => {
    m.lessons.forEach((l: any, lIdx: number) => {
      l.lesson_number = lIdx + 1;
      l.order_index = lIdx + 1;
      l.id = `test2-l-${mIdx + 1}-${lIdx + 1}`;
      l.module_id = `test2-mod-${mIdx + 1}`;
    });
  });

  fs.writeFileSync('Courses/test-2.json', JSON.stringify(test2, null, 2));
  console.log("✅ Test 2 (Java) varied and updated!");

  // ============================================================
  // COURSE 3: C Programming Masterclass
  // Desired Counts: [4, 3, 5, 3, 4, 2, 5, 4, 3, 2, 4, 3] (12 modules)
  // ============================================================
  // Mod 1: ensure 4 lessons
  while (test3.modules[0].lessons.length < 4) {
    const lIdx = test3.modules[0].lessons.length + 1;
    test3.modules[0].lessons.push(
      makeLesson(
        `test3-l-1-${lIdx}`, "test3-mod-1", lIdx,
        `Lesson 1.${lIdx}: Constants, Preprocessor Directives & Macro Expansions (#define)`, lIdx, 20, "c",
        `#include <stdio.h>

#define MAX_BUFFER_SIZE 1024
#define SQUARE(x) ((x) * (x))

int main() {
    const int read_only_port = 8080;
    
    printf("Max Buffer: %d bytes\\n", MAX_BUFFER_SIZE);
    printf("Server Port: %d\\n", read_only_port);
    printf("Square of (3 + 2): %d\\n", SQUARE(3 + 2));
    
    return 0;
}`,
        {
          task: "Define a macro CUBE(x) that calculates x * x * x with safe parentheses and print CUBE(3).",
          hint: "#define CUBE(x) ((x)*(x)*(x)) in starter code, then printf(\"%d\", CUBE(3));",
          expected_output: "27"
        },
        "C Preprocessor compilation se pehle run hota hai aur text substitution karta hai. Constants aur macros performance critical systems code mein constant magic numbers ko organize karte hain.",
        [
          { tag: "Preprocessor", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "#define Directives", desc: "Compile-time text substitution with zero runtime overhead." }
        ],
        `<div class="theory-card"><p>Macros must always enclose arguments in parentheses to prevent operator precedence bugs.</p></div>`
      )
    );
  }

  // Mod 3 (Loops): ensure 5 lessons
  while (test3.modules[2].lessons.length < 5) {
    const lIdx = test3.modules[2].lessons.length + 1;
    test3.modules[2].lessons.push(
      makeLesson(
        `test3-l-3-${lIdx}`, "test3-mod-3", lIdx,
        `Lesson 3.${lIdx}: Low-Level Loop Invariants & Infinite Loop Starvation`, lIdx, 25, "c",
        `#include <stdio.h>

int main() {
    int counter = 5;
    
    // Controlled loop invariant demonstration
    while (counter > 0) {
        printf("Tick: %d\\n", counter);
        counter--; // Crucial decrement step to prevent infinite loop
    }
    printf("Blastoff! Process exited loop cleanly.\\n");
    return 0;
}`,
        {
          task: "Write a for loop that prints countdown 3, 2, 1 and then 'Done!'.",
          hint: "for(int i=3; i>=1; i--) printf(\"%d \", i); printf(\"Done!\\n\");",
          expected_output: "3 2 1 Done!"
        },
        "Low-level C systems mein loop bounds out of limit hone par CPU thread 100% compute consume kar sakta hai (OS starvation). Har loop invariant ko strict termination condition provide karein.",
        [
          { tag: "Systems Logic", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Loop Invariant", desc: "Formal mathematical guarantee of loop termination." }
        ],
        `<div class="theory-card"><p>Embedded & kernel code relies on strictly bounded iterations.</p></div>`
      )
    );
  }

  // Mod 5 (Arrays): ensure 4 lessons
  while (test3.modules[4].lessons.length < 4) {
    const lIdx = test3.modules[4].lessons.length + 1;
    test3.modules[4].lessons.push(
      makeLesson(
        `test3-l-5-${lIdx}`, "test3-mod-5", lIdx,
        `Lesson 5.${lIdx}: Multidimensional Array Row-Major Memory Offsets`, lIdx, 25, "c",
        `#include <stdio.h>

int main() {
    int matrix[2][3] = {
        {10, 20, 30},
        {40, 50, 60}
    };
    
    // Row-major order memory offset calculation
    // Address of matrix[i][j] = Base + (i * cols + j) * sizeof(type)
    int *raw_ptr = (int *)matrix;
    
    printf("Access via indexing matrix[1][2]: %d\\n", matrix[1][2]);
    printf("Access via flat offset raw_ptr[1 * 3 + 2]: %d\\n", *(raw_ptr + (1 * 3 + 2)));
    
    return 0;
}`,
        {
          task: "Access the element at row 1, col 1 of matrix { {1,2}, {3,4} } using direct flat pointer arithmetic and print it.",
          hint: "int *p = (int*)matrix; printf(\"%d\", *(p + (1*2 + 1)));",
          expected_output: "4"
        },
        "C mein 2D arrays actual mein multi-dimensional RAM chips nahi hote, balki ek continuous 1D block of bytes hote hain jo Row-Major order mein store hote hain.",
        [
          { tag: "Hardware RAM", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Row-Major Layout", desc: "Linear continuous memory layout optimized for CPU cache lines." }
        ],
        `<div class="theory-card"><p>Understanding flat memory offsets enables high-performance graphics & matrix operations.</p></div>`
      )
    );
  }

  // Mod 7 (Pointers): ensure 5 lessons
  while (test3.modules[6].lessons.length < 5) {
    const lIdx = test3.modules[6].lessons.length + 1;
    test3.modules[6].lessons.push(
      makeLesson(
        `test3-l-7-${lIdx}`, "test3-mod-7", lIdx,
        `Lesson 7.${lIdx}: Function Pointers & Callback Architecture in C`, lIdx, 30, "c",
        `#include <stdio.h>

// Callback function signature
typedef int (*MathOperation)(int, int);

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

void executeAndLog(MathOperation op, int x, int y) {
    int result = op(x, y);
    printf("Computed Result via Function Pointer: %d\\n", result);
}

int main() {
    executeAndLog(add, 10, 20);
    executeAndLog(multiply, 5, 6);
    return 0;
}`,
        {
          task: "Define a function pointer that takes two ints and calls multiply(4, 5). Print result.",
          hint: "MathOperation op = multiply; printf(\"%d\", op(4, 5));",
          expected_output: "20"
        },
        "Function pointers code segment memory addresses ko hold karte hain. Ye C mein event-driven programming, dynamic plugin architectures, aur OS interrupt dispatch tables ka engine hain.",
        [
          { tag: "Callbacks", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Function Pointers", desc: "Enables runtime polymorphism and event handlers in pure C." }
        ],
        `<div class="theory-card"><p>Linux kernel drivers use function pointer vtables for hardware device control.</p></div>`
      )
    );
  }

  // Mod 8 (Heap Allocation): ensure 4 lessons
  while (test3.modules[7].lessons.length < 4) {
    const lIdx = test3.modules[7].lessons.length + 1;
    test3.modules[7].lessons.push(
      makeLesson(
        `test3-l-8-${lIdx}`, "test3-mod-8", lIdx,
        `Lesson 8.${lIdx}: Dynamic Memory Safety, Memory Leaks & Valgrind Principles`, lIdx, 25, "c",
        `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *buffer = (int *)malloc(5 * sizeof(int));
    if (buffer == NULL) {
        fprintf(stderr, "Heap Allocation Failed!\\n");
        return 1;
    }
    
    for (int i = 0; i < 5; i++) buffer[i] = (i + 1) * 10;
    printf("Buffer element 0: %d\\n", buffer[0]);
    
    // Clean deallocation and pointer nullification
    free(buffer);
    buffer = NULL; // Prevents dangling pointer attacks
    printf("Memory freed and pointer safely set to NULL.\\n");
    
    return 0;
}`,
        {
          task: "Allocate memory for 1 int with malloc, assign value 42, print it, free it, and set pointer to NULL.",
          hint: "int *p = malloc(sizeof(int)); *p = 42; printf(\"%d\", *p); free(p); p = NULL;",
          expected_output: "42"
        },
        "Memory leak tab hota hai jab heap allocation ko bina free kiye pointer reference kho diya jaye. Hamesha free() ke baad pointer ko NULL set karein.",
        [
          { tag: "Zero Leak", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Defensive Deallocation", desc: "Always nullify pointers after free() to prevent Use-After-Free vulnerabilities." }
        ],
        `<div class="theory-card"><p>Valgrind audit checks ensure 0 bytes memory leaks before shipping C binaries.</p></div>`
      )
    );
  }

  // Mod 11 (Files): ensure 4 lessons
  while (test3.modules[10].lessons.length < 4) {
    const lIdx = test3.modules[10].lessons.length + 1;
    test3.modules[10].lessons.push(
      makeLesson(
        `test3-l-11-${lIdx}`, "test3-mod-11", lIdx,
        `Lesson 11.${lIdx}: Binary File I/O (fread, fwrite) & fseek Offsets`, lIdx, 25, "c",
        `#include <stdio.h>

typedef struct {
    int id;
    char code[4];
} Record;

int main() {
    Record r1 = {101, "DEV"};
    
    // In-memory simulation of raw binary packing
    printf("Record ID: %d, Code: %s, Byte Size: %lu\\n", r1.id, r1.code, sizeof(Record));
    printf("Direct binary persistence allows instant serialization without ASCII parsing overhead.\\n");
    
    return 0;
}`,
        {
          task: "Print sizeof(Record) for a struct containing int and char[4].",
          hint: "printf(\"%lu\", sizeof(Record));",
          expected_output: "8"
        },
        "Binary files directly RAM structs ko disk par write karti hain bina text conversion ke. High speed database engines raw binary format use karte hain.",
        [
          { tag: "Low-Level I/O", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Raw Binary Streams", desc: "Zero-copy disk serialization with instant memory mapping." }
        ],
        `<div class="theory-card"><p>File seek offsets (fseek, ftell) provide O(1) random access inside multi-gigabyte files.</p></div>`
      )
    );
  }

  // Mod 12 (Capstone): ensure 3 lessons
  while (test3.modules[11].lessons.length < 3) {
    const lIdx = test3.modules[11].lessons.length + 1;
    test3.modules[11].lessons.push(
      makeLesson(
        `test3-l-12-${lIdx}`, "test3-mod-12", lIdx,
        `Lesson 12.${lIdx}: Complete Capstone Project — High-Performance Memory Database CLI`, lIdx, 30, "c",
        `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct DatabaseEntry {
    int key;
    char value[32];
    struct DatabaseEntry *next;
} Entry;

Entry* insertEntry(Entry *head, int key, const char *value) {
    Entry *new_node = (Entry *)malloc(sizeof(Entry));
    new_node->key = key;
    strncpy(new_node->value, value, 31);
    new_node->next = head;
    return new_node;
}

int main() {
    Entry *db = NULL;
    db = insertEntry(db, 1, "Alpha");
    db = insertEntry(db, 2, "Beta");
    
    printf("Top Database Entry: Key=%d, Val=%s\\n", db->key, db->value);
    
    // Free DB
    while (db != NULL) {
        Entry *temp = db;
        db = db->next;
        free(temp);
    }
    printf("Database safely cleared from Heap.\\n");
    return 0;
}`,
        {
          task: "Insert an entry with key=99, val='Master' into the linked database and print its key.",
          hint: "Entry *db = insertEntry(NULL, 99, \"Master\"); printf(\"%d\", db->key);",
          expected_output: "99"
        },
        "Real-world C software data structures, pointers, dynamic memory allocation, aur robust cleanup routines ka culmination hota hai.",
        [
          { tag: "Mastery", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Production C", desc: "Zero-leak high-speed embedded architecture." }
        ],
        `<div class="theory-card"><p>Congratulations on building a production C memory engine!</p></div>`
      )
    );
  }

  // Renumber test3
  test3.modules.forEach((m: any, mIdx: number) => {
    m.lessons.forEach((l: any, lIdx: number) => {
      l.lesson_number = lIdx + 1;
      l.order_index = lIdx + 1;
      l.id = `test3-l-${mIdx + 1}-${lIdx + 1}`;
      l.module_id = `test3-mod-${mIdx + 1}`;
    });
  });

  fs.writeFileSync('Courses/test-3.json', JSON.stringify(test3, null, 2));
  console.log("✅ Test 3 (C) varied and updated!");

  // ============================================================
  // COURSE 4: Modern C++ Masterclass
  // Desired Counts: [3, 4, 2, 5, 3, 4, 3, 5, 2, 4, 3, 2] (12 modules)
  // ============================================================
  // Mod 1: ensure 3 lessons
  while (test4.modules[0].lessons.length < 3) {
    const lIdx = test4.modules[0].lessons.length + 1;
    test4.modules[0].lessons.push(
      makeLesson(
        `test4-l-1-${lIdx}`, "test4-mod-1", lIdx,
        `Lesson 1.${lIdx}: auto Type Deduction & Modern Initialization Syntax in C++`, lIdx, 25, "cpp",
        `#include <iostream>
#include <vector>
#include <string>

int main() {
    // Uniform brace initialization prevents narrowing conversions
    auto score{98.5};
    auto name = std::string("Modern C++20");
    auto primes = std::vector<int>{2, 3, 5, 7, 11};
    
    std::cout << "Auto-deduced Double: " << score << "\\n";
    std::cout << "Auto-deduced String: " << name << "\\n";
    std::cout << "Vector Size: " << primes.size() << "\\n";
    
    return 0;
}`,
        {
          task: "Use auto to initialize a vector of strings {\"C++\", \"Rust\"} and print its first element.",
          hint: "auto v = std::vector<std::string>{\"C++\", \"Rust\"}; std::cout << v[0];",
          expected_output: "C++"
        },
        "C++11 se 'auto' compile-time type deduction karta hai bina kisi runtime cost ke. Isse complex iterator types aur template signatures clean aur refactor-friendly ban jate hain.",
        [
          { tag: "Zero-Cost", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Compile-Time auto", desc: "Types deduced at compile time with 0 runtime penalty." }
        ],
        `<div class="theory-card"><p>Uniform initialization syntax {} prevents silent narrowing conversion bugs.</p></div>`
      )
    );
  }

  // Mod 2 (References): ensure 4 lessons
  while (test4.modules[1].lessons.length < 4) {
    const lIdx = test4.modules[1].lessons.length + 1;
    test4.modules[1].lessons.push(
      makeLesson(
        `test4-l-2-${lIdx}`, "test4-mod-1", lIdx,
        `Lesson 2.${lIdx}: Stack Lifetime, Dangling References & Constexpr References`, lIdx, 25, "cpp",
        `#include <iostream>

// Return-by-reference safety check
const int& getSafeValue(const int& input) {
    return input; // Safe because caller owns memory
}

int main() {
    int original = 500;
    const int& ref = getSafeValue(original);
    
    std::cout << "Safe Const Reference Value: " << ref << "\\n";
    std::cout << "Memory location identical: " << (&original == &ref ? "YES" : "NO") << "\\n";
    
    return 0;
}`,
        {
          task: "Create a reference to an int variable x=100 and verify address matching.",
          hint: "int x=100; int& r=x; std::cout << (&x == &r);",
          expected_output: "1"
        },
        "Kabhi bhi local stack variable ka reference return na karein (Dangling Reference). References aliasing ke liye hoti hain aur unka lifetime source object se bandha hota hai.",
        [
          { tag: "Safety", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Dangling Ref Hazard", desc: "Never return references to temporary stack variables." }
        ],
        `<div class="theory-card"><p>Pass-by-const-reference guarantees zero byte copy overhead for heavy structs.</p></div>`
      )
    );
  }

  // Mod 4 (Classes & RAII): ensure 5 lessons
  while (test4.modules[3].lessons.length < 5) {
    const lIdx = test4.modules[3].lessons.length + 1;
    test4.modules[3].lessons.push(
      makeLesson(
        `test4-l-4-${lIdx}`, "test4-mod-4", lIdx,
        `Lesson 4.${lIdx}: explicit Constructors & Const-Correctness in Modern C++`, lIdx, 25, "cpp",
        `#include <iostream>
#include <string>

class BankAccount {
private:
    double balance;
public:
    // explicit keyword prevents unintended implicit conversions (e.g. BankAccount acc = 500.0)
    explicit BankAccount(double initialBalance) : balance(initialBalance) {}

    // const member function guarantees state will NOT be mutated
    double getBalance() const {
        return balance;
    }
};

int main() {
    BankAccount account{15000.0};
    std::cout << "Account Balance: Rs." << account.getBalance() << "\\n";
    return 0;
}`,
        {
          task: "Create an explicit constructor class Vector2D with x,y and a const magnitude() method.",
          hint: "class Vector2D { public: double x, y; explicit Vector2D(double x, double y): x(x), y(y){} double mag() const { return x+y; } };",
          expected_output: "Account Balance: Rs.15000"
        },
        "C++ mein 'explicit' constructors implicit conversion bugs ko compile time par hi block kar dete hain. Const member functions thread-safety aur clean architectural guarantees establish karte hain.",
        [
          { tag: "Safety Pillar", color: "rgba(16, 185, 129, 0.15); #10b981", title: "explicit Keyword", desc: "Disallows accidental implicit type coercion." }
        ],
        `<div class="theory-card"><p>Const correctness is a foundational pillar of high-reliability C++ systems.</p></div>`
      )
    );
  }

  // Mod 5: 3 lessons
  while (test4.modules[4].lessons.length < 3) {
    const lIdx = test4.modules[4].lessons.length + 1;
    test4.modules[4].lessons.push(
      makeLesson(
        `test4-l-5-${lIdx}`, "test4-mod-5", lIdx,
        `Lesson 5.${lIdx}: Constructor & Destructor Call Order in Inheritance`, lIdx, 20, "cpp",
        `#include <iostream>

class Base {
public:
    Base() { std::cout << "1. Base Constructor\\n"; }
    virtual ~Base() { std::cout << "4. Base Destructor\\n"; }
};

class Derived : public Base {
public:
    Derived() { std::cout << "2. Derived Constructor\\n"; }
    ~Derived() override { std::cout << "3. Derived Destructor\\n"; }
};

int main() {
    {
        Derived obj;
    }
    return 0;
}`,
        {
          task: "Instantiate Derived and observe the complete constructor and destructor pipeline.",
          hint: "Derived d;",
          expected_output: "1. Base Constructor\n2. Derived Constructor\n3. Derived Destructor\n4. Base Destructor"
        },
        "Constructors Base-to-Derived order mein execute hote hain, aur Destructors theek reverse (Derived-to-Base) order mein clean-up karte hain.",
        [
          { tag: "Lifecycle", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "LIFO Destruction", desc: "Stack objects are destroyed in reverse order of construction." }
        ],
        `<div class="theory-card"><p>Crucial for resource acquisition and teardown ordering.</p></div>`
      )
    );
  }

  // Mod 6 (Polymorphism): ensure 4 lessons
  while (test4.modules[5].lessons.length < 4) {
    const lIdx = test4.modules[5].lessons.length + 1;
    test4.modules[5].lessons.push(
      makeLesson(
        `test4-l-6-${lIdx}`, "test4-mod-6", lIdx,
        `Lesson 6.${lIdx}: Virtual Destructors & Polymorphic Memory Safety`, lIdx, 25, "cpp",
        `#include <iostream>

class AudioDevice {
public:
    AudioDevice() { std::cout << "Audio Hardware Initialized\\n"; }
    // Virtual destructor guarantees child cleanup when deleted via base pointer!
    virtual ~AudioDevice() { std::cout << "Audio Hardware Shutdown Safely\\n"; }
};

class Speaker : public AudioDevice {
public:
    ~Speaker() override { std::cout << "Speaker Subsystem Cleaned Up\\n"; }
};

int main() {
    AudioDevice* dev = new Speaker();
    delete dev; // Safely calls Speaker destructor THEN AudioDevice destructor!
    return 0;
}`,
        {
          task: "Create a polymorphic Base pointer holding new Derived and delete it cleanly.",
          hint: "AudioDevice* d = new Speaker(); delete d;",
          expected_output: "Speaker Subsystem Cleaned Up\nAudio Hardware Shutdown Safely"
        },
        "Agar polymorphic base class mein virtual destructor nahi hoga, to base pointer ke through 'delete' call karne par Derived class ka destructor invoke nahi hoga jisse severe memory leak ho sakta hai!",
        [
          { tag: "Critical Rule", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Virtual Destructor", desc: "Always make base class destructors virtual if classes have virtual functions." }
        ],
        `<div class="theory-card"><p>Guarantees full object destruction across polymorphic hierarchy pointers.</p></div>`
      )
    );
  }

  // Mod 7: 3 lessons
  while (test4.modules[6].lessons.length < 3) {
    const lIdx = test4.modules[6].lessons.length + 1;
    test4.modules[6].lessons.push(
      makeLesson(
        `test4-l-7-${lIdx}`, "test4-mod-7", lIdx,
        `Lesson 7.${lIdx}: Subscript Operator [] & Functor operator() Overloading`, lIdx, 25, "cpp",
        `#include <iostream>
#include <vector>

class SafeArray {
private:
    std::vector<int> data{10, 20, 30};
public:
    int& operator[](size_t index) {
        return data.at(index); // Bounds checked
    }
};

int main() {
    SafeArray arr;
    std::cout << "Indexed element 1: " << arr[1] << "\\n";
    arr[1] = 99;
    std::cout << "Modified element 1: " << arr[1] << "\\n";
    return 0;
}`,
        {
          task: "Overload operator[] to access array elements safely and print modified value.",
          hint: "arr[0] = 50; std::cout << arr[0];",
          expected_output: "Modified element 1: 99"
        },
        "Operator overloading custom data structures ko native C++ syntax aur array/function semantics provide karta hai.",
        [
          { tag: "Idiomatic C++", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Subscript Operator", desc: "Return reference int& to enable natural lvalue assignment." }
        ],
        `<div class="theory-card"><p>Natural syntax for custom matrices and containers.</p></div>`
      )
    );
  }

  // Mod 8 (Move Semantics & Rule of 5): ensure 5 lessons
  while (test4.modules[7].lessons.length < 5) {
    const lIdx = test4.modules[7].lessons.length + 1;
    test4.modules[7].lessons.push(
      makeLesson(
        `test4-l-8-${lIdx}`, "test4-mod-8", lIdx,
        `Lesson 8.${lIdx}: Perfect Forwarding with std::forward & Universal References`, lIdx, 30, "cpp",
        `#include <iostream>
#include <utility>
#include <string>

void process(const std::string& lval) {
    std::cout << "Processed as Lvalue (Copied): " << lval << "\\n";
}

void process(std::string&& rval) {
    std::cout << "Processed as Rvalue (Moved Zero-Copy): " << rval << "\\n";
}

// Template forwarding wrapper
template <typename T>
void wrapper(T&& arg) {
    process(std::forward<T>(arg)); // Preserves original value category
}

int main() {
    std::string text = "Persistent String";
    wrapper(text);                  // Passes as Lvalue
    wrapper(std::string("Temporary String")); // Passes as Rvalue
    return 0;
}`,
        {
          task: "Call wrapper with a temporary rvalue string and observe zero-copy move processing.",
          hint: "wrapper(std::string(\"Fast\"));",
          expected_output: "Processed as Rvalue (Moved Zero-Copy): Temporary String"
        },
        "std::forward template arguments ke original value category (Lvalue ya Rvalue) ko preserve karta hai, jisse std::make_unique aur factory functions bina single copy ke arguments forward karte hain.",
        [
          { tag: "High-End Modern C++", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Perfect Forwarding", desc: "T&& universal reference + std::forward<T>(arg)." }
        ],
        `<div class="theory-card"><p>Essential for high-performance standard library implementations.</p></div>`
      )
    );
  }

  // Mod 10 (STL Algorithms): ensure 4 lessons
  while (test4.modules[9].lessons.length < 4) {
    const lIdx = test4.modules[9].lessons.length + 1;
    test4.modules[9].lessons.push(
      makeLesson(
        `test4-l-10-${lIdx}`, "test4-mod-10", lIdx,
        `Lesson 10.${lIdx}: Custom Comparators & Lambda Predicates in std::sort`, lIdx, 25, "cpp",
        `#include <iostream>
#include <vector>
#include <algorithm>

struct Player {
    std::string name;
    int score;
};

int main() {
    std::vector<Player> leaderboard = {
        {"Alex", 120},
        {"Sam", 450},
        {"Jordan", 310}
    };
    
    // Sort descending by score using inline lambda comparator
    std::sort(leaderboard.begin(), leaderboard.end(), [](const Player& a, const Player& b) {
        return a.score > b.score;
    });
    
    std::cout << "Top Player: " << leaderboard[0].name << " with " << leaderboard[0].score << " pts!\\n";
    return 0;
}`,
        {
          task: "Sort an array of players by score descending and print leaderboard[0].name.",
          hint: "std::sort with lambda a.score > b.score",
          expected_output: "Top Player: Sam with 450 pts!"
        },
        "STL algorithms lambdas ke sath milkar pure imperative loops ko declarative, optimized, cache-friendly pipelines mein badal dete hain.",
        [
          { tag: "STL Power", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Custom Predicate", desc: "Lambda functions passed directly into standard algorithms." }
        ],
        `<div class="theory-card"><p>Compilers aggressively inline lambda comparators into machine code.</p></div>`
      )
    );
  }

  // Mod 11 (Smart Pointers): ensure 3 lessons
  while (test4.modules[10].lessons.length < 3) {
    const lIdx = test4.modules[10].lessons.length + 1;
    test4.modules[10].lessons.push(
      makeLesson(
        `test4-l-11-${lIdx}`, "test4-mod-11", lIdx,
        `Lesson 11.${lIdx}: std::weak_ptr & Breaking Circular Reference Memory Leaks`, lIdx, 25, "cpp",
        `#include <iostream>
#include <memory>

class Node {
public:
    std::string id;
    std::weak_ptr<Node> parent; // weak_ptr does NOT increment reference count!
    std::shared_ptr<Node> child;
    
    Node(std::string name) : id(name) {}
    ~Node() { std::cout << "Node [" << id << "] Destructed Cleanly\\n"; }
};

int main() {
    {
        auto root = std::make_shared<Node>("Root");
        auto leaf = std::make_shared<Node>("Leaf");
        root->child = leaf;
        leaf->parent = root; // Safe non-owning reference breaks circular reference leak
    }
    std::cout << "Both nodes freed from heap without any memory leak!\\n";
    return 0;
}`,
        {
          task: "Create a shared_ptr and observe weak_ptr breaking circular references cleanly.",
          hint: "auto r = std::make_shared<Node>(\"Test\");",
          expected_output: "Both nodes freed from heap without any memory leak!"
        },
        "Agar do shared_ptr ek doosre ko point karte hain toh reference count kabhi 0 nahi hota aur memory leak ho jaati hai. std::weak_ptr non-owning reference provide karta hai jo circular cycles break karta hai.",
        [
          { tag: "Zero Leak", color: "rgba(16, 185, 129, 0.15); #10b981", title: "weak_ptr Cycle Break", desc: "Observes shared_ptr without owning or incrementing use_count." }
        ],
        `<div class="theory-card"><p>Vital for trees, graphs, and parent-child observer hierarchies.</p></div>`
      )
    );
  }

  // Renumber test4
  test4.modules.forEach((m: any, mIdx: number) => {
    m.lessons.forEach((l: any, lIdx: number) => {
      l.lesson_number = lIdx + 1;
      l.order_index = lIdx + 1;
      l.id = `test4-l-${mIdx + 1}-${lIdx + 1}`;
      l.module_id = `test4-mod-${mIdx + 1}`;
    });
  });

  fs.writeFileSync('Courses/test-4.json', JSON.stringify(test4, null, 2));
  console.log("✅ Test 4 (C++) varied and updated!");

  // ============================================================
  // COURSE 5: HTML5 & CSS3 Masterclass
  // Desired Counts: [4, 3, 5, 4, 2, 4, 3, 5, 3, 2] (10 modules)
  // ============================================================
  // Mod 1: ensure 4 lessons
  while (test5.modules[0].lessons.length < 4) {
    const lIdx = test5.modules[0].lessons.length + 1;
    test5.modules[0].lessons.push(
      makeLesson(
        `test5-l-1-${lIdx}`, "test5-mod-1", lIdx,
        `Lesson 1.${lIdx}: Web Accessibility (a11y) & ARIA Landmarks`, lIdx, 25, "html",
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Accessible Web Layout</title>
</head>
<body>
  <!-- Accessible Navigation with ARIA Landmarks -->
  <nav aria-label="Main Primary Navigation">
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#courses">Courses</a></li>
    </ul>
  </nav>

  <main id="main-content" tabindex="-1">
    <h1>Accessible Enterprise Web Architecture</h1>
    <button aria-expanded="false" aria-controls="menu-dropdown">
      Menu Options
    </button>
  </main>
</body>
</html>`,
        {
          task: "Add an accessible button with aria-label='Close Dialog' and role='button'.",
          hint: "<button aria-label='Close Dialog' role='button'>✕</button>",
          expected_output: "Close Dialog"
        },
        "Web Accessibility (WCAG standard) ensure karta hai ki screen readers aur assistive technologies aapke HTML web app ko seamlessly interpret kar sakein.",
        [
          { tag: "a11y Standard", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "ARIA Landmarks", desc: "Screen reader navigation and programmatic accessibility context." }
        ],
        `<div class="theory-card"><p>Semantic HTML naturally passes 90% of accessibility audit tests.</p></div>`
      )
    );
  }

  // Mod 2: ensure 3 lessons
  while (test5.modules[1].lessons.length < 3) {
    const lIdx = test5.modules[1].lessons.length + 1;
    test5.modules[1].lessons.push(
      makeLesson(
        `test5-l-2-${lIdx}`, "test5-mod-2", lIdx,
        `Lesson 2.${lIdx}: HTML5 Audio, Video & Embedded Media Elements`, lIdx, 20, "html",
        `<video controls width="400" poster="https://placehold.co/400x225/1e293b/ffffff?text=Video+Cover">
  <source src="movie.mp4" type="video/mp4">
  <track kind="subtitles" src="subtitles_en.vtt" srclang="en" label="English">
  Your browser does not support HTML5 video streaming.
</video>`,
        {
          task: "Create a video tag with controls attribute and a source tag.",
          hint: "<video controls><source src='demo.mp4' type='video/mp4'></video>",
          expected_output: "video"
        },
        "Modern HTML5 bina flash plugins ke native hardware accelerated audio/video playback support karta hai.",
        [
          { tag: "Media Engine", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Native Video Streaming", desc: "Direct WebM/MP4 hardware accelerated rendering." }
        ],
        `<div class="theory-card"><p>Adaptive media playback with subtitle track integration.</p></div>`
      )
    );
  }

  // Mod 3 (Forms): ensure 5 lessons
  while (test5.modules[2].lessons.length < 5) {
    const lIdx = test5.modules[2].lessons.length + 1;
    test5.modules[2].lessons.push(
      makeLesson(
        `test5-l-3-${lIdx}`, "test5-mod-3", lIdx,
        `Lesson 3.${lIdx}: HTML5 RegEx Pattern Validation & Constraint Validation API`, lIdx, 25, "html",
        `<form id="regForm">
  <label for="pincode">Indian Postal Code (6 Digits):</label>
  <input 
    type="text" 
    id="pincode" 
    name="pincode" 
    required 
    pattern="^[1-9][0-9]{5}$" 
    title="Please enter a valid 6-digit PIN code starting with 1-9"
    placeholder="110001"
  />
  <button type="submit">Validate PIN</button>
</form>`,
        {
          task: "Create an input field with pattern='[0-9]{10}' for a 10-digit mobile number.",
          hint: "<input type='tel' pattern='[0-9]{10}' required />",
          expected_output: "pincode"
        },
        "HTML5 client-side validation pattern regex attributes ke sath bina heavy JavaScript ke instant browser-level form validation execute karti hai.",
        [
          { tag: "Zero-JS Form", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "RegEx Pattern Validation", desc: "Instant visual feedback with native browser validation bubble." }
        ],
        `<div class="theory-card"><p>Pre-submission validation prevents invalid network roundtrips to the backend.</p></div>`
      )
    );
  }

  // Mod 4 (CSS Specificity): ensure 4 lessons
  while (test5.modules[3].lessons.length < 4) {
    const lIdx = test5.modules[3].lessons.length + 1;
    test5.modules[3].lessons.push(
      makeLesson(
        `test5-l-4-${lIdx}`, "test5-mod-4", lIdx,
        `Lesson 4.${lIdx}: CSS Custom Properties (Variables) & The Cascade Layers (@layer)`, lIdx, 25, "html",
        `<style>
  :root {
    --primary-color: #3b82f6;
    --surface-dark: #0f172a;
    --radius-lg: 12px;
  }
  
  .glass-card {
    background: var(--surface-dark);
    border: 1px solid var(--primary-color);
    border-radius: var(--radius-lg);
    padding: 20px;
    color: #ffffff;
  }
</style>

<div class="glass-card">
  <h3>Modern CSS Variables</h3>
  <p>Dynamic runtime theming with zero build-step penalty.</p>
</div>`,
        {
          task: "Define a CSS variable --accent-color: #10b981; in :root and use it in a class.",
          hint: ":root { --accent-color: #10b981; } .box { color: var(--accent-color); }",
          expected_output: "glass-card"
        },
        "CSS Custom Properties (:root { --color: ... }) JavaScript se runtime par manipulate ki ja sakti hain aur modern dynamic theme switching ka engine hain.",
        [
          { tag: "Modern CSS", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "var(--name)", desc: "Scoped cascading dynamic variables across the DOM tree." }
        ],
        `<div class="theory-card"><p>Modern CSS @layer prevents third-party CSS specificity conflicts.</p></div>`
      )
    );
  }

  // Mod 6 (Positioning & Stacking): ensure 4 lessons
  while (test5.modules[5].lessons.length < 4) {
    const lIdx = test5.modules[5].lessons.length + 1;
    test5.modules[5].lessons.push(
      makeLesson(
        `test5-l-6-${lIdx}`, "test5-mod-6", lIdx,
        `Lesson 6.${lIdx}: Production UI Patterns — Modals, Drawers & Notification Badges`, lIdx, 25, "html",
        `<style>
  .notification-bell {
    position: relative;
    display: inline-block;
    padding: 10px;
    background: #e2e8f0;
    border-radius: 8px;
  }
  
  .badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ef4444;
    color: #ffffff;
    font-size: 11px;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 9999px;
  }
</style>

<div class="notification-bell">
  🔔
  <span class="badge">3</span>
</div>`,
        {
          task: "Create a relative container with an absolute badge pinned to top-right.",
          hint: ".badge { position: absolute; top: 0; right: 0; }",
          expected_output: "badge"
        },
        "Relative parent aur Absolute child positioning combination badge overlays, tooltips, dropdown menus, aur modal overlays ka standard pattern hai.",
        [
          { tag: "UI Engineering", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Relative + Absolute", desc: "Pixel-perfect badge and overlay coordinates." }
        ],
        `<div class="theory-card"><p>Clean coordinate anchors without disrupting document flow.</p></div>`
      )
    );
  }

  // Mod 7 (Flexbox): ensure 3 lessons
  while (test5.modules[6].lessons.length < 3) {
    const lIdx = test5.modules[6].lessons.length + 1;
    test5.modules[6].lessons.push(
      makeLesson(
        `test5-l-7-${lIdx}`, "test5-mod-7", lIdx,
        `Lesson 7.${lIdx}: Flex Item Proportions — flex: 1 vs flex: auto & flex-basis Math`, lIdx, 20, "html",
        `<style>
  .flex-row {
    display: flex;
    gap: 16px;
  }
  .sidebar {
    flex: 0 0 250px; /* Fixed basis, no shrink, no grow */
    background: #f1f5f9;
    padding: 16px;
  }
  .content {
    flex: 1 1 auto; /* Fills all remaining space */
    background: #ffffff;
    padding: 16px;
  }
</style>

<div class="flex-row">
  <aside class="sidebar">Sidebar (Fixed 250px)</aside>
  <main class="content">Fluid Main Content Canvas</main>
</div>`,
        {
          task: "Set up a sidebar with flex: 0 0 200px and main content with flex: 1.",
          hint: ".main { flex: 1; }",
          expected_output: "Sidebar"
        },
        "flex shorthand (grow shrink basis) browser ko batata hai ki available remaining space ko mathematically kaise distribute karna hai.",
        [
          { tag: "Flex Math", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "flex: 1 1 auto", desc: "Elastic item sizing with responsive boundaries." }
        ],
        `<div class="theory-card"><p>Standard application layout blueprint.</p></div>`
      )
    );
  }

  // Mod 8 (Grid): ensure 5 lessons
  while (test5.modules[7].lessons.length < 5) {
    const lIdx = test5.modules[7].lessons.length + 1;
    test5.modules[7].lessons.push(
      makeLesson(
        `test5-l-8-${lIdx}`, "test5-mod-8", lIdx,
        `Lesson 8.${lIdx}: CSS Subgrid & Hierarchical Grid Alignments`, lIdx, 25, "html",
        `<style>
  .parent-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .card {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    padding: 16px;
  }
</style>

<div class="parent-grid">
  <div class="card">
    <h4>Title</h4>
    <p>Body text of dynamic height.</p>
    <button>Action</button>
  </div>
</div>`,
        {
          task: "Create a grid layout with grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)).",
          hint: "repeat(auto-fit, minmax(200px, 1fr))",
          expected_output: "parent-grid"
        },
        "CSS Subgrid child items ko parent grid ke columns/rows ke sath perfectly align karne deta hai, chahe dynamic content card ki height kuch bhi ho!",
        [
          { tag: "Modern Layout", color: "rgba(16, 185, 129, 0.15); #10b981", title: "CSS Subgrid", desc: "Synchronized row alignments across heterogeneous card components." }
        ],
        `<div class="theory-card"><p>Pristine UI alignment across complex bento grids.</p></div>`
      )
    );
  }

  // Mod 9: ensure 3 lessons
  while (test5.modules[8].lessons.length < 3) {
    const lIdx = test5.modules[8].lessons.length + 1;
    test5.modules[8].lessons.push(
      makeLesson(
        `test5-l-9-${lIdx}`, "test5-mod-9", lIdx,
        `Lesson 9.${lIdx}: Fluid Typography & Layouts with CSS clamp() and min() / max()`, lIdx, 20, "html",
        `<style>
  .fluid-heading {
    /* Font size scales smoothly from 24px (mobile) to 48px (desktop) without media queries! */
    font-size: clamp(1.5rem, 1rem + 2.5vw, 3rem);
    font-weight: 800;
  }
</style>

<h1 class="fluid-heading">Fluid Responsive Typography</h1>`,
        {
          task: "Write a clamp() rule that scales between 1rem and 2.5rem.",
          hint: "font-size: clamp(1rem, 2vw, 2.5rem);",
          expected_output: "fluid-heading"
        },
        "CSS clamp(min, preferred, max) mathematical interpolation se fluid sizing achieve karta hai bina multiple media query breakpoints likhe.",
        [
          { tag: "Zero-Breakpoint", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "clamp() Function", desc: "Seamless viewport scaling for typography and layout paddings." }
        ],
        `<div class="theory-card"><p>Ultra-smooth scaling on mobile, tablet and 4k displays.</p></div>`
      )
    );
  }

  // Renumber test5
  test5.modules.forEach((m: any, mIdx: number) => {
    m.lessons.forEach((l: any, lIdx: number) => {
      l.lesson_number = lIdx + 1;
      l.order_index = lIdx + 1;
      l.id = `test5-l-${mIdx + 1}-${lIdx + 1}`;
      l.module_id = `test5-mod-${mIdx + 1}`;
    });
  });

  fs.writeFileSync('Courses/test-5.json', JSON.stringify(test5, null, 2));
  console.log("✅ Test 5 (HTML/CSS) varied and updated!");

  // ============================================================
  // COURSE 6: Enterprise SQL Masterclass
  // Desired Counts: [3, 5, 4, 3, 5, 2, 4, 3, 4, 2] (10 modules)
  // ============================================================
  // Mod 1: ensure 3 lessons
  while (test6.modules[0].lessons.length < 3) {
    const lIdx = test6.modules[0].lessons.length + 1;
    test6.modules[0].lessons.push(
      makeLesson(
        `test6-l-1-${lIdx}`, "test6-mod-1", lIdx,
        `Lesson 1.${lIdx}: CHECK Constraints, ENUMs & Generated Virtual Columns in SQL`, lIdx, 25, "sql",
        `CREATE TABLE product_inventory (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price > 0),
    stock_qty INT DEFAULT 0 CHECK (stock_qty >= 0),
    -- Generated column calculated automatically by Database Engine!
    total_value NUMERIC(12, 2) GENERATED ALWAYS AS (unit_price * stock_qty) STORED
);

INSERT INTO product_inventory (product_name, unit_price, stock_qty)
VALUES ('Enterprise Mechanical Keyboard', 150.00, 20);

SELECT * FROM product_inventory;`,
        {
          task: "Write a CHECK constraint ensuring discount percentage is between 0 and 100.",
          hint: "CHECK (discount >= 0 AND discount <= 100)",
          expected_output: "product_inventory"
        },
        "Database constraints business rules ko hardware level par enforce karte hain. Code bugs ke baad bhi database invalid data accept nahi karega.",
        [
          { tag: "Data Integrity", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "CHECK Constraints", desc: "Hardware level data validation before disk write." }
        ],
        `<div class="theory-card"><p>Generated columns automate derived calculations without redundant application triggers.</p></div>`
      )
    );
  }

  // Mod 2 (DML & Filtering): ensure 5 lessons
  while (test6.modules[1].lessons.length < 5) {
    const lIdx = test6.modules[1].lessons.length + 1;
    test6.modules[1].lessons.push(
      makeLesson(
        `test6-l-2-${lIdx}`, "test6-mod-2", lIdx,
        `Lesson 2.${lIdx}: UPSERT Operations (INSERT ON CONFLICT DO UPDATE) in PostgreSQL / SQL`, lIdx, 25, "sql",
        `CREATE TABLE user_login_stats (
    user_id INT PRIMARY KEY,
    login_count INT DEFAULT 1,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Atomic UPSERT pattern in modern SQL
INSERT INTO user_login_stats (user_id, login_count, last_login)
VALUES (101, 1, CURRENT_TIMESTAMP)
ON CONFLICT (user_id) 
DO UPDATE SET 
    login_count = user_login_stats.login_count + 1,
    last_login = CURRENT_TIMESTAMP;

SELECT * FROM user_login_stats;`,
        {
          task: "Write an INSERT ... ON CONFLICT (id) DO NOTHING statement.",
          hint: "ON CONFLICT (id) DO NOTHING;",
          expected_output: "user_login_stats"
        },
        "UPSERT statement race conditions ko eliminate karta hai. Record exist karta hai to update karta hai, varna insert karta hai in a single atomic transaction.",
        [
          { tag: "Atomic SQL", color: "rgba(16, 185, 129, 0.15); #10b981", title: "ON CONFLICT", desc: "Atomically handles insert collisions without concurrency race bugs." }
        ],
        `<div class="theory-card"><p>High throughput tracking in distributed SaaS architectures.</p></div>`
      )
    );
  }

  // Mod 3 (Aggregations): ensure 4 lessons
  while (test6.modules[2].lessons.length < 4) {
    const lIdx = test6.modules[2].lessons.length + 1;
    test6.modules[2].lessons.push(
      makeLesson(
        `test6-l-3-${lIdx}`, "test6-mod-3", lIdx,
        `Lesson 3.${lIdx}: Multi-Level Summaries with ROLLUP and CUBE Aggregations`, lIdx, 25, "sql",
        `SELECT 
    department, 
    region, 
    SUM(revenue) AS total_revenue
FROM sales_records
GROUP BY ROLLUP (department, region);`,
        {
          task: "Write a GROUP BY ROLLUP (year, month) query to generate hierarchical sales totals.",
          hint: "GROUP BY ROLLUP (year, month)",
          expected_output: "total_revenue"
        },
        "ROLLUP aur CUBE single query pass mein hierarchical subtotals aur grand total calculate kar dete hain jo BI dashboards aur reporting engines ke liye super fast hote hain.",
        [
          { tag: "Analytics", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "ROLLUP Aggregation", desc: "Automatic generation of hierarchical subtotals." }
        ],
        `<div class="theory-card"><p>Replaces multiple redundant union queries with a single aggregation scan.</p></div>`
      )
    );
  }

  // Mod 4: 3 lessons
  while (test6.modules[3].lessons.length < 3) {
    const lIdx = test6.modules[3].lessons.length + 1;
    test6.modules[3].lessons.push(
      makeLesson(
        `test6-l-4-${lIdx}`, "test6-mod-4", lIdx,
        `Lesson 4.${lIdx}: CROSS JOIN (Cartesian Products) & Anti-Joins Patterns`, lIdx, 20, "sql",
        `-- Finding users who have NEVER placed any order (Anti-Join Pattern)
SELECT u.user_id, u.name
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE o.order_id IS NULL;`,
        {
          task: "Write a LEFT JOIN query checking WHERE foreign_key IS NULL to find unmatched rows.",
          hint: "LEFT JOIN ... WHERE o.user_id IS NULL",
          expected_output: "user_id"
        },
        "Anti-join (LEFT JOIN + WHERE right.id IS NULL) database mein missing relationships aur inactive accounts ko query karne ka fastest indexed approach hai.",
        [
          { tag: "Relational", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Anti-Join Pattern", desc: "Identifies non-matching relational entity sets efficiently." }
        ],
        `<div class="theory-card"><p>Significantly faster than NOT IN with nullable subqueries.</p></div>`
      )
    );
  }

  // Mod 5 (CTEs & Subqueries): ensure 5 lessons
  while (test6.modules[4].lessons.length < 5) {
    const lIdx = test6.modules[4].lessons.length + 1;
    test6.modules[4].lessons.push(
      makeLesson(
        `test6-l-5-${lIdx}`, "test6-mod-5", lIdx,
        `Lesson 5.${lIdx}: Chained Common Table Expressions (CTEs) & Query Cleanliness`, lIdx, 25, "sql",
        `WITH 
ActiveUsers AS (
    SELECT user_id, email FROM users WHERE status = 'ACTIVE'
),
HighValueOrders AS (
    SELECT user_id, SUM(amount) AS total_spent
    FROM orders
    GROUP BY user_id
    HAVING SUM(amount) > 10000
)
SELECT u.user_id, u.email, o.total_spent
FROM ActiveUsers u
JOIN HighValueOrders o ON u.user_id = o.user_id
ORDER BY o.total_spent DESC;`,
        {
          task: "Construct a WITH clause named RecentUsers that filters users created in 2026.",
          hint: "WITH RecentUsers AS (SELECT * FROM users WHERE year = 2026) SELECT * FROM RecentUsers;",
          expected_output: "ActiveUsers"
        },
        "Chained CTEs complex multi-table SQL transformations ko step-by-step readable modules mein break karti hain, jisse maintenance aur query debugging effortless ho jati hai.",
        [
          { tag: "Clean Architecture", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Modular CTE Pipeline", desc: "Transforms tangled SQL into linear readable transformation steps." }
        ],
        `<div class="theory-card"><p>Standard enterprise BI reporting readability blueprint.</p></div>`
      )
    );
  }

  // Mod 7 (Indexing): ensure 4 lessons
  while (test6.modules[6].lessons.length < 4) {
    const lIdx = test6.modules[6].lessons.length + 1;
    test6.modules[6].lessons.push(
      makeLesson(
        `test6-l-7-${lIdx}`, "test6-mod-7", lIdx,
        `Lesson 7.${lIdx}: Partial Indexes, Covering Indexes & Index Scans vs Seq Scans`, lIdx, 25, "sql",
        `-- Partial Index: Only indexes active rows saving 90% disk RAM!
CREATE INDEX idx_active_users ON users (email) WHERE is_active = TRUE;

-- Covering Index with INCLUDE: Avoids Table Heap Fetch!
CREATE INDEX idx_orders_covering ON orders (user_id) INCLUDE (order_date, total_amount);`,
        {
          task: "Create a partial index on table orders for status = 'PENDING'.",
          hint: "CREATE INDEX idx_pending ON orders(id) WHERE status = 'PENDING';",
          expected_output: "idx_active_users"
        },
        "Partial indexes sirf relevant rows ko index karte hain, jisse index size chota rehta hai aur RAM cache hit ratio 99%+ optimize hoti hai.",
        [
          { tag: "DB Optimization", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Partial Indexing", desc: "Dramatically reduces B-Tree memory footprint." }
        ],
        `<div class="theory-card"><p>Covering indexes enable zero heap fetch Index-Only Scans.</p></div>`
      )
    );
  }

  // Mod 8 (ACID): 3 lessons
  while (test6.modules[7].lessons.length < 3) {
    const lIdx = test6.modules[7].lessons.length + 1;
    test6.modules[7].lessons.push(
      makeLesson(
        `test6-l-8-${lIdx}`, "test6-mod-8", lIdx,
        `Lesson 8.${lIdx}: Savepoints & Nested Transaction Rollbacks in SQL`, lIdx, 20, "sql",
        `BEGIN;

INSERT INTO audit_logs (event) VALUES ('Starting batch transaction');
SAVEPOINT step_one;

-- Attempt an operation that might fail
UPDATE account_balances SET balance = balance - 500 WHERE account_id = 999;

-- Partial rollback to savepoint if error occurs without cancelling whole transaction
ROLLBACK TO SAVEPOINT step_one;

COMMIT;`,
        {
          task: "Write SAVEPOINT my_savepoint and ROLLBACK TO SAVEPOINT my_savepoint.",
          hint: "SAVEPOINT sp1; ROLLBACK TO SAVEPOINT sp1;",
          expected_output: "SAVEPOINT"
        },
        "Savepoints transaction ke andar checkpoints hote hain. Agar koi minor step fail ho jaye toh pure transaction ko abort karne ke bajaye specific checkpoint tak rollback kiya ja sakta hai.",
        [
          { tag: "Transaction Control", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Savepoint Checkpoint", desc: "Fine-grained error recovery in long-running transactions." }
        ],
        `<div class="theory-card"><p>Protects master financial transactions from partial batch failures.</p></div>`
      )
    );
  }

  // Mod 9 (Views & Triggers): ensure 4 lessons
  while (test6.modules[8].lessons.length < 4) {
    const lIdx = test6.modules[8].lessons.length + 1;
    test6.modules[8].lessons.push(
      makeLesson(
        `test6-l-9-${lIdx}`, "test6-mod-9", lIdx,
        `Lesson 9.${lIdx}: Materialized Views Refresh Automation & Performance Tradeoffs`, lIdx, 25, "sql",
        `CREATE MATERIALIZED VIEW mv_monthly_revenue_summary AS
SELECT 
    DATE_TRUNC('month', order_date) AS order_month,
    SUM(total_amount) AS monthly_revenue,
    COUNT(order_id) AS total_orders
FROM orders
GROUP BY DATE_TRUNC('month', order_date);

-- Fast concurrent refresh without locking read queries
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_monthly_revenue_summary;`,
        {
          task: "Write a REFRESH MATERIALIZED VIEW statement for mv_summary.",
          hint: "REFRESH MATERIALIZED VIEW mv_summary;",
          expected_output: "mv_monthly_revenue_summary"
        },
        "Materialized views query result ko physically disk par cache kar leti hain, jisse multi-million row aggregation queries milliseconds mein serve hoti hain.",
        [
          { tag: "High Performance", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Materialized View", desc: "Caches complex aggregation results on physical storage." }
        ],
        `<div class="theory-card"><p>CONCURRENTLY refresh allows seamless 24/7 read availability.</p></div>`
      )
    );
  }

  // Renumber test6
  test6.modules.forEach((m: any, mIdx: number) => {
    m.lessons.forEach((l: any, lIdx: number) => {
      l.lesson_number = lIdx + 1;
      l.order_index = lIdx + 1;
      l.id = `test6-l-${mIdx + 1}-${lIdx + 1}`;
      l.module_id = `test6-mod-${mIdx + 1}`;
    });
  });

  fs.writeFileSync('Courses/test-6.json', JSON.stringify(test6, null, 2));
  console.log("✅ Test 6 (SQL) varied and updated!");
}

enrichCourses();
