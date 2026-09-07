import * as fs from 'fs';
import * as path from 'path';

// Helper to ensure each module has exactly 5 high-quality questions
function enrichCourseQuizzes(coursePath: string, courseName: string) {
  const raw = fs.readFileSync(coursePath, 'utf8');
  const course = JSON.parse(raw);

  console.log(`Enriching quizzes for ${course.title}...`);

  for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
    const mod = course.modules[mIdx];
    const modNum = mod.module_number || (mIdx + 1);
    const existingQs = mod.quiz?.questions || [];

    // Ensure quiz container
    if (!mod.quiz) {
      mod.quiz = {
        id: `${course.id}-quiz-m${modNum}`,
        course_id: course.id,
        module_index: modNum,
        passing_score: 70,
        time_limit_minutes: 10,
        questions: []
      };
    }

    // Generate/enrich up to 5 questions
    const enrichedQuestions = getEnrichedQuestionsForModule(course.id, modNum, mod.title, existingQs);
    mod.quiz.questions = enrichedQuestions;
    mod.quiz.passing_score = 70;
    mod.quiz.time_limit_minutes = 10;
  }

  fs.writeFileSync(coursePath, JSON.stringify(course, null, 2));
  console.log(`✅ Saved ${course.title} with 5 questions per module.`);
}

function getEnrichedQuestionsForModule(courseId: string, modNum: number, modTitle: string, existing: any[]): any[] {
  // If already has 5+, retain first 5 or supplement
  const res: any[] = [...existing];

  // Specific high-quality questions based on course and module
  const bank = getQuestionBank(courseId, modNum, modTitle);
  
  for (const q of bank) {
    if (res.length >= 5) break;
    // Check if question with same text already exists
    if (!res.some(e => e.question.toLowerCase().trim() === q.question.toLowerCase().trim())) {
      res.push({
        id: `${courseId}-m${modNum}-q${res.length + 1}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      });
    }
  }

  // If still less than 5, fill with targeted questions
  while (res.length < 5) {
    const idx = res.length + 1;
    res.push({
      id: `${courseId}-m${modNum}-q${idx}`,
      question: `Which of the following is a primary best practice covered in ${modTitle}?`,
      options: [
        "Ignoring syntax rules for faster execution",
        "Writing clean, modular code with appropriate error handling and type safety",
        "Disabling compiler warnings permanently",
        "Hardcoding all values without variables"
      ],
      correctAnswer: 1,
      explanation: `Writing structured, type-safe, and well-managed code is a fundamental core concept emphasized throughout this module.`
    });
  }

  // Ensure 5 exact questions with proper IDs
  return res.slice(0, 5).map((q, i) => ({
    ...q,
    id: `${courseId}-m${modNum}-q${i + 1}`
  }));
}

function getQuestionBank(courseId: string, modNum: number, modTitle: string): any[] {
  if (courseId.includes('test-3') || courseId.includes('c')) {
    return getCQuestionBank(modNum);
  } else if (courseId.includes('test-2') || courseId.includes('java')) {
    return getJavaQuestionBank(modNum);
  } else {
    return getPythonQuestionBank(modNum);
  }
}

// ----------------- C QUESTIONS BANK -----------------
function getCQuestionBank(modNum: number): any[] {
  switch (modNum) {
    case 1:
      return [
        {
          question: "Which compilation stage in C is responsible for expanding #include headers and #define macros?",
          options: ["Linker", "Preprocessor", "Assembler", "Code Generator"],
          correctAnswer: 1,
          explanation: "The Preprocessor runs before compilation, expanding macros, including header files, and removing comments."
        },
        {
          question: "What is the correct format specifier to print a standard 32-bit signed integer in C?",
          options: ["%f", "%s", "%d", "%c"],
          correctAnswer: 2,
          explanation: "%d (or %i) is the standard format specifier used by printf for signed decimal integers."
        },
        {
          question: "What does returning 0 from the main() function indicate to the operating system?",
          options: ["Program has 0 memory allocated", "Program failed with an error", "Program executed successfully without error", "Program requires elevated root permissions"],
          correctAnswer: 2,
          explanation: "In POSIX and standard C conventions, returning 0 signals successful completion to the host OS."
        },
        {
          question: "How much memory does a standard 'char' primitive variable occupy in C on modern architectures?",
          options: ["1 Byte (8 bits)", "2 Bytes", "4 Bytes", "8 Bytes"],
          correctAnswer: 0,
          explanation: "According to the ANSI/ISO C standard, sizeof(char) is always guaranteed to be exactly 1 byte."
        },
        {
          question: "Which standard header file must be included to use printf() and scanf() in C?",
          options: ["<stdlib.h>", "<string.h>", "<stdio.h>", "<math.h>"],
          correctAnswer: 2,
          explanation: "<stdio.h> provides prototypes and definitions for standard input and output streams."
        }
      ];
    case 2:
      return [
        {
          question: "In C, what is the result of evaluating the arithmetic expression: 7 / 2 ?",
          options: ["3.5", "3", "4", "Compilation Error"],
          correctAnswer: 1,
          explanation: "Because both operands 7 and 2 are integers, integer division truncates the decimal portion, resulting in 3."
        },
        {
          question: "In C conditions, which value is treated as FALSE?",
          options: ["-1", "0", "1", "Any non-zero integer"],
          correctAnswer: 1,
          explanation: "In C, the value 0 represents false, while any non-zero value (positive or negative) evaluates to true."
        },
        {
          question: "What happens in a switch-case statement if you omit the 'break' keyword at the end of a matched case?",
          options: ["Compilation error occurs", "Execution falls through to subsequent cases", "The program terminates immediately", "The switch restarts from the top"],
          correctAnswer: 1,
          explanation: "Without a break statement, control flows into subsequent cases regardless of their case values (fallthrough)."
        },
        {
          question: "Which operator in C computes the remainder of integer division?",
          options: ["/", "//", "%", "^"],
          correctAnswer: 2,
          explanation: "The modulo operator % returns the remainder of dividing two integer operands."
        },
        {
          question: "What is the logical operator for boolean AND in C?",
          options: ["&", "&&", "AND", "|"],
          correctAnswer: 1,
          explanation: "&& is the logical AND operator (short-circuiting), whereas & is the bitwise AND operator."
        }
      ];
    case 3:
      return [
        {
          question: "Which loop construct in C is guaranteed to execute its body at least once even if the condition is initially false?",
          options: ["for loop", "while loop", "do-while loop", "nested loop"],
          correctAnswer: 2,
          explanation: "The do-while loop evaluates its condition at the bottom (exit-controlled), guaranteeing at least one execution."
        },
        {
          question: "What does the 'continue' keyword do inside a loop body in C?",
          options: ["Terminates the entire loop immediately", "Skips the remainder of current iteration and jumps to next iteration", "Restarts the program from main()", "Exits the current function"],
          correctAnswer: 1,
          explanation: "continue skips remaining statements in the current cycle and jumps directly to the loop condition/update step."
        },
        {
          question: "What is the correct syntax for an infinite loop in C using 'for'?",
          options: ["for(int i=0; i<1; i--)", "for(;;)", "for(while(true))", "loop()"],
          correctAnswer: 1,
          explanation: "for(;;) has empty initialization, condition, and update expressions, representing an idiomatic infinite loop in C."
        },
        {
          question: "In a 'for (int i = 0; i < 5; i++)' loop, how many times will the loop body execute?",
          options: ["4 times", "5 times", "6 times", "Infinite"],
          correctAnswer: 1,
          explanation: "The loop runs for i = 0, 1, 2, 3, 4, which is exactly 5 iterations."
        },
        {
          question: "What happens when 'break' is executed inside a nested inner loop?",
          options: ["Exits only the innermost loop", "Exits all enclosing loops", "Terminates the program", "Skips to the outer loop update"],
          correctAnswer: 0,
          explanation: "break only terminates the immediate innermost loop containing it."
        }
      ];
    case 4:
      return [
        {
          question: "Why are function prototypes placed at the top of a C source file?",
          options: ["To allocate RAM for function variables", "To inform the single-pass compiler about function signature before invocation", "To run the function in kernel mode", "To export the code to Python"],
          correctAnswer: 1,
          explanation: "Prototypes declare return and parameter types so the compiler can validate calls before reading the full definition."
        },
        {
          question: "In C, what is the default parameter passing mechanism for primitive types (int, float, char)?",
          options: ["Pass-by-Reference", "Pass-by-Value", "Pass-by-Name", "Pass-by-Shared-Pointer"],
          correctAnswer: 1,
          explanation: "C is strictly pass-by-value. Passing an argument creates a local copy on the function's stack frame."
        },
        {
          question: "What storage class keyword allows a local variable to retain its value across multiple function calls?",
          options: ["auto", "register", "static", "volatile"],
          correctAnswer: 2,
          explanation: "A static local variable is stored in the Data Segment and preserves its value between function invocations."
        },
        {
          question: "What dangerous runtime condition occurs if a recursive function lacks a valid base case?",
          options: ["Memory Fragmentation", "Stack Overflow (Segmentation Fault)", "Deadlock", "Syntax Error"],
          correctAnswer: 1,
          explanation: "Infinite recursion exhausts stack space, causing the operating system to abort the process with a stack overflow."
        },
        {
          question: "What does the 'extern' keyword in C declare?",
          options: ["A variable that only exists on the GPU", "A variable or function defined in an external file or translation unit", "A temporary register variable", "An encrypted pointer"],
          correctAnswer: 1,
          explanation: "extern tells the compiler that the definition of the symbol exists in another translation unit, resolved during linking."
        }
      ];
    case 5:
      return [
        {
          question: "If an array int arr[5] is allocated at address 2000, and sizeof(int) is 4 bytes, what is the memory address of arr[3]?",
          options: ["2003", "2012", "2015", "2008"],
          correctAnswer: 1,
          explanation: "Address of arr[3] = base_address + (3 * sizeof(int)) = 2000 + (3 * 4) = 2012."
        },
        {
          question: "How are 2D arrays stored in physical RAM in C?",
          options: ["Column-Major order", "Row-Major contiguous order", "Fragmented linked chunks", "Hash bucket blocks"],
          correctAnswer: 1,
          explanation: "C stores multidimensional arrays in Row-Major order, where row elements are laid out consecutively in memory."
        },
        {
          question: "What is 'array decay' in C when an array is passed as an argument to a function?",
          options: ["The array is deleted from RAM", "The array decays into a pointer to its first element", "All negative values become zero", "The array converts into a linked list"],
          correctAnswer: 1,
          explanation: "In function parameter expressions, array names decay into a pointer pointing to the first element (type T*)."
        },
        {
          question: "What is the index of the first element in any C array?",
          options: ["1", "0", "-1", "Depends on OS configuration"],
          correctAnswer: 1,
          explanation: "C uses 0-based indexing for all contiguous arrays and pointers."
        },
        {
          question: "Given 'int a[5] = {10, 20};', what are the values of the remaining uninitialized elements a[2], a[3], a[4]?",
          options: ["Random garbage values", "Zero (0)", "-1", "NULL pointers"],
          correctAnswer: 1,
          explanation: "When an array initializer list provides fewer elements than the array capacity, remaining elements are zero-initialized."
        }
      ];
    case 6:
      return [
        {
          question: "What character marks the end of a valid C string in memory?",
          options: ["'\\n' (Newline)", "'\\0' (Null Terminator)", "EOF", "';' (Semicolon)"],
          correctAnswer: 1,
          explanation: "The null terminator '\\0' (ASCII 0) marks the boundary of string data in C character arrays."
        },
        {
          question: "What value does strcmp(s1, s2) return when strings s1 and s2 are completely identical?",
          options: ["1", "0", "-1", "true"],
          correctAnswer: 1,
          explanation: "strcmp returns 0 if both strings contain the exact same characters in the exact same sequence."
        },
        {
          question: "How many bytes of memory are required to store the string literal \"Lernex\" including null terminator?",
          options: ["6 Bytes", "7 Bytes", "8 Bytes", "5 Bytes"],
          correctAnswer: 1,
          explanation: "\"Lernex\" has 6 characters + 1 byte for '\\0', totaling 7 bytes in memory."
        },
        {
          question: "Why is gets() considered dangerous and removed from the modern C standard (C11)?",
          options: ["It runs too slowly", "It has no bounds check and causes severe Buffer Overflow vulnerabilities", "It cannot read spaces", "It requires root permissions"],
          correctAnswer: 1,
          explanation: "gets() does not check destination buffer size, allowing attackers to overwrite stack memory and hijack execution flow."
        },
        {
          question: "Which safe standard library function formats a string into a bounded destination buffer?",
          options: ["sprintf()", "snprintf()", "strcpy()", "strcat()"],
          correctAnswer: 1,
          explanation: "snprintf() takes a buffer size limit parameter, guaranteeing that writes will never exceed the designated buffer capacity."
        }
      ];
    case 7:
      return [
        {
          question: "Given 'int x = 10; int *p = &x;', what does the expression '*p' evaluate to?",
          options: ["The memory address of x", "The value stored in x (10)", "The address of pointer p", "A new heap allocation"],
          correctAnswer: 1,
          explanation: "The dereference operator '*' follows the pointer address to read or write the actual value stored in that memory cell."
        },
        {
          question: "In C, what is 'arr[i]' under the hood according to pointer arithmetic equivalence?",
          options: ["*(arr + i)", "arr + i", "&(arr + i)", "arr->i"],
          correctAnswer: 0,
          explanation: "The array indexing operator arr[i] is syntactically equivalent to *(arr + i) in the C standard specification."
        },
        {
          question: "What does the Address-Of operator (&) return when applied to a variable?",
          options: ["The size of the variable in bytes", "The physical memory address where the variable is stored in RAM", "A copy of the variable value", "The type descriptor"],
          correctAnswer: 1,
          explanation: "&var evaluates to the memory address coordinate of var."
        },
        {
          question: "If pointer 'int *p' holds address 0x1000, what address does 'p + 2' point to (assuming 4-byte integers)?",
          options: ["0x1002", "0x1008", "0x1004", "0x1016"],
          correctAnswer: 1,
          explanation: "Pointer arithmetic scales by sizeof(type). 0x1000 + (2 * 4 bytes) = 0x1008."
        },
        {
          question: "What is a 'NULL pointer' in C?",
          options: ["A pointer pointing to address 0, guaranteed not to point to any valid object", "A pointer that points to itself", "A pointer with an uninitialized random address", "A read-only pointer"],
          correctAnswer: 0,
          explanation: "NULL is a standardized macro (typically (void*)0) representing an address that points to no valid memory."
        }
      ];
    case 8:
      return [
        {
          question: "Which standard C function allocates a specified number of bytes on the Heap without initializing them?",
          options: ["calloc()", "malloc()", "realloc()", "free()"],
          correctAnswer: 1,
          explanation: "malloc(size) allocates uninitialized heap memory containing whatever residual values were previously in RAM."
        },
        {
          question: "What is the primary difference between malloc() and calloc()?",
          options: ["calloc() allocates stack memory", "calloc() allocates memory and clears all bytes to zero (0)", "calloc() is faster than malloc()", "calloc() automatically frees memory when leaving scope"],
          correctAnswer: 1,
          explanation: "calloc(num, size) allocates memory for num elements of size bytes and zeroes out every single allocated byte."
        },
        {
          question: "What critical software bug occurs when heap memory allocated with malloc() is never deallocated with free()?",
          options: ["Segmentation Fault", "Memory Leak", "Buffer Overflow", "Deadlock"],
          correctAnswer: 1,
          explanation: "Memory leaks occur when allocated heap memory is no longer referenced but never returned to the OS, consuming RAM."
        },
        {
          question: "What is a 'dangling pointer' in C?",
          options: ["A pointer initialized to NULL", "A pointer pointing to a memory location that has already been deallocated (freed)", "A pointer that changes its address randomly", "A pointer passed to printf"],
          correctAnswer: 1,
          explanation: "A dangling pointer points to freed memory. Accessing it triggers undefined behavior and crashes."
        },
        {
          question: "Which function dynamically changes the size of a previously allocated heap memory block?",
          options: ["resize()", "realloc()", "memshift()", "alloc_more()"],
          correctAnswer: 1,
          explanation: "realloc(ptr, new_size) resizes an existing heap block, relocating data if a contiguous expansion isn't possible."
        }
      ];
    case 9:
      return [
        {
          question: "Which operator is used to access structure members through a structure pointer (e.g. Node *ptr)?",
          options: [". (Dot operator)", "-> (Arrow operator)", ":: (Scope resolution)", "=> (Fat arrow)"],
          correctAnswer: 1,
          explanation: "ptr->member is shorthand for (*ptr).member when accessing fields via a structure pointer."
        },
        {
          question: "What is the fundamental difference between a 'struct' and a 'union' in C?",
          options: ["structs are stored in heap, unions in stack", "In a struct, all members have separate memory; in a union, all members share the same memory space", "unions cannot hold numbers", "structs cannot be nested"],
          correctAnswer: 1,
          explanation: "Union members overlay the same memory address, so the total size is equal to the size of its largest member."
        },
        {
          question: "What is 'structure padding' in C memory layout?",
          options: ["Adding spaces inside string fields", "Extra unused bytes inserted by the compiler to align fields to natural hardware word boundaries", "Encrypting sensitive struct variables", "Allocating struct on GPU"],
          correctAnswer: 1,
          explanation: "Compilers insert padding bytes to ensure CPU memory access occurs on optimal 32/64-bit alignment boundaries."
        },
        {
          question: "What keyword is used in C to create custom type aliases (e.g. typedef unsigned long ulong;)?",
          options: ["type", "alias", "typedef", "using"],
          correctAnswer: 2,
          explanation: "typedef allows developers to create custom identifier aliases for existing types and struct signatures."
        },
        {
          question: "What is the default underlying data type and starting value of an enum constant in C?",
          options: ["int, starting at 0", "char, starting at 'A'", "float, starting at 0.0", "pointer, starting at NULL"],
          correctAnswer: 0,
          explanation: "C enum members are integer constants, incrementing by default starting from 0 unless explicitly assigned."
        }
      ];
    case 10:
      return [
        {
          question: "What does the Bitwise Left Shift operator (x << 1) effectively do to an unsigned integer value?",
          options: ["Divides the number by 2", "Multiplies the number by 2", "Adds 1 to the number", "Inverts all bits"],
          correctAnswer: 1,
          explanation: "Shifting bits left by 1 position (x << 1) shifts in a 0 at LSB, multiplying the value by 2."
        },
        {
          question: "Which bitwise operator is used to TOGGLE (flip) a specific bit state at position k (x ^= (1 << k))?",
          options: ["& (Bitwise AND)", "| (Bitwise OR)", "^ (Bitwise XOR)", "~ (Bitwise NOT)"],
          correctAnswer: 2,
          explanation: "XOR (^) with 1 flips the bit (0^1=1, 1^1=0); XOR with 0 leaves the bit unchanged."
        },
        {
          question: "What is the result of evaluating: (5 & 3) in binary? (5 = 0101_2, 3 = 0011_2)",
          options: ["1 (0001_2)", "7 (0111_2)", "0 (0000_2)", "6 (0110_2)"],
          correctAnswer: 0,
          explanation: "0101 AND 0011 results in 0001 (decimal 1) because only the least significant bit is 1 in both."
        },
        {
          question: "How do you check if an integer 'n' is odd using bitwise operations?",
          options: ["(n & 1) == 1", "(n | 1) == 1", "(n ^ 1) == 0", "(n >> 1) == 0"],
          correctAnswer: 0,
          explanation: "Odd numbers always have the least significant bit (bit 0) set to 1. Thus (n & 1) returns 1 for odd numbers."
        },
        {
          question: "What does the Bitwise NOT operator (~) do to an integer?",
          options: ["Multiplies by -1", "Inverts all binary bits (1s become 0s, 0s become 1s)", "Zeroes out the sign bit", "Clears the memory register"],
          correctAnswer: 1,
          explanation: "The unary ~ operator performs one's complement bitwise inversion on every bit of the operand."
        }
      ];
    case 11:
      return [
        {
          question: "What does the function fopen(\"data.txt\", \"r\") return if the requested file does not exist?",
          options: ["0", "NULL", "EOF", "-1"],
          correctAnswer: 1,
          explanation: "If fopen fails to find or open a file, it returns a NULL pointer to signify failure."
        },
        {
          question: "Which standard C function is used to safely flush and close an open FILE stream?",
          options: ["close()", "fclose()", "file_end()", "free_file()"],
          correctAnswer: 1,
          explanation: "fclose(filePtr) flushes unwritten buffers, releases OS file descriptors, and closes the stream."
        },
        {
          question: "Which mode string passed to fopen() opens a file for writing and appends new data to the end without deleting existing content?",
          options: ["\"r\"", "\"w\"", "\"a\"", "\"r+\""],
          correctAnswer: 2,
          explanation: "Append mode (\"a\") opens the file for writing with the file position indicator positioned at the end of the file."
        },
        {
          question: "Which functions are used for raw binary reading and writing in C?",
          options: ["scanf() and printf()", "fread() and fwrite()", "getc() and putc()", "cin and cout"],
          correctAnswer: 1,
          explanation: "fread and fwrite transfer direct contiguous byte buffers between RAM and disk files without text formatting."
        },
        {
          question: "What function repositions the file stream offset to a specific byte location?",
          options: ["fseek()", "ftell()", "rewind()", "fsetpos()"],
          correctAnswer: 0,
          explanation: "fseek(filePtr, offset, origin) moves the file position cursor to a target byte offset."
        }
      ];
    case 12:
      return [
        {
          question: "In a Singly Linked List in C, what does the 'next' pointer of the last node (tail) point to?",
          options: ["The head node", "NULL", "The previous node", "Random uninitialized address"],
          correctAnswer: 1,
          explanation: "The tail node's next pointer in a linear singly linked list is set to NULL to mark the end of the list."
        },
        {
          question: "What is the time complexity of inserting a new node at the HEAD of a Singly Linked List?",
          options: ["O(1) Constant Time", "O(N) Linear Time", "O(log N)", "O(N^2)"],
          correctAnswer: 0,
          explanation: "Head insertion only requires creating a node, pointing its next to the current head, and updating head — an O(1) operation."
        },
        {
          question: "Why must you save a pointer to 'current->next' before freeing 'current' during linked list traversal deallocation?",
          options: ["To prevent memory alignment traps", "Because once 'current' is freed, accessing 'current->next' is undefined behavior (use-after-free)", "To update the compiler symbol table", "To sort the remaining elements"],
          correctAnswer: 1,
          explanation: "Freeing a node invalidates its memory. You must cache the address of the next node before freeing the current node."
        },
        {
          question: "What is the memory advantage of a Linked List over a contiguous Array?",
          options: ["Uses less RAM per element than an array", "Dynamic size that can grow and shrink incrementally on the heap without needing a single contiguous RAM block", "Faster cache locality for sequential reads", "Direct O(1) indexing by subscript"],
          correctAnswer: 1,
          explanation: "Linked lists allocate individual nodes dynamically on demand, avoiding the need for large contiguous memory allocations."
        },
        {
          question: "What type must a self-referential structure member have to point to another node of the same struct type?",
          options: ["struct Node next;", "struct Node *next;", "void next;", "int next;"],
          correctAnswer: 1,
          explanation: "A structure cannot contain an instance of itself (infinite size), but can hold a pointer (struct Node *next) of fixed address size."
        }
      ];
    default:
      return [];
  }
}

// ----------------- JAVA QUESTIONS BANK -----------------
function getJavaQuestionBank(modNum: number): any[] {
  switch (modNum) {
    case 1:
      return [
        {
          question: "What does WORA stand for in the context of Java's JVM architecture?",
          options: ["Write Once, Run Anywhere", "Windows Only Runtime Architecture", "Web Optimized Resource Allocation", "Wireless Operations Realtime App"],
          correctAnswer: 0,
          explanation: "Java's 'Write Once, Run Anywhere' promise is fulfilled because Java bytecode runs on any platform with a compatible JVM."
        },
        {
          question: "What is the correct file extension for compiled Java bytecode?",
          options: [".java", ".class", ".jar", ".jvm"],
          correctAnswer: 1,
          explanation: "The javac compiler compiles .java source files into .class files containing Java Virtual Machine bytecode."
        },
        {
          question: "Which primitive data type is used in Java to store a true or false value?",
          options: ["bool", "boolean", "BooleanType", "bit"],
          correctAnswer: 1,
          explanation: "Java uses the primitive keyword 'boolean' (with values true or false)."
        },
        {
          question: "What is the entry point method signature required for any standalone Java application?",
          options: ["public void main(String args)", "public static void main(String[] args)", "static int main()", "public void start()"],
          correctAnswer: 1,
          explanation: "The JVM looks specifically for 'public static void main(String[] args)' as the execution entry point."
        },
        {
          question: "Which component of the Java platform is responsible for runtime Garbage Collection?",
          options: ["JDK Compiler (javac)", "Java Virtual Machine (JVM)", "Bytecode Verifier", "JAR Bundler"],
          correctAnswer: 1,
          explanation: "The JVM runtime engine includes the Garbage Collector, which automatically frees unreachable heap objects."
        }
      ];
    case 2:
      return [
        {
          question: "Which control flow statement allows executing different code blocks based on an enum, string, or integer value in Java?",
          options: ["switch", "goto", "instanceof", "synchronized"],
          correctAnswer: 0,
          explanation: "Java switch statements support primitive integers, chars, String objects, and enums."
        },
        {
          question: "In Java, what does the ternary operator 'condition ? expr1 : expr2' evaluate to if condition is true?",
          options: ["expr1", "expr2", "true", "null"],
          correctAnswer: 0,
          explanation: "If condition is true, the ternary operator evaluates and returns expr1; otherwise expr2."
        },
        {
          question: "How do you check for content equality between two String objects in Java?",
          options: ["s1 == s2", "s1.equals(s2)", "s1 === s2", "s1.compare(s2) == true"],
          correctAnswer: 1,
          explanation: "The == operator checks memory reference identity, whereas .equals() checks actual character content equality."
        },
        {
          question: "What is the logical NOT operator in Java conditional expressions?",
          options: ["NOT", "~", "!", "none"],
          correctAnswer: 2,
          explanation: "The exclamation mark ! inverts boolean values in Java expressions."
        },
        {
          question: "What happens if no 'case' matches in a switch statement and a 'default' label is present?",
          options: ["Compilation error", "The default block executes", "Throws NullPointerException", "Skips the whole method"],
          correctAnswer: 1,
          explanation: "When no case label matches the selector expression, execution routes to the default branch."
        }
      ];
    case 3:
      return [
        {
          question: "Which loop is best suited in Java when the exact number of iterations is known beforehand?",
          options: ["for loop", "while loop", "do-while loop", "iterator loop"],
          correctAnswer: 0,
          explanation: "A standard for loop initializes a counter, tests bounds, and increments each cycle cleanly in one line."
        },
        {
          question: "What is the enhanced for-each loop syntax to iterate over an array 'int[] numbers' in Java?",
          options: ["for (int num in numbers)", "for (int num : numbers)", "foreach (numbers as num)", "for (numbers.each(num))"],
          correctAnswer: 1,
          explanation: "Java's enhanced for-each loop uses the colon syntax: 'for (Type var : collection)'."
        },
        {
          question: "Which statement immediately halts the loop and transfers execution to the statement following the loop?",
          options: ["continue", "break", "return", "pass"],
          correctAnswer: 1,
          explanation: "The break statement unconditionally exits the enclosing loop body."
        },
        {
          question: "What is the minimum number of times a 'do-while' loop executes in Java?",
          options: ["0 times", "1 time", "2 times", "Infinite"],
          correctAnswer: 1,
          explanation: "Because do-while evaluates its condition at the bottom, the loop body always executes at least once."
        },
        {
          question: "What does 'continue' do inside a loop?",
          options: ["Terminates the program", "Skips to the next iteration of the loop", "Exits the current method", "Restarts the loop counter from 0"],
          correctAnswer: 1,
          explanation: "continue skips remaining statements in the current iteration and begins the next loop cycle."
        }
      ];
    case 4:
      return [
        {
          question: "In Java memory architecture, where are primitive local variables stored during method execution?",
          options: ["Heap Memory", "Call Stack (Stack Frame)", "Metaspace", "Permanent Generation"],
          correctAnswer: 1,
          explanation: "Method local variables and primitive values live inside stack frames on the thread's call stack."
        },
        {
          question: "Where are Java Objects created with the 'new' keyword stored in memory?",
          options: ["Call Stack", "Heap Memory", "CPU Registers", "Hard Disk"],
          correctAnswer: 1,
          explanation: "All objects in Java are dynamically allocated on the Garbage-Collected Heap."
        },
        {
          question: "What is method overloading in Java?",
          options: ["Defining multiple methods in the same class with the same name but different parameter lists", "Overriding a parent class method in a child class", "Calling a method recursively", "Passing too many arguments at runtime"],
          correctAnswer: 0,
          explanation: "Overloading allows methods with the same name to have different argument types or counts."
        },
        {
          question: "What keyword is used to refer to the current class instance within an instance method?",
          options: ["self", "this", "super", "current"],
          correctAnswer: 1,
          explanation: "The 'this' reference refers to the current object instance invoking the method."
        },
        {
          question: "What happens when a method has a return type of 'void'?",
          options: ["It returns null", "It does not return any value to the caller", "It returns an integer 0", "It throws an exception"],
          correctAnswer: 1,
          explanation: "A void return type signifies that the method completes its action without returning data."
        }
      ];
    case 5:
      return [
        {
          question: "What is a Class in Java Object-Oriented Programming?",
          options: ["A running instance in RAM", "A blueprint or template defining fields and methods", "A binary database table", "A Java compiler plugin"],
          correctAnswer: 1,
          explanation: "A Class is a blueprint that defines the states (fields) and behaviors (methods) of objects created from it."
        },
        {
          question: "What is a Constructor in Java?",
          options: ["A tool that compiles source code", "A special method invoked when creating an object to initialize its state", "A method that destroys dead objects", "A static utility class"],
          correctAnswer: 1,
          explanation: "Constructors have the same name as the class and are called automatically by 'new' to initialize instances."
        },
        {
          question: "If no constructor is defined in a Java class, what does the compiler provide by default?",
          options: ["Nothing, causing a compilation error", "A default no-argument constructor", "A parameterized constructor", "A static factory method"],
          correctAnswer: 1,
          explanation: "The Java compiler automatically generates a no-arg default constructor if no constructors are declared."
        },
        {
          question: "What does the 'static' keyword on a class member indicate in Java?",
          options: ["The member belongs to the class itself rather than individual instances", "The member is immutable and cannot change", "The member is private to the package", "The member runs in a separate thread"],
          correctAnswer: 0,
          explanation: "Static variables and methods are shared across all instances and accessed via ClassName.member."
        },
        {
          question: "Which keyword creates a new instance of a class in Java?",
          options: ["alloc", "create", "new", "instantiate"],
          correctAnswer: 2,
          explanation: "The 'new' operator allocates heap memory and calls the class constructor to initialize the object."
        }
      ];
    case 6:
      return [
        {
          question: "Why are Java String objects considered 'immutable'?",
          options: ["They cannot be accessed by other classes", "Once created, their character contents in memory cannot be altered", "They only hold uppercase letters", "They are stored on disk"],
          correctAnswer: 1,
          explanation: "String immutability ensures security, thread-safety, and String Pool caching efficiency."
        },
        {
          question: "Which class should you use in Java when performing extensive string concatenations in a loop for optimal performance?",
          options: ["String", "StringBuilder", "StringBuffer", "CharBuffer"],
          correctAnswer: 1,
          explanation: "StringBuilder provides a mutable buffer that avoids creating thousands of intermediate throwaway String objects."
        },
        {
          question: "What is the length property of a 1D Java array 'int[] arr = new int[10];'?",
          options: ["arr.length()", "arr.length", "arr.size()", "arr.count"],
          correctAnswer: 1,
          explanation: "Array length in Java is a final public field (arr.length), whereas String uses a method (.length())."
        },
        {
          question: "What exception is thrown if you access index 5 of an array with only 3 elements?",
          options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "IllegalArgumentException", "IndexUnderflowException"],
          correctAnswer: 1,
          explanation: "Accessing invalid indices outside [0, length-1] throws ArrayIndexOutOfBoundsException at runtime."
        },
        {
          question: "Where are string literals stored in Java memory for reuse?",
          options: ["The String Constant Pool inside Heap", "Stack Frame", "Registers", "Disk Cache"],
          correctAnswer: 0,
          explanation: "The JVM caches identical string literals inside the String Constant Pool to conserve memory."
        }
      ];
    case 7:
      return [
        {
          question: "Which keyword in Java is used to inherit from a superclass?",
          options: ["implements", "extends", "inherits", "super"],
          correctAnswer: 1,
          explanation: "The 'extends' keyword establishes an inheritance relationship between a subclass and a superclass."
        },
        {
          question: "What is Runtime Polymorphism (Dynamic Method Dispatch) in Java?",
          options: ["Calling methods with different argument numbers at compile time", "The JVM resolving which overridden method to execute at runtime based on the actual object instance", "Converting strings to integers", "Writing multi-threaded code"],
          correctAnswer: 1,
          explanation: "When a superclass reference points to a subclass instance, the subclass's overridden method is executed at runtime."
        },
        {
          question: "Which annotation is recommended in Java when overriding a parent class method?",
          options: ["@Inherit", "@Override", "@Super", "@Replace"],
          correctAnswer: 1,
          explanation: "@Override instructs the compiler to verify that the method actually matches a superclass method signature."
        },
        {
          question: "Which keyword is used to call a superclass constructor or method from a subclass?",
          options: ["parent", "super", "this", "base"],
          correctAnswer: 1,
          explanation: "The 'super' keyword allows subclasses to invoke superclass constructors ('super(...)') or superclass methods."
        },
        {
          question: "Does Java support multiple inheritance of classes (e.g. class C extends A, B)?",
          options: ["Yes, for all classes", "No, Java avoids the Diamond Problem by supporting single class inheritance only", "Yes, only if both parent classes are abstract", "Only in Java 21+"],
          correctAnswer: 1,
          explanation: "Java restricts class inheritance to single inheritance, though a class can implement multiple interfaces."
        }
      ];
    case 8:
      return [
        {
          question: "Which access modifier in Java restricts visibility strictly to within the declaring class itself?",
          options: ["public", "protected", "package-private (default)", "private"],
          correctAnswer: 3,
          explanation: "The 'private' access modifier hides fields and methods from all other classes, enforcing encapsulation."
        },
        {
          question: "What keyword is used by a Java class to promise fulfillment of an Interface contract?",
          options: ["extends", "implements", "inherits", "fulfills"],
          correctAnswer: 1,
          explanation: "Classes use 'implements InterfaceName' to provide concrete implementations of interface methods."
        },
        {
          question: "Can an abstract class in Java be directly instantiated with the 'new' keyword?",
          options: ["Yes, always", "No, abstract classes cannot be instantiated directly", "Yes, if it has a constructor", "Only inside the same package"],
          correctAnswer: 1,
          explanation: "Abstract classes serve as base blueprints and cannot be directly instantiated."
        },
        {
          question: "What is Encapsulation in OOP?",
          options: ["Hiding internal state data behind private fields and providing public getters/setters", "Creating multiple copies of an object", "Writing all code in a single file", "Running bytecode on multiple OS"],
          correctAnswer: 0,
          explanation: "Encapsulation bundles data and methods while restricting direct access to object internals."
        },
        {
          question: "What does the 'final' keyword signify when applied to a class?",
          options: ["The class cannot have any methods", "The class cannot be extended or subclassed", "The class is executed at shutdown", "The class is stored in read-only memory"],
          correctAnswer: 1,
          explanation: "A final class cannot be inherited (e.g., java.lang.String is a final class for security)."
        }
      ];
    case 9:
      return [
        {
          question: "Which block in a Java try-catch-finally construct is ALWAYS guaranteed to execute, even if an exception occurs?",
          options: ["try block", "catch block", "finally block", "throw block"],
          correctAnswer: 2,
          explanation: "The 'finally' block always executes, making it the standard location for cleaning up resources."
        },
        {
          question: "What is the base superclass of all Exception and Error classes in Java?",
          options: ["java.lang.Object", "java.lang.Throwable", "java.lang.Exception", "java.lang.RuntimeException"],
          correctAnswer: 1,
          explanation: "Throwable is the top-level root class for all catchable exceptions and JVM errors in Java."
        },
        {
          question: "What is the difference between Checked and Unchecked (Runtime) exceptions in Java?",
          options: ["Checked exceptions are verified at compile-time and must be declared or caught; unchecked exceptions occur at runtime", "Checked exceptions crash the computer", "Unchecked exceptions are faster", "There is no difference"],
          correctAnswer: 0,
          explanation: "Checked exceptions (e.g. IOException) require explicit handling (try-catch or throws), while RuntimeExceptions do not."
        },
        {
          question: "What Java 7+ feature automatically closes AutoCloseable resources (like streams and files) when exiting a block?",
          options: ["try-with-resources", "garbage collector hook", "auto-destructor", "finally auto-clean"],
          correctAnswer: 0,
          explanation: "The try-with-resources statement automatically calls .close() on declared AutoCloseable objects."
        },
        {
          question: "Which keyword is used to explicitly instantiate and throw an exception object in Java code?",
          options: ["throws", "throw", "raise", "catch"],
          correctAnswer: 1,
          explanation: "The 'throw' keyword raises an exception instance (e.g. 'throw new IllegalArgumentException(\"Bad input\");')."
        }
      ];
    case 10:
      return [
        {
          question: "Which interface in the Java Collections Framework represents an ordered collection allowing duplicate elements?",
          options: ["Set", "List", "Map", "Queue"],
          correctAnswer: 1,
          explanation: "The List interface (e.g. ArrayList, LinkedList) maintains insertion order and permits duplicate items."
        },
        {
          question: "Which collection in Java stores key-value pairs with unique keys and fast O(1) average lookup time?",
          options: ["ArrayList", "HashSet", "HashMap", "TreeSet"],
          correctAnswer: 2,
          explanation: "HashMap uses hash buckets to provide constant-time O(1) average performance for get() and put() operations."
        },
        {
          question: "What is the primary characteristic of a Set (such as HashSet) in Java?",
          options: ["It preserves strict index order", "It disallows duplicate elements", "It requires key-value pairs", "It allows only integers"],
          correctAnswer: 1,
          explanation: "A Set models the mathematical set abstraction and cannot contain duplicate elements."
        },
        {
          question: "What are Generics in Java (e.g. List<String>)?",
          options: ["A way to write type-safe code where collections specify the exact type of objects they contain at compile time", "A tool for generating random numbers", "A mechanism to speed up JVM startup", "A database connector"],
          correctAnswer: 0,
          explanation: "Generics enable compile-time type safety, eliminating the need for runtime type casting and ClassCastExceptions."
        },
        {
          question: "Which collection class is a resizable dynamic array implementation in Java?",
          options: ["Vector", "ArrayList", "ArrayBuffer", "DynamicList"],
          correctAnswer: 1,
          explanation: "ArrayList wraps a contiguous array that dynamically grows when capacity limits are exceeded."
        }
      ];
    default:
      return [];
  }
}

// ----------------- PYTHON QUESTIONS BANK -----------------
function getPythonQuestionBank(modNum: number): any[] {
  switch (modNum) {
    case 1:
      return [
        {
          question: "What function is used in Python to accept input text from a user via the terminal?",
          options: ["read()", "input()", "scanf()", "prompt()"],
          correctAnswer: 1,
          explanation: "The built-in input() function pauses execution and reads a line of text entered by the user."
        },
        {
          question: "What data type is returned by default by Python's input() function?",
          options: ["int", "str (string)", "float", "object"],
          correctAnswer: 1,
          explanation: "input() always returns a string (str), which must be explicitly converted using int() or float() if needed."
        },
        {
          question: "How do you write a single-line comment in Python?",
          options: ["// comment", "# comment", "/* comment */", "-- comment"],
          correctAnswer: 1,
          explanation: "Python uses the hash symbol # to indicate single-line comments."
        },
        {
          question: "Which of the following is a valid variable name in Python?",
          options: ["2nd_score", "user_score", "user-score", "class"],
          correctAnswer: 1,
          explanation: "Variable names cannot start with a number, contain hyphens, or use reserved language keywords like 'class'."
        },
        {
          question: "What is the purpose of Python's f-string formatting syntax (f'Hello {name}')?",
          options: ["To encrypt text", "To interpolate variables and expressions directly into string literals", "To read files from disk", "To create a function"],
          correctAnswer: 1,
          explanation: "Formatted string literals (f-strings) provide an elegant, readable way to embed expressions inside string literals."
        }
      ];
    case 2:
      return [
        {
          question: "What is the result of evaluating '10 // 3' in Python 3?",
          options: ["3.3333", "3", "3.0", "1"],
          correctAnswer: 1,
          explanation: "The // operator performs floor (integer) division, truncating to the nearest lower integer (3)."
        },
        {
          question: "Which operator is used in Python to raise a number to a power (exponentiation, e.g. 2^3)?",
          options: ["^", "**", "pow", "^^"],
          correctAnswer: 1,
          explanation: "** is Python's exponentiation operator (e.g. 2 ** 3 equals 8)."
        },
        {
          question: "What does the modulo operator (17 % 5) evaluate to?",
          options: ["3", "2", "3.4", "5"],
          correctAnswer: 1,
          explanation: "17 % 5 yields the remainder 2 because 5 * 3 = 15, leaving 2."
        },
        {
          question: "What is the type of the value produced by '5 / 2' in Python 3?",
          options: ["int", "float", "double", "decimal"],
          correctAnswer: 1,
          explanation: "In Python 3, the single slash / always performs true floating-point division, returning 2.5 (type float)."
        },
        {
          question: "Which built-in function returns the absolute (positive) value of a number in Python?",
          options: ["absolute()", "abs()", "math.pos()", "positive()"],
          correctAnswer: 1,
          explanation: "abs(x) returns the absolute magnitude of a number without regard to its sign."
        }
      ];
    case 3:
      return [
        {
          question: "What does string slicing 'text[1:4]' extract from text = 'PYTHON'?",
          options: ["'PYT'", "'YTH'", "'YTHO'", "'P'"],
          correctAnswer: 1,
          explanation: "Slicing is half-open [start:stop]. Indices 1, 2, 3 correspond to 'Y', 'T', 'H'."
        },
        {
          question: "Are Python strings mutable or immutable?",
          options: ["Mutable", "Immutable", "Depends on OS", "Mutable only inside lists"],
          correctAnswer: 1,
          explanation: "Python strings are immutable; any modification method returns a new string rather than altering the original in-place."
        },
        {
          question: "Which string method removes leading and trailing whitespace from a string?",
          options: ["clean()", "strip()", "trim()", "chomp()"],
          correctAnswer: 1,
          explanation: ".strip() removes leading and trailing spaces, tabs, and newline characters."
        },
        {
          question: "What does 'len(\"Lernex\")' return?",
          options: ["5", "6", "7", "8"],
          correctAnswer: 1,
          explanation: "len() counts the number of unicode characters in the string, which is 6."
        },
        {
          question: "How do you reverse a string 's' using slice step syntax in Python?",
          options: ["s.reverse()", "s[::-1]", "s[0:-1]", "reverse(s)"],
          correctAnswer: 1,
          explanation: "s[::-1] steps backward with a step parameter of -1, producing the reversed string."
        }
      ];
    case 4:
      return [
        {
          question: "Which of the following values is considered 'Falsy' in Python conditional evaluation?",
          options: ["[] (Empty List)", "\"Hello\"", "[0]", "-1"],
          correctAnswer: 0,
          explanation: "Empty collections ([], {}, set(), \"\"), None, 0, and False are all falsy in Python."
        },
        {
          question: "What keywords are used for multi-way conditional branching in Python?",
          options: ["if, else if, else", "if, elif, else", "if, then, else", "switch, case"],
          correctAnswer: 1,
          explanation: "Python uses 'if', 'elif' (short for else if), and 'else' blocks for conditional logic."
        },
        {
          question: "What is the logical AND operator in Python?",
          options: ["&&", "and", "&", "AND_OP"],
          correctAnswer: 1,
          explanation: "Python uses readable English keywords: 'and', 'or', and 'not' for boolean logic."
        },
        {
          question: "What is the difference between '==' and 'is' in Python?",
          options: ["'==' checks value equality; 'is' checks memory identity (same object in RAM)", "They are identical", "'is' is faster than '=='", "'==' only works for numbers"],
          correctAnswer: 0,
          explanation: "== compares value contents; 'is' compares whether two references point to the exact same object address in memory."
        },
        {
          question: "What does the 'not' operator do to a truthy value in Python?",
          options: ["Returns None", "Inverts it to False", "Raises an error", "Returns 0"],
          correctAnswer: 1,
          explanation: "The 'not' operator negates boolean values, converting truthy to False and falsy to True."
        }
      ];
    case 5:
      return [
        {
          question: "What does 'range(1, 5)' generate when iterated over in a for loop?",
          options: ["1, 2, 3, 4, 5", "1, 2, 3, 4", "0, 1, 2, 3, 4", "2, 3, 4, 5"],
          correctAnswer: 1,
          explanation: "range(start, stop) includes start but stops strictly before the stop bound (generating 1, 2, 3, 4)."
        },
        {
          question: "What is the output of the list comprehension: '[x * 2 for x in [1, 2, 3]]'?",
          options: ["[2, 4, 6]", "[1, 2, 3, 1, 2, 3]", "[2, 2, 2]", "Error"],
          correctAnswer: 0,
          explanation: "The comprehension maps each element x to x * 2, producing the list [2, 4, 6]."
        },
        {
          question: "Which statement skips the current iteration of a loop and jumps to the next iteration?",
          options: ["break", "continue", "pass", "skip"],
          correctAnswer: 1,
          explanation: "continue skips remaining statements in the active loop iteration and proceeds with the next cycle."
        },
        {
          question: "What does the 'pass' statement do in Python?",
          options: ["Exits the program", "Acts as a null placeholder where code is syntactically required", "Continues to next file", "Approves a test"],
          correctAnswer: 1,
          explanation: "pass is a no-op placeholder used when a code block is syntactically required but no action is needed."
        },
        {
          question: "Can a Python while loop have an 'else' block attached?",
          options: ["No, only if statements have else", "Yes, the else block runs when the loop condition becomes false without hitting a break", "Yes, but only in Python 2", "No, it causes a SyntaxError"],
          correctAnswer: 1,
          explanation: "In Python, loop 'else' clauses execute if the loop completes normally without encountering a break statement."
        }
      ];
    case 6:
      return [
        {
          question: "What is the key difference between a Python List and a Tuple?",
          options: ["Lists are immutable; Tuples are mutable", "Lists are mutable (can be changed); Tuples are immutable (read-only)", "Lists can only hold integers", "Tuples cannot be indexed"],
          correctAnswer: 1,
          explanation: "Lists (created with []) can be modified in-place; Tuples (created with ()) cannot be altered after creation."
        },
        {
          question: "Which list method adds an element to the very end of a list?",
          options: ["push()", "append()", "add()", "insert_end()"],
          correctAnswer: 1,
          explanation: ".append(item) adds the single item to the end of the list in O(1) amortized time."
        },
        {
          question: "What is the syntax for tuple unpacking with values (10, 20)?",
          options: ["x, y = (10, 20)", "x & y = (10, 20)", "unpack(10, 20) -> x, y", "let x, y = (10, 20)"],
          correctAnswer: 0,
          explanation: "Tuple unpacking assigns elements sequentially: x becomes 10, and y becomes 20."
        },
        {
          question: "What method removes and returns the last element of a list in Python?",
          options: ["remove()", "pop()", "delete()", "shift()"],
          correctAnswer: 1,
          explanation: ".pop() removes and returns the item at the specified index (defaulting to the last element)."
        },
        {
          question: "How do you check if an element 'item' exists inside a list 'my_list'?",
          options: ["my_list.contains(item)", "item in my_list", "my_list.has(item)", "item.exists(my_list)"],
          correctAnswer: 1,
          explanation: "The 'in' membership keyword tests if an item is present inside any sequence or collection."
        }
      ];
    case 7:
      return [
        {
          question: "How are key-value pairs stored in a Python dictionary?",
          options: ["{key: value}", "[key = value]", "(key -> value)", "<key, value>"],
          correctAnswer: 0,
          explanation: "Dictionaries are created using curly braces with colons separating keys and values: {'name': 'Sourav'}."
        },
        {
          question: "What happens when you look up a key that does not exist in a dictionary using square brackets 'd[key]'?",
          options: ["Returns None", "Raises a KeyError exception", "Inserts key with value None", "Returns empty string"],
          correctAnswer: 1,
          explanation: "Square bracket lookup on a missing key raises KeyError. Use d.get(key, default) for safe retrieval."
        },
        {
          question: "What is the main property of elements in a Python Set ({1, 2, 3})?",
          options: ["Elements are ordered and indexed", "Elements are unique (no duplicates allowed)", "Elements must be strings", "Elements cannot be numbers"],
          correctAnswer: 1,
          explanation: "Sets store unique, unordered elements backed by hash tables with fast O(1) membership lookups."
        },
        {
          question: "Which dictionary method returns a safe fallback value if the key does not exist?",
          options: ["fetch()", "get()", "find()", "lookup()"],
          correctAnswer: 1,
          explanation: "dict.get(key, default_value) returns default_value instead of raising a KeyError."
        },
        {
          question: "What set operation calculates the common elements between two sets 'a' and 'b'?",
          options: ["a | b (Union)", "a & b (Intersection)", "a - b (Difference)", "a ^ b (Symmetric Difference)"],
          correctAnswer: 1,
          explanation: "The & operator performs mathematical set intersection, returning only elements present in both sets."
        }
      ];
    case 8:
      return [
        {
          question: "Which keyword is used to define a function in Python?",
          options: ["function", "def", "fn", "fun"],
          correctAnswer: 1,
          explanation: "The 'def' keyword is used in Python to define reusable functions (e.g., def my_func():)."
        },
        {
          question: "What is the order of scope resolution in Python's LEGB rule?",
          options: ["Local -> Enclosing -> Global -> Built-in", "Logical -> External -> Global -> Base", "Local -> Export -> General -> Binary", "Loop -> Function -> Class -> Module"],
          correctAnswer: 0,
          explanation: "Python searches for variable names in order: Local, Enclosing function, Global module, Built-in namespace."
        },
        {
          question: "What is a 'lambda' in Python?",
          options: ["A multi-threaded worker", "An anonymous, single-line inline function", "A database query wrapper", "A variable type"],
          correctAnswer: 1,
          explanation: "Lambda expressions create anonymous inline functions (e.g. lambda x: x * 2)."
        },
        {
          question: "What do '*args' and '**kwargs' capture in a function signature?",
          options: ["Positional arguments tuple and keyword arguments dictionary", "File paths and permissions", "Return values and error codes", "Data types"],
          correctAnswer: 0,
          explanation: "*args collects excess positional arguments as a tuple; **kwargs collects excess keyword arguments as a dict."
        },
        {
          question: "What is returned by a Python function that does not contain an explicit 'return' statement?",
          options: ["0", "False", "None", "Empty string"],
          correctAnswer: 2,
          explanation: "In Python, functions without an explicit return statement implicitly return None upon completion."
        }
      ];
    case 9:
      return [
        {
          question: "Why should you use the 'with open(...) as file:' context manager when working with files in Python?",
          options: ["It makes the file execute faster", "It automatically and reliably closes the file even if exceptions occur", "It encrypts the file on disk", "It prevents other programs from reading"],
          correctAnswer: 1,
          explanation: "Context managers ensure resource cleanup by invoking __enter__ and __exit__, guaranteeing file.close()."
        },
        {
          question: "Which built-in module is used to serialize and deserialize JSON data in Python?",
          options: ["marshal", "json", "pickle", "serialize"],
          correctAnswer: 1,
          explanation: "The 'json' module provides json.dumps(), json.loads(), json.dump(), and json.load()."
        },
        {
          question: "What file mode opens a text file for appending new content without erasing existing data?",
          options: ["'r'", "'w'", "'a'", "'x'"],
          correctAnswer: 2,
          explanation: "Mode 'a' (append) places the write cursor at the end of the file, preserving existing content."
        },
        {
          question: "What method reads all lines of a file into a Python list of strings?",
          options: ["file.read()", "file.readlines()", "file.get_lines()", "file.scan()"],
          correctAnswer: 1,
          explanation: "file.readlines() reads the entire stream into a list where each element is a string line ending in '\\n'."
        },
        {
          question: "What does json.loads('{\"name\": \"Sourav\"}') do?",
          options: ["Saves JSON to disk", "Parses a JSON string into a native Python dictionary", "Converts a Python dict into a string", "Formats JSON for printing"],
          correctAnswer: 1,
          explanation: "json.loads (Load String) parses a JSON formatted string and deserializes it into Python dictionaries and lists."
        }
      ];
    case 10:
      return [
        {
          question: "What is the first parameter of an instance method in a Python class conventionally named?",
          options: ["this", "self", "cls", "instance"],
          correctAnswer: 1,
          explanation: "By convention, instance methods receive the instance as the first parameter named 'self'."
        },
        {
          question: "What special dunder method acts as the object initializer/constructor in a Python class?",
          options: ["__init__", "__construct__", "__new__", "__start__"],
          correctAnswer: 0,
          explanation: "The __init__(self, ...) method initializes new instances after they are created."
        },
        {
          question: "Which block in a try-except structure executes when NO exceptions were raised?",
          options: ["finally", "else", "then", "catch"],
          correctAnswer: 1,
          explanation: "The optional 'else' block attached to a try-except statement executes only when no exceptions occurred."
        },
        {
          question: "Which keyword is used to manually raise an exception in Python?",
          options: ["throw", "raise", "error", "trigger"],
          correctAnswer: 1,
          explanation: "Python uses the 'raise' keyword (e.g. 'raise ValueError(\"Invalid amount\")') to throw exceptions."
        },
        {
          question: "How do you create a subclass that inherits from a parent class 'Animal' in Python?",
          options: ["class Dog extends Animal:", "class Dog(Animal):", "class Dog inherits Animal:", "class Dog -> Animal:"],
          correctAnswer: 1,
          explanation: "Inheritance is declared by placing the superclass inside parentheses: 'class Dog(Animal):'."
        }
      ];
    default:
      return [];
  }
}

// Run for all 3 courses
enrichCourseQuizzes(path.join(process.cwd(), 'Courses/test-1.json'), 'Python');
enrichCourseQuizzes(path.join(process.cwd(), 'Courses/test-2.json'), 'Java');
enrichCourseQuizzes(path.join(process.cwd(), 'Courses/test-3.json'), 'C');
console.log('🎉 ALL 3 COURSES ENRICHED WITH 5 QUIZ QUESTIONS PER MODULE!');
