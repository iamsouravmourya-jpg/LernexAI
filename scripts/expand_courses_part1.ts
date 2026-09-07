import fs from 'fs';
import path from 'path';
import { makeLesson } from './helpers';

// Load existing courses
const test1 = JSON.parse(fs.readFileSync('Courses/test-1.json', 'utf-8'));
const test2 = JSON.parse(fs.readFileSync('Courses/test-2.json', 'utf-8'));
const test3 = JSON.parse(fs.readFileSync('Courses/test-3.json', 'utf-8'));
const test4 = JSON.parse(fs.readFileSync('Courses/test-4.json', 'utf-8'));
const test5 = JSON.parse(fs.readFileSync('Courses/test-5.json', 'utf-8'));
const test6 = JSON.parse(fs.readFileSync('Courses/test-6.json', 'utf-8'));

console.log("Expanding courses with diverse, natural lesson counts per module (2 to 5 lessons)...");

// ==========================================
// COURSE 1: Python Masterclass
// Target counts: [4, 3, 5, 4, 3, 4, 3, 2, 5, 4]
// ==========================================
// Mod 1: currently 3 -> Add 1 (Lesson 1.4: Dynamic Typing & Memory References)
test1.modules[0].lessons.push(
  makeLesson(
    "test1-l-1-4", "test1-mod-1", 4,
    "Lesson 1.4: Dynamic Typing & Memory References (id & is vs ==)", 4, 20, "python",
    `# Dynamic Typing & Object References in Python
a = [1, 2, 3]
b = a
c = [1, 2, 3]

print(f"a == b (Values equal?): {a == b}")
print(f"a is b (Same memory address?): {a is b}")
print(f"a is c (Same memory address?): {a is c}")
print(f"id(a): {id(a)}, id(b): {id(b)}, id(c): {id(c)}")

# Mutation affects all references
b.append(4)
print(f"Modified b, now a is: {a}")
`,
    {
      task: "Check if two separate string variables with identical content point to the same interned object using the 'is' keyword.",
      hint: "Create x = 'python' and y = 'python', then print 'x is y'.",
      expected_output: "True"
    },
    "Python mein variables sirf memory pointers (names tags) hote hain jo actual heap objects ko point karte hain. Jab aap b = a karte hain, to naya data copy nahi hota balki vahi memory point hoti hai!",
    [
      { tag: "Memory ID", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "id() Function", desc: "Object ka unique memory memory address integer format mein return karta hai." },
      { tag: "Identity", color: "rgba(16, 185, 129, 0.15); #10b981", title: "is vs ==", desc: "'==' values check karta hai jabki 'is' memory reference identity check karta hai." }
    ],
    `<div class="theory-card">
  <h3>Dynamic Typing & Memory Mechanics</h3>
  <p>Python variables dynamically typed hote hain. Har object Python heap par allocate hota hai aur variable us object ka reference (pointer) hold karta hai.</p>
</div>`
  )
);

// Mod 3: currently 3 -> Add 2 (Lesson 3.4 & 3.5)
test1.modules[2].lessons.push(
  makeLesson(
    "test1-l-3-4", "test1-mod-3", 4,
    "Lesson 3.4: Nested Loops & 2D Matrix Traversal", 4, 25, "python",
    `# 2D Grid / Matrix Iteration
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for row_idx, row in enumerate(matrix):
    for col_idx, val in enumerate(row):
        print(f"Cell [{row_idx}][{col_idx}] = {val}", end=" | ")
    print()
`,
    {
      task: "Write a nested loop to calculate the sum of all elements in a 2x2 matrix [[10, 20], [30, 40]].",
      hint: "Initialize total = 0, loop through rows and elements, add each to total.",
      expected_output: "100"
    },
    "Nested loops tabular grid, pixel data, aur complex graph traversal ke liye foundational building block hote hain. Outer loop rows ko control karta hai aur inner loop columns ko traverse karta hai.",
    [
      { tag: "Grid Logic", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Outer vs Inner", desc: "Outer loop runs N times, inner loop runs M times (Time Complexity: O(N*M))." }
    ],
    `<div class="theory-card"><p>Matrix traversal computer vision, game grids, aur scientific computations ka backbone hai.</p></div>`
  ),
  makeLesson(
    "test1-l-3-5", "test1-mod-3", 5,
    "Lesson 3.5: Advanced Iteration with enumerate() and zip()", 5, 20, "python",
    `names = ["Aman", "Rohan", "Priya"]
scores = [95, 88, 92]

# Using zip to combine iterables in lockstep
for rank, (name, score) in enumerate(zip(names, scores), start=1):
    print(f"Rank #{rank}: {name} scored {score}/100")
`,
    {
      task: "Combine keys=['a', 'b'] and vals=[1, 2] using zip() to create and print a dictionary.",
      hint: "Use dict(zip(keys, vals)) and print it.",
      expected_output: "{'a': 1, 'b': 2}"
    },
    "Manual counter variables maintain karne ke bajaye Pythonic enumerate() aur zip() use karke clean, bug-free, readable iterative pipelines banayein.",
    [
      { tag: "Pythonic", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Zero Index Bug", desc: "Index tracking automate hoti hai bina manual i += 1 ke." }
    ],
    `<div class="theory-card"><p>zip() multiple parallel lists ko pairwise tuples mein pack karta hai.</p></div>`
  )
);

// Mod 4: currently 3 -> Add 1 (Lesson 4.4)
test1.modules[3].lessons.push(
  makeLesson(
    "test1-l-4-4", "test1-mod-4", 4,
    "Lesson 4.4: Lambda Functions, Map & Filter Pipelines", 4, 20, "python",
    `numbers = [1, 2, 3, 4, 5, 6]

# Anonymous lambda functions with filter and map
evens = list(filter(lambda x: x % 2 == 0, numbers))
squares = list(map(lambda x: x ** 2, evens))

print(f"Even Numbers: {evens}")
print(f"Squares of Evens: {squares}")
`,
    {
      task: "Use a lambda function to double all numbers in [5, 10, 15] using map().",
      hint: "list(map(lambda x: x * 2, [5, 10, 15]))",
      expected_output: "[10, 20, 30]"
    },
    "Lambdas anonymous single-line functions hoti hain jo short-lived callbacks aur higher-order function pipelines ke liye ideal hoti hain.",
    [
      { tag: "Functional", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Higher-Order", desc: "Functions jo doosre functions ko argument ke roop mein accept karti hain." }
    ],
    `<div class="theory-card"><p>Clean inline transformation without writing redundant def boilerplate.</p></div>`
  )
);

// Mod 6: currently 3 -> Add 1 (Lesson 6.4)
test1.modules[5].lessons.push(
  makeLesson(
    "test1-l-6-4", "test1-mod-6", 4,
    "Lesson 6.4: Frozensets & Hashability Mechanics", 4, 20, "python",
    `# Frozenset is an immutable, hashable set that can be used as a dictionary key
fs = frozenset(["read", "write"])
permissions_matrix = {
    fs: "Admin Access Granted"
}

print(permissions_matrix[fs])
`,
    {
      task: "Create a frozenset from [1, 2, 3] and check its type.",
      hint: "print(type(frozenset([1, 2, 3])).__name__)",
      expected_output: "frozenset"
    },
    "Standard sets mutable hote hain aur dictionary keys nahi ban sakte. Frozenset immutable hone ki wajah se hashable hota hai aur caching keys ya sets of sets ke liye use hota hai.",
    [
      { tag: "Hashable", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Immutability", desc: "Read-only mathematical sets with constant-time lookup." }
    ],
    `<div class="theory-card"><p>Hashability requires immutable memory representations.</p></div>`
  )
);

// Mod 8: currently 3 -> Trim to 2 for variety
test1.modules[7].lessons = test1.modules[7].lessons.slice(0, 2);

// Mod 9: currently 3 -> Add 2 (Lesson 9.4 & 9.5)
test1.modules[8].lessons.push(
  makeLesson(
    "test1-l-9-4", "test1-mod-9", 4,
    "Lesson 9.4: Custom Exception Classes & Error Hierarchies", 4, 25, "python",
    `class InsufficientFundsError(Exception):
    """Custom domain exception for banking operations"""
    def __init__(self, balance, amount):
        super().__init__(f"Attempted to withdraw Rs.{amount} with balance Rs.{balance}")
        self.balance = balance
        self.amount = amount

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(balance, amount)
    return balance - amount

try:
    withdraw(500, 1000)
except InsufficientFundsError as e:
    print(f"Handled Custom Error: {e}")
`,
    {
      task: "Define a custom exception InvalidAgeError and raise it with message 'Age must be 18+'.",
      hint: "class InvalidAgeError(Exception): pass; raise InvalidAgeError('Age must be 18+')",
      expected_output: "InvalidAgeError"
    },
    "Generic Exceptions ke bajaye custom domain exceptions likhne se application debugging structured ho jaati hai aur enterprise error tracking seamless banti hai.",
    [
      { tag: "Domain Errors", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Custom Exceptions", desc: "Application domain-specific context attach karne ke liye subclass Exception." }
    ],
    `<div class="theory-card"><p>Clean application boundary error isolation.</p></div>`
  ),
  makeLesson(
    "test1-l-9-5", "test1-mod-9", 5,
    "Lesson 9.5: JSON Serialization & Parsing (json module)", 5, 20, "python",
    `import json

user_payload = {
    "username": "sourav_dev",
    "skills": ["Python", "C++", "SQL"],
    "active": True
}

# Serialize dictionary to JSON string
json_str = json.dumps(user_payload, indent=2)
print("Serialized JSON:")
print(json_str)

# Parse JSON string back to Python dict
parsed = json.loads(json_str)
print(f"Decoded Username: {parsed['username']}")
`,
    {
      task: "Convert Python dictionary {'status': 'ok', 'code': 200} to a JSON string using json.dumps() and print it.",
      hint: "import json; print(json.dumps({'status': 'ok', 'code': 200}))",
      expected_output: '{"status": "ok", "code": 200}'
    },
    "REST APIs, configuration files, aur database payloads sab JSON mein communicate karte hain. json.dumps (Python -> JSON) aur json.loads (JSON -> Python) daily development ke indispensable tools hain.",
    [
      { tag: "Serialization", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "dumps & loads", desc: "In-memory Python objects aur wire data formats ke beech bridge." }
    ],
    `<div class="theory-card"><p>Universal API data interchange standard.</p></div>`
  )
);

// Mod 10: currently 3 -> Add 1 (Lesson 10.4)
test1.modules[9].lessons.push(
  makeLesson(
    "test1-l-10-4", "test1-mod-9", 4,
    "Lesson 10.4: Capstone Showcase — Production CLI Deployment & Testing", 4, 30, "python",
    `# Complete Interactive CLI Project Architecture
class TaskManager:
    def __init__(self):
        self.tasks = []

    def add_task(self, title):
        task = {"id": len(self.tasks) + 1, "title": title, "done": False}
        self.tasks.append(task)
        return task

    def mark_done(self, task_id):
        for t in self.tasks:
            if t["id"] == task_id:
                t["done"] = True
                return True
        return False

tm = TaskManager()
tm.add_task("Master Python Core")
tm.add_task("Build Fullstack Capstone")
tm.mark_done(1)
print(f"Task List: {tm.tasks}")
`,
    {
      task: "Instantiate TaskManager, add one task 'Deploy App', and print total tasks count.",
      hint: "tm = TaskManager(); tm.add_task('Deploy App'); print(len(tm.tasks))",
      expected_output: "1"
    },
    "Production software scalable classes, modular methods, error handling, aur structured data structures ko combine karke deliver kiya jata hai.",
    [
      { tag: "Architecture", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Clean Code", desc: "Separation of concerns between state storage, business logic, and UI display." }
    ],
    `<div class="theory-card"><p>Enterprise Python development readiness.</p></div>`
  )
);

// Fix lesson numbers & order indices for Python
test1.modules.forEach((m: any, mIdx: number) => {
  m.lessons.forEach((l: any, lIdx: number) => {
    l.lesson_number = lIdx + 1;
    l.order_index = lIdx + 1;
    l.id = `test1-l-${mIdx + 1}-${lIdx + 1}`;
    l.module_id = `test1-mod-${mIdx + 1}`;
  });
});

fs.writeFileSync('Courses/test-1.json', JSON.stringify(test1, null, 2));
console.log("✅ Test 1 (Python) updated successfully!");

// Run next step in follow-up script or in same
