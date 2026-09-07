import fs from 'fs';
import { makeLesson } from './helpers';

export const javaCourse = {
  id: "course-test-2-java",
  title: "Complete Core Java & OOP Masterclass",
  subtitle: "JVM Architecture, Deep OOP, Collections & Enterprise Engineering (Hinglish)",
  description: "Master Java 17/21 from JVM internals, Stack vs Heap memory layout, Type Casting, OOP Pillars, Interfaces, Exception Safety, Collections to an enterprise Banking Engine in natural Hinglish.",
  category: "Technology",
  difficulty: "Intermediate",
  thumbnail_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
  is_premium: false,
  total_modules: 10,
  estimated_hours: 50,
  created_at: "2026-03-01T00:00:00Z",
  modules: [
    // Mod 1: 4 lessons
    {
      id: "test2-mod-1",
      course_id: "course-test-2-java",
      module_number: 1,
      title: "Module 1: JVM Architecture & Primitive Footprint",
      description: "JDK vs JRE vs JVM, JIT compilation, Stack vs Heap memory, primitive data types, and widening/narrowing type casting.",
      order_index: 1,
      lessons: [
        makeLesson("test2-l-1-1", "test2-mod-1", 1, "Lesson 1.1: Java Architecture — JDK, JRE, JVM & JIT Compiler", 1, 25, "java",
`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java Enterprise Developer!");
        System.out.println("JVM Bytecode Execution Engine Active.");
    }
}`,
          { task: "Print 'Hello Java' to the console in Java.", hint: "System.out.println(\"Hello Java\");", expected_output: "Hello Java" },
          "Java code pehle javac compiler se .class bytecode mein compile hota hai, fir JVM ka JIT (Just-In-Time) compiler use direct native machine code mein convert karta hai (Write Once, Run Anywhere).",
          [
            { tag: "JVM Engine", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "WORA Principle", desc: "Write Once, Run Anywhere via JVM Bytecode." },
            { tag: "Performance", color: "rgba(16, 185, 129, 0.15); #10b981", title: "JIT Compiler", desc: "Hotspots compiled to native CPU instructions." }
          ],
          `<div class="theory-card"><h3>JVM Lifecycle</h3><p>Java source code (.java) -> Bytecode (.class) -> ClassLoader -> JIT -> CPU Execution.</p></div>`
        ),
        makeLesson("test2-l-1-2", "test2-mod-1", 2, "Lesson 1.2: Primitive Data Types & Stack vs Heap Allocation", 2, 25, "java",
`public class Main {
    public static void main(String[] args) {
        // Primitive types allocated directly on the thread Stack
        byte age = 25;           // 8-bit
        int employeeId = 10450;   // 32-bit
        double salary = 75000.50; // 64-bit IEEE 754
        boolean isActive = true; // 1-bit logic

        System.out.println("Employee #" + employeeId + " | Age: " + age + " | Salary: Rs." + salary);
    }
}`,
          { task: "Declare int x = 40, int y = 60, print their sum.", hint: "int x=40, y=60; System.out.println(x+y);", expected_output: "100" },
          "Primitive variables (int, double, boolean) stack memory mein direct binary values hold karte hain, jabki Objects heap memory mein allocate hote hain.",
          [
            { tag: "Stack vs Heap", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Primitive Memory", desc: "Stored directly on Stack frames with ultra-fast access." }
          ],
          `<div class="theory-card"><h3>Memory Layout</h3><p>Primitives live in stack frames and are destroyed when method returns.</p></div>`
        ),
        makeLesson("test2-l-1-3", "test2-mod-1", 3, "Lesson 1.3: Arithmetic Operators, Modulo & Math Utility Class", 3, 20, "java",
`public class Main {
    public static void main(String[] args) {
        int a = 25;
        int b = 4;
        
        int quotient = a / b;
        int remainder = a % b;
        double power = Math.pow(2, 5);

        System.out.println("Quotient: " + quotient);
        System.out.println("Remainder (Modulo): " + remainder);
        System.out.println("2^5 via Math.pow: " + power);
    }
}`,
          { task: "Calculate 15 modulo 4 using % and print result.", hint: "System.out.println(15 % 4);", expected_output: "3" },
          "Integer division Java mein fractional part truncate kar deta hai. Fractional precision ke liye kam se kam ek operand float/double hona chahiye.",
          [
            { tag: "Math Math", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Modulo & Division", desc: "Integer division truncates towards zero." }
          ],
          `<div class="theory-card"><h3>Arithmetic Rules</h3><p>Modulo operator (%) circular index buffers aur even/odd tests ke liye vital hai.</p></div>`
        ),
        makeLesson("test2-l-1-4", "test2-mod-1", 4, "Lesson 1.4: Type Casting (Widening vs Narrowing) in Java", 4, 25, "java",
`public class Main {
    public static void main(String[] args) {
        // Widening Casting (Implicit - No Data Loss)
        int num = 100;
        double decimalVal = num; 

        // Narrowing Casting (Explicit - Manual Truncation)
        double price = 99.99;
        int intPrice = (int) price; 

        System.out.println("Widened Double: " + decimalVal);
        System.out.println("Narrowed Integer: " + intPrice);
    }
}`,
          { task: "Explicitly cast double d = 88.75 to int and print it.", hint: "double d = 88.75; int i = (int) d; System.out.println(i);", expected_output: "88" },
          "Widening (int -> double) JVM automatically karta hai. Narrowing (double -> int) mein manual `(targetType)` cast zaroori hota hai kyunki precision loss ho sakta hai.",
          [
            { tag: "Type Safety", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Casting Pipeline", desc: "Narrowing requires manual explicit cast operator." }
          ],
          `<div class="theory-card"><h3>Type Promotion Matrix</h3><p>byte -> short -> int -> long -> float -> double promotion order.</p></div>`
        )
      ]
    },

    // Mod 2: 3 lessons
    {
      id: "test2-mod-2",
      course_id: "course-test-2-java",
      module_number: 2,
      title: "Module 2: Control Flow & Decision Logic",
      description: "if-else branching, logical short-circuiting, traditional switch fallthrough, and modern Java 14+ switch expressions.",
      order_index: 2,
      lessons: [
        makeLesson("test2-l-2-1", "test2-mod-2", 1, "Lesson 2.1: Decision Branching & Logical Short-Circuit Operators", 1, 20, "java",
`public class Main {
    public static void main(String[] args) {
        int score = 88;
        boolean hasAttendance = true;

        // Short-circuit AND (&&) skips right operand if left is false
        if (score >= 75 && hasAttendance) {
            System.out.println("Eligible for Honors Certification!");
        } else {
            System.out.println("Criteria Not Met.");
        }
    }
}`,
          { task: "Write an if-else statement checking if int temperature = 32 is > 30. Print 'Hot' or 'Cool'.", hint: "int t=32; if(t>30) System.out.println(\"Hot\"); else System.out.println(\"Cool\");", expected_output: "Hot" },
          "Short-circuit operators (&&, ||) pehle expression se hi result decide ho jane par dusra expression evaluate nahi karte, jisse NullPointerExceptions se bacha ja sakta hai.",
          [
            { tag: "Short Circuit", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "&& and || Logic", desc: "Guards against NPE when checking object != null && object.isValid()." }
          ],
          `<div class="theory-card"><h3>Conditional Execution</h3><p>Fast boolean evaluation pipelines.</p></div>`
        ),
        makeLesson("test2-l-2-2", "test2-mod-2", 2, "Lesson 2.2: Traditional Switch Statements & Fallthrough Mechanics", 2, 20, "java",
`public class Main {
    public static void main(String[] args) {
        int tier = 2;
        String accessLevel;

        switch (tier) {
            case 1:
                accessLevel = "Standard User";
                break;
            case 2:
                accessLevel = "Premium Pro";
                break;
            case 3:
                accessLevel = "Enterprise Admin";
                break;
            default:
                accessLevel = "Guest";
                break;
        }

        System.out.println("Assigned Tier: " + accessLevel);
    }
}`,
          { task: "Write a switch on int code = 1 with case 1 printing 'OK'. Include break.", hint: "int code = 1; switch(code){ case 1: System.out.println(\"OK\"); break; }", expected_output: "OK" },
          "Traditional switch statements mein 'break' miss karne par code agle case mein slip kar jata hai (Fallthrough).",
          [
            { tag: "Switch Logic", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Break Guard", desc: "Explicit termination of branch execution." }
          ],
          `<div class="theory-card"><h3>Switch Jump Table</h3><p>Compiler generates O(1) tableswitch/lookupswitch bytecode.</p></div>`
        ),
        makeLesson("test2-l-2-3", "test2-mod-2", 3, "Lesson 2.3: Modern Enhanced Switch Expressions (Java 14+)", 3, 25, "java",
`public class Main {
    public static void main(String[] args) {
        String day = "MONDAY";

        // Modern Java 14+ arrow switch expression yielding direct value
        int workHours = switch (day) {
            case "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" -> 8;
            case "SATURDAY" -> 4;
            case "SUNDAY" -> 0;
            default -> throw new IllegalArgumentException("Unknown day: " + day);
        };

        System.out.println(day + " Shift Duration: " + workHours + " hours");
    }
}`,
          { task: "Write an arrow switch expression returning 'Admin' for role = 'ADMIN' and print it.", hint: "String r = \"ADMIN\"; String title = switch(r) { case \"ADMIN\" -> \"Admin\"; default -> \"User\"; }; System.out.println(title);", expected_output: "Admin" },
          "Modern Java switch expressions '->' syntax ke sath no-fallthrough safety provide karti hain aur value directly return kar sakti hain.",
          [
            { tag: "Java 14+", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Arrow Switch", desc: "No break boilerplate, zero fallthrough risk." }
          ],
          `<div class="theory-card"><h3>Enhanced Switch</h3><p>Exhaustive pattern expressions yielding direct immutable results.</p></div>`
        )
      ]
    },

    // Mod 3: 5 lessons
    {
      id: "test2-mod-3",
      course_id: "course-test-2-java",
      module_number: 3,
      title: "Module 3: Iteration Control & Loops",
      description: "for loops, while/do-while, labeled break/continue, enhanced for-each loop, and 2D matrix traversal.",
      order_index: 3,
      lessons: [
        makeLesson("test2-l-3-1", "test2-mod-3", 1, "Lesson 3.1: Standard for Loop & Step Counting Mechanics", 1, 20, "java",
`public class Main {
    public static void main(String[] args) {
        System.out.println("Printing even numbers from 2 to 10:");
        for (int i = 2; i <= 10; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
          { task: "Write a for loop printing numbers 1 to 3 separated by space.", hint: "for(int i=1; i<=3; i++) System.out.print(i + \" \");", expected_output: "1 2 3" },
          "Standard for loop initialization, condition, aur update step ko ek single line control header mein encapsulate karta hai.",
          [
            { tag: "Loop Control", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "for Loop Engine", desc: "Deterministic bounded iteration counter." }
          ],
          `<div class="theory-card"><h3>Loop Pipeline</h3><p>Init -> Condition Check -> Body -> Step Increment.</p></div>`
        ),
        makeLesson("test2-l-3-2", "test2-mod-3", 2, "Lesson 3.2: while and do-while Loop Guarantees", 2, 20, "java",
`public class Main {
    public static void main(String[] args) {
        int count = 1;
        
        // do-while executes at least once even if condition is false
        do {
            System.out.println("do-while guaranteed execution: iteration #" + count);
            count++;
        } while (count <= 1);
    }
}`,
          { task: "Write a while loop decrementing from n = 3 down to 1, printing each n.", hint: "int n=3; while(n>=1){ System.out.print(n + \" \"); n--; }", expected_output: "3 2 1" },
          "while loop entry-controlled hota hai (pehle check, fir run), jabki do-while exit-controlled hota hai (kam se kam ek baar guarantee run).",
          [
            { tag: "Exit-Controlled", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "do-while Guarantee", desc: "Guaranteed minimum 1 execution cycle." }
          ],
          `<div class="theory-card"><h3>Loop Comparison</h3><p>Use while for dynamic bounds and do-while for interactive menu loops.</p></div>`
        ),
        makeLesson("test2-l-3-3", "test2-mod-3", 3, "Lesson 3.3: Jump Statements: break, continue & Labeled Loops", 3, 25, "java",
`public class Main {
    public static void main(String[] args) {
        int[][] grid = {
            {1, 2, 3},
            {4, 99, 6},
            {7, 8, 9}
        };

        // Labeled break to escape multi-level nested loops instantly
        searchLoop:
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[r].length; c++) {
                if (grid[r][c] == 99) {
                    System.out.println("Found target 99 at [" + r + "][" + c + "]! Terminating all loops.");
                    break searchLoop;
                }
            }
        }
    }
}`,
          { task: "Use a labeled break 'outer:' to escape a nested loop when inner reaches 2.", hint: "outer: for(int i=0;i<2;i++) for(int j=0;j<3;j++) if(j==2) { System.out.println(\"Escaped\"); break outer; }", expected_output: "Escaped" },
          "Labeled break Java ka structured alternative hai nested boolean flags ko avoid karke direct outer loop ko exit karne ke liye.",
          [
            { tag: "Fast Escape", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Labeled Loops", desc: "Instant jump out of deep nested loop structures." }
          ],
          `<div class="theory-card"><h3>Labeled Break Mechanics</h3><p>Clean multi-level loop termination pattern.</p></div>`
        ),
        makeLesson("test2-l-3-4", "test2-mod-3", 4, "Lesson 3.4: Enhanced For-Each Loop & Iterable Mechanics", 4, 20, "java",
`public class Main {
    public static void main(String[] args) {
        String[] frameworks = {"Spring Boot", "Hibernate", "Quarkus"};

        // Enhanced for-each eliminates off-by-one index bugs
        for (String tech : frameworks) {
            System.out.println("Enterprise Tech: " + tech);
        }
    }
}`,
          { task: "Sum int[] numbers = {10, 20, 30} using a for-each loop and print total.", hint: "int[] nums = {10, 20, 30}; int sum = 0; for(int n : nums) sum += n; System.out.println(sum);", expected_output: "60" },
          "For-each loop bytecode level par Iterator ya array index pointer use karta hai, jisse off-by-one errors eliminate ho jate hain.",
          [
            { tag: "Clean Iteration", color: "rgba(16, 185, 129, 0.15); #10b981", title: "For-Each (Enhanced)", desc: "Iterates smoothly over arrays and Iterable collections." }
          ],
          `<div class="theory-card"><h3>Enhanced Loop Bytecode</h3><p>Safe, read-only iteration over data containers.</p></div>`
        ),
        makeLesson("test2-l-3-5", "test2-mod-3", 5, "Lesson 3.5: 2D Matrix Traversal & Bounds Checking", 5, 25, "java",
`public class Main {
    public static void main(String[] args) {
        int[][] matrix = {
            {10, 20},
            {30, 40}
        };

        int sum = 0;
        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < matrix[r].length; c++) {
                sum += matrix[r][c];
            }
        }
        System.out.println("Total Matrix Sum: " + sum);
    }
}`,
          { task: "Compute sum of matrix [[5, 5], [10, 10]] and print.", hint: "int[][] m = {{5, 5}, {10, 10}}; int s = 0; for(int[] r : m) for(int c : r) s += c; System.out.println(s);", expected_output: "30" },
          "Java mein 2D matrix array of arrays hota hai jaha har row ka apna length property hota hai.",
          [
            { tag: "Matrix", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Row-Major Iteration", desc: "Accessing row-by-row maximizes CPU cache line hits." }
          ],
          `<div class="theory-card"><h3>2D Array Structure</h3><p>Heap allocated references to contiguous sub-arrays.</p></div>`
        )
      ]
    },

    // Mod 4: 2 lessons
    {
      id: "test2-mod-4",
      course_id: "course-test-2-java",
      module_number: 4,
      title: "Module 4: Methods, Signatures & Stack Frames",
      description: "Method declarations, return types, pass-by-value semantics, method overloading, and call stack frame allocation.",
      order_index: 4,
      lessons: [
        makeLesson("test2-l-4-1", "test2-mod-4", 1, "Lesson 4.1: Method Anatomy, Return Types & Pass-By-Value", 1, 25, "java",
`public class Main {
    // Java is strictly Pass-by-Value (passes a copy of primitive or reference)
    public static int calculateDiscount(int price, double discountPercent) {
        return (int) (price - (price * discountPercent));
    }

    public static void main(String[] args) {
        int originalPrice = 2000;
        int finalPrice = calculateDiscount(originalPrice, 0.15);
        System.out.println("Discounted Price: Rs." + finalPrice);
    }
}`,
          { task: "Write a static method square(int n) returning n*n. Print square(7).", hint: "static int square(int n){ return n*n; } in Main class. In main: System.out.println(square(7));", expected_output: "49" },
          "Java strictly Pass-by-Value language hai. Primitives ke case mein value copy hoti hai aur objects ke case mein reference address ki copy pass hoti hai.",
          [
            { tag: "Pass-by-Value", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Strict Value Passing", desc: "Caller's primitive variable can never be re-assigned by called method." }
          ],
          `<div class="theory-card"><h3>Call Stack Frames</h3><p>Every method invocation pushes a new stack frame containing local variables.</p></div>`
        ),
        makeLesson("test2-l-4-2", "test2-mod-4", 2, "Lesson 4.2: Method Overloading & Compile-Time Polymorphism", 2, 25, "java",
`public class Main {
    // Method Overloading: Same name, different parameter signature
    public static int add(int a, int b) {
        return a + b;
    }

    public static double add(double a, double b) {
        return a + b;
    }

    public static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static void main(String[] args) {
        System.out.println("Add 2 ints: " + add(10, 20));
        System.out.println("Add 2 doubles: " + add(12.5, 7.5));
        System.out.println("Add 3 ints: " + add(1, 2, 3));
    }
}`,
          { task: "Call overloaded add(5, 5) and print result.", hint: "System.out.println(add(5, 5));", expected_output: "10" },
          "Method Overloading compile-time par resolve hoti hai (Static Polymorphism) based on method signature (parameters count and types).",
          [
            { tag: "Compile-Time", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Static Dispatch", desc: "Resolved at compile-time by javac." }
          ],
          `<div class="theory-card"><h3>Method Signatures</h3><p>Return type overloading signature ka part nahi hota (only param types & count).</p></div>`
        )
      ]
    },

    // Mod 5: 4 lessons
    {
      id: "test2-mod-5",
      course_id: "course-test-2-java",
      module_number: 5,
      title: "Module 5: Arrays & Reference Manipulation",
      description: "Array allocation in heap, Arrays utility class (dual-pivot quicksort), jagged arrays, and System.arraycopy.",
      order_index: 5,
      lessons: [
        makeLesson("test2-l-5-1", "test2-mod-5", 1, "Lesson 5.1: Array Heap Allocation & ArrayIndexOutOfBoundsException", 1, 25, "java",
`public class Main {
    public static void main(String[] args) {
        // Allocated dynamically on Heap memory with default 0 values
        int[] scores = new int[3];
        scores[0] = 95;
        scores[1] = 88;
        scores[2] = 91;

        System.out.println("Array Length: " + scores.length);
        System.out.println("First Element: " + scores[0]);
    }
}`,
          { task: "Declare int[] a = {1, 2, 3}; and print a[1].", hint: "int[] a = {1, 2, 3}; System.out.println(a[1]);", expected_output: "2" },
          "Java arrays first-class objects hote hain jo heap par allocate hote hain. Inki length fixed hoti hai aur runtime par strict bounds checking hoti hai.",
          [
            { tag: "Fixed Bounds", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Heap Arrays", desc: "Guaranteed bounds check prevents buffer overflow memory vulnerabilities." }
          ],
          `<div class="theory-card"><h3>Array Memory Layout</h3><p>Contiguous block of heap memory with a length header.</p></div>`
        ),
        makeLesson("test2-l-5-2", "test2-mod-5", 2, "Lesson 5.2: Java Arrays Class Utilities (Sort & Binary Search)", 2, 25, "java",
`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] data = {55, 12, 89, 4, 33};

        // Dual-Pivot Quicksort
        Arrays.sort(data);
        System.out.println("Sorted Array: " + Arrays.toString(data));

        // Binary Search O(log N) on sorted array
        int idx = Arrays.binarySearch(data, 33);
        System.out.println("Index of 33: " + idx);
    }
}`,
          { task: "Sort array int[] nums = {9, 1, 4} using Arrays.sort and print with Arrays.toString(nums).", hint: "int[] n = {9, 1, 4}; java.util.Arrays.sort(n); System.out.println(java.util.Arrays.toString(n));", expected_output: "[1, 4, 9]" },
          "java.util.Arrays class dual-pivot quicksort, binary search, aur deep equality checks provide karti hai.",
          [
            { tag: "java.util", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Dual-Pivot Sort", desc: "High-speed in-place sorting algorithm." }
          ],
          `<div class="theory-card"><h3>Arrays Helper Engine</h3><p>Optimized library algorithms ready for production use.</p></div>`
        ),
        makeLesson("test2-l-5-3", "test2-mod-5", 3, "Lesson 5.3: Jagged Arrays (Non-Uniform Row Dimensions)", 3, 20, "java",
`public class Main {
    public static void main(String[] args) {
        // Jagged array: Rows have different column lengths
        int[][] jagged = new int[3][];
        jagged[0] = new int[]{1};
        jagged[1] = new int[]{2, 3};
        jagged[2] = new int[]{4, 5, 6};

        for (int r = 0; r < jagged.length; r++) {
            System.out.println("Row " + r + " size: " + jagged[r].length);
        }
    }
}`,
          { task: "Create jagged array int[][] j = new int[2][]; j[0]=new int[]{10}; j[1]=new int[]{20, 30}; and print j[1][1].", hint: "System.out.println(j[1][1]);", expected_output: "30" },
          "Java tabular 2D array nahi balki 'array of references' banata hai, isliye har row ki apni independent memory length ho sakti hai.",
          [
            { tag: "Jagged Arrays", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Non-Uniform Columns", desc: "Saves memory when storing triangular or variable datasets." }
          ],
          `<div class="theory-card"><h3>Jagged Memory Architecture</h3><p>Each row pointer references an independent heap array.</p></div>`
        ),
        makeLesson("test2-l-5-4", "test2-mod-5", 4, "Lesson 5.4: Fast Low-Level Copying with System.arraycopy", 4, 25, "java",
`import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] source = {10, 20, 30, 40, 50};
        int[] destination = new int[5];

        // Native C-level memory copy (memmove)
        System.arraycopy(source, 1, destination, 0, 3);
        System.out.println("Destination Buffer: " + Arrays.toString(destination));
    }
}`,
          { task: "Copy 2 elements from source {1, 2, 3} to dest new int[2] using System.arraycopy. Print Arrays.toString(dest).", hint: "int[] s={1,2,3}; int[] d=new int[2]; System.arraycopy(s,0,d,0,2); System.out.println(java.util.Arrays.toString(d));", expected_output: "[1, 2]" },
          "System.arraycopy native JVM C-level routine (memmove) use karta hai jo manual loop copy se 10x fast hota hai.",
          [
            { tag: "Native Speed", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "System.arraycopy", desc: "Direct hardware-accelerated memory block transfer." }
          ],
          `<div class="theory-card"><h3>Native Memory Transfer</h3><p>The core engine behind ArrayList resizing.</p></div>`
        )
      ]
    },

    // Mod 6: 3 lessons
    {
      id: "test2-mod-6",
      course_id: "course-test-2-java",
      module_number: 6,
      title: "Module 6: Classes, Objects & Encapsulation",
      description: "Class architecture, this pointer, constructor chaining, and private field encapsulation.",
      order_index: 6,
      lessons: [
        makeLesson("test2-l-6-1", "test2-mod-6", 1, "Lesson 6.1: Classes, Instance State & The this Keyword", 1, 25, "java",
`class Student {
    // Instance fields
    String name;
    int rollNo;

    // Parameter shadowing resolved via 'this'
    Student(String name, int rollNo) {
        this.name = name;
        this.rollNo = rollNo;
    }

    void display() {
        System.out.println("Student: " + this.name + " (#" + this.rollNo + ")");
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Sourav", 101);
        s.display();
    }
}`,
          { task: "Instantiate Student with 'Rahul', 102 and call display().", hint: "new Student(\"Rahul\", 102).display();", expected_output: "Student: Rahul (#102)" },
          "'this' keyword current invoking instance object ka memory pointer hota hai jo parameter shadowing resolve karta hai.",
          [
            { tag: "this Pointer", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Current Reference", desc: "Differentiates instance variables from local parameters." }
          ],
          `<div class="theory-card"><h3>Object Instantiation</h3><p>Heap memory allocation via 'new' keyword.</p></div>`
        ),
        makeLesson("test2-l-6-2", "test2-mod-6", 2, "Lesson 6.2: Constructor Chaining with this() & Overloading", 2, 25, "java",
`class Account {
    String accountId;
    double balance;

    // Primary constructor
    Account(String id, double initialBalance) {
        this.accountId = id;
        this.balance = initialBalance;
    }

    // Overloaded constructor chaining to primary constructor
    Account(String id) {
        this(id, 0.0); // Must be first statement in constructor
    }
}

public class Main {
    public static void main(String[] args) {
        Account acc = new Account("ACC-9988");
        System.out.println("Account: " + acc.accountId + " | Balance: Rs." + acc.balance);
    }
}`,
          { task: "Instantiate Account with 'ACC-1' and print its balance.", hint: "Account a = new Account(\"ACC-1\"); System.out.println(a.balance);", expected_output: "0.0" },
          "Constructor chaining this() use karke multiple constructors ke beech duplicate initialization code ko eliminate karta hai.",
          [
            { tag: "DRY Principle", color: "rgba(16, 185, 129, 0.15); #10b981", title: "this() Chaining", desc: "Delegates initialization without code duplication." }
          ],
          `<div class="theory-card"><h3>Constructor Lifecycle</h3><p>this(...) must always be the very first instruction in the constructor body.</p></div>`
        ),
        makeLesson("test2-l-6-3", "test2-mod-6", 3, "Lesson 6.3: Access Modifiers & Encapsulation (Getters/Setters)", 3, 25, "java",
`class SecureVault {
    private double funds; // Hidden private state

    public SecureVault(double initialFunds) {
        this.funds = initialFunds;
    }

    public double getFunds() {
        return this.funds;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be strictly positive!");
        }
        this.funds += amount;
    }
}

public class Main {
    public static void main(String[] args) {
        SecureVault vault = new SecureVault(5000.0);
        vault.deposit(2500.0);
        System.out.println("Vault Total Funds: Rs." + vault.getFunds());
    }
}`,
          { task: "Deposit 1000 into SecureVault(2000) and print getFunds().", hint: "SecureVault v = new SecureVault(2000); v.deposit(1000); System.out.println(v.getFunds());", expected_output: "3000.0" },
          "Encapsulation private fields aur public validation methods ke through internal data integrity protect karta hai.",
          [
            { tag: "Data Hiding", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Encapsulation", desc: "Restricts direct attribute mutation to preserve class invariants." }
          ],
          `<div class="theory-card"><h3>Encapsulation Rules</h3><p>Private variables + validated public accessors.</p></div>`
        )
      ]
    },

    // Mod 7: 5 lessons
    {
      id: "test2-mod-7",
      course_id: "course-test-2-java",
      module_number: 7,
      title: "Module 7: Inheritance & Polymorphism",
      description: "Class extension with extends, super constructor invocations, dynamic method dispatch, final keyword, and abstract classes.",
      order_index: 7,
      lessons: [
        makeLesson("test2-l-7-1", "test2-mod-7", 1, "Lesson 7.1: Inheritance Hierarchy (extends) & super Constructor", 1, 25, "java",
`class Vehicle {
    protected String brand;

    Vehicle(String brand) {
        this.brand = brand;
    }
}

class Car extends Vehicle {
    private int maxSpeed;

    Car(String brand, int maxSpeed) {
        super(brand); // Invokes parent Vehicle constructor
        this.maxSpeed = maxSpeed;
    }

    void printDetails() {
        System.out.println("Vehicle: " + this.brand + " | Top Speed: " + this.maxSpeed + " km/h");
    }
}

public class Main {
    public static void main(String[] args) {
        Car c = new Car("Audi", 240);
        c.printDetails();
    }
}`,
          { task: "Instantiate Car('BMW', 260) and call printDetails().", hint: "new Car(\"BMW\", 260).printDetails();", expected_output: "Vehicle: BMW | Top Speed: 260 km/h" },
          "Inheritance 'extends' keyword se parent class ka behavior inherit karta hai aur 'super()' parent constructor ko invoke karta hai.",
          [
            { tag: "Code Reusability", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "super() Call", desc: "Initializes base class state before child initialization." }
          ],
          `<div class="theory-card"><h3>Inheritance Chain</h3><p>Constructors execute top-to-bottom (Parent -> Child).</p></div>`
        ),
        makeLesson("test2-l-7-2", "test2-mod-7", 2, "Lesson 7.2: Method Overriding & @Override Annotation", 2, 20, "java",
`class Animal {
    void makeSound() {
        System.out.println("Generic Animal Sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog Barks: Woof Woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myDog = new Dog();
        myDog.makeSound();
    }
}`,
          { task: "Create Dog instance and call makeSound().", hint: "new Dog().makeSound();", expected_output: "Dog Barks: Woof Woof!" },
          "@Override annotation compile time par verify karta hai ki parent method signature exact match kar raha hai ya nahi.",
          [
            { tag: "Compile Safety", color: "rgba(16, 185, 129, 0.15); #10b981", title: "@Override Guard", desc: "Catches typo bugs in overridden method signatures." }
          ],
          `<div class="theory-card"><h3>Method Overriding</h3><p>Child replaces parent implementation with specialized behavior.</p></div>`
        ),
        makeLesson("test2-l-7-3", "test2-mod-7", 3, "Lesson 7.3: Dynamic Method Dispatch (Runtime Polymorphism)", 3, 25, "java",
`class Shape {
    void draw() { System.out.println("Drawing Shape"); }
}

class Circle extends Shape {
    @Override
    void draw() { System.out.println("Drawing Circle"); }
}

class Square extends Shape {
    @Override
    void draw() { System.out.println("Drawing Square"); }
}

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(), new Square() };
        for (Shape s : shapes) {
            s.draw(); // Dynamic dispatch determines actual object at runtime
        }
    }
}`,
          { task: "Iterate shapes array and observe polymorphic draw() dispatch.", hint: "Shape s = new Circle(); s.draw();", expected_output: "Drawing Circle\nDrawing Square" },
          "Dynamic Method Dispatch JVM vtable lookup ke through runtime par actual object type determine karke sahi method call karta hai.",
          [
            { tag: "Dynamic Dispatch", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Runtime VTable", desc: "Method call bound at runtime based on actual heap object." }
          ],
          `<div class="theory-card"><h3>Runtime Polymorphism</h3><p>Extensible architecture allowing new shapes without changing caller code.</p></div>`
        ),
        makeLesson("test2-l-7-4", "test2-mod-7", 4, "Lesson 7.4: The final Keyword (Constants, Immutability & Security)", 4, 20, "java",
`final class ImmutableConfig { // Cannot be extended
    final int maxConnections = 100; // Cannot be re-assigned

    final void showConfig() { // Cannot be overridden
        System.out.println("Max DB Connections: " + maxConnections);
    }
}

public class Main {
    public static void main(String[] args) {
        ImmutableConfig cfg = new ImmutableConfig();
        cfg.showConfig();
    }
}`,
          { task: "Instantiate ImmutableConfig and call showConfig().", hint: "new ImmutableConfig().showConfig();", expected_output: "Max DB Connections: 100" },
          "'final' variables ko constants banata hai, methods ko overriding se protect karta hai aur classes ko sub-classing se lock karta hai.",
          [
            { tag: "Immutability", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "final Keyword", desc: "Enforces immutability and thread safety." }
          ],
          `<div class="theory-card"><h3>Security & Inlining</h3><p>JVM optimizes final methods by inlining them into machine code.</p></div>`
        ),
        makeLesson("test2-l-7-5", "test2-mod-7", 5, "Lesson 7.5: Abstract Classes vs Concrete Subclasses in Java", 5, 25, "java",
`abstract class PaymentProcessor {
    public void logAudit(double amount) {
        System.out.println("Auditing Payment: Rs." + amount);
    }
    public abstract boolean process(double amount);
}

class UPIPayment extends PaymentProcessor {
    @Override
    public boolean process(double amount) {
        logAudit(amount);
        System.out.println("UPI transfer verified successfully.");
        return true;
    }
}

public class Main {
    public static void main(String[] args) {
        PaymentProcessor p = new UPIPayment();
        p.process(1200.0);
    }
}`,
          { task: "Instantiate UPIPayment via PaymentProcessor reference and process(500).", hint: "PaymentProcessor p = new UPIPayment(); p.process(500);", expected_output: "Auditing Payment: Rs.500.0\nUPI transfer verified successfully." },
          "Abstract classes partial implementation aur shared fields hold karne ke liye use hoti hain, jabki unhe directly instantiate nahi kiya ja sakta.",
          [
            { tag: "Abstract Class", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Partial Contract", desc: "Combines concrete template methods with abstract hooks." }
          ],
          `<div class="theory-card"><h3>Template Method Pattern</h3><p>Enforce uniform algorithm skeleton across microservice plugins.</p></div>`
        )
      ]
    },

    // Mod 8: 3 lessons
    {
      id: "test2-mod-8",
      course_id: "course-test-2-java",
      module_number: 8,
      title: "Module 8: Interfaces & Modern Contracts",
      description: "Pure interface contracts, multiple interface implementation, Java 8 default/static methods, and functional interfaces.",
      order_index: 8,
      lessons: [
        makeLesson("test2-l-8-1", "test2-mod-8", 1, "Lesson 8.1: Interface Contracts & Multiple Implementation", 1, 25, "java",
`interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Duck implements Flyable, Swimmable {
    @Override
    public void fly() { System.out.println("Duck is flying!"); }
    @Override
    public void swim() { System.out.println("Duck is swimming!"); }
}

public class Main {
    public static void main(String[] args) {
        Duck d = new Duck();
        d.fly();
        d.swim();
    }
}`,
          { task: "Instantiate Duck and call both fly() and swim().", hint: "Duck d = new Duck(); d.fly(); d.swim();", expected_output: "Duck is flying!\nDuck is swimming!" },
          "Java multiple class inheritance allow nahi karta lekin ek class multiple interfaces implement kar sakti hai.",
          [
            { tag: "Loose Coupling", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Multiple Interfaces", desc: "100% abstract capabilities composition." }
          ],
          `<div class="theory-card"><h3>Interface Contract</h3><p>Decouples architectural contracts from concrete class trees.</p></div>`
        ),
        makeLesson("test2-l-8-2", "test2-mod-8", 2, "Lesson 8.2: Default & Static Methods in Interfaces (Java 8+)", 2, 20, "java",
`interface Notifier {
    void send(String message);

    // Default method provides backwards-compatible implementation
    default void sendWithTimestamp(String msg) {
        System.out.println("[2026-03-01] " + msg);
        send(msg);
    }
}

class EmailNotifier implements Notifier {
    @Override
    public void send(String message) {
        System.out.println("Email Sent: " + message);
    }
}

public class Main {
    public static void main(String[] args) {
        Notifier n = new EmailNotifier();
        n.sendWithTimestamp("Server Alert: High CPU");
    }
}`,
          { task: "Call sendWithTimestamp('Test Alert') on EmailNotifier.", hint: "new EmailNotifier().sendWithTimestamp(\"Test Alert\");", expected_output: "[2026-03-01] Test Alert\nEmail Sent: Test Alert" },
          "Default methods allow karte hain interfaces mein naye methods add karna bina existing implementing classes ko break kiye.",
          [
            { tag: "Backwards Compatible", color: "rgba(16, 185, 129, 0.15); #10b981", title: "default Method", desc: "Allows API evolution without breaking legacy code." }
          ],
          `<div class="theory-card"><h3>Interface Evolution</h3><p>Default and static methods modernize library APIs.</p></div>`
        ),
        makeLesson("test2-l-8-3", "test2-mod-8", 3, "Lesson 8.3: Functional Interfaces & Lambda Expressions", 3, 25, "java",
`@FunctionalInterface
interface StringTransformer {
    String transform(String input);
}

public class Main {
    public static void main(String[] args) {
        // Lambda implementation of Single Abstract Method (SAM)
        StringTransformer upper = s -> s.toUpperCase();
        StringTransformer exclaim = s -> s + "!!!";

        System.out.println(upper.transform("hello java"));
        System.out.println(exclaim.transform("rock on"));
    }
}`,
          { task: "Create a lambda for StringTransformer that returns input + ' :)' and test with 'Java'.", hint: "StringTransformer t = s -> s + \" :)\"; System.out.println(t.transform(\"Java\"));", expected_output: "Java :)" },
          "Functional Interfaces (SAM) lambdas ke sath milkar Java ko concise, functional aur stream-ready banate hain.",
          [
            { tag: "Functional Java", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "SAM Lambdas", desc: "Single Abstract Method interfaces mapped directly to lambda expressions." }
          ],
          `<div class="theory-card"><h3>Functional Interface Pipeline</h3><p>Underpins java.util.function and the Java Stream API.</p></div>`
        )
      ]
    },

    // Mod 9: 4 lessons
    {
      id: "test2-mod-9",
      course_id: "course-test-2-java",
      module_number: 9,
      title: "Module 9: Exception Handling & Resource Safety",
      description: "Checked vs Unchecked exceptions, try-catch-finally, custom domain exceptions, AutoCloseable, and try-with-resources.",
      order_index: 9,
      lessons: [
        makeLesson("test2-l-9-1", "test2-mod-9", 1, "Lesson 9.1: Checked vs Unchecked Exceptions & try-catch-finally", 1, 25, "java",
`public class Main {
    public static void main(String[] args) {
        try {
            int a = 10;
            int b = 0;
            int result = a / b;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Handled Arithmetic Exception: " + e.getMessage());
        } finally {
            System.out.println("Finally block executed guaranteed.");
        }
    }
}`,
          { task: "Catch an ArithmeticException on 10/0 and print 'Caught Error'.", hint: "try{ int x=10/0; }catch(ArithmeticException e){ System.out.println(\"Caught Error\"); }", expected_output: "Caught Error" },
          "Unchecked exceptions (RuntimeException) programming errors ke liye hoti hain, jabki Checked exceptions compiler enforce karta hai handle karne ke liye.",
          [
            { tag: "Error Safety", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Exception Hierarchy", desc: "Throwable -> Exception (Checked) & RuntimeException (Unchecked)." }
          ],
          `<div class="theory-card"><h3>Exception Handling Pipeline</h3><p>try -> catch (on error) -> finally (always runs).</p></div>`
        ),
        makeLesson("test2-l-9-2", "test2-mod-9", 2, "Lesson 9.2: Custom Domain Exceptions & throw/throws Declarations", 2, 25, "java",
`class InsufficientFundsException extends Exception {
    public InsufficientFundsException(double balance, double amount) {
        super("Cannot withdraw Rs." + amount + ". Current balance is only Rs." + balance);
    }
}

public class Main {
    public static void withdraw(double balance, double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(balance, amount);
        }
        System.out.println("Withdrawal Approved: Rs." + amount);
    }

    public static void main(String[] args) {
        try {
            withdraw(1000.0, 2500.0);
        } catch (InsufficientFundsException e) {
            System.out.println("Caught Custom Domain Exception: " + e.getMessage());
        }
    }
}`,
          { task: "Define custom exception and throw it when amount > balance.", hint: "Call withdraw(100, 200) inside try-catch.", expected_output: "Caught Custom Domain Exception: Cannot withdraw Rs.2500.0. Current balance is only Rs.1000.0" },
          "Custom exceptions application business rules violations ko track aur isolate karne ke liye standard practice hain.",
          [
            { tag: "Domain Modeling", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Custom Exceptions", desc: "Subclasses Exception to provide clear domain context." }
          ],
          `<div class="theory-card"><h3>Domain Error Architecture</h3><p>Explicit checked exception contracts in method signatures.</p></div>`
        ),
        makeLesson("test2-l-9-3", "test2-mod-9", 3, "Lesson 9.3: AutoCloseable & Try-With-Resources Architecture", 3, 25, "java",
`import java.io.ByteArrayInputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        // Try-with-resources automatically closes stream resources even on exceptions
        try (ByteArrayInputStream stream = new ByteArrayInputStream("Hello Stream".getBytes())) {
            int firstByte = stream.read();
            System.out.println("Read First Byte: " + (char) firstByte);
        } catch (IOException e) {
            System.err.println("Stream Error: " + e.getMessage());
        }
        System.out.println("Stream safely closed by JVM automatically!");
    }
}`,
          { task: "Implement try-with-resources with ByteArrayInputStream and print 'Closed cleanly'.", hint: "try(ByteArrayInputStream b = new ByteArrayInputStream(new byte[]{65})) { System.out.println(\"Closed cleanly\"); }", expected_output: "Closed cleanly" },
          "Try-With-Resources AutoCloseable resources ko automatically dispose karta hai, preventing memory and socket leaks.",
          [
            { tag: "Resource Safety", color: "rgba(16, 185, 129, 0.15); #10b981", title: "AutoCloseable", desc: "Guaranteed memory & file descriptor cleanup." }
          ],
          `<div class="theory-card"><h3>Resource Management</h3><p>Replaces verbose finally { resource.close(); } blocks.</p></div>`
        ),
        makeLesson("test2-l-9-4", "test2-mod-9", 4, "Lesson 9.4: Multi-Catch Blocks & Exception Chaining", 4, 20, "java",
`public class Main {
    public static void main(String[] args) {
        try {
            String str = null;
            if (str == null) throw new NullPointerException("Null reference encountered");
        } catch (NullPointerException | ArithmeticException e) {
            System.out.println("Multi-catch block handled: " + e.getClass().getSimpleName());
        }
    }
}`,
          { task: "Handle multiple exceptions in single catch block and print class name.", hint: "catch(NullPointerException | NumberFormatException e)", expected_output: "Multi-catch block handled: NullPointerException" },
          "Multi-catch syntax unrelated sibling exceptions ko ek clean block mein handle karta hai.",
          [
            { tag: "Clean Syntax", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Multi-Catch", desc: "Combines multiple catch blocks without inheritance overlapping." }
          ],
          `<div class="theory-card"><h3>Multi-Catch Rules</h3><p>Subclasses cannot be caught in the same pipe-delimited block as their parent.</p></div>`
        )
      ]
    },

    // Mod 10: 3 lessons
    {
      id: "test2-mod-10",
      course_id: "course-test-2-java",
      module_number: 10,
      title: "Module 10: Collections & Capstone Banking Engine",
      description: "ArrayList vs LinkedList, HashMap internals, and a full production Core Banking Engine capstone.",
      order_index: 10,
      lessons: [
        makeLesson("test2-l-10-1", "test2-mod-10", 1, "Lesson 10.1: List Collections — ArrayList vs LinkedList Mechanics", 1, 25, "java",
`import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> accounts = new ArrayList<>();
        accounts.add("ACC-101");
        accounts.add("ACC-102");
        accounts.add("ACC-103");

        System.out.println("Total Accounts: " + accounts.size());
        System.out.println("Account at index 1: " + accounts.get(1));
    }
}`,
          { task: "Create an ArrayList of Integers, add 10 and 20, and print size().", hint: "List<Integer> l = new java.util.ArrayList<>(); l.add(10); l.add(20); System.out.println(l.size());", expected_output: "2" },
          "ArrayList contiguous memory array use karta hai jo O(1) random access deta hai, jabki LinkedList O(1) head/tail insertions provide karta hai.",
          [
            { tag: "Collections", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "ArrayList O(1)", desc: "Dynamic array with continuous memory locality." }
          ],
          `<div class="theory-card"><h3>List Memory Tradeoffs</h3><p>ArrayList is the default list choice for 99% of enterprise applications.</p></div>`
        ),
        makeLesson("test2-l-10-2", "test2-mod-10", 2, "Lesson 10.2: HashMap Bucket Mechanics & O(1) Key Lookups", 2, 25, "java",
`import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<String, Double> balances = new HashMap<>();
        balances.put("SB-1001", 45000.0);
        balances.put("SB-1002", 92000.0);

        System.out.println("SB-1001 Balance: Rs." + balances.get("SB-1001"));
        System.out.println("Contains SB-1002? " + balances.containsKey("SB-1002"));
    }
}`,
          { task: "Store key 'user' with value 'admin' in HashMap and print get('user').", hint: "Map<String,String> m = new HashMap<>(); m.put(\"user\", \"admin\"); System.out.println(m.get(\"user\"));", expected_output: "admin" },
          "HashMap hashCode() aur equals() methods use karke buckets mein elements store karta hai (O(1) average lookup).",
          [
            { tag: "Hash Table", color: "rgba(16, 185, 129, 0.15); #10b981", title: "HashMap Engine", desc: "Constant-time key lookup and collision resolution via tree nodes." }
          ],
          `<div class="theory-card"><h3>HashMap Internal Architecture</h3><p>Array of Buckets -> LinkedList -> Red-Black Tree (TREEIFY_THRESHOLD = 8).</p></div>`
        ),
        makeLesson("test2-l-10-3", "test2-mod-10", 3, "Lesson 10.3: Capstone Project — Production Core Banking Engine", 3, 30, "java",
`import java.util.HashMap;
import java.util.Map;

class BankEngine {
    private final Map<String, Double> ledger = new HashMap<>();

    public void openAccount(String id, double initialDeposit) {
        ledger.put(id, initialDeposit);
    }

    public synchronized void transfer(String from, String to, double amount) {
        double fromBal = ledger.getOrDefault(from, 0.0);
        if (fromBal < amount) throw new IllegalStateException("Insufficient Balance");
        ledger.put(from, fromBal - amount);
        ledger.put(to, ledger.getOrDefault(to, 0.0) + amount);
    }

    public double getBalance(String id) {
        return ledger.getOrDefault(id, 0.0);
    }
}

public class Main {
    public static void main(String[] args) {
        BankEngine bank = new BankEngine();
        bank.openAccount("ACC-A", 10000.0);
        bank.openAccount("ACC-B", 2000.0);
        bank.transfer("ACC-A", "ACC-B", 3000.0);

        System.out.println("ACC-A Balance: Rs." + bank.getBalance("ACC-A"));
        System.out.println("ACC-B Balance: Rs." + bank.getBalance("ACC-B"));
    }
}`,
          { task: "Execute bank transfer and verify ACC-A has 7000.0 and ACC-B has 5000.0.", hint: "Run BankEngine transfer in main.", expected_output: "ACC-A Balance: Rs.7000.0\nACC-B Balance: Rs.5000.0" },
          "Mubarak ho! Aapne Java OOP, Collections, Encapsulation aur Thread-Safe business mechanics ke sath complete Banking Engine master kar liya hai!",
          [
            { tag: "Enterprise Capstone", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Banking Core Engine", desc: "Production-ready enterprise Java architecture." }
          ],
          `<div class="theory-card"><h3>Enterprise Java Mastery</h3><p>Full lifecycle core engineering competencies unlocked!</p></div>`
        )
      ]
    }
  ]
};

fs.writeFileSync('Courses/test-2.json', JSON.stringify(javaCourse, null, 2));
console.log("✅ Course 2 (Java) fully built with pure, unique Java content!");
