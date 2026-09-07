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
    sandbox_language: "sql" as const,
    challenge,
    content: `<div class="mental-model-box">
  <div class="mental-icon">🗄️</div>
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

export const sqlFullCourse = {
  id: "course-test-6-sql",
  title: "Enterprise SQL & Relational Database Architecture Masterclass (Hinglish)",
  subtitle: "PostgreSQL/MySQL Standards, Complex Joins, Window Functions, Indexing B-Trees & ACID Transactions",
  description: "Enterprise Relational Database Architecture aur SQL ko zero se Principal Database Architect level tak master karein natural Hinglish mein! Relational Schemas, Constraints, Complex Multi-Table JOINs (Inner/Left/Full/Cross), Aggregations (GROUP BY & HAVING), Window Functions (ROW_NUMBER, DENSE_RANK, LEAD/LAG), CTEs & Recursive Queries, B-Tree Indexing Optimization, Query Execution Plans (EXPLAIN ANALYZE), ACID Isolation Levels aur Production Database Performance live sandboxed SQL editor ke sath seekhein.",
  category: "Data & Architecture",
  difficulty: "Beginner",
  thumbnail_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
  is_premium: false,
  total_modules: 10,
  estimated_hours: 50,
  created_at: "2026-03-01T00:00:00Z",
  modules: [
    {
      id: "test6-mod-1",
      course_id: "course-test-6-sql",
      module_number: 1,
      title: "Module 1: Relational Foundations, DDL & Schema Constraints",
      description: "RDBMS Architecture, DDL (CREATE, ALTER, DROP), Primary Keys, Foreign Keys, Unique, Check, Not Null constraints, Data Types (VARCHAR, INT, UUID, TIMESTAMP).",
      order_index: 1,
      lessons: [
        makeLesson("test6-l-1-1", "test6-mod-1", 1, "Lesson 1.1: Relational Schema Architecture & Integrity Constraints", 1, 30,
`-- Create High-Integrity Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    balance NUMERIC(10, 2) DEFAULT 0.00 CHECK (balance >= 0.00),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample verified records
INSERT INTO users (username, email, balance)
VALUES 
    ('aryan_sharma', 'aryan@devcraft.io', 1500.50),
    ('priya_singh', 'priya@tech.co', 4200.00);

-- Query the table
SELECT id, username, email, balance, created_at FROM users;`, {
          task: "Ek CHECK constraint add karein balance column par jo ensure kare ki balance 0 se kam na ho.",
          hint: "CHECK (balance >= 0.00)",
          expected_output: "CHECK"
        },
        "<strong>RDBMS = Data Integrity Ka Fort Knox!</strong> Relational databases structured tables aur integrity constraints ke through guaranteed clean data store karte hain.",
        [
          { tag: "Primary Key", color: "#e0f2fe;#0369a1", title: "🔑 PRIMARY KEY", desc: "Unique + NOT NULL identifier for every row." },
          { tag: "Check", color: "#dcfce7;#15803d", title: "🛡️ CHECK & UNIQUE", desc: "Business rules directly database layer par enforce hoti hain." }
        ],
        ""
        ),
        makeLesson("test6-l-1-2", "test6-mod-1", 2, "Lesson 1.2: DDL Alterations, Foreign Keys & Cascading Actions", 2, 25,
`-- Parent Table
CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL
);

-- Child Table with Foreign Key & ON DELETE CASCADE
CREATE TABLE employees (
    emp_id SERIAL PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL,
    dept_id INT REFERENCES departments(dept_id) ON DELETE CASCADE
);

INSERT INTO departments (dept_name) VALUES ('Engineering'), ('Design');
INSERT INTO employees (emp_name, dept_id) VALUES ('Vikram', 1), ('Anjali', 2);

SELECT e.emp_name, d.dept_name 
FROM employees e 
JOIN departments d ON e.dept_id = d.dept_id;`, {
          task: "Foreign Key constraint define karein ON DELETE CASCADE ke sath.",
          hint: "REFERENCES departments(dept_id) ON DELETE CASCADE",
          expected_output: "ON DELETE CASCADE"
        },
        "<strong>Foreign Keys = Referential Integrity!</strong> Parent table se connect karke orphan records banna prevent karta hai. `ON DELETE CASCADE` se parent delete hone par related child records automatically clean ho jaate hain.",
        [
          { tag: "FK", color: "#e0f2fe;#0369a1", title: "🔗 Foreign Key", desc: "Guarantees cross-table relationship validity." },
          { tag: "Cascade", color: "#fee2e2;#b91c1c", title: "🧹 ON DELETE CASCADE", desc: "Automatic synchronized child cleanup." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-sql-1-1", question: "Database table mein `PRIMARY KEY` constraint kin do fundamental rules ko enforce karti hai?", options: ["`UNIQUE` (No duplicates) AUR `NOT NULL` (Cannot be empty)", "`FOREIGN KEY` and `DEFAULT`", "`AUTO_INCREMENT` only", "`CHECK` and `INDEX`"], correct_index: 0, explanation: "Primary Key har row ke liye strictly unique aur non-null identifier ensure karti hai." },
          { id: "q-sql-1-2", question: "Foreign Key mein `ON DELETE CASCADE` rule specify karne par kya hota hai?", options: ["Parent row delete hone par usse linked saari child rows automatically delete ho jaati hain", "Delete operation fail ho jata hai", "Parent row archive hoti hai", "Table drop ho jaati hai"], correct_index: 0, explanation: "CASCADE child records ko automatically delete karke referential orphans prevent karta hai." },
          { id: "q-sql-1-3", question: "SQL Data Definition Language (DDL) mein kaunse commands aate hain?", options: ["`CREATE`, `ALTER`, `DROP`, `TRUNCATE`", "`SELECT`, `INSERT`, `UPDATE`, `DELETE`", "`GRANT`, `REVOKE`", "`COMMIT`, `ROLLBACK`"], correct_index: 0, explanation: "DDL schema structure modify karne wale commands (CREATE, ALTER, DROP, TRUNCATE) hote hain." },
          { id: "q-sql-1-4", question: "Financial money values store karne ke liye `FLOAT` ke bajaye `NUMERIC(10, 2)` / `DECIMAL` kyu use karna chahiye?", options: ["Kyunki Floating point binary rounding errors create karta hai jabki NUMERIC exact precision deta hai", "NUMERIC fast hota hai", "FLOAT space zyada leta hai", "Syntax rule hai"], correct_index: 0, explanation: "Floating point math round-off inaccuracies create karta hai, isliye financial apps mein exact fixed-point NUMERIC standard hai." },
          { id: "q-sql-1-5", question: "`CHECK (age >= 18)` constraint ka kya role hai?", options: ["Database layer par invalid values (age < 18) insert ya update hone se reject karna", "User ko alert bhejna", "Age calculate karna", "Table lock karna"], correct_index: 0, explanation: "CHECK constraints ensure that all values in a column satisfy specific logical boolean conditions." }
        ]
      }
    },
    {
      id: "test6-mod-2",
      course_id: "course-test-6-sql",
      module_number: 2,
      title: "Module 2: DML Core, Filtering (WHERE), Sorting & Pagination",
      description: "INSERT, UPDATE, DELETE, RETURNING clauses, WHERE predicates (AND, OR, NOT, IN, BETWEEN, LIKE, ILIKE), NULL handling (IS NULL, COALESCE), ORDER BY & LIMIT / OFFSET pagination.",
      order_index: 2,
      lessons: [
        makeLesson("test6-l-2-1", "test6-mod-2", 1, "Lesson 2.1: Data Manipulation, Safe Updates & NULL Handling", 1, 30,
`-- Setup products catalog
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INT DEFAULT 0
);

INSERT INTO products (name, category, price, stock) VALUES
    ('MacBook Pro M3', 'Electronics', 1999.00, 15),
    ('Mechanical Keyboard', 'Electronics', 120.00, 50),
    ('Ergonomic Chair', 'Furniture', 350.00, 8),
    ('USB-C Hub', 'Electronics', 45.00, 0);

-- Filter: In-Stock Electronics under $500
SELECT name, price, stock 
FROM products 
WHERE category = 'Electronics' 
  AND price <= 500.00 
  AND stock > 0
ORDER BY price ASC;`, {
          task: "Products table se items fetch karein jahan price > 100 ho aur price descending order mein sort ho.",
          hint: "WHERE price > 100 ORDER BY price DESC",
          expected_output: "ORDER BY price DESC"
        },
        "<strong>DML & WHERE Predicates = Precision Filtering!</strong> Production mein <code>WHERE</code> clause ke bina <code>UPDATE</code> ya <code>DELETE</code> run karna career-ending mistake ho sakti hai. Hamesha filters test karein!",
        [
          { tag: "WHERE", color: "#e0f2fe;#0369a1", title: "🔍 WHERE Predicates", desc: "`AND`, `OR`, `IN (...)`, `BETWEEN`, `LIKE 'A%'`." },
          { tag: "NULL", color: "#fef3c7;#b45309", title: "❓ Three-Valued Logic", desc: "`IS NULL` vs `= NULL` (NULL is unknown, not zero!)." }
        ],
        ""
        ),
        makeLesson("test6-l-2-2", "test6-mod-2", 2, "Lesson 2.2: LIMIT / OFFSET vs Keyset Cursor Pagination", 2, 25,
`-- Keyset Cursor Pagination (O(1) Ultra-Fast for Millions of Rows)
-- Better than OFFSET which scans and discards thousands of rows!
SELECT id, name, price 
FROM products 
WHERE id > 2 
ORDER BY id ASC 
LIMIT 2;`, {
          task: "OFFSET 0 LIMIT 2 pagination query likhein.",
          hint: "LIMIT 2 OFFSET 0;",
          expected_output: "LIMIT"
        },
        "<strong>Keyset Cursor Pagination!</strong> Large datasets par `OFFSET 100000` database ko 100,000 rows padh kar fekne par majboor karta hai. Keyset `WHERE id > last_seen_id LIMIT 20` instant O(1) index seek karta hai!",
        [
          { tag: "OFFSET", color: "#fee2e2;#b91c1c", title: "⚠️ Slow OFFSET", desc: "O(N) row scanning bottleneck on deep pagination pages." },
          { tag: "Cursor", color: "#dcfce7;#15803d", title: "⚡ Keyset Pagination", desc: "O(1) B-Tree seek directly using primary key cursor." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-sql-2-1", question: "SQL mein `WHERE column = NULL` likhne par kya result milta hai?", options: ["Hamesha 0 rows return hongi kyunki SQL Three-Valued Logic mein NULL kisi ke equal nahi hota (Use `IS NULL`)", "Saari NULL rows aati hain", "Syntax error aata hai", "Table delete hoti hai"], correct_index: 0, explanation: "SQL mein NULL means 'Unknown'. Comparison hamesha `IS NULL` ya `IS NOT NULL` se ki jaati hai." },
          { id: "q-sql-2-2", question: "`COALESCE(val1, val2, fallback)` function kya return karta hai?", options: ["List mein se pehla non-null expression", "Sum of all values", "Alphabetical order", "Count of nulls"], correct_index: 0, explanation: "COALESCE returns the first non-null argument passed to it." },
          { id: "q-sql-2-3", question: "Deep pagination (e.g. Page 10,000) mein `OFFSET` slow kyu ho jata hai?", options: ["Kyunki database ko pehle ke saare 100,000 records read karke discard karne padte hain", "Database band ho jata hai", "Index delete ho jata hai", "OFFSET slow language hai"], correct_index: 0, explanation: "OFFSET requires scanning through all preceding rows before returning the target slice." },
          { id: "q-sql-2-4", question: "PostgreSQL mein `INSERT INTO ... RETURNING id;` clause ka kya benefit hai?", options: ["Nayi created row ka generated auto-increment id/record bina alag SELECT query chalaye turant return mil jata hai", "Insert ko cancel karta hai", "Row delete karta hai", "Table copy karta hai"], correct_index: 0, explanation: "RETURNING eliminates the need for a secondary SELECT query to retrieve generated defaults/keys." },
          { id: "q-sql-2-5", question: "Case-insensitive pattern search ke liye PostgreSQL mein kaunsa operator use hota hai?", options: ["`ILIKE`", "`LIKE`", "`EQUAL`", "`CONTAINS`"], correct_index: 0, explanation: "ILIKE provides case-insensitive wildcard matching in PostgreSQL." }
        ]
      }
    },
    {
      id: "test6-mod-3",
      course_id: "course-test-6-sql",
      module_number: 3,
      title: "Module 3: Aggregations, GROUP BY & HAVING Filter Mechanics",
      description: "Aggregate functions (COUNT, SUM, AVG, MIN, MAX), GROUP BY categorical partitioning, HAVING vs WHERE filters, Count(*) vs Count(col).",
      order_index: 3,
      lessons: [
        makeLesson("test6-l-3-1", "test6-mod-3", 1, "Lesson 3.1: Aggregations, Grouping & HAVING Filter Pipeline", 1, 30,
`-- Setup Sales Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    order_amount NUMERIC(10, 2) NOT NULL,
    order_date DATE NOT NULL
);

INSERT INTO orders (customer_id, category, order_amount, order_date) VALUES
    (101, 'Electronics', 1200.00, '2026-01-15'),
    (102, 'Clothing', 80.00, '2026-01-16'),
    (101, 'Electronics', 450.00, '2026-02-01'),
    (103, 'Books', 35.00, '2026-02-10'),
    (101, 'Clothing', 150.00, '2026-02-12'),
    (102, 'Electronics', 890.00, '2026-02-14');

-- Calculate Revenue per category having revenue > $500
SELECT 
    category,
    COUNT(*) AS total_orders,
    SUM(order_amount) AS total_revenue,
    ROUND(AVG(order_amount), 2) AS avg_order_value
FROM orders
GROUP BY category
HAVING SUM(order_amount) >= 500.00
ORDER BY total_revenue DESC;`, {
          task: "GROUP BY category use karke total orders count karein.",
          hint: "GROUP BY category",
          expected_output: "GROUP BY category"
        },
        "<strong>Aggregation Pipeline: WHERE vs HAVING!</strong> <code>WHERE</code> rows group hone se pehle filter karta hai; <code>HAVING</code> aggregated groups banne ke baad filter karta hai!",
        [
          { tag: "GROUP BY", color: "#e0f2fe;#0369a1", title: "📊 GROUP BY", desc: "Collapses thousands of raw rows into summarized category buckets." },
          { tag: "HAVING", color: "#dcfce7;#15803d", title: "🎯 HAVING Clause", desc: "Filters computed aggregate results (`SUM(...) > 1000`)." }
        ],
        ""
        ),
        makeLesson("test6-l-3-2", "test6-mod-3", 2, "Lesson 3.2: COUNT(*) vs COUNT(column) & Statistical Functions", 2, 25,
`-- Demonstrating COUNT(*) vs COUNT(col) with NULL values
CREATE TABLE feedbacks (
    id SERIAL PRIMARY KEY,
    user_id INT,
    rating INT, -- nullable
    comment TEXT
);

INSERT INTO feedbacks (user_id, rating, comment) VALUES
    (1, 5, 'Great!'),
    (2, NULL, 'Pending rating'),
    (3, 4, 'Good');

SELECT 
    COUNT(*) AS total_feedbacks,       -- Counts all 3 rows
    COUNT(rating) AS rated_feedbacks,  -- Counts only 2 non-NULL ratings
    AVG(rating) AS average_rating      -- Divides by 2 (ignores NULL)
FROM feedbacks;`, {
          task: "COUNT(rating) query likhein jo non-null values count kare.",
          hint: "SELECT COUNT(rating) FROM feedbacks;",
          expected_output: "COUNT(rating)"
        },
        "<strong>COUNT(*) vs COUNT(column)!</strong> `COUNT(*)` total table rows count karta hai chahe columns NULL hon ya nahi. `COUNT(col)` sirf strictly non-NULL values count karta hai.",
        [
          { tag: "COUNT(*)", color: "#e0f2fe;#0369a1", title: "🔢 COUNT(*)", desc: "Counts total records regardless of column nullability." },
          { tag: "COUNT(col)", color: "#fef3c7;#b45309", title: "🔍 COUNT(col)", desc: "Counts non-null values only." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-sql-3-1", question: "SQL query execution order mein `WHERE` aur `HAVING` mein kya farak hota hai?", options: ["`WHERE` raw rows ko group hone se pehle filter karta hai; `HAVING` aggregated group values (SUM/AVG) ko filter karta hai", "Dono identical hote hain", "`HAVING` pehle chalta hai", "`WHERE` sirf numbers ke liye hai"], correct_index: 0, explanation: "WHERE filters rows before GROUP BY aggregation; HAVING filters post-aggregation groups." },
          { id: "q-sql-3-2", question: "`COUNT(*)` aur `COUNT(column_name)` mein kya technical difference hai?", options: ["`COUNT(*)` saari rows count karta hai; `COUNT(col)` NULL rows ko skip karke sirf non-null values count karta hai", "Dono same count dete hain always", "`COUNT(*)` slow hota hai 10x", "`COUNT(col)` error throw karta hai"], correct_index: 0, explanation: "COUNT(column) excludes NULL entries from the tally." },
          { id: "q-sql-3-3", question: "SELECT clause mein aggregate ke alawa jo non-aggregated columns hote hain unhe kahan include karna mandatory hai?", options: ["`GROUP BY` clause mein", "`ORDER BY` clause mein", "`WHERE` clause mein", "`LIMIT` clause mein"], correct_index: 0, explanation: "All non-aggregated columns in the SELECT list must appear in the GROUP BY clause." },
          { id: "q-sql-3-4", question: "Agar numeric column mein [10, 20, NULL] values hon, toh `AVG()` kya return karega?", options: ["15 (NULL ko ignore karke (10+20)/2)", "10", "NULL", "Error"], correct_index: 0, explanation: "Aggregate mathematical functions like AVG automatically ignore NULL records." },
          { id: "q-sql-3-5", question: "Ek query ka standard SQL Logical Processing Order kya hota hai?", options: ["FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT", "SELECT -> FROM -> WHERE", "ORDER BY -> SELECT -> FROM", "WHERE -> FROM -> SELECT"], correct_index: 0, explanation: "SQL logically processes FROM first, then WHERE filters, GROUP BY grouping, HAVING filters, SELECT projection, and finally ORDER BY / LIMIT." }
        ]
      }
    },
    {
      id: "test6-mod-4",
      course_id: "course-test-6-sql",
      module_number: 4,
      title: "Module 4: Mastering SQL JOINs (Inner, Left, Right, Full & Cross)",
      description: "Relational Set Theory, INNER JOIN, LEFT OUTER JOIN, RIGHT JOIN, FULL OUTER JOIN, CROSS JOIN (Cartesian product), Self JOINs aur Multi-Table Joins.",
      order_index: 4,
      lessons: [
        makeLesson("test6-l-4-1", "test6-mod-4", 1, "Lesson 4.1: INNER, LEFT & FULL OUTER Relational Joins", 1, 35,
`-- Setup Customers & Orders
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL
);

CREATE TABLE store_orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT,
    amount NUMERIC(10, 2) NOT NULL
);

INSERT INTO customers (name, city) VALUES ('Vikram', 'Mumbai'), ('Neha', 'Delhi'), ('Rohan', 'Bengaluru');
INSERT INTO store_orders (customer_id, amount) VALUES (1, 500.00), (1, 250.00), (2, 1200.00), (99, 80.00);

-- LEFT JOIN: Show all customers even if they have 0 orders
SELECT 
    c.name, 
    c.city, 
    COALESCE(SUM(o.amount), 0.00) AS total_spent
FROM customers c
LEFT JOIN store_orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.city
ORDER BY total_spent DESC;`, {
          task: "LEFT JOIN query likhein jo customers aur unke orders ko match kare.",
          hint: "LEFT JOIN store_orders o ON c.id = o.customer_id",
          expected_output: "LEFT JOIN"
        },
        "<strong>JOINs = Connecting the Relational Graph!</strong> <code>INNER JOIN</code> sirf matching records laata hai; <code>LEFT JOIN</code> left table ke saare records preserve karta hai chahe right side par match na ho.",
        [
          { tag: "INNER", color: "#e0f2fe;#0369a1", title: "🤝 INNER JOIN", desc: "Only rows with matching keys in BOTH tables." },
          { tag: "LEFT", color: "#dcfce7;#15803d", title: "👈 LEFT OUTER JOIN", desc: "All Left rows + matched Right rows (NULL for unmatched)." }
        ],
        ""
        ),
        makeLesson("test6-l-4-2", "test6-mod-4", 2, "Lesson 4.2: Self JOINs & Hierarchical Organizational Trees", 2, 25,
`-- Self-referencing table for Employee Manager hierarchy
CREATE TABLE staff (
    emp_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    manager_id INT REFERENCES staff(emp_id)
);

INSERT INTO staff (emp_id, name, manager_id) VALUES
    (1, 'Aman (CEO)', NULL),
    (2, 'Shreya (VP Eng)', 1),
    (3, 'Karan (Dev Lead)', 2);

-- Self JOIN to display employee with their direct manager
SELECT 
    e.name AS employee,
    COALESCE(m.name, 'Top Level Leader') AS reports_to
FROM staff e
LEFT JOIN staff m ON e.manager_id = m.emp_id;`, {
          task: "Self-join query likhein employee aur manager hierarchy match karne ke liye.",
          hint: "FROM staff e LEFT JOIN staff m ON e.manager_id = m.emp_id",
          expected_output: "staff m ON"
        },
        "<strong>Self JOIN = Table Joining Itself!</strong> Organization hierarchies, referral chains, ya category trees ko query karne ke liye same table ko do different aliases ke sath join kiya jata hai.",
        [
          { tag: "Self Join", color: "#e0f2fe;#0369a1", title: "🌳 Self JOIN", desc: "Traversing parent-child trees within a single table." },
          { tag: "Aliases", color: "#fef3c7;#b45309", title: "🏷️ Table Aliases (e & m)", desc: "Disambiguates multiple references to the same schema." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-sql-4-1", question: "`INNER JOIN` aur `LEFT JOIN` mein fundamental difference kya hai?", options: ["`INNER JOIN` sirf dono tables ke intersecting matches return karta hai; `LEFT JOIN` left table ki saari rows deta hai chahe right mein match ho ya na ho", "Dono identical hain", "`LEFT JOIN` fast hota hai", "`INNER JOIN` NULL values banata hai"], correct_index: 0, explanation: "INNER JOIN yields strict intersections, while LEFT JOIN preserves all left-hand records with NULL padding on unmatched rights." },
          { id: "q-sql-4-2", question: "CROSS JOIN bina kisi ON condition ke do tables (Table A: 10 rows, Table B: 5 rows) par run karne se kitni rows aayengi?", options: ["50 rows (Cartesian Product 10 x 5)", "15 rows", "5 rows", "10 rows"], correct_index: 0, explanation: "CROSS JOIN computes the full Cartesian product multiplying the row counts of both sets." },
          { id: "q-sql-4-3", question: "Unmatched records find karne ke liye kaunsa pattern best hai (e.g. Customers with 0 orders)?", options: ["`LEFT JOIN orders ON ... WHERE orders.id IS NULL`", "`INNER JOIN`", "`CROSS JOIN`", "`COUNT(*)`"], correct_index: 0, explanation: "LEFT JOIN with IS NULL filter (Anti-Join pattern) efficiently identifies orphan/unmatched records." },
          { id: "q-sql-4-4", question: "Self JOIN kis scenario mein use kiya jata hai?", options: ["Same table ko apne hi sath join karne ke liye (jaise Employee -> Manager hierarchical relationship)", "Database clone karne ke liye", "Row delete karne ke liye", "Index banane ke liye"], correct_index: 0, explanation: "Self joins enable querying recursive parent-child hierarchies represented in a single table." },
          { id: "q-sql-4-5", question: "`FULL OUTER JOIN` kya result set produce karta hai?", options: ["Dono tables ki saari rows include karta hai, unmatched side par NULL values fill karta hai", "Sirf matches", "Empty table", "Error"], correct_index: 0, explanation: "FULL OUTER JOIN combines the results of both LEFT and RIGHT joins with NULL fillers." }
        ]
      }
    },
    {
      id: "test6-mod-5",
      course_id: "course-test-6-sql",
      module_number: 5,
      title: "Module 5: Subqueries, CTEs (WITH) & Recursive Queries",
      description: "Scalar Subqueries, Correlated Subqueries (EXISTS vs IN), Common Table Expressions (WITH syntax) aur Recursive CTEs for hierarchical tree traversal.",
      order_index: 5,
      lessons: [
        makeLesson("test6-l-5-1", "test6-mod-5", 1, "Lesson 5.1: Common Table Expressions (CTEs) & Correlated Subqueries", 1, 30,
`-- Setup Employee Salaries
CREATE TABLE dev_salaries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary NUMERIC(10, 2)
);

INSERT INTO dev_salaries (name, department, salary) VALUES
    ('Aarav', 'Engineering', 95000),
    ('Meera', 'Engineering', 120000),
    ('Kunal', 'Product', 85000),
    ('Tara', 'Product', 110000);

-- CTE (WITH clause) for Clean, Readable Code
WITH DeptAverages AS (
    SELECT 
        department, 
        AVG(salary) AS avg_dept_salary
    FROM dev_salaries
    GROUP BY department
)
SELECT 
    e.name, 
    e.department, 
    e.salary,
    ROUND(d.avg_dept_salary, 2) AS dept_average
FROM dev_salaries e
JOIN DeptAverages d ON e.department = d.department
WHERE e.salary > d.avg_dept_salary;`, {
          task: "WITH clause (CTE) define karein jo HighEarners table create kare.",
          hint: "WITH HighEarners AS (SELECT * FROM dev_salaries WHERE salary > 100000)",
          expected_output: "WITH"
        },
        "<strong>CTEs (WITH) = Readable, Modular SQL Pipelines!</strong> Deeply nested spaghetti subqueries ke bajaye CTEs aapki query ko clean readable steps mein structure karte hain.",
        [
          { tag: "CTE", color: "#e0f2fe;#0369a1", title: "🧱 WITH Clause", desc: "Defines temporary named result sets used in the main query." },
          { tag: "EXISTS", color: "#dcfce7;#15803d", title: "⚡ EXISTS vs IN", desc: "Correlated boolean check with early exit execution optimization." }
        ],
        ""
        ),
        makeLesson("test6-l-5-2", "test6-mod-5", 2, "Lesson 5.2: Recursive CTEs (WITH RECURSIVE) for Trees & Graphs", 2, 30,
`-- Recursive CTE to generate sequences & traverse deep hierarchy trees
WITH RECURSIVE NumberSeries AS (
    -- Anchor member
    SELECT 1 AS n
    UNION ALL
    -- Recursive member
    SELECT n + 1 FROM NumberSeries WHERE n < 5
)
SELECT n, n * n AS square FROM NumberSeries;`, {
          task: "WITH RECURSIVE query likhein jo 1 se 10 tak series generate kare.",
          hint: "WITH RECURSIVE series AS (SELECT 1 AS n UNION ALL SELECT n+1 FROM series WHERE n < 10)",
          expected_output: "WITH RECURSIVE"
        },
        "<strong>Recursive CTEs = Infinite Graph Traversals!</strong> File systems, multi-level marketing trees, aur friend networks ko traverse karne ke liye `WITH RECURSIVE` standard SQL tool hai.",
        [
          { tag: "Anchor", color: "#e0f2fe;#0369a1", title: "⚓ Anchor Query", desc: "Base case of the recursive loop." },
          { tag: "Recursive", color: "#dcfce7;#15803d", title: "🔄 Recursive Step", desc: "Continues until the termination condition is met." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-sql-5-1", question: "Common Table Expression (CTE / `WITH` clause) ka subqueries ke muqable main advantage kya hai?", options: ["Code readability, modularity aur same temporary result set ko multiple baar reuse karne ki flexibility", "Database speed 100x badhana", "Table delete karna", "Security certificate generate karna"], correct_index: 0, explanation: "CTEs provide clean modular structure and enhance SQL maintainability over deeply nested subqueries." },
          { id: "q-sql-5-2", question: "`EXISTS (SELECT 1 FROM ...)` subquery `IN (...)` se faster kyu ho sakti hai?", options: ["Kyunki `EXISTS` first match milte hi evaluation band kar deta hai (Short-circuit optimization)", "Kyunki EXISTS memory use nahi karta", "Kyunki IN deprecated hai", "Dono identical hain"], correct_index: 0, explanation: "EXISTS uses short-circuiting to stop scanning as soon as the first matching record is found." },
          { id: "q-sql-5-3", question: "Recursive CTE (`WITH RECURSIVE`) ke do main components kaunse hote hain?", options: ["Anchor Member (Base case) aur Recursive Member (Self-referencing loop)", "Header aur Footer", "Primary aur Foreign key", "Begin aur Commit"], correct_index: 0, explanation: "Recursive CTEs require an initial Anchor member unioned with a Recursive self-referencing step." },
          { id: "q-sql-5-4", question: "Correlated Subquery kya hoti hai?", options: ["Aisi subquery jo outer query ke columns par depend karti hai aur har outer row ke liye evaluate hoti hai", "Standalone query", "Index query", "DDL command"], correct_index: 0, explanation: "Correlated subqueries reference values from the enclosing outer query for row-by-row filtering." },
          { id: "q-sql-5-5", question: "Scalar Subquery kitni rows aur columns return karti hai?", options: ["Exactly 1 single Row aur 1 single Column (Single scalar value)", "Infinite rows", "10 columns", "Empty table"], correct_index: 0, explanation: "A scalar subquery evaluates to a single literal atomic value." }
        ]
      }
    },
    {
      id: "test6-mod-6",
      course_id: "course-test-6-sql",
      module_number: 6,
      title: "Module 6: Advanced Window Functions (OVER, PARTITION BY & RANK)",
      description: "Window frame mechanics, ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE(), LEAD(), LAG(), FIRST_VALUE() & Cumulative Running Totals.",
      order_index: 6,
      lessons: [
        makeLesson("test6-l-6-1", "test6-mod-6", 1, "Lesson 6.1: Window Functions (ROW_NUMBER, DENSE_RANK & Running Totals)", 1, 35,
`-- Setup Sales Rep Data
CREATE TABLE sales_log (
    id SERIAL PRIMARY KEY,
    sales_rep VARCHAR(50),
    region VARCHAR(50),
    amount NUMERIC(10, 2),
    sale_date DATE
);

INSERT INTO sales_log (sales_rep, region, amount, sale_date) VALUES
    ('Aman', 'North', 5000, '2026-01-10'),
    ('Pooja', 'North', 7500, '2026-01-12'),
    ('Karan', 'South', 4200, '2026-01-15'),
    ('Simran', 'North', 7500, '2026-01-18'),
    ('Rahul', 'South', 6100, '2026-01-20');

-- Window Function: Rank reps per region without collapsing rows!
SELECT 
    sales_rep,
    region,
    amount,
    DENSE_RANK() OVER (PARTITION BY region ORDER BY amount DESC) AS regional_rank,
    SUM(amount) OVER (PARTITION BY region ORDER BY sale_date) AS running_total
FROM sales_log;`, {
          task: "ROW_NUMBER() window function apply karein: ROW_NUMBER() OVER (ORDER BY amount DESC)",
          hint: "ROW_NUMBER() OVER (ORDER BY amount DESC)",
          expected_output: "ROW_NUMBER()"
        },
        "<strong>Window Functions = Non-Collapsing Analytics!</strong> GROUP BY rows ko collapse kar deta hai, jabki Window Functions har individual row ko retain karte hue sliding calculations compute karte hain.",
        [
          { tag: "PARTITION BY", color: "#e0f2fe;#0369a1", title: "🗂️ PARTITION BY", desc: "Divides rows into analytical calculation windows." },
          { tag: "DENSE_RANK", color: "#dcfce7;#15803d", title: "🏆 DENSE_RANK()", desc: "Ranks items without skipping numbers on ties (1, 2, 2, 3)." }
        ],
        ""
        ),
        makeLesson("test6-l-6-2", "test6-mod-6", 2, "Lesson 6.2: Time Series Delta Analysis with LEAD() & LAG()", 2, 25,
`-- Day-over-Day growth tracking with LAG()
SELECT 
    sale_date,
    amount,
    LAG(amount, 1) OVER (ORDER BY sale_date) AS prev_day_amount,
    amount - LAG(amount, 1) OVER (ORDER BY sale_date) AS day_over_day_growth
FROM sales_log
ORDER BY sale_date;`, {
          task: "LAG(amount, 1) function call karein previous sale amount dekhne ke liye.",
          hint: "LAG(amount, 1) OVER (ORDER BY sale_date)",
          expected_output: "LAG(amount"
        },
        "<strong>LEAD & LAG = Time Travel Across Rows!</strong> Bina expensive self-joins ke pichli row (`LAG`) ya aage aane wali row (`LEAD`) ka data compare karein.",
        [
          { tag: "LAG", color: "#e0f2fe;#0369a1", title: "⏪ LAG(col, n)", desc: "Accesses value from n rows prior." },
          { tag: "LEAD", color: "#fef3c7;#b45309", title: "⏩ LEAD(col, n)", desc: "Accesses value from n rows ahead." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-sql-6-1", question: "GROUP BY aur Window Function (`OVER(...)`) mein core difference kya hai?", options: ["GROUP BY rows ko aggregate karke single output row bana deta hai; Window Function individual rows ko preserve karte hue calculations karta hai", "Window functions slow hote hain", "Dono identical hain", "GROUP BY sirf Postgres mein hota hai"], correct_index: 0, explanation: "Window functions calculate metrics across partitions without collapsing individual row identity." },
          { id: "q-sql-6-2", question: "`RANK()` aur `DENSE_RANK()` mein tie hone par kya farak hota hai?", options: ["`RANK()` tie ke baad numbers skip karta hai (1, 2, 2, 4); `DENSE_RANK()` bina skip kiye rank deta hai (1, 2, 2, 3)", "Dono skip karte hain", "`DENSE_RANK()` decimals deta hai", "Dono same hain"], correct_index: 0, explanation: "DENSE_RANK leaves no gaps in ranking sequence after ties." },
          { id: "q-sql-6-3", question: "`LAG(sales, 1) OVER (ORDER BY date)` function ka kya purpose hai?", options: ["Current row ke theek pichli (previous) row ka sales value fetch karna", "Average nikalna", "Sale delete karna", "Last row par jana"], correct_index: 0, explanation: "LAG allows accessing values from previous rows within the specified partition order." },
          { id: "q-sql-6-4", question: "Cumulative Running Total calculate karne ke liye window function syntax kya hota hai?", options: ["`SUM(amount) OVER (ORDER BY transaction_date)`", "`TOTAL(amount)`", "`RUNNING(amount)`", "`CUMULATIVE(amount)`"], correct_index: 0, explanation: "SUM() with an ORDER BY in the OVER clause computes a running cumulative summation." },
          { id: "q-sql-6-5", question: "`NTILE(4) OVER (ORDER BY salary DESC)` data ko kitne groups mein divide karta hai?", options: ["4 equal Quartile groups (Quartiles 1, 2, 3, 4)", "40 groups", "Sirf 1 group", "Duplicates count"], correct_index: 0, explanation: "NTILE(N) buckets ordered rows into N equal percentile distributions." }
        ]
      }
    },
    {
      id: "test6-mod-7",
      course_id: "course-test-6-sql",
      module_number: 7,
      title: "Module 7: Indexing Architecture, B-Trees & Query Optimization",
      description: "B-Tree internals, Composite Indexes (Leftmost Prefix Rule), Unique vs Partial Indexes, Hash & GIN Indexes, EXPLAIN & EXPLAIN ANALYZE interpretation.",
      order_index: 7,
      lessons: [
        makeLesson("test6-l-7-1", "test6-mod-7", 1, "Lesson 7.1: B-Tree Index Mechanics & Leftmost Prefix Rule", 1, 35,
`-- Setup high-volume transaction ledger
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 1. B-Tree Composite Index for fast multi-column lookups
-- Follows Leftmost Prefix Rule: Optimizes queries on (user_id) AND (user_id, status)
CREATE INDEX idx_transactions_user_status ON transactions (user_id, status);

-- 2. Partial Index for pending transactions only (Saves 90% index RAM!)
CREATE INDEX idx_transactions_pending ON transactions (id) WHERE status = 'PENDING';

-- Inspect index execution with EXPLAIN ANALYZE
EXPLAIN ANALYZE 
SELECT * FROM transactions 
WHERE user_id = 1042 AND status = 'COMPLETED';`, {
          task: "Ek Composite Index create karein user_id aur created_at columns par.",
          hint: "CREATE INDEX idx_user_date ON transactions (user_id, created_at);",
          expected_output: "CREATE INDEX"
        },
        "<strong>Indexes = Database Ke Supercharged Roadmaps!</strong> Bina index ke database ko poori table scan (Sequential Scan O(N)) karni padti hai. B-Tree index lookups ko instant O(log N) B-Tree seeks mein convert karta hai!",
        [
          { tag: "B-Tree", color: "#e0f2fe;#0369a1", title: "🌲 B-Tree Index", desc: "Balanced search tree optimized for disk block reads." },
          { tag: "Partial", color: "#dcfce7;#15803d", title: "⚡ Partial Index", desc: "`WHERE status = 'active'` saves immense RAM space." }
        ],
        ""
        ),
        makeLesson("test6-l-7-2", "test6-mod-7", 2, "Lesson 7.2: Reading EXPLAIN ANALYZE & Query Execution Plans", 2, 25,
`-- Understanding Query Execution Cost
-- Seq Scan (Slow O(N)) vs Index Scan (Fast O(log N)) vs Bitmap Heap Scan
EXPLAIN SELECT id, amount FROM transactions WHERE user_id = 500;`, {
          task: "Query execution plan inspect karne ke liye EXPLAIN query likhein.",
          hint: "EXPLAIN SELECT * FROM transactions;",
          expected_output: "EXPLAIN"
        },
        "<strong>Mastering EXPLAIN ANALYZE!</strong> `Seq Scan` = Danger (Table Scan); `Index Scan` / `Index Only Scan` = Lightning Fast. Production DBA ka sabse bada diagnostic tool!",
        [
          { tag: "Seq Scan", color: "#fee2e2;#b91c1c", title: "🐢 Seq Scan", desc: "Full disk table read (add missing index!)." },
          { tag: "Index Only", color: "#dcfce7;#15803d", title: "⚡ Index Only Scan", desc: "Answers query entirely from index memory without touching disk." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-sql-7-1", question: "Composite Index `(user_id, created_at)` par Leftmost Prefix Rule ka kya matlab hota hai?", options: ["Index `WHERE user_id = ?` aur `WHERE user_id = ? AND created_at = ?` queries ko optimize karega, lekin sirf `WHERE created_at = ?` ko optimize nahi karega", "Hamesha left column delete ho jata hai", "Queries slow ho jaati hain", "Syntax error aata hai"], correct_index: 0, explanation: "Composite indexes can only be utilized if search predicates include leading leftmost columns." },
          { id: "q-sql-7-2", question: "Partial Index (e.g. `CREATE INDEX ... WHERE is_active = true`) ka primary advantage kya hai?", options: ["Index size chhota rehta hai (RAM save hoti hai) aur write performance fast rehti hai", "Color change hota hai", "Table lock hoti hai", "Duplicate data create hota hai"], correct_index: 0, explanation: "Partial indexes only index rows matching a predicate, radically minimizing memory footprint." },
          { id: "q-sql-7-3", question: "`EXPLAIN ANALYZE` mein 'Seq Scan' (Sequential Scan) dekhne par engineer ko kya samajhna chahiye?", options: ["Database poori table ki har row ko disk se scan kar raha hai (Missing index bottleneck)", "Query perfectly optimized hai", "Database corrupt ho gaya hai", "Index fast chal raha hai"], correct_index: 0, explanation: "Sequential Scan indicates full table reads, often solved by introducing targeted indexing." },
          { id: "q-sql-7-4", question: "Over-indexing (Table par 20+ indexes bana dena) kyu harmful hota hai?", options: ["Har `INSERT`, `UPDATE`, `DELETE` par saare indexes update karne padte hain jisse Write performance slow ho jaati hai", "Read speed slow hoti hai", "Database restart hota hai", "SQL crash hota hai"], correct_index: 0, explanation: "Every write operation incurs the overhead of updating all corresponding table indexes." },
          { id: "q-sql-7-5", question: "PostgreSQL mein JSONB document searching ke liye kaunsa specialized index type best hai?", options: ["`GIN` (Generalized Inverted Index)", "`B-Tree`", "`Hash`", "`BRIN`"], correct_index: 0, explanation: "GIN indexes excel at indexing semi-structured JSONB arrays and key-value attributes." }
        ]
      }
    },
    {
      id: "test6-mod-8",
      course_id: "course-test-6-sql",
      module_number: 8,
      title: "Module 8: ACID Transactions, Locks, MVCC & Isolation Levels",
      description: "Atomicity, Consistency, Isolation, Durability, Transaction commands (BEGIN, COMMIT, ROLLBACK), Isolation Levels (Read Committed, Repeatable Read, Serializable), MVCC & Deadlocks.",
      order_index: 8,
      lessons: [
        makeLesson("test6-l-8-1", "test6-mod-8", 1, "Lesson 8.1: ACID Transactions & Money Transfer Consistency", 1, 35,
`-- Setup Bank Accounts Ledger
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    holder_name VARCHAR(50),
    balance NUMERIC(10, 2) CHECK (balance >= 0.00)
);

INSERT INTO accounts (holder_name, balance) VALUES
    ('Aman', 1000.00),
    ('Priya', 500.00);

-- ATOMIC MONEY TRANSFER (All-or-Nothing!)
BEGIN;

-- 1. Deduct from Aman
UPDATE accounts SET balance = balance - 200.00 WHERE id = 1;

-- 2. Credit to Priya
UPDATE accounts SET balance = balance + 200.00 WHERE id = 2;

-- If any step fails, ROLLBACK cancels everything automatically!
COMMIT;

SELECT * FROM accounts;`, {
          task: "Transaction start karne ke liye 'BEGIN;' aur finish karne ke liye 'COMMIT;' command likhein.",
          hint: "BEGIN; ... COMMIT;",
          expected_output: "BEGIN"
        },
        "<strong>ACID = Financial Reliability Guarantee!</strong> Agar bank transfer ke beech power cut ho jaye, toh <code>ROLLBACK</code> ensure karta hai ki aadhe paise gayab na hon. 100% All-or-Nothing execution!",
        [
          { tag: "Atomicity", color: "#e0f2fe;#0369a1", title: "⚛️ Atomicity (All or Nothing)", desc: "Ya toh saare updates save honge ya ek bhi nahi." },
          { tag: "Isolation", color: "#dcfce7;#15803d", title: "🔒 Isolation Levels", desc: "Concurrent transactions ek doosre ke state ko corrupt nahi karti." }
        ],
        ""
        ),
        makeLesson("test6-l-8-2", "test6-mod-8", 2, "Lesson 8.2: MVCC (Multi-Version Concurrency) & Deadlock Prevention", 2, 25,
`-- SELECT FOR UPDATE (Pessimistic Locking to prevent Race Conditions)
BEGIN;

SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;

-- Safe update while row is locked
UPDATE accounts SET balance = balance - 100.00 WHERE id = 1;

COMMIT;`, {
          task: "Row-level lock lene ke liye 'FOR UPDATE' clause use karein.",
          hint: "SELECT * FROM accounts WHERE id = 1 FOR UPDATE;",
          expected_output: "FOR UPDATE"
        },
        "<strong>Multi-Version Concurrency Control (MVCC)!</strong> 'Readers don't block writers, and writers don't block readers.' Row-level locks (`SELECT FOR UPDATE`) inventory stock overselling rokne ke liye best practice hain.",
        [
          { tag: "MVCC", color: "#e0f2fe;#0369a1", title: "📚 MVCC Engine", desc: "Maintains point-in-time snapshots for concurrency." },
          { tag: "Locks", color: "#fee2e2;#b91c1c", title: "🛡️ SELECT FOR UPDATE", desc: "Pessimistic row locking for race condition prevention." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-sql-8-1", question: "ACID principles mein 'Atomicity' ka kya meaning hota hai?", options: ["All-or-Nothing rule: Transaction ke saare operations successfully execute honge ya agar ek bhi fail hua toh sab ROLLBACK ho jayega", "Data fast likhna", "Data delete karna", "Auto backup lena"], correct_index: 0, explanation: "Atomicity guarantees that all constituent operations complete as an indivisible unit of work." },
          { id: "q-sql-8-2", question: "SQL Standard mein sabse STRICT isolation level kaunsa hota hai jo Phantom Reads ko eliminate karta hai?", options: ["`SERIALIZABLE`", "`READ COMMITTED`", "`READ UNCOMMITTED`", "`REPEATABLE READ`"], correct_index: 0, explanation: "Serializable isolation executes concurrent transactions as if they were strictly serialized one after another." },
          { id: "q-sql-8-3", question: "`SELECT ... FOR UPDATE` pessimistic locking query kab use karni chahiye?", options: ["E-commerce ticket booking ya inventory checkout mein concurrent race condition overselling prevent karne ke liye", "Data delete karne ke liye", "Table drop karne ke liye", "Image download ke liye"], correct_index: 0, explanation: "FOR UPDATE acquires an exclusive row lock until transaction commit to prevent concurrent modification." },
          { id: "q-sql-8-4", question: "PostgreSQL MVCC (Multi-Version Concurrency Control) engine ka main rule kya hai?", options: ["'Readers do not block Writers, and Writers do not block Readers'", "Lock everything always", "Single user only", "No transactions allowed"], correct_index: 0, explanation: "MVCC creates version snapshots allowing simultaneous concurrent reads and writes without blocking." },
          { id: "q-sql-8-5", question: "Database 'Deadlock' kab create hota hai?", options: ["Jab do concurrent transactions ek doosre ke locked resources ka circular wait karne lagti hain", "Jab internet band ho jaye", "Jab RAM 100% ho", "Syntax error aane par"], correct_index: 0, explanation: "Deadlocks occur when two or more transactions hold locks and circularly wait for the other to release theirs." }
        ]
      }
    },
    {
      id: "test6-mod-9",
      course_id: "course-test-6-sql",
      module_number: 9,
      title: "Module 9: Database Views, Stored Procedures, Functions & Triggers",
      description: "Standard Views vs Materialized Views (REFRESH), Stored Procedures (PL/pgSQL), User-Defined Functions (UDFs) aur Event Triggers for automated auditing.",
      order_index: 9,
      lessons: [
        makeLesson("test6-l-9-1", "test6-mod-9", 1, "Lesson 9.1: Database Views, Materialized Views & Refresh Mechanics", 1, 30,
`-- Setup base orders table
CREATE TABLE customer_orders (
    id SERIAL PRIMARY KEY,
    customer_id INT,
    amount NUMERIC(10, 2),
    status VARCHAR(20)
);

INSERT INTO customer_orders (customer_id, amount, status) VALUES
    (1, 450, 'COMPLETED'), (1, 300, 'COMPLETED'), (2, 800, 'COMPLETED');

-- 1. Standard Virtual View (Always real-time, no extra storage)
CREATE VIEW v_customer_spend AS
SELECT customer_id, SUM(amount) AS total_spent
FROM customer_orders
WHERE status = 'COMPLETED'
GROUP BY customer_id;

-- Query the view just like a table!
SELECT * FROM v_customer_spend;`, {
          task: "Ek standard view 'CREATE VIEW v_active_users AS SELECT ...' create karein.",
          hint: "CREATE VIEW v_active_users AS SELECT * FROM users;",
          expected_output: "CREATE VIEW"
        },
        "<strong>Views = Virtual Abstraction Layers!</strong> Complex multi-table joins ko clean reusable virtual tables ke roop mein encapsulate karein bina physical storage duplicate kiye.",
        [
          { tag: "View", color: "#e0f2fe;#0369a1", title: "👁️ Standard View", desc: "Virtual query saved in catalog (Always 100% real-time)." },
          { tag: "Materialized", color: "#dcfce7;#15803d", title: "⚡ Materialized View", desc: "Cached on disk for instant analytics (`REFRESH MATERIALIZED VIEW`)." }
        ],
        ""
        ),
        makeLesson("test6-l-9-2", "test6-mod-9", 2, "Lesson 9.2: PL/pgSQL Functions, Triggers & Automated Audit Trails", 2, 30,
`-- Audit Log Table
CREATE TABLE audit_logs (
    log_id SERIAL PRIMARY KEY,
    action VARCHAR(20),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger Function
CREATE OR REPLACE FUNCTION log_order_change()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (action) VALUES ('ORDER_UPDATED');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger definition on table
CREATE TRIGGER trg_order_audit
AFTER UPDATE ON customer_orders
FOR EACH ROW EXECUTE FUNCTION log_order_change();`, {
          task: "Ek trigger function signature 'RETURNS TRIGGER' ke sath define karein.",
          hint: "CREATE OR REPLACE FUNCTION my_trigger() RETURNS TRIGGER AS $$ ...",
          expected_output: "RETURNS TRIGGER"
        },
        "<strong>Triggers = Automated Database Watchdogs!</strong> Table par `INSERT`, `UPDATE` ya `DELETE` hote hi automatic audit logging, data validation, ya notifications trigger karein.",
        [
          { tag: "Trigger", color: "#e0f2fe;#0369a1", title: "⚡ Automated Trigger", desc: "Executes automatically on table DML events." },
          { tag: "PL/pgSQL", color: "#ede9fe;#6d28d9", title: "📜 Procedural Logic", desc: "Full control-flow loops, variables, and exceptions inside database." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-sql-9-1", question: "Standard View aur Materialized View mein key difference kya hai?", options: ["Standard View physical data store nahi karta (Virtual query hai); Materialized View query result ko disk par cache karta hai aur use refresh karna padta hai", "Standard View slow hota hai", "Dono identical hain", "Materialized view delete nahi ho sakti"], correct_index: 0, explanation: "Materialized views physically persist the computed dataset on disk for rapid cached analytical retrieval." },
          { id: "q-sql-9-2", question: "Database `TRIGGER` kab execute hota hai?", options: ["Target table par specific event (`INSERT`, `UPDATE`, `DELETE`) trigger hone par automatically", "Har ghante cron job se", "Sirf restart par", "Manual click karne par"], correct_index: 0, explanation: "Triggers fire automatically in response to specified Data Manipulation Language (DML) table mutations." },
          { id: "q-sql-9-3", question: "Materialized View ke cached data ko update karne ke liye kaunsi command use hoti hai?", options: ["`REFRESH MATERIALIZED VIEW view_name;`", "`UPDATE VIEW view_name;`", "`RELOAD VIEW view_name;`", "`COMMIT VIEW view_name;`"], correct_index: 0, explanation: "REFRESH MATERIALIZED VIEW re-executes the underlying query definition to update stored records." },
          { id: "q-sql-9-4", question: "Database Stored Procedures ka main benefit kya hota hai?", options: ["Complex multi-step business logic ko database layer par execute karna jisse network roundtrips drastically reduce ho jayein", "CSS style karna", "Fonts load karna", "HTML generate karna"], correct_index: 0, explanation: "Stored procedures minimize network chatter by executing bundled procedural logic directly inside the engine." },
          { id: "q-sql-9-5", question: "Trigger function ke andar `NEW` aur `OLD` records kya represent karte hain?", options: ["`NEW` naye updated data ko aur `OLD` previous existing data ko represent karta hai", "Dono NULL hote hain", "Database version", "User session"], correct_index: 0, explanation: "NEW holds the incoming row state, and OLD contains the pre-mutation row state." }
        ]
      }
    },
    {
      id: "test6-mod-10",
      course_id: "course-test-6-sql",
      module_number: 10,
      title: "Module 10: Capstone Project — Production Enterprise E-Commerce Database",
      description: "Full Relational Schema Design, Foreign Keys, Complex Joins, Window Functions, Indexing Optimization, Materialized Views aur ACID Order Processing.",
      order_index: 10,
      lessons: [
        makeLesson("test6-l-10-1", "test6-mod-10", 1, "Lesson 10.1: Enterprise E-Commerce Schema Architecture & Reporting", 1, 40,
`-- Complete Production E-Commerce Architecture
CREATE TABLE store_users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE store_products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE enterprise_orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES store_users(id),
    total NUMERIC(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PAID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data
INSERT INTO store_users (name, email) VALUES ('Aryan', 'aryan@devcraft.io'), ('Ananya', 'ananya@tech.in');
INSERT INTO store_products (title, price, category) VALUES ('Cloud Server', 99.00, 'Cloud'), ('AI Copilot', 49.00, 'AI');
INSERT INTO enterprise_orders (user_id, total) VALUES (1, 148.00), (1, 99.00), (2, 49.00);

-- Analytics: Top Customers with Window Ranking
SELECT 
    u.name,
    u.email,
    COUNT(o.id) AS order_count,
    SUM(o.total) AS total_revenue,
    DENSE_RANK() OVER (ORDER BY SUM(o.total) DESC) AS customer_rank
FROM store_users u
JOIN enterprise_orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email;`, {
          task: "DENSE_RANK() window function apply karein total revenue par.",
          hint: "DENSE_RANK() OVER (ORDER BY SUM(o.total) DESC)",
          expected_output: "DENSE_RANK()"
        },
        "<strong>Capstone Project Architecture!</strong> Is enterprise capstone mein aapne <strong>Relational Schemas</strong>, <strong>Foreign Key Constraints</strong>, <strong>Window Ranking Analytics</strong>, <strong>Complex Aggregations</strong>, aur <strong>ACID Transaction Workflows</strong> ko combine karke production-grade database system construct kiya hai!",
        [
          { tag: "Architecture", color: "#e0f2fe;#0369a1", title: "🏆 Enterprise SQL Capstone", desc: "End-to-End production relational analytics system." }
        ],
        ""
        ),
        makeLesson("test6-l-10-2", "test6-mod-10", 2, "Lesson 10.2: Production Database Performance Tuning & Maintenance", 2, 35,
`-- Database Health & Index Bloat Inspection
-- 1. Create B-Tree index on high-frequency lookup columns
CREATE INDEX idx_enterprise_orders_user ON enterprise_orders (user_id);

-- 2. VACUUM ANALYZE to reclaim disk space & update query planner statistics
VACUUM ANALYZE enterprise_orders;

-- 3. Run final diagnostic inspection
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'enterprise_orders';`, {
          task: "Query planner statistics update karne ke liye VACUUM ANALYZE run karein.",
          hint: "VACUUM ANALYZE enterprise_orders;",
          expected_output: "VACUUM ANALYZE"
        },
        "<strong>Production Database Maintenance!</strong> `VACUUM ANALYZE` dead tuple bloat ko clean karta hai aur query planner ke statistical histograms ko update karta hai taaki queries lightning-fast optimize rahein.",
        [
          { tag: "VACUUM", color: "#e0f2fe;#0369a1", title: "🧹 VACUUM ANALYZE", desc: "Reclaims dead storage space and refreshes cost optimizer histograms." },
          { tag: "Performance", color: "#dcfce7;#15803d", title: "⚡ Enterprise SLA", desc: "Sub-millisecond query execution on terabyte-scale databases." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-sql-10-1", question: "PostgreSQL mein `VACUUM ANALYZE` command run karne ka primary purpose kya hai?", options: ["Dead row versions (bloat) ko reclaim karna aur query planner ke optimization statistics ko refresh karna", "Database format karna", "Passwords delete karna", "Tables rename karna"], correct_index: 0, explanation: "VACUUM reclaims storage from dead tuples, and ANALYZE updates cost optimizer statistical metrics." },
          { id: "q-sql-10-2", question: "High-concurrency e-commerce payment checkout processing ke liye kaunsa isolation level aur pattern use hona chahiye?", options: ["ACID transaction with `SELECT ... FOR UPDATE` row locks ya Serializable isolation", "No transaction", "Auto-commit without locks", "Read Uncommitted"], correct_index: 0, explanation: "ACID transactions with pessimistic row locks guarantee consistency during concurrent balance deductions." },
          { id: "q-sql-10-3", question: "Multi-tenant SaaS architectures mein database sharding ya partitioning ka kya use case hota hai?", options: ["Giant multi-billion row tables ko smaller, manageable chunks (jaise by year ya by tenant_id) mein split karke fast performance maintain karna", "Code compress karna", "Internet speed badhana", "CSS render karna"], correct_index: 0, explanation: "Table partitioning splits massive tables into physical subsets to optimize scanning and maintenance." },
          { id: "q-sql-10-4", question: "Enterprise Database Security: SQL Injection attacks ko prevent karne ka single most effective rule kya hai?", options: ["Hamesha Parameterized Prepared Statements use karein (Kabhi raw user string concatenation na karein)", "Firewall lagana", "Column name secret rakhna", "Database hide karna"], correct_index: 0, explanation: "Parameterized queries separate SQL code from user data parameters, making SQL injection impossible." },
          { id: "q-sql-10-5", question: "Slow Query Log mein se problematic queries optimize karne ka standard workflow kya hota hai?", options: ["Identify slow query -> Run `EXPLAIN ANALYZE` -> Check for Seq Scans -> Add targeted B-Tree / Composite Index -> Re-verify latency", "Query delete kar do", "Server reboot kar do", "Data kam kar do"], correct_index: 0, explanation: "Diagnosing with EXPLAIN ANALYZE to identify sequential scans and building targeted indexes is the gold standard optimization pipeline." }
        ]
      }
    }
  ],
  final_exam: {
    passing_score: 60,
    time_limit_minutes: 30,
    questions: [
      { id: "fe-sql-1", question: "Relational Databases vs NoSQL mein primary trade-off kya hai?", options: ["RDBMS strict schema integrity, ACID guarantees aur complex relational JOINs provide karta hai; NoSQL unstructured horizontal scale par focus karta hai", "RDBMS slow hota hai", "NoSQL mein data save nahi hota", "Dono identical hain"], correct_index: 0, explanation: "Relational models prioritize integrity constraints and normalized relational consistency." },
      { id: "fe-sql-2", question: "B-Tree Index fast search queries kaise provide karta hai?", options: ["Balanced Tree structure ke through logarithmic O(log N) depth search traversal se", "Random numbers guess karke", "Har baar poori table scan karke", "Cache delete karke"], correct_index: 0, explanation: "B-Tree indexes maintain sorted balanced tree structures offering predictable O(log N) seeks." },
      { id: "fe-sql-3", question: "Window Functions (`ROW_NUMBER()`, `DENSE_RANK()`) traditional `GROUP BY` ke upar kya superpower dete hain?", options: ["Har single row ki individual identity retain karte hue sliding/partition calculations perform karte hain", "Tables merge karte hain", "Memory 0 karte hain", "Pointers use karte hain"], correct_index: 0, explanation: "Window functions preserve granular row detail while performing cross-partition aggregations." },
      { id: "fe-sql-4", question: "Database Transactions mein 'Durability' (ACID ka 'D') kya guarantee karta hai?", options: ["Ek baar transaction COMMIT ho jaye, toh chahe server crash ya power failure ho jaye, data permanently disk (WAL) par persist rehta hai", "Data 1 din baad delete hoga", "Data memory mein rahega", "Data encrypted rahega"], correct_index: 0, explanation: "Durability guarantees committed changes survive system crashes through Write-Ahead Logging (WAL)." },
      { id: "fe-sql-5", question: "Leftmost Prefix Rule Composite Indexes par kyu apply hota hai?", options: ["Kyunki index internal level par columns ke order mein sorted hota hai (Left to Right)", "Kyunki right column secret hota hai", "Syntax restriction hai", "Random rule hai"], correct_index: 0, explanation: "B-Trees are physically sorted based on the ordered sequence of composite columns from left to right." }
    ]
  }
};

const outputPath = path.join(process.cwd(), 'Courses', 'test-6.json');
fs.writeFileSync(outputPath, JSON.stringify(sqlFullCourse, null, 2), 'utf-8');
console.log(`✅ Full 10-Module SQL Course (2 Units per module) generated at ${outputPath}`);
