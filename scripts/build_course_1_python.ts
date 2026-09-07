import fs from 'fs';
import { makeLesson } from './helpers';

export const pythonCourse = {
  id: "course-test-1-python",
  title: "Python Programming Masterclass",
  subtitle: "From Zero to Production-Grade Python Systems (Hinglish)",
  description: "Master pure Python 3.10+ from foundational dynamic typing to OOP architectures, advanced generators, decorators, file streams, and real-world CLI applications in conversational Hinglish.",
  category: "Technology",
  difficulty: "Beginner to Advanced",
  thumbnail_url: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80",
  is_premium: false,
  total_modules: 10,
  estimated_hours: 45,
  created_at: "2026-03-01T00:00:00Z",
  modules: [
    // Mod 1: 4 lessons
    {
      id: "test1-mod-1",
      course_id: "course-test-1-python",
      module_number: 1,
      title: "Module 1: Python Foundations, Setup & Dynamic Typing",
      description: "Python byte-code compilation, dynamic type inference, memory pointers, and modern f-string formatting.",
      order_index: 1,
      lessons: [
        makeLesson("test1-l-1-1", "test1-mod-1", 1, "Lesson 1.1: Python Architecture & The Bytecode Interpreter", 1, 20, "python",
`# Python Bytecode & Interpreter Flow
print("Hello Python 3 Developer!")
version = "3.12"
print(f"Running on Modern Python {version}")
`,
          { task: "Print greeting message 'Hello Python' to the console.", hint: "Use print('Hello Python')", expected_output: "Hello Python" },
          "Python source code (.py) pehle bytecode (.pyc) mein compile hota hai aur fir Python Virtual Machine (PVM) use execute karti hai.",
          [
            { tag: "Core Concept", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Interpreted & Compiled", desc: "Source -> Bytecode (.pyc) -> PVM Execution." },
            { tag: "Dynamic", color: "rgba(16, 185, 129, 0.15); #10b981", title: "High-Level", desc: "Automatic garbage collection and dynamic typing." }
          ],
          `<div class="theory-card"><h3>Python Execution Flow</h3><p>Python script line-by-line interpret hone se pehle fast bytecode format mein convert hoti hai.</p></div>`
        ),
        makeLesson("test1-l-1-2", "test1-mod-1", 2, "Lesson 1.2: Primitive Data Types & Type Conversion", 2, 20, "python",
`# Python Primitive Data Types
age = 24             # int
price = 199.99       # float
name = "Sourav"      # str
is_active = True     # bool

# Type casting
age_str = str(age)
print(f"Type of age: {type(age).__name__}, Casted: {type(age_str).__name__}")
`,
          { task: "Cast a float value 12.85 to an integer and print it.", hint: "val = int(12.85); print(val)", expected_output: "12" },
          "Python mein types explicitly declare karne ki zaroorat nahi hoti; runtime interpreter value dekhkar type infer karta hai.",
          [
            { tag: "Types", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Dynamic Typing", desc: "Variables kisi bhi object type ko hold kar sakte hain." }
          ],
          `<div class="theory-card"><h3>Dynamic Type System</h3><p>Python variables memory heap mein objects ko refer karte hain.</p></div>`
        ),
        makeLesson("test1-l-1-3", "test1-mod-1", 3, "Lesson 1.3: Modern f-Strings & Math Operators", 3, 20, "python",
`# Arithmetic & Modern f-string Interpolation
items = 3
unit_cost = 450.50
total = items * unit_cost

# Formatted currency with 2 decimal places
print(f"Total Bill: Rs.{total:.2f}")
print(f"Exponentiation 2 ** 4 = {2 ** 4}")
print(f"Floor Division 17 // 3 = {17 // 3}")
`,
          { task: "Use an f-string to print 'Score: 95.00' formatted to two decimal places.", hint: "s = 95; print(f'Score: {s:.2f}')", expected_output: "Score: 95.00" },
          "f-strings (PEP 498) expression evaluation aur string formatting ko fastest aur readable banate hain.",
          [
            { tag: "Speed", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "f-Strings", desc: "Fast inline string interpolation syntax." }
          ],
          `<div class="theory-card"><h3>f-String Formatting</h3><p>Inline expressions runtime par efficiently evaluate hote hain.</p></div>`
        ),
        makeLesson("test1-l-1-4", "test1-mod-1", 4, "Lesson 1.4: Memory References, id() & is vs ==", 4, 25, "python",
`# Dynamic Typing & Memory Pointers
a = [1, 2, 3]
b = a
c = [1, 2, 3]

print(f"a == b (Values equal): {a == b}")
print(f"a is b (Same reference): {a is b}")
print(f"a is c (Same reference): {a is c}")
print(f"id(a) == id(b): {id(a) == id(b)}")
`,
          { task: "Create two identical integer variables x = 500 and y = 500. Check if x == y and print the boolean.", hint: "x = 500; y = 500; print(x == y)", expected_output: "True" },
          "'==' values compare karta hai jabki 'is' operator memory memory address (id) identity compare karta hai.",
          [
            { tag: "Memory", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Object Identity", desc: "id() returns the unique memory address of the object." }
          ],
          `<div class="theory-card"><h3>Python Memory Model</h3><p>Variables sirf pointer tags hote hain heap objects ke liye.</p></div>`
        )
      ]
    },

    // Mod 2: 3 lessons
    {
      id: "test1-mod-2",
      course_id: "course-test-1-python",
      module_number: 2,
      title: "Module 2: Control Flow, Conditionals & Logical Architecture",
      description: "if-elif-else branching, ternary operators, truthy/falsy evaluation, and modern match-case pattern matching.",
      order_index: 2,
      lessons: [
        makeLesson("test1-l-2-1", "test1-mod-2", 1, "Lesson 2.1: Decision Making with if-elif-else & Logical Operators", 1, 20, "python",
`score = 85

if score >= 90:
    grade = "A+"
elif score >= 80:
    grade = "A"
elif score >= 70:
    grade = "B"
else:
    grade = "C"

print(f"Calculated Grade: {grade}")
`,
          { task: "Write an if-else statement: if age >= 18 print 'Eligible', else print 'Minor'. Set age = 20.", hint: "age = 20; print('Eligible' if age >= 18 else 'Minor')", expected_output: "Eligible" },
          "Conditionals code execution path ko dynamically branch karne ke liye boolean expressions evaluate karte hain.",
          [
            { tag: "Logic", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Branching", desc: "Deterministic execution based on boolean truth values." }
          ],
          `<div class="theory-card"><h3>Conditional Pipeline</h3><p>Python indentation blocks curly braces ke bina clean structure maintain karte hain.</p></div>`
        ),
        makeLesson("test1-l-2-2", "test1-mod-2", 2, "Lesson 2.2: Ternary Operator & Truthy/Falsy Evaluation", 2, 20, "python",
`# Truthy and Falsy values in Python
empty_list = []
active_user = "rahul_dev"

# Ternary Expression: [value_if_true] if [condition] else [value_if_false]
status = "Offline" if not active_user else "Online"
has_items = "Has Items" if empty_list else "Empty List"

print(f"User Status: {status}")
print(f"Cart Status: {has_items}")
`,
          { task: "Use a ternary operator to assign 'Pass' if marks >= 40 else 'Fail' for marks = 60. Print result.", hint: "marks = 60; res = 'Pass' if marks >= 40 else 'Fail'; print(res)", expected_output: "Pass" },
          "Empty strings, 0, None, aur empty collections () [] {} naturally Falsy evaluate hote hain.",
          [
            { tag: "Pythonic", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Truthy & Falsy", desc: "Clean presence checks without writing 'len(list) > 0'." }
          ],
          `<div class="theory-card"><h3>Truthy/Falsy Rules</h3><p>Short-circuit evaluation performance boost deta hai.</p></div>`
        ),
        makeLesson("test1-l-2-3", "test1-mod-2", 3, "Lesson 2.3: Structural Pattern Matching (Python 3.10+ match-case)", 3, 25, "python",
`http_status = 404

match http_status:
    case 200:
        message = "OK: Request Successful"
    case 404:
        message = "Not Found: Resource does not exist"
    case 500:
        message = "Internal Server Error"
    case _:
        message = "Unknown Status Code"

print(f"API Response: {message}")
`,
          { task: "Create a match-case on status_code = 200 that prints 'Success' when 200 matches.", hint: "match status_code:\n    case 200: print('Success')", expected_output: "Success" },
          "Python 3.10 match-case complex nested if-elif statements ko declarative aur type-safe banata hai.",
          [
            { tag: "Python 3.10+", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "match-case", desc: "Structural pattern matching with wildcard fallback." }
          ],
          `<div class="theory-card"><h3>Pattern Matching</h3><p>Deconstruct objects and match complex shapes easily.</p></div>`
        )
      ]
    },

    // Mod 3: 5 lessons
    {
      id: "test1-mod-3",
      course_id: "course-test-1-python",
      module_number: 3,
      title: "Module 3: Iteration Engines, Loops & Comprehensions",
      description: "for/while loops, range steps, list comprehensions, 2D matrix traversal, and zip/enumerate iterators.",
      order_index: 3,
      lessons: [
        makeLesson("test1-l-3-1", "test1-mod-3", 1, "Lesson 3.1: for Loops & Step Mechanics in range()", 1, 20, "python",
`# Iterating with range(start, stop, step)
print("Even numbers from 2 to 10:")
for num in range(2, 11, 2):
    print(num, end=" ")
print()
`,
          { task: "Print numbers 1 to 5 separated by space using a for loop and range(1, 6).", hint: "for i in range(1, 6): print(i, end=' ')", expected_output: "1 2 3 4 5" },
          "range() lazy sequence generator hota hai jo memory consume kiye bina arbitrarily large loops handle kar sakta hai.",
          [
            { tag: "Memory Efficient", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "range() Generator", desc: "O(1) memory footprint regardless of range size." }
          ],
          `<div class="theory-card"><h3>Loop Range Engine</h3><p>Start, stop (exclusive), aur step arguments sequence dictate karte hain.</p></div>`
        ),
        makeLesson("test1-l-3-2", "test1-mod-3", 2, "Lesson 3.2: while Loops, break & continue Flow Control", 2, 20, "python",
`count = 0
while count < 10:
    count += 1
    if count == 3:
        continue  # Skip 3
    if count == 7:
        break     # Stop early at 7
    print(f"Tick: {count}", end=" | ")
print()
`,
          { task: "Write a while loop starting from n=1, incrementing by 1, breaking when n > 3. Print n at each step.", hint: "n = 1\nwhile True:\n  print(n)\n  if n >= 3: break\n  n += 1", expected_output: "1\n2\n3" },
          "break loop ko turant terminate karta hai jabki continue current iteration ko skip karke agli iteration par jump karta hai.",
          [
            { tag: "Control", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Flow Jumping", desc: "break exits loop, continue skips iteration." }
          ],
          `<div class="theory-card"><h3>Loop Jump Instructions</h3><p>Infinite while loops must contain reliable break exits.</p></div>`
        ),
        makeLesson("test1-l-3-3", "test1-mod-3", 3, "Lesson 3.3: List Comprehensions & Conditional Filtering", 3, 25, "python",
`numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# List comprehension: [expression for item in iterable if condition]
even_squares = [n ** 2 for n in numbers if n % 2 == 0]
print(f"Squares of Even Numbers: {even_squares}")
`,
          { task: "Create a list comprehension that triples all odd numbers in [1, 2, 3, 4, 5].", hint: "[x * 3 for x in [1, 2, 3, 4, 5] if x % 2 != 0]", expected_output: "[3, 9, 15]" },
          "List comprehensions standard for-loop append logic se 30-40% fast hoti hain kyunki ye C-level loop bytecode generate karti hain.",
          [
            { tag: "Fast & Pythonic", color: "rgba(16, 185, 129, 0.15); #10b981", title: "C-Level Speed", desc: "Compact syntax optimized by Python compiler." }
          ],
          `<div class="theory-card"><h3>Comprehension Pipeline</h3><p>Transform and filter data sequences cleanly in single expressions.</p></div>`
        ),
        makeLesson("test1-l-3-4", "test1-mod-3", 4, "Lesson 3.4: Nested Loops & 2D Matrix Traversal", 4, 25, "python",
`# 2D Grid / Matrix Iteration
matrix = [
    [10, 20, 30],
    [40, 50, 60]
]

for row_idx, row in enumerate(matrix):
    for col_idx, val in enumerate(row):
        print(f"Cell [{row_idx}][{col_idx}] = {val}", end=" | ")
    print()
`,
          { task: "Calculate the sum of all elements in a 2x2 matrix [[1, 2], [3, 4]] using nested loops and print total.", hint: "total = 0; matrix = [[1, 2], [3, 4]]; for r in matrix: for c in r: total += c; print(total)", expected_output: "10" },
          "Nested loops tabular grids, image pixel buffers, aur spatial coordinate data process karne ke liye foundational hote hain.",
          [
            { tag: "Spatial Logic", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Row x Col Iteration", desc: "Outer loop tracks rows, inner loop scans columns." }
          ],
          `<div class="theory-card"><h3>2D Matrix Processing</h3><p>O(Rows * Columns) computational complexity pattern.</p></div>`
        ),
        makeLesson("test1-l-3-5", "test1-mod-3", 5, "Lesson 3.5: Advanced Iteration with enumerate() and zip()", 5, 20, "python",
`students = ["Amit", "Sneha", "Karan"]
grades = [92, 88, 95]

# Using zip and enumerate simultaneously
for rank, (name, grade) in enumerate(zip(students, grades), start=1):
    print(f"Rank #{rank}: {name} got {grade}%")
`,
          { task: "Combine keys=['k1', 'k2'] and vals=[10, 20] using dict(zip(keys, vals)) and print.", hint: "print(dict(zip(['k1', 'k2'], [10, 20])))", expected_output: "{'k1': 10, 'k2': 20}" },
          "Manual index tracking variables (i = 0, i += 1) ke bugs se bachne ke liye hamesha enumerate() aur zip() ka upyog karein.",
          [
            { tag: "Best Practice", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Safe Iteration", desc: "No manual index mutation bugs." }
          ],
          `<div class="theory-card"><h3>Lockstep Iterators</h3><p>Parallel processing of multi-sequence streams in constant time.</p></div>`
        )
      ]
    },

    // Mod 4: 4 lessons
    {
      id: "test1-mod-4",
      course_id: "course-test-1-python",
      module_number: 4,
      title: "Module 4: Functions, Scope, Arguments & Lambdas",
      description: "Function definitions, *args/**kwargs dynamic unpacking, closures, scope resolution, and higher-order lambda functions.",
      order_index: 4,
      lessons: [
        makeLesson("test1-l-4-1", "test1-mod-4", 1, "Lesson 4.1: Functions, Return Values & Scope Resolution (LEGB)", 1, 20, "python",
`# Global vs Local Scope & Return Values
tax_rate = 0.18  # Global Scope

def calculate_invoice(subtotal):
    tax = subtotal * tax_rate  # Local Scope
    total = subtotal + tax
    return total

print(f"Final Invoice: Rs.{calculate_invoice(1000):.2f}")
`,
          { task: "Define a function 'square(x)' that returns x * x. Print square(6).", hint: "def square(x): return x * x\nprint(square(6))", expected_output: "36" },
          "Python variable lookup LEGB order follow karta hai: Local -> Enclosing -> Global -> Built-in.",
          [
            { tag: "Architecture", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "LEGB Rule", desc: "Hierarchical scope resolution order in Python." }
          ],
          `<div class="theory-card"><h3>Scope Resolution Pipeline</h3><p>Local functions protect state from polluting the global namespace.</p></div>`
        ),
        makeLesson("test1-l-4-2", "test1-mod-4", 2, "Lesson 4.2: Dynamic Arguments (*args & **kwargs) & Unpacking", 2, 25, "python",
`def log_transaction(user_id, *args, **kwargs):
    print(f"User: {user_id}")
    print(f"Positional Items (Tuple): {args}")
    print(f"Keyword Config (Dict): {kwargs}")

log_transaction("USR_99", "item_1", "item_2", status="success", retry=False)
`,
          { task: "Define a function sum_all(*args) that returns sum(args). Print sum_all(10, 20, 30).", hint: "def sum_all(*args): return sum(args)\nprint(sum_all(10, 20, 30))", expected_output: "60" },
          "*args variable positional arguments ko tuple mein pack karta hai aur **kwargs variable keyword arguments ko dictionary mein pack karta hai.",
          [
            { tag: "Dynamic APIs", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Argument Packing", desc: "Builds highly flexible functions and wrappers." }
          ],
          `<div class="theory-card"><h3>*args and **kwargs</h3><p>Essential for decorators, middleware, and library API design.</p></div>`
        ),
        makeLesson("test1-l-4-3", "test1-mod-4", 3, "Lesson 4.3: First-Class Functions, Closures & Factory Functions", 3, 25, "python",
`# Higher-Order Function / Closure Factory
def make_multiplier(factor):
    def multiplier(number):
        return number * factor
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(f"Double of 15: {double(15)}")
print(f"Triple of 15: {triple(15)}")
`,
          { task: "Create a closure factory make_adder(n) and test add5 = make_adder(5); print(add5(10)).", hint: "def make_adder(n): return lambda x: x + n\nprint(make_adder(5)(10))", expected_output: "15" },
          "Python functions First-Class Citizens hote hain — unhe variables mein assign kiya ja sakta hai, arguments ke roop mein pass kiya ja sakta hai aur return bhi kiya ja sakta hai.",
          [
            { tag: "Functional", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Closures", desc: "Inner function remembers enclosing scope state." }
          ],
          `<div class="theory-card"><h3>First-Class Functions</h3><p>The foundation of decorators and functional programming.</p></div>`
        ),
        makeLesson("test1-l-4-4", "test1-mod-4", 4, "Lesson 4.4: Lambda Functions, Map & Filter Pipelines", 4, 20, "python",
`numbers = [1, 2, 3, 4, 5, 6]

# Inline anonymous lambdas with map and filter
evens = list(filter(lambda x: x % 2 == 0, numbers))
squares = list(map(lambda x: x ** 2, evens))

print(f"Even Numbers: {evens}")
print(f"Squares: {squares}")
`,
          { task: "Use map() and a lambda to double all items in [4, 8, 12]. Print as a list.", hint: "print(list(map(lambda x: x * 2, [4, 8, 12])))", expected_output: "[8, 16, 24]" },
          "Lambdas short, disposable anonymous single-line functions hoti hain jo map(), filter() aur sort callbacks ke liye ideal hoti hain.",
          [
            { tag: "Expressive", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Anonymous Lambdas", desc: "Single-expression callable without def boilerplate." }
          ],
          `<div class="theory-card"><h3>Functional Pipelines</h3><p>Declarative data transformation sequences.</p></div>`
        )
      ]
    },

    // Mod 5: 3 lessons
    {
      id: "test1-mod-5",
      course_id: "course-test-1-python",
      module_number: 5,
      title: "Module 5: Core Data Structures (Lists & Tuples)",
      description: "Dynamic array reallocation, list slicing mechanics, immutable tuple packing, and deep vs shallow copy semantics.",
      order_index: 5,
      lessons: [
        makeLesson("test1-l-5-1", "test1-mod-5", 1, "Lesson 5.1: Dynamic Lists, Array Slicing & Memory Over-allocation", 1, 25, "python",
`# List Slicing: [start:stop:step]
data = [10, 20, 30, 40, 50, 60, 70, 80]

print(f"First 3 items: {data[:3]}")
print(f"Reversed list: {data[::-1]}")
print(f"Every 2nd item: {data[::2]}")
`,
          { task: "Slice a list [1, 2, 3, 4, 5] to get elements from index 1 to 3 inclusive. Print result.", hint: "l = [1, 2, 3, 4, 5]; print(l[1:4])", expected_output: "[2, 3, 4]" },
          "Python list dynamically resize hoti hai over-allocation strategy se, jisse amortized append time O(1) rehta hai.",
          [
            { tag: "O(1) Append", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Dynamic Array", desc: "Contiguous memory buffer with amortized constant-time growth." }
          ],
          `<div class="theory-card"><h3>List Memory Buffer</h3><p>Slicing creates shallow copies of contiguous memory segments.</p></div>`
        ),
        makeLesson("test1-l-5-2", "test1-mod-5", 2, "Lesson 5.2: Immutable Tuples & Multiple Return Values", 2, 20, "python",
`def get_geo_coordinates():
    # Returning a tuple without parenthesis
    lat = 28.6139
    lon = 77.2090
    return lat, lon

# Tuple unpacking
latitude, longitude = get_geo_coordinates()
print(f"Location: Lat={latitude}, Lon={longitude}")
`,
          { task: "Pack 'Alice', 25 into a tuple and unpack into name, age variables. Print name.", hint: "t = ('Alice', 25); name, age = t; print(name)", expected_output: "Alice" },
          "Tuples immutable hote hain, isliye inka memory overhead list se kam hota hai aur ye dictionary keys ban sakte hain.",
          [
            { tag: "Immutability", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Tuple Packing", desc: "Thread-safe, read-only constant records." }
          ],
          `<div class="theory-card"><h3>Tuple Memory Efficiency</h3><p>Lightweight fixed-size memory structures.</p></div>`
        ),
        makeLesson("test1-l-5-3", "test1-mod-5", 3, "Lesson 5.3: Deep Copy vs Shallow Copy with copy Module", 3, 25, "python",
`import copy

original = [[1, 2], [3, 4]]
shallow = copy.copy(original)
deep = copy.deepcopy(original)

# Modify nested element in original
original[0][0] = 999

print(f"Shallow (Affected by mutation): {shallow}")
print(f"Deep (Completely isolated copy): {deep}")
`,
          { task: "Use copy.deepcopy to clone a nested list [[10], [20]] and print the deep copy.", hint: "import copy; print(copy.deepcopy([[10], [20]]))", expected_output: "[[10], [20]]" },
          "Shallow copy outer container ko naya banati hai lekin inner objects references share karte hain. Deep copy recursively sabhi nested objects ko clone karti hai.",
          [
            { tag: "Safety", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "deepcopy Isolation", desc: "Prevents accidental side-effect mutations across complex structures." }
          ],
          `<div class="theory-card"><h3>Memory Cloning Mechanics</h3><p>Essential when modifying nested configuration trees and state objects.</p></div>`
        )
      ]
    },

    // Mod 6: 4 lessons
    {
      id: "test1-mod-6",
      course_id: "course-test-1-python",
      module_number: 6,
      title: "Module 6: Associative Structures (Dictionaries & Sets)",
      description: "Hash tables, O(1) lookups, dictionary comprehension, frozensets, and collision resolution.",
      order_index: 6,
      lessons: [
        makeLesson("test1-l-6-1", "test1-mod-6", 1, "Lesson 6.1: Dictionaries, Hashmaps & Safe get() Fallbacks", 1, 20, "python",
`user_profile = {
    "id": 101,
    "username": "coder_pro",
    "role": "Admin"
}

# Safe lookup with fallback default value
avatar = user_profile.get("avatar_url", "https://default.avatar.png")
print(f"User: {user_profile['username']}, Avatar: {avatar}")
`,
          { task: "Create a dict {'a': 100} and use .get('b', 0) to retrieve a non-existent key with default 0. Print it.", hint: "d = {'a': 100}; print(d.get('b', 0))", expected_output: "0" },
          "Python dicts hash table par based hote hain jo average O(1) time complexity provide karte hain key insertion aur lookup ke liye.",
          [
            { tag: "O(1) Hash Map", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Hash Table", desc: "Ultra-fast key-value associations." }
          ],
          `<div class="theory-card"><h3>Hash Table Mechanics</h3><p>Compact dict implementation ensures key insertion order preservation.</p></div>`
        ),
        makeLesson("test1-l-6-2", "test1-mod-6", 2, "Lesson 6.2: Sets, Mathematical Operations & O(1) Membership", 2, 20, "python",
`frontend = {"HTML", "CSS", "JavaScript", "React"}
backend = {"Python", "JavaScript", "SQL", "Docker"}

# Set operations
intersection = frontend & backend   # Common in both
union = frontend | backend          # Total unique skills
diff = frontend - backend           # Only frontend

print(f"Common Skills: {intersection}")
print(f"Union Total: {len(union)} distinct skills")
`,
          { task: "Find union of {1, 2} and {2, 3} and print the set.", hint: "print({1, 2} | {2, 3})", expected_output: "{1, 2, 3}" },
          "Sets duplicate elements ko automatically filter out karte hain aur O(1) membership testing ('x in s') allow karte hain.",
          [
            { tag: "Math Sets", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Deduplication", desc: "Mathematical set theory with hash table backing." }
          ],
          `<div class="theory-card"><h3>Set Operations</h3><p>Fastest way to eliminate duplicates and calculate intersections.</p></div>`
        ),
        makeLesson("test1-l-6-3", "test1-mod-6", 3, "Lesson 6.3: Dict Comprehensions & Inverting Key-Value Maps", 3, 25, "python",
`pricing = {"apple": 50, "banana": 20, "mango": 100}

# Invert dictionary: value becomes key, key becomes value
inverted = {price: item for item, price in pricing.items()}
print(f"Inverted Price Lookup: {inverted}")
`,
          { task: "Create a dict comprehension mapping numbers 1, 2, 3 to their cubes {x: x**3}. Print.", hint: "print({x: x**3 for x in [1, 2, 3]})", expected_output: "{1: 1, 2: 8, 3: 27}" },
          "Dict comprehensions clean single-expression syntax mein dynamic lookups aur key transformations build karte hain.",
          [
            { tag: "Concise", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Dict Comprehension", desc: "{k: v for ...} dynamic transformation." }
          ],
          `<div class="theory-card"><h3>Map Transformations</h3><p>Clean data pipeline manipulation.</p></div>`
        ),
        makeLesson("test1-l-6-4", "test1-mod-6", 4, "Lesson 6.4: Frozensets & Hashability Mechanics", 4, 20, "python",
`# Frozenset is an immutable, hashable set that can be used as a dictionary key
fs = frozenset(["read", "write"])
permissions_matrix = {
    fs: "Admin Access Granted"
}

print(permissions_matrix[fs])
`,
          { task: "Create a frozenset from [1, 2, 3] and check its type name.", hint: "print(type(frozenset([1, 2, 3])).__name__)", expected_output: "frozenset" },
          "Standard sets mutable hone ki wajah se unhashable hote hain. Frozenset immutable hota hai aur dictionary keys ya nested sets ke roop mein use kiya ja sakta hai.",
          [
            { tag: "Hashable", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Frozenset", desc: "Immutable hashable set structure." }
          ],
          `<div class="theory-card"><h3>Hashability Rules</h3><p>Immutable data structures guarantee constant hash codes.</p></div>`
        )
      ]
    },

    // Mod 7: 3 lessons
    {
      id: "test1-mod-7",
      course_id: "course-test-1-python",
      module_number: 7,
      title: "Module 7: Object-Oriented Programming & Classes",
      description: "Class definitions, self keyword, __init__ constructor, instance vs class state, and Pythonic @property encapsulation.",
      order_index: 7,
      lessons: [
        makeLesson("test1-l-7-1", "test1-mod-7", 1, "Lesson 7.1: Classes, Instances, self & __init__ Constructor", 1, 25, "python",
`class BankAccount:
    def __init__(self, owner, balance=0.0):
        self.owner = owner          # Instance variable
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

acc = BankAccount("Sourav", 1500.0)
acc.deposit(500.0)
print(f"Owner: {acc.owner}, Current Balance: Rs.{acc.balance}")
`,
          { task: "Define class Car with __init__(self, brand) and instantiate Car('Tesla'). Print car.brand.", hint: "class Car:\n  def __init__(self, brand): self.brand = brand\nprint(Car('Tesla').brand)", expected_output: "Tesla" },
          "Class ek blueprint hoti hai aur 'self' current instance object ka direct memory reference hota hai.",
          [
            { tag: "OOP Core", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "self Pointer", desc: "Refers to the specific instance receiving the method invocation." }
          ],
          `<div class="theory-card"><h3>Object Instantiation</h3><p>__init__ initializes state inside the newly allocated heap memory.</p></div>`
        ),
        makeLesson("test1-l-7-2", "test1-mod-7", 2, "Lesson 7.2: Class Variables vs Instance Variables & @classmethod", 2, 25, "python",
`class Employee:
    company_name = "Tech Corp"  # Shared Class Variable
    total_employees = 0

    def __init__(self, name):
        self.name = name        # Unique Instance Variable
        Employee.total_employees += 1

    @classmethod
    def get_headcount(cls):
        return f"{cls.company_name} Headcount: {cls.total_employees}"

e1 = Employee("Aman")
e2 = Employee("Priya")
print(Employee.get_headcount())
`,
          { task: "Create class Counter with class variable count=0. Increment in __init__. Print Counter.count after 2 instances.", hint: "class Counter:\n  count=0\n  def __init__(self): Counter.count+=1\nCounter(); Counter(); print(Counter.count)", expected_output: "2" },
          "Class variables sabhi instances ke beech share hote hain, jabki instance variables har object ke liye unique hote hain.",
          [
            { tag: "Shared State", color: "rgba(16, 185, 129, 0.15); #10b981", title: "@classmethod", desc: "Receives class (cls) rather than instance (self)." }
          ],
          `<div class="theory-card"><h3>Class vs Instance State</h3><p>Manage shared registry state cleanly with class methods.</p></div>`
        ),
        makeLesson("test1-l-7-3", "test1-mod-7", 3, "Lesson 7.3: Encapsulation & Pythonic @property Getters/Setters", 3, 25, "python",
`class Thermometer:
    def __init__(self, celsius):
        self._celsius = celsius  # Protected attribute

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero is physically impossible!")
        self._celsius = value

t = Thermometer(25)
t.celsius = 30
print(f"Current Temperature: {t.celsius}°C")
`,
          { task: "Create class Circle with radius, and @property area returning 3.14 * r * r. Print area for r=2.", hint: "class Circle:\n  def __init__(self, r): self.r = r\n  @property\n  def area(self): return 3.14 * self.r * self.r\nprint(Circle(2).area)", expected_output: "12.56" },
          "@property decorator attribute access syntax ko preserve karte hue behind-the-scenes validation methods execute karta hai.",
          [
            { tag: "Clean Encapsulation", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "@property", desc: "Pythonic getters and setters without breaking public API syntax." }
          ],
          `<div class="theory-card"><h3>Encapsulation Mechanics</h3><p>Validate and protect private internal state seamlessly.</p></div>`
        )
      ]
    },

    // Mod 8: 2 lessons
    {
      id: "test1-mod-8",
      course_id: "course-test-1-python",
      module_number: 8,
      title: "Module 8: OOP Pillars — Inheritance & Polymorphism",
      description: "Class inheritance hierarchies, super() call mechanics, method overriding, and dynamic duck typing.",
      order_index: 8,
      lessons: [
        makeLesson("test1-l-8-1", "test1-mod-8", 1, "Lesson 8.1: Inheritance Hierarchy & super() Call Chain", 1, 25, "python",
`class Vehicle:
    def __init__(self, brand, speed):
        self.brand = brand
        self.speed = speed

    def describe(self):
        return f"{self.brand} running at {self.speed} km/h"

class ElectricCar(Vehicle):
    def __init__(self, brand, speed, battery_kwh):
        super().__init__(brand, speed)
        self.battery_kwh = battery_kwh

    def describe(self):
        base_desc = super().describe()
        return f"{base_desc} with {self.battery_kwh}kWh Battery"

ev = ElectricCar("Tesla Model 3", 180, 75)
print(ev.describe())
`,
          { task: "Subclass Animal into Dog, call super().__init__('Dog'), and print dog's species.", hint: "class Animal:\n  def __init__(self, s): self.s = s\nclass Dog(Animal):\n  def __init__(self): super().__init__('Dog')\nprint(Dog().s)", expected_output: "Dog" },
          "super() parent class ke methods aur constructors ko cleanly invoke karta hai without hardcoding base class names.",
          [
            { tag: "Code Reuse", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "super() Chain", desc: "Delegates initialization to parent classes." }
          ],
          `<div class="theory-card"><h3>Method Resolution Order</h3><p>C3 Linearization guarantees deterministic ancestor lookup in Python.</p></div>`
        ),
        makeLesson("test1-l-8-2", "test1-mod-8", 2, "Lesson 8.2: Polymorphism & Duck Typing Architecture", 2, 25, "python",
`class PDFExporter:
    def export(self, data):
        return f"Rendering [{data}] into PDF File"

class CSVExporter:
    def export(self, data):
        return f"Writing [{data}] into CSV Table"

def generate_report(exporter, data):
    # Duck Typing: 'If it walks like a duck and quacks like a duck, it's a duck'
    print(exporter.export(data))

generate_report(PDFExporter(), "Sales Q1")
generate_report(CSVExporter(), "Sales Q1")
`,
          { task: "Create two classes with a speak() method and pass them to a runner function that calls obj.speak().", hint: "class A: speak=lambda s: 'A'\nclass B: speak=lambda s: 'B'\ndef run(x): print(x.speak())\nrun(A())", expected_output: "A" },
          "Python mein polymorphism explicit interfaces ke bina kaam karta hai — agar object ke paas required method hai, to interpreter use execute kar deta hai.",
          [
            { tag: "Dynamic OOP", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Duck Typing", desc: "Behavior-focused polymorphism without rigid inheritance trees." }
          ],
          `<div class="theory-card"><h3>Dynamic Polymorphism</h3><p>High adaptability and loose coupling across components.</p></div>`
        )
      ]
    },

    // Mod 9: 5 lessons
    {
      id: "test1-mod-9",
      course_id: "course-test-1-python",
      module_number: 9,
      title: "Module 9: Error Handling, Context Managers & I/O",
      description: "Robust try-except-finally blocks, custom domain exceptions, file streams with context managers, JSON serialization, and memory-lazy generators.",
      order_index: 9,
      lessons: [
        makeLesson("test1-l-9-1", "test1-mod-9", 1, "Lesson 9.1: Defensive Error Handling (try, except, else, finally)", 1, 20, "python",
`def divide_safe(a, b):
    try:
        result = a / b
    except ZeroDivisionError as e:
        print(f"Caught Division by Zero Error: {e}")
        return None
    else:
        print("Division calculated successfully without errors!")
        return result
    finally:
        print("Cleanup operations completed.")

divide_safe(10, 2)
divide_safe(10, 0)
`,
          { task: "Write a try-except block catching ZeroDivisionError on 5/0 and print 'Cannot divide by zero'.", hint: "try:\n  5/0\nexcept ZeroDivisionError:\n  print('Cannot divide by zero')", expected_output: "Cannot divide by zero" },
          "'else' tab chalta hai jab koi error nahi aata, aur 'finally' chahe error aaye ya na aaye hamesha execute hota hai.",
          [
            { tag: "Resilience", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Exception Lifecycle", desc: "try -> except (on error) -> else (on success) -> finally (always)." }
          ],
          `<div class="theory-card"><h3>Defensive Architecture</h3><p>Prevents crashes and ensures resources are properly disposed of.</p></div>`
        ),
        makeLesson("test1-l-9-2", "test1-mod-9", 2, "Lesson 9.2: Custom Exception Classes & Domain Error Hierarchies", 2, 25, "python",
`class InsufficientBalanceError(Exception):
    def __init__(self, balance, required):
        super().__init__(f"Cannot withdraw Rs.{required}. Current balance: Rs.{balance}")
        self.balance = balance
        self.required = required

def process_withdrawal(balance, amount):
    if amount > balance:
        raise InsufficientBalanceError(balance, amount)
    return balance - amount

try:
    process_withdrawal(500, 1200)
except InsufficientBalanceError as err:
    print(f"Handled Custom Exception: {err}")
`,
          { task: "Define custom exception 'InvalidAgeError' and raise it with 'Age must be positive'. Catch and print message.", hint: "class InvalidAgeError(Exception): pass\ntry: raise InvalidAgeError('Age must be positive')\nexcept InvalidAgeError as e: print(e)", expected_output: "Age must be positive" },
          "Custom exceptions application business logic errors ko clear aur traceable banati hain.",
          [
            { tag: "Clean Architecture", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Domain Exceptions", desc: "Subclass built-in Exception to attach domain context." }
          ],
          `<div class="theory-card"><h3>Domain Error Modeling</h3><p>Isolate infrastructure failures from business logic violations.</p></div>`
        ),
        makeLesson("test1-l-9-3", "test1-mod-9", 3, "Lesson 9.3: File I/O with Context Managers ('with' statement)", 3, 25, "python",
`# In-memory stream simulation with context manager pattern
import io

memory_file = io.StringIO()
with memory_file as f:
    f.write("Line 1: System Config\\nLine 2: Server Online")
    f.seek(0)
    content = f.read()

print(f"File Stream Content:\\n{content}")
`,
          { task: "Use io.StringIO() with a context manager to write 'Hello Stream' and read it back. Print output.", hint: "import io\nwith io.StringIO() as s:\n  s.write('Hello Stream')\n  s.seek(0)\n  print(s.read())", expected_output: "Hello Stream" },
          "'with' statement __enter__ aur __exit__ dunder methods ko call karke guaranteed file cleanup execute karta hai chahe beech mein error kyu na aa jaye.",
          [
            { tag: "Resource Safety", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Context Managers", desc: "Guaranteed resource disposal and file lock release." }
          ],
          `<div class="theory-card"><h3>Context Management Protocol</h3><p>Prevents file descriptor and socket resource leaks.</p></div>`
        ),
        makeLesson("test1-l-9-4", "test1-mod-9", 4, "Lesson 9.4: JSON Serialization & Parsing (json Module)", 4, 20, "python",
`import json

payload = {
    "app_name": "Antigravity",
    "version": 2.5,
    "active": True,
    "tags": ["Python", "Systems"]
}

# Serialize to JSON string
json_str = json.dumps(payload, indent=2)
print("Serialized JSON Output:")
print(json_str)

# Parse back to Python dictionary
decoded = json.loads(json_str)
print(f"Decoded App Name: {decoded['app_name']}")
`,
          { task: "Convert Python dict {'status': 'ok'} to JSON using json.dumps() and print it.", hint: "import json; print(json.dumps({'status': 'ok'}))", expected_output: '{"status": "ok"}' },
          "json.dumps (Python -> JSON) aur json.loads (JSON -> Python) web APIs aur config files ke sath communication ke standard tools hain.",
          [
            { tag: "Wire Format", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "JSON Protocol", desc: "Universal data interchange standard." }
          ],
          `<div class="theory-card"><h3>JSON Parsing Mechanics</h3><p>Type mapping between Python native objects and JSON specifications.</p></div>`
        ),
        makeLesson("test1-l-9-5", "test1-mod-9", 5, "Lesson 9.5: Generators & yield for Lazy Memory Streaming", 5, 25, "python",
`# Generator function for infinite or large stream processing
def fibonacci_stream(limit):
    a, b = 0, 1
    count = 0
    while count < limit:
        yield a  # Pauses execution and yields value lazily
        a, b = b, a + b
        count += 1

print("Fibonacci Generator Stream:")
for num in fibonacci_stream(7):
    print(num, end=" ")
print()
`,
          { task: "Write a generator countdown(n) yielding from n down to 1. Print list(countdown(3)).", hint: "def countdown(n):\n  while n > 0:\n    yield n\n    n -= 1\nprint(list(countdown(3)))", expected_output: "[3, 2, 1]" },
          "Generators pure data ko ek sath RAM mein load karne ke bajaye ek-ek element on-demand generate karte hain, jisse multi-gigabyte files ko bhi MBs of RAM mein process kiya ja sakta hai.",
          [
            { tag: "Lazy Eval", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "yield Keyword", desc: "State-preserving generator coroutines with O(1) memory footprint." }
          ],
          `<div class="theory-card"><h3>Streaming Iterator Architecture</h3><p>Memory-bounded high throughput data pipelines.</p></div>`
        )
      ]
    },

    // Mod 10: 4 lessons
    {
      id: "test1-mod-10",
      course_id: "course-test-1-python",
      module_number: 10,
      title: "Module 10: Capstone Project — Production CLI Task Manager",
      description: "Building a fully architected, object-oriented, persistent CLI task manager with modular architecture and error handling.",
      order_index: 10,
      lessons: [
        makeLesson("test1-l-10-1", "test1-mod-10", 1, "Lesson 10.1: CLI Architecture & Data Modeling", 1, 25, "python",
`class Task:
    def __init__(self, task_id, title, priority="Medium"):
        self.task_id = task_id
        self.title = title
        self.priority = priority
        self.is_completed = False

    def to_dict(self):
        return {
            "id": self.task_id,
            "title": self.title,
            "priority": self.priority,
            "completed": self.is_completed
        }

task = Task(1, "Build CLI Capstone", "High")
print("Task Model Object:", task.to_dict())
`,
          { task: "Instantiate Task with id=10, title='Deploy App' and print task.title.", hint: "t = Task(10, 'Deploy App'); print(t.title)", expected_output: "Deploy App" },
          "Clean CLI applications strong domain model classes se shuru hoti hain jo state aur serialization encapsulate karti hain.",
          [
            { tag: "Domain Model", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Task Entity", desc: "Encapsulates task attributes and serialization behaviors." }
          ],
          `<div class="theory-card"><h3>Data Model Architecture</h3><p>Clean domain entities isolate business state.</p></div>`
        ),
        makeLesson("test1-l-10-2", "test1-mod-10", 2, "Lesson 10.2: In-Memory Storage & Query Operations", 2, 25, "python",
`class TaskRepository:
    def __init__(self):
        self._tasks = {}

    def add(self, task):
        self._tasks[task.task_id] = task
        return task

    def get_all(self):
        return list(self._tasks.values())

    def find_by_id(self, task_id):
        return self._tasks.get(task_id)

repo = TaskRepository()
t1 = Task(1, "Learn Python Core")
t2 = Task(2, "Master OOP")
repo.add(t1)
repo.add(t2)
print(f"Total Tasks in Repository: {len(repo.get_all())}")
`,
          { task: "Add task to repo and verify find_by_id(1).title returns 'Learn Python Core'. Print title.", hint: "repo.add(Task(1, 'Learn Python Core')); print(repo.find_by_id(1).title)", expected_output: "Learn Python Core" },
          "Repository pattern storage mechanics ko business logic se isolate karta hai, jisse database ya file storage switch karna trivial ho jata hai.",
          [
            { tag: "Pattern", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Repository Pattern", desc: "Decouples data access from business execution logic." }
          ],
          `<div class="theory-card"><h3>Repository Architecture</h3><p>Standard architectural separation of concerns.</p></div>`
        ),
        makeLesson("test1-l-10-3", "test1-mod-10", 3, "Lesson 10.3: Business Logic Service & Status State Transitions", 3, 25, "python",
`class TaskService:
    def __init__(self, repository):
        self.repo = repository

    def complete_task(self, task_id):
        task = self.repo.find_by_id(task_id)
        if not task:
            raise ValueError(f"Task with ID {task_id} not found!")
        task.is_completed = True
        return task

service = TaskService(repo)
completed = service.complete_task(1)
print(f"Task 1 Completed Status: {completed.is_completed}")
`,
          { task: "Call service.complete_task(2) and print completed.is_completed.", hint: "res = service.complete_task(2); print(res.is_completed)", expected_output: "True" },
          "Service layer business rules, validations, aur entity state transitions ko enforce karti hai.",
          [
            { tag: "Service Layer", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Business Rules", desc: "Centralized domain validation and execution rules." }
          ],
          `<div class="theory-card"><h3>Service Layer Pattern</h3><p>Enterprise grade layered software architecture.</p></div>`
        ),
        makeLesson("test1-l-10-4", "test1-mod-10", 4, "Lesson 10.4: Capstone Showcase — Interactive Production CLI", 4, 30, "python",
`# Complete Interactive CLI Task Manager Showcase
class ProductionCLI:
    def __init__(self):
        self.repo = TaskRepository()
        self.service = TaskService(self.repo)

    def bootstrap(self):
        self.repo.add(Task(101, "Setup CI/CD Pipeline", "High"))
        self.repo.add(Task(102, "Write Unit Tests", "Medium"))
        self.service.complete_task(101)

    def display_board(self):
        print("=== TASK BOARD ===")
        for t in self.repo.get_all():
            status = "✓ DONE" if t.is_completed else "○ PENDING"
            print(f"[{status}] #{t.task_id}: {t.title} ({t.priority})")

app = ProductionCLI()
app.bootstrap()
app.display_board()
`,
          { task: "Run app = ProductionCLI(); app.bootstrap(); print('Bootstrap Success').", hint: "app = ProductionCLI(); app.bootstrap(); print('Bootstrap Success')", expected_output: "Bootstrap Success" },
          "Mubarak ho! Aapne modular object-oriented, clean layered Python application successfully build kar liya hai!",
          [
            { tag: "Mastery", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Production Ready", desc: "Complete full-lifecycle Python enterprise mastery." }
          ],
          `<div class="theory-card"><h3>Capstone Final Showcase</h3><p>Enterprise Python systems development readiness achieved!</p></div>`
        )
      ]
    }
  ]
};

fs.writeFileSync('Courses/test-1.json', JSON.stringify(pythonCourse, null, 2));
console.log("✅ Course 1 (Python) fully built with pure, unique Python content!");
