import fs from 'fs';
import path from 'path';

export const sqlCourse = {
  id: "course-test-6-sql",
  title: "Mastering SQL & Relational Database Architecture (Hinglish)",
  subtitle: "Queries, Joins, Aggregations, Indexing, ACID Transactions & Database Design",
  description: "Relational Databases (PostgreSQL, MySQL, SQLite) aur SQL ko zero se pro architect level tak master karein natural Hinglish mein! Complex SELECT queries, Filtering, Multi-table JOINs (Inner, Left, Right, Full), Aggregate Groupings (GROUP BY, HAVING), Subqueries, Window Functions, B-Tree Indexes, ACID Transactions aur E-Commerce Database schema live queries ke sath seekhein.",
  category: "Data & Backend",
  difficulty: "Beginner",
  thumbnail_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
  is_premium: false,
  total_modules: 6,
  estimated_hours: 40,
  created_at: "2026-03-01T00:00:00Z",
  modules: [
    {
      id: "test6-mod-1",
      course_id: "course-test-6-sql",
      module_number: 1,
      title: "Module 1: Relational Databases & The Power of SELECT Queries",
      description: "RDBMS architecture, Tables, Rows, Columns, Primary Keys, SELECT, WHERE filtering, ORDER BY sorting, aur LIMIT.",
      order_index: 1,
      lessons: [
        {
          id: "test6-l-1-1",
          module_id: "test6-mod-1",
          lesson_number: 1,
          title: "Lesson 1.1: Database Tables & Your First SELECT Query",
          order_index: 1,
          duration_minutes: 20,
          content_type: "text",
          starter_code: `-- In-Memory SQL Simulation: Users Table
-- Query: Fetch all active users sorted by creation date

SELECT 
    user_id, 
    full_name, 
    email, 
    role, 
    created_at 
FROM users
WHERE status = 'ACTIVE'
ORDER BY created_at DESC
LIMIT 5;`,
          sandbox_language: "sql",
          challenge: {
            task: "Ek SQL query likhein jo 'products' table se 'product_name' aur 'price' select kare jahan price > 1000 ho.",
            hint: "SELECT product_name, price FROM products WHERE price > 1000;",
            expected_output: "product_name | price"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🗄️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Database = Structured Digital Storage</strong> aur <strong>SQL = Database se baat karne ki Standard Bhasha!</strong> Chahe Swiggy ho, Instagram ho ya Netflix — har company ka core user data aur transaction records Relational Tables (Rows & Columns) mein store hote hain.</p>
  </div>
</div>

<div class="pipeline-flow">
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#e0f2fe; color:#0369a1;">Clause 01</span>
    <div class="pipeline-title">🔍 SELECT & FROM</div>
    <p class="pipeline-desc">Batata hai kaunse columns aur kis table se data retrieve karna hai.</p>
  </div>
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#fef3c7; color:#b45309;">Clause 02</span>
    <div class="pipeline-title">🎯 WHERE Filter</div>
    <p class="pipeline-desc">Rows ko filter karta hai (jaise <code>WHERE status = 'ACTIVE' AND age >= 18</code>).</p>
  </div>
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#dcfce7; color:#15803d;">Clause 03</span>
    <div class="pipeline-title">📊 ORDER BY & LIMIT</div>
    <p class="pipeline-desc">Result ko ASC/DESC sort karta hai aur top N records return karta hai.</p>
  </div>
</div>`
        },
        {
          id: "test6-l-1-2",
          module_id: "test6-mod-1",
          lesson_number: 2,
          title: "Lesson 1.2: Pattern Matching (LIKE, IN, BETWEEN) & NULL Handling",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `-- Search users with Gmail accounts whose age is between 20 and 30
SELECT 
    user_id, 
    full_name, 
    email, 
    age 
FROM users 
WHERE email LIKE '%@gmail.com' 
  AND age BETWEEN 20 AND 30
  AND phone_number IS NOT NULL;`,
          sandbox_language: "sql",
          challenge: {
            task: "Customers table se un customers ko find karein jinka city 'Mumbai' ya 'Delhi' ya 'Bangalore' ho (IN operator use karein).",
            hint: "SELECT * FROM customers WHERE city IN ('Mumbai', 'Delhi', 'Bangalore');",
            expected_output: "city IN ('Mumbai', 'Delhi', 'Bangalore')"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔎</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>SQL Operators = Smart Search Filter!</strong><br/>
    • <code>%</code> (Wildcard): 0 ya zyada characters match karta hai.<br/>
    • <code>IN (...)</code>: Multiple exact matches check karta hai.<br/>
    • <code>IS NULL / IS NOT NULL</code>: Missing data handle karta hai (SQL mein <code>= NULL</code> galat hota hai!).</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-sql-1-1",
            question: "SQL query execution order mein sabse pehle kaunsa clause execute hota hai?",
            options: ["SELECT", "FROM & JOIN", "WHERE", "ORDER BY"],
            correct_index: 1,
            explanation: "SQL query engine sabse pehle FROM aur JOIN clauses ko execute karke data source load karta hai, SELECT clause baad mein apply hota hai."
          },
          {
            id: "q-sql-1-2",
            question: "SQL mein NULL value check karne ke liye kya use kiya jata hai?",
            options: ["WHERE col = NULL", "WHERE col IS NULL", "WHERE col == NULL", "WHERE col IS EMPTY"],
            correct_index: 1,
            explanation: "NULL unknown value represent karta hai, isliye equality operator (`=`) ke bajaye `IS NULL` ya `IS NOT NULL` use hota hai."
          },
          {
            id: "q-sql-1-3",
            question: "`SELECT * FROM users WHERE email LIKE 'admin%'` kya return karega?",
            options: [
              "Sirf email 'admin'",
              "Har wo email jo 'admin' se start hoti hai (e.g. admin@company.com, administrator@mail.com)",
              "Wo email jo 'admin' par end hoti hai",
              "Syntax error"
            ],
            correct_index: 1,
            explanation: "`%` wildcard right side me hone ka matlab hai 'admin' ke baad koi bhi characters ho sakte hain."
          },
          {
            id: "q-sql-1-4",
            question: "Primary Key constraint ka kya significance hai?",
            options: [
              "Ye column ko password bana deta hai",
              "Ye table ke har ek row ko uniquely identify karta hai (Uniqueness + NOT NULL guarantee)",
              "Ye table ko encrypt karta hai",
              "Ye queries ko slow karta hai"
            ],
            correct_index: 1,
            explanation: "Primary key table mein har record ka unique identifier hota hai aur kabhi duplicate ya NULL nahi ho sakta."
          },
          {
            id: "q-sql-1-5",
            question: "`ORDER BY salary DESC` ka kya matlab hai?",
            options: [
              "Lowest salary se Highest salary (Ascending)",
              "Highest salary se Lowest salary (Descending - bade se chhota)",
              "Salary ko delete karna",
              "Salary ko randomize karna"
            ],
            correct_index: 1,
            explanation: "DESC (Descending) highest value se lowest value ki taraf sort karta hai."
          }
        ]
      }
    },
    {
      id: "test6-mod-2",
      course_id: "course-test-6-sql",
      module_number: 2,
      title: "Module 2: Aggregate Functions & Data Grouping (GROUP BY & HAVING)",
      description: "COUNT, SUM, AVG, MIN, MAX aggregations, GROUP BY buckets, HAVING vs WHERE differences aur Business Analytics.",
      order_index: 2,
      lessons: [
        {
          id: "test6-l-2-1",
          module_id: "test6-mod-2",
          lesson_number: 1,
          title: "Lesson 2.1: Aggregating Business Metrics with GROUP BY",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `-- Calculate total revenue and order count per category
SELECT 
    category,
    COUNT(order_id) AS total_orders,
    SUM(order_amount) AS total_revenue,
    AVG(order_amount) AS average_order_value
FROM orders
WHERE order_status = 'DELIVERED'
GROUP BY category
HAVING SUM(order_amount) >= 50000
ORDER BY total_revenue DESC;`,
          sandbox_language: "sql",
          challenge: {
            task: "Har city ke total users count karein: 'SELECT city, COUNT(*) AS user_count FROM users GROUP BY city;'",
            hint: "GROUP BY city lagayein aur COUNT(*) select karein.",
            expected_output: "city | user_count"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📊</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>GROUP BY = Rows ko Categories ke Buckets mein baantna!</strong> Jaise Swiggy dekhna chahta hai ki 'North Indian' vs 'Chinese' cuisine se kitna revenue generate hua, GROUP BY data ko summarize karta hai.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-agg-2-1",
            question: "WHERE aur HAVING clause mein core technical difference kya hai?",
            options: [
              "Dono exact same hote hain",
              "WHERE individual rows ko group banne se pehle filter karta hai; HAVING aggregated groups par filter lagata hai",
              "HAVING sirf numbers ke liye hota hai",
              "WHERE query ko delete kar deta hai"
            ],
            correct_index: 1,
            explanation: "WHERE raw rows filter karta hai jabki HAVING aggregated summary metrics (jaise `HAVING COUNT(*) > 5`) par filter lagata hai."
          },
          {
            id: "q-agg-2-2",
            question: "`COUNT(*)` aur `COUNT(column_name)` mein kya farak hai?",
            options: [
              "`COUNT(*)` NULL rows samet saari rows count karta hai; `COUNT(column_name)` NULL values ko ignore karta hai",
              "COUNT(*) sirf numbers count karta hai",
              "COUNT(column_name) slow hota hai",
              "Dono mein koi farak nahi hai"
            ],
            correct_index: 0,
            explanation: "COUNT(col) us specific column mein non-null values count karta hai jabki COUNT(*) total matching rows count karta hai."
          },
          {
            id: "q-agg-2-3",
            question: "Agar SELECT list mein aggregated column ke sath non-aggregated column ho, toh kya compulsory hai?",
            options: [
              "Usi non-aggregated column ko GROUP BY clause mein include karna zaroori hai",
              "Database restart karna",
              "Naya table banana",
              "WHERE clause hatana"
            ],
            correct_index: 0,
            explanation: "SQL rule: Jo bhi non-aggregate columns SELECT list mein hain, unhe GROUP BY list mein hona mandatory hota hai."
          },
          {
            id: "q-agg-2-4",
            question: "`SELECT AVG(rating) FROM reviews` kya calculate karega?",
            options: ["Total count", "Average (Mean) rating", "Minimum rating", "Highest rating"],
            correct_index: 1,
            explanation: "AVG() arithmetic mean (sum / count) calculate karta hai."
          },
          {
            id: "q-agg-2-5",
            question: "`DISTINCT` keyword ka primary purpose kya hai?",
            options: [
              "Duplicate values ko eliminate karke sirf unique values return karna",
              "Result ko reverse karna",
              "Font change karna",
              "Errors ignore karna"
            ],
            correct_index: 0,
            explanation: "SELECT DISTINCT duplicates ko remove karke unique records set return karta hai."
          }
        ]
      }
    },
    {
      id: "test6-mod-3",
      course_id: "course-test-6-sql",
      module_number: 3,
      title: "Module 3: SQL JOINs Masterclass (Multi-Table Relationships)",
      description: "Entity-Relationship (ER) modeling, Foreign Keys, INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN aur Self JOINs.",
      order_index: 3,
      lessons: [
        {
          id: "test6-l-3-1",
          module_id: "test6-mod-3",
          lesson_number: 1,
          title: "Lesson 3.1: Combining Tables with INNER & LEFT JOINs",
          order_index: 1,
          duration_minutes: 30,
          content_type: "text",
          starter_code: `-- Real-World E-Commerce Schema: Users & Their Orders
-- LEFT JOIN: Saare users aayenge chahe unhone order kiya ho ya nahi!

SELECT 
    u.user_id,
    u.full_name,
    u.email,
    o.order_id,
    o.order_amount,
    o.status AS order_status
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
ORDER BY u.user_id ASC;`,
          sandbox_language: "sql",
          challenge: {
            task: "INNER JOIN se sirf un users ka data layein jinhone kam se kam ek order place kiya ho.",
            hint: "FROM users u INNER JOIN orders o ON u.user_id = o.user_id",
            expected_output: "INNER JOIN orders"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔗</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>JOINs = Relational Database ka Superpower!</strong> Data ko duplicate karne ke bajaye (Normalization), hum alag-alag tables (Users, Orders, Payments) banate hain aur Foreign Key ke zariye unhe connect karte hain.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-join-3-1",
            question: "INNER JOIN aur LEFT JOIN mein fundamental difference kya hai?",
            options: [
              "INNER JOIN sirf matching rows return karta hai; LEFT JOIN left table ki saari rows deta hai aur unmatched right side mein NULLs bhejta hai",
              "LEFT JOIN data delete kar deta hai",
              "INNER JOIN sirf numbers join karta hai",
              "Dono exact same results dete hain"
            ],
            correct_index: 0,
            explanation: "INNER JOIN = Intersection (both match); LEFT JOIN = All Left Table records + Matching Right Table records."
          },
          {
            id: "q-join-3-2",
            question: "Foreign Key constraint ka primary role kya hai?",
            options: [
              "Referential Integrity enforce karna (Child table ka column Parent table ke valid primary key ko reference kare)",
              "Table ko delete karna",
              "Foreign currency convert karna",
              "User password encrypt karna"
            ],
            correct_index: 0,
            explanation: "Foreign key ensure karti hai ki orphaned records na banein aur valid relationships maintain rahein."
          },
          {
            id: "q-join-3-3",
            question: "`ON u.id = o.user_id` clause ka kya kaam hai?",
            options: [
              "Join condition specify karna jiske basis par do tables match hongi",
              "Table ko on/off karna",
              "File save karna",
              "Time set karna"
            ],
            correct_index: 0,
            explanation: "ON clause batata hai ki kis key column ke match hone par dono tables ke columns ek single row mein judenge."
          },
          {
            id: "q-join-3-4",
            question: "Agar Table A mein 5 rows hain aur Table B mein 4 rows hain, toh `CROSS JOIN` kitni rows produce karega?",
            options: ["9 rows", "20 rows (Cartesian Product 5 x 4)", "1 row", "0 rows"],
            correct_index: 1,
            explanation: "CROSS JOIN cartesian product create karta hai (har row Table A ki har row Table B se combine hoti hai: 5 * 4 = 20)."
          },
          {
            id: "q-join-3-5",
            question: "Self-Join ka use kab kiya jata hai?",
            options: [
              "Jab ek table ko khud apne aap se join karna ho (e.g. Employee table jisme manager_id usi table ke employee_id ko point karta hai)",
              "Database destroy karne ke liye",
              "Single column rename karne ke liye",
              "Memory double karne ke liye"
            ],
            correct_index: 0,
            explanation: "Hierarchical data jaise Employee-Manager structure ya Category-Subcategory mapping ke liye same table ko alias dekar self-join kiya jata hai."
          }
        ]
      }
    },
    {
      id: "test6-mod-4",
      course_id: "course-test-6-sql",
      module_number: 4,
      title: "Module 4: Subqueries, Common Table Expressions (CTEs) & Window Functions",
      description: "Nested queries, Correlated subqueries, WITH clause (CTEs), ROW_NUMBER(), RANK(), DENSE_RANK() aur OVER (PARTITION BY).",
      order_index: 4,
      lessons: [
        {
          id: "test6-l-4-1",
          module_id: "test6-mod-4",
          lesson_number: 1,
          title: "Lesson 4.1: CTEs (WITH Clause) & Analytical Window Functions",
          order_index: 1,
          duration_minutes: 30,
          content_type: "text",
          starter_code: `-- Find Top 2 Highest Spending Customers per City using Window Functions & CTE

WITH RankedCustomers AS (
    SELECT 
        user_id,
        full_name,
        city,
        total_spent,
        DENSE_RANK() OVER (PARTITION BY city ORDER BY total_spent DESC) AS rank_in_city
    FROM customer_spending
)
SELECT 
    user_id, 
    full_name, 
    city, 
    total_spent, 
    rank_in_city
FROM RankedCustomers
WHERE rank_in_city <= 2
ORDER BY city, rank_in_city;`,
          sandbox_language: "sql",
          challenge: {
            task: "WITH CTE banayein jisme 'HighValueOrders' filter ho aur final SELECT us CTE se query kare.",
            hint: "WITH HighValueOrders AS (SELECT * FROM orders WHERE amount > 5000) SELECT * FROM HighValueOrders;",
            expected_output: "RankedCustomers"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🪟</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Window Functions = Rows ko Collapse kiye bina Aggregations compute karna!</strong> GROUP BY rows ko single summary row bana deta hai, lekin Window Functions (<code>OVER (...)</code>) har individual row ko barkaraar rakhte hue running totals ya ranking calculate karte hain.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-cte-4-1",
            question: "Common Table Expression (CTE) yaani `WITH clause` ka main advantage kya hai?",
            options: [
              "Complex nested subqueries ko clean, readable aur modular format mein break karna",
              "Database password reset karna",
              "Data ko automatically CSV mein save karna",
              "Internet speed badhana"
            ],
            correct_index: 0,
            explanation: "CTEs temporary named result sets provide karti hain jo readable queries aur recursive operations ke liye essential hain."
          },
          {
            id: "q-cte-4-2",
            question: "`RANK()` aur `DENSE_RANK()` mein tie (same values) aane par kya farak hota hai?",
            options: [
              "`RANK()` tie ke baad ranks skip karta hai (e.g. 1, 2, 2, 4); `DENSE_RANK()` gaps skip nahi karta (e.g. 1, 2, 2, 3)",
              "Dono exact identical hote hain",
              "DENSE_RANK() error deta hai",
              "RANK() negative numbers deta hai"
            ],
            correct_index: 0,
            explanation: "DENSE_RANK() ranking sequence mein gaps create nahi karta jabki RANK() next sequence number count ke according jump karta hai."
          },
          {
            id: "q-cte-4-3",
            question: "`OVER (PARTITION BY department_id ORDER BY salary DESC)` mein `PARTITION BY` ka kya kaam hai?",
            options: [
              "Data ko department-wise independent calculation windows mein divide karna",
              "Hard drive partition karna",
              "Database lock karna",
              "Tables merge karna"
            ],
            correct_index: 0,
            explanation: "PARTITION BY window function calculation ko specific categories (groups) ke andar isolate karta hai."
          },
          {
            id: "q-cte-4-4",
            question: "Correlated Subquery kya hoti hai?",
            options: [
              "Wo subquery jo outer query ke values par depend karti hai aur har outer row ke liye evaluate hoti hai",
              "Wo query jo do databases connect karti hai",
              "Wo query jo sirf numbers return karti hai",
              "Ek corrupted query"
            ],
            correct_index: 0,
            explanation: "Correlated subquery outer query ke current row values ko reference karti hai."
          },
          {
            id: "q-cte-4-5",
            question: "`ROW_NUMBER()` window function kya return karta hai?",
            options: [
              "Partition ke andar har row ko unique sequential 1-based integer index",
              "Phone number",
              "Total row count",
              "Random integer"
            ],
            correct_index: 0,
            explanation: "ROW_NUMBER() har row ko partition ke order ke according sequential rank 1, 2, 3... assign karta hai."
          }
        ]
      }
    },
    {
      id: "test6-mod-5",
      course_id: "course-test-6-sql",
      module_number: 5,
      title: "Module 5: Database Schema Design, Indexes & Performance Optimization",
      description: "CREATE TABLE, Data types, B-Tree Indexes, Composite Indexes, EXPLAIN ANALYZE, Slow query bottlenecks aur Normalization.",
      order_index: 5,
      lessons: [
        {
          id: "test6-l-5-1",
          module_id: "test6-mod-5",
          lesson_number: 1,
          title: "Lesson 5.1: Indexing Mechanics & Query Optimization",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `-- Database Schema Definition & Index Creation

CREATE TABLE IF NOT EXISTS customer_accounts (
    account_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0.00 CHECK (balance >= 0),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- B-Tree Index for Lightning Fast User Lookups (O(log N))
CREATE INDEX idx_customer_user_id ON customer_accounts(user_id);

-- Check Query Execution Plan
EXPLAIN ANALYZE 
SELECT * FROM customer_accounts WHERE user_id = 1042;`,
          sandbox_language: "sql",
          challenge: {
            task: "Ek index banayein customer_accounts ke 'account_number' column par.",
            hint: "CREATE INDEX idx_account_num ON customer_accounts(account_number);",
            expected_output: "CREATE INDEX"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">⚡</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Index = Kitaab ke aakhri panno ka Index Page!</strong> Bina index ke database ko 10 Crore rows scan (Sequential Full Table Scan, O(N)) karni padegi, jabki B-Tree Index se wahi record sirf 3-4 pointer hops (O(log N)) mein mil jata hai!</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-idx-5-1",
            question: "Relational databases mein Index create karne ka primary benefit kya hota hai?",
            options: [
              "Data search aur retrieval queries (SELECT) ki speed dramatically fast ho jaati hai (O(N) Scan se O(log N) B-Tree lookup)",
              "Table ki memory size kam ho jaati hai",
              "Database free ho jata hai",
              "INSERT queries faster ho jaati hain"
            ],
            correct_index: 0,
            explanation: "Indexes read queries ko superfast karte hain, halanki excessive indexing se write (INSERT/UPDATE) time thoda badhta hai."
          },
          {
            id: "q-idx-5-2",
            question: "`EXPLAIN ANALYZE` command ka kya purpose hota hai?",
            options: [
              "Query engine ka actual execution plan, node timings, buffer hits aur cost breakdown display karna",
              "Query ko delete karna",
              "Database backup lena",
              "User password verify karna"
            ],
            correct_index: 0,
            explanation: "EXPLAIN ANALYZE database optimizer dwara chune gaye path aur execution bottlenecks ko inspect karne ka primary tool hai."
          },
          {
            id: "q-idx-5-3",
            question: "B-Tree (Balanced Tree) data structure databases mein index ke liye kyu widely prefer kiya jata hai?",
            options: [
              "Ye equality (`=`) aur range queries (`BETWEEN`, `<`, `>`) dono ko balanced O(log N) time mein efficiently handle karta hai",
              "Ye images store karta hai",
              "Ye sirf Python mein banta hai",
              "Ye free hota hai"
            ],
            correct_index: 0,
            explanation: "B-Tree sorted structure maintain karta hai jo disk I/O blocks ko minimize karke fast point aur range scans allow karta hai."
          },
          {
            id: "q-idx-5-4",
            question: "Composite Index (e.g. `CREATE INDEX idx_name ON orders(customer_id, order_date)`) kis rule ko follow karta hai?",
            options: [
              "Leftmost Prefix Matching Rule",
              "Rightmost only Rule",
              "Alphabetical Rule",
              "Random Rule"
            ],
            correct_index: 0,
            explanation: "Composite index tabhi use hota hai jab query leftmost columns ko filter mein include karti hai."
          },
          {
            id: "q-idx-5-5",
            question: "Database Normalization (1NF, 2NF, 3NF) ka main goal kya hota hai?",
            options: [
              "Data redundancy (duplication) aur update anomalies ko eliminate karna",
              "Queries ko slow karna",
              "Table delete karna",
              "Dark mode add karna"
            ],
            correct_index: 0,
            explanation: "Normalization schema ko properly structure karta hai taaki data anomalies aur wasted storage space remove ho sakein."
          }
        ]
      }
    },
    {
      id: "test6-mod-6",
      course_id: "course-test-6-sql",
      module_number: 6,
      title: "Module 6: Capstone Project — ACID Transactions & Fintech Ledger Engine",
      description: "ACID Properties (Atomicity, Consistency, Isolation, Durability), Money Transfer Transactions, BEGIN, COMMIT, ROLLBACK.",
      order_index: 6,
      lessons: [
        {
          id: "test6-l-6-1",
          module_id: "test6-mod-6",
          lesson_number: 1,
          title: "Lesson 6.1: Building Fault-Tolerant Bank Money Transfer Transactions",
          order_index: 1,
          duration_minutes: 35,
          content_type: "text",
          starter_code: `-- Fintech Wallet Transfer Transaction (Safe & Atomic)

BEGIN TRANSACTION;

-- Step 1: Sender ke account se paise deduct karein
UPDATE user_wallets
SET balance = balance - 5000.00
WHERE wallet_id = 101 AND balance >= 5000.00;

-- Step 2: Receiver ke account mein paise credit karein
UPDATE user_wallets
SET balance = balance + 5000.00
WHERE wallet_id = 202;

-- Step 3: Transaction Audit Ledger mein record karein
INSERT INTO wallet_transactions (sender_id, receiver_id, amount, status)
VALUES (101, 202, 5000.00, 'SUCCESS');

-- Agar sab steps bina kisi error ke complete hue -> Permanently Save (COMMIT)
COMMIT;

-- Note: Agar beech mein system crash ya failure hua toh: ROLLBACK; auto-trigger hota hai.`,
          sandbox_language: "sql",
          challenge: {
            task: "Ek transaction likhein jo product stock ko 1 se decrease kare aur order insert karke COMMIT kare.",
            hint: "BEGIN; UPDATE products SET stock = stock - 1 WHERE id = 1; INSERT INTO orders...; COMMIT;",
            expected_output: "BEGIN TRANSACTION"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🏆</div>
  <div>
    <div class="mental-title">Capstone Architecture Overview</div>
    <p class="mental-text">Financial systems (jaise Paytm, Razorpay, Stripe) mein <strong>ACID (Atomicity, Consistency, Isolation, Durability)</strong> transactions life-and-death importance rakhte hain! Ya toh saare steps 100% complete honge, ya ek bhi step apply nahi hoga (All or Nothing).</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-acid-6-1",
            question: "ACID mein 'Atomicity' ka kya matlab hota hai?",
            options: [
              "'All or Nothing' — Transaction ke saare operations successfully commit honge, ya agar ek bhi fail hua toh poora rollback ho jayega",
              "Data atomic molecules mein store hota hai",
              "Transaction hamesha 1 second legi",
              "Database split ho jayega"
            ],
            correct_index: 0,
            explanation: "Atomicity guarantee karti hai ki intermediate half-done transactions database mein corrupt state na chhoden."
          },
          {
            id: "q-acid-6-2",
            question: "Transaction ke dauran error aane par modifications ko cancel karne ke liye kaunsi command use hoti hai?",
            options: ["ROLLBACK", "CANCEL", "UNDO ALL", "DELETE TRANSACTION"],
            correct_index: 0,
            explanation: "ROLLBACK database state ko transaction start hone se pehle wali clean state par revert kar deta hai."
          },
          {
            id: "q-acid-6-3",
            question: "ACID mein 'Durability' ki kya guarantee hoti hai?",
            options: [
              "Ek baar transaction COMMIT ho gaya, toh server power cut ya crash hone par bhi data safe aur non-volatile disk/WAL par persist rahega",
              "Hard drive ki warranty",
              "Database password expire nahi hoga",
              "Internet connectivity bani rahegi"
            ],
            correct_index: 0,
            explanation: "Durability Write-Ahead Logging (WAL) se ensure karti hai ki committed transactions crash ke baad bhi recover ho sakein."
          },
          {
            id: "q-acid-6-4",
            question: "Concurrent transactions mein Dirty Reads aur Phantom Reads ko control karne ke liye kya set kiya jata hai?",
            options: ["Transaction Isolation Levels (e.g. Read Committed, Serializable)", "Screen brightness", "Server RAM", "Wi-Fi channel"],
            correct_index: 0,
            explanation: "Isolation levels decide karte hain ki simultaneously run ho rahe transactions ek doosre ke uncommitted changes ko kis hadd tak dekh sakte hain."
          },
          {
            id: "q-acid-6-5",
            question: "Fintech systems mein Audit Ledger Table ka kya importance hai?",
            options: [
              "Har debit aur credit transaction ka immutable (never delete) history record maintain karna for security & compliance",
              "Website ka color scheme badalna",
              "Temporary cache store karna",
              "Users ko email bhejna"
            ],
            correct_index: 0,
            explanation: "Audit ledgers financial tracking aur regulatory compliance ke liye immutable timestamped source of truth hote hain."
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
        id: "fe-sql-1",
        question: "Relational Database (SQL) vs NoSQL (Document Store) mein primary architectural distinction kya hai?",
        options: [
          "SQL structured schema, strict ACID guarantees aur relation joins provide karta hai; NoSQL flexible schema aur horizontal key-value/document scaling ke liye hota hai",
          "SQL sirf offline chalta hai",
          "NoSQL mein data store nahi hota",
          "Dono exact identical hain"
        ],
        correct_index: 0,
        explanation: "SQL tables structured normalization aur ACID relational consistency deliver karti hain."
      },
      {
        id: "fe-sql-2",
        question: "Database Deadlock kab hota hai?",
        options: [
          "Jab do transactions ek doosre ke locked resources ko access karne ke liye infinite wait cycle mein phas jate hain",
          "Jab hard drive full ho jaati hai",
          "Jab query spelling galat hoti hai",
          "Jab internet disconnect hota hai"
        ],
        correct_index: 0,
        explanation: "Deadlock circular lock dependency hoti hai jise database deadlock detector identify karke ek transaction ko abort karta hai."
      },
      {
        id: "fe-sql-3",
        question: "`SELECT COUNT(DISTINCT user_id) FROM orders` kya calculate karega?",
        options: [
          "Total unique customers jinhone kam se kam ek order kiya hai",
          "Duplicate orders count",
          "Total row count",
          "Max order value"
        ],
        correct_index: 0,
        explanation: "DISTINCT user_id duplicate user occurrences ko remove karke unique paying users ka count nikalta hai."
      },
      {
        id: "fe-sql-4",
        question: "Database Sharding aur Replication mein kya difference hai?",
        options: [
          "Sharding data ko multiple database servers par horizontally partition karti hai; Replication same data ki copies read replicas par mirror karti hai",
          "Sharding encryption hoti hai",
          "Replication data delete karti hai",
          "Dono same word hain"
        ],
        correct_index: 0,
        explanation: "Sharding splits data across multiple nodes for write scalability; Replication duplicates data for read scale & high availability."
      },
      {
        id: "fe-sql-5",
        question: "Production database query optimization ka Golden Rule kya hai?",
        options: [
          "Sirf required columns select karein (`SELECT *` avoid karein), appropriate B-Tree indexes banayein, aur query plans (EXPLAIN) analyze karein",
          "Har table ko delete karke recreate karna",
          "Bina WHERE clause ke queries run karna",
          "Server restart karna"
        ],
        correct_index: 0,
        explanation: "Selective projection, targeted indexing aur execution plan monitoring production performance ke pillars hain."
      }
    ]
  }
};

const outputPath = path.join(process.cwd(), 'Courses', 'test-6.json');
fs.writeFileSync(outputPath, JSON.stringify(sqlCourse, null, 2), 'utf-8');
console.log(`✅ SQL Course generated at ${outputPath}`);
