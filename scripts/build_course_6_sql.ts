import fs from 'fs';
import { makeLesson } from './helpers';

export const sqlCourse = {
  id: "course-test-6-sql",
  title: "Enterprise SQL & Database Architecture (Hinglish)",
  subtitle: "From Relational Modeling to High-Performance Window Functions & Index Tuning",
  description: "Master enterprise relational database engineering from DDL/DML, complex multi-table JOINs, CTEs, Window Functions (OVER/PARTITION BY), ACID transactions, B-Tree index tuning with EXPLAIN ANALYZE to high-scale e-commerce database architecture in Hinglish.",
  category: "Databases & Architecture",
  difficulty: "Beginner to Advanced",
  thumbnail_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80",
  is_premium: false,
  total_modules: 11,
  estimated_hours: 50,
  created_at: "2026-03-01T00:00:00Z",
  modules: [
    // Mod 1: 4 lessons
    {
      id: "test6-mod-1",
      course_id: "course-test-6-sql",
      module_number: 1,
      title: "Module 1: SQL Foundations & Relational Data Architecture",
      description: "Relational modeling, DDL (CREATE TABLE), primary/foreign keys, DML (INSERT/UPDATE/DELETE RETURNING), and column migrations.",
      order_index: 1,
      lessons: [
        makeLesson("test6-l-1-1", "test6-mod-1", 1, "Lesson 1.1: Relational Database Architecture & SQL Dialects", 1, 25, "sql",
`-- Checking Database Version & Engine Status
SELECT version();

-- Creating a simple verification table
CREATE TABLE IF NOT EXISTS database_status (
    id SERIAL PRIMARY KEY,
    engine_name VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'ONLINE'
);

INSERT INTO database_status (engine_name) VALUES ('PostgreSQL 16 Enterprise');
SELECT * FROM database_status;`,
          { task: "Execute SELECT * FROM database_status; to verify database connection.", hint: "SELECT query.", expected_output: "PostgreSQL 16 Enterprise" },
          "Relational databases data ko structured 2D tables (relations) mein store karte hain with strict mathematical relational algebra integrity.",
          [
            { tag: "RDBMS", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Relational Model", desc: "Structured tables, strict types, and relational constraints." }
          ],
          `<div class="theory-card"><h3>Relational Foundations</h3><p>Guarantees schema consistency across massive enterprise datasets.</p></div>`
        ),
        makeLesson("test6-l-1-2", "test6-mod-1", 2, "Lesson 1.2: DDL Masterclass — CREATE TABLE & Integrity Constraints", 2, 25, "sql",
`CREATE TABLE customers (
    customer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    balance NUMERIC(12, 2) DEFAULT 0.00 CHECK (balance >= 0),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Integrity constraints prevent invalid rows at the storage layer!`,
          { task: "Create table with PRIMARY KEY, UNIQUE, and CHECK (balance >= 0) constraints.", hint: "DDL CREATE TABLE syntax.", expected_output: "CREATE TABLE" },
          "Constraints (PRIMARY KEY, UNIQUE, NOT NULL, CHECK) database engine level par data corruption ko 100% block karte hain.",
          [
            { tag: "DDL Constraints", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Data Integrity", desc: "Hardware-level validation rules preventing bad data insertion." }
          ],
          `<div class="theory-card"><h3>Constraint Architecture</h3><p>NUMERIC(12, 2) avoids floating-point rounding errors in financial transactions.</p></div>`
        ),
        makeLesson("test6-l-1-3", "test6-mod-1", 3, "Lesson 1.3: DML Masterclass — INSERT, UPDATE, DELETE & RETURNING Clause", 3, 25, "sql",
`-- Inserting with atomic RETURNING clause
INSERT INTO customers (email, full_name, balance)
VALUES ('arjun@antigravity.io', 'Arjun Mehta', 1500.00)
RETURNING customer_id, email, created_at;

-- Safe update with conditions
UPDATE customers
SET balance = balance + 500.00
WHERE email = 'arjun@antigravity.io';`,
          { task: "Use RETURNING customer_id in INSERT statement.", hint: "INSERT ... RETURNING syntax.", expected_output: "arjun@antigravity.io" },
          "RETURNING clause INSERT ya UPDATE hone ke turant baad generated IDs aur timestamps bina extra SELECT query ke return karta hai.",
          [
            { tag: "DML Operations", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "RETURNING Clause", desc: "Atomic single-round-trip data mutations." }
          ],
          `<div class="theory-card"><h3>Network Roundtrip Optimization</h3><p>Halves latency in high-frequency backend API endpoints.</p></div>`
        ),
        makeLesson("test6-l-1-4", "test6-mod-1", 4, "Lesson 1.4: Schema Migrations & ALTER TABLE Operations", 4, 20, "sql",
`-- Adding columns and constraints to existing live tables
ALTER TABLE customers 
ADD COLUMN is_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN loyalty_tier VARCHAR(20) DEFAULT 'BRONZE';

-- Adding a foreign key safely
-- ALTER TABLE orders ADD CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id);`,
          { task: "Use ALTER TABLE to add a column is_verified BOOLEAN.", hint: "ALTER TABLE syntax.", expected_output: "ALTER TABLE" },
          "ALTER TABLE production databases mein live schemas ko bina data delete kiye evolve karne allow karta hai.",
          [
            { tag: "Schema Migrations", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "ALTER TABLE", desc: "Non-destructive production schema evolution." }
          ],
          `<div class="theory-card"><h3>Production Migrations</h3><p>Always use non-blocking migration strategies for large tables.</p></div>`
        )
      ]
    },

    // Mod 2: 3 lessons
    {
      id: "test6-mod-2",
      course_id: "course-test-6-sql",
      module_number: 2,
      title: "Module 2: Data Query Language (DQL) & Filtering Mastery",
      description: "SELECT querying, WHERE filters, Pattern Matching (LIKE/ILIKE/SIMILAR TO), ORDER BY, LIMIT, and Keyset pagination.",
      order_index: 2,
      lessons: [
        makeLesson("test6-l-2-1", "test6-mod-2", 1, "Lesson 2.1: Modern SELECT Queries, Aliasing & WHERE Filtering", 1, 20, "sql",
`-- Querying active enterprise customers with specific balance
SELECT 
    customer_id AS id,
    full_name AS client_name,
    balance AS account_balance
FROM customers
WHERE balance >= 1000.00 AND is_verified = TRUE
ORDER BY balance DESC;`,
          { task: "Write SELECT with AS aliases and WHERE condition.", hint: "SELECT AS aliasing.", expected_output: "client_name" },
          "SELECT query relational tables se specific columns project karta hai aur WHERE rows ko filter karta hai.",
          [
            { tag: "DQL Filtering", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Projection & Selection", desc: "Filtering row sets before memory allocation." }
          ],
          `<div class="theory-card"><h3>Query Execution Order</h3><p>FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.</p></div>`
        ),
        makeLesson("test6-l-2-2", "test6-mod-2", 2, "Lesson 2.2: String Search & Pattern Matching (LIKE, ILIKE & Regex)", 2, 20, "sql",
`-- Case-insensitive pattern search with ILIKE
SELECT full_name, email
FROM customers
WHERE email ILIKE '%@antigravity.io' 
  AND full_name LIKE 'A%';`,
          { task: "Find emails ending in @antigravity.io using ILIKE '%@antigravity.io'.", hint: "ILIKE pattern matching.", expected_output: "Arjun Mehta" },
          "ILIKE case-insensitive pattern matching karta hai jo search bars aur auto-suggestions ke liye essential hai.",
          [
            { tag: "Pattern Search", color: "rgba(16, 185, 129, 0.15); #10b981", title: "LIKE & ILIKE", desc: "Wildcard (% and _) string matching." }
          ],
          `<div class="theory-card"><h3>Trigram Indexing</h3><p>Pair ILIKE with pg_trgm GIN indexes for sub-millisecond full-text search.</p></div>`
        ),
        makeLesson("test6-l-2-3", "test6-mod-2", 3, "Lesson 2.3: Pagination Strategies (LIMIT/OFFSET vs High-Performance Keyset)", 3, 25, "sql",
`-- 1. Traditional OFFSET Pagination (Slow for deep pages: O(N) scan)
SELECT * FROM customers ORDER BY created_at DESC LIMIT 20 OFFSET 100;

-- 2. Keyset / Cursor Pagination (High-speed: O(log N) index seek)
SELECT * FROM customers
WHERE created_at < '2026-03-01T00:00:00Z'
ORDER BY created_at DESC
LIMIT 20;`,
          { task: "Write keyset pagination query using WHERE created_at < cursor LIMIT 20.", hint: "Keyset pagination syntax.", expected_output: "LIMIT 20" },
          "Keyset (Cursor-based) pagination OFFSET ki O(N) table scan cost ko eliminate karke constant O(1) time query speed provide karti hai.",
          [
            { tag: "Keyset Pagination", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Cursor Pagination", desc: "Index-seeking pagination scaling to billions of records." }
          ],
          `<div class="theory-card"><h3>Pagination Architecture</h3><p>Never use OFFSET for production feeds with millions of rows.</p></div>`
        )
      ]
    },

    // Mod 3: 2 lessons
    {
      id: "test6-mod-3",
      course_id: "course-test-6-sql",
      module_number: 3,
      title: "Module 3: Aggregations & Grouping Pipelines",
      description: "Aggregate functions (COUNT, SUM, AVG, MIN, MAX), GROUP BY groupings, and HAVING filter clauses.",
      order_index: 3,
      lessons: [
        makeLesson("test6-l-3-1", "test6-mod-3", 1, "Lesson 3.1: Aggregate Functions & NULL Value Handling in Aggregates", 1, 20, "sql",
`-- Aggregation metrics across entire table
SELECT 
    COUNT(*) AS total_customers,
    COUNT(loyalty_tier) AS tiered_customers, -- Ignores NULLs
    SUM(balance) AS total_vault_holdings,
    ROUND(AVG(balance), 2) AS average_balance,
    MAX(balance) AS highest_balance
FROM customers;`,
          { task: "Calculate COUNT(*), SUM(balance), AVG(balance) from customers.", hint: "SQL aggregate functions.", expected_output: "total_vault_holdings" },
          "COUNT(*) total rows count karta hai jabki COUNT(column) sirf non-null values ko count karta hai.",
          [
            { tag: "Aggregates", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "COUNT & SUM", desc: "High-speed column vector reduction algorithms." }
          ],
          `<div class="theory-card"><h3>Null Handling</h3><p>COALESCE(col, 0) prevents NULL from corrupting mathematical additions.</p></div>`
        ),
        makeLesson("test6-l-3-2", "test6-mod-3", 2, "Lesson 3.2: GROUP BY Grouping & HAVING Filter Pipeline", 2, 25, "sql",
`-- Grouping customers by loyalty tier with aggregate thresholds
SELECT 
    loyalty_tier,
    COUNT(*) AS member_count,
    SUM(balance) AS tier_capital
FROM customers
GROUP BY loyalty_tier
HAVING SUM(balance) > 50000.00 -- HAVING filters groups, WHERE filters raw rows
ORDER BY tier_capital DESC;`,
          { task: "Write GROUP BY tier with HAVING COUNT(*) > 5.", hint: "GROUP BY and HAVING.", expected_output: "tier_capital" },
          "WHERE raw rows ko filter karta hai aggregation hone se pehle; HAVING aggregate groups ko filter karta hai aggregation calculate hone ke baad.",
          [
            { tag: "Grouping", color: "rgba(16, 185, 129, 0.15); #10b981", title: "GROUP BY & HAVING", desc: "Post-aggregation grouping filter pipeline." }
          ],
          `<div class="theory-card"><h3>Execution Hierarchy</h3><p>WHERE -> GROUP BY -> AGGREGATE -> HAVING -> ORDER BY.</p></div>`
        )
      ]
    },

    // Mod 4: 5 lessons
    {
      id: "test6-mod-4",
      course_id: "course-test-6-sql",
      module_number: 4,
      title: "Module 4: Relational JOINs & Multi-Table Joins",
      description: "INNER JOIN, LEFT/RIGHT OUTER JOIN, FULL OUTER JOIN, CROSS JOIN, and self-referential organizational hierarchy JOINs.",
      order_index: 4,
      lessons: [
        makeLesson("test6-l-4-1", "test6-mod-4", 1, "Lesson 4.1: INNER JOIN Mechanics & Venn Relational Semantics", 1, 25, "sql",
`SELECT 
    o.order_id,
    o.amount,
    c.full_name,
    c.email
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
WHERE o.status = 'PAID';`,
          { task: "Perform INNER JOIN between orders and customers on customer_id.", hint: "INNER JOIN syntax.", expected_output: "full_name" },
          "INNER JOIN sirf wahi rows return karta hai jo dono tables ke join condition ko perfectly match karti hain.",
          [
            { tag: "INNER JOIN", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Exact Match Join", desc: "Intersection of two relation key spaces." }
          ],
          `<div class="theory-card"><h3>Hash Join Engine</h3><p>PostgreSQL builds an in-memory hash table of the smaller relation for O(1) matching.</p></div>`
        ),
        makeLesson("test6-l-4-2", "test6-mod-2", 2, "Lesson 4.2: LEFT JOIN & Isolating Unmatched Orphan Records", 2, 25, "sql",
`-- Find all customers, including those who have never placed an order!
SELECT 
    c.customer_id,
    c.full_name,
    o.order_id,
    COALESCE(o.amount, 0.00) AS order_total
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL; -- Isolates customers with ZERO orders`,
          { task: "Find customers with no orders using LEFT JOIN and WHERE order_id IS NULL.", hint: "LEFT JOIN unmatched records.", expected_output: "order_total" },
          "LEFT JOIN left table ki sabhi rows preserve karta hai aur right table ke unmatched records ko NULL se populate karta hai.",
          [
            { tag: "LEFT JOIN", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Outer Preservation", desc: "Preserves master records even with missing foreign relations." }
          ],
          `<div class="theory-card"><h3>Anti-Join Pattern</h3><p>LEFT JOIN ... WHERE right.id IS NULL is an idiomatic anti-join.</p></div>`
        ),
        makeLesson("test6-l-4-3", "test6-mod-3", 3, "Lesson 4.3: FULL OUTER JOIN & Bidirectional Relational Reconciliation", 3, 20, "sql",
`-- Reconciling ledger transactions between Bank vs Internal Accounting
SELECT 
    b.transaction_id AS bank_tx,
    i.transaction_id AS internal_tx,
    b.amount AS bank_amt,
    i.amount AS internal_amt
FROM bank_statements b
FULL OUTER JOIN internal_ledger i ON b.transaction_id = i.transaction_id
WHERE b.transaction_id IS NULL OR i.transaction_id IS NULL;`,
          { task: "Write FULL OUTER JOIN to reconcile transactions between two tables.", hint: "FULL OUTER JOIN syntax.", expected_output: "bank_amt" },
          "FULL OUTER JOIN dono tables ki all rows retain karta hai aur discrepancy audits ke liye use hota hai.",
          [
            { tag: "FULL OUTER JOIN", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Full Reconciliation", desc: "Union of matched and unmatched records across both datasets." }
          ],
          `<div class="theory-card"><h3>Financial Audits</h3><p>Standard query pattern for automated ledger reconciliation engines.</p></div>`
        ),
        makeLesson("test6-l-4-4", "test6-mod-4", 4, "Lesson 4.4: CROSS JOIN & Cartesian Product Matrix Generation", 4, 20, "sql",
`-- Generating all combinations of Product Sizes and Colors
SELECT 
    p.product_name,
    s.size_label,
    c.color_name
FROM products p
CROSS JOIN sizes s
CROSS JOIN colors c;`,
          { task: "Perform CROSS JOIN between products and variants.", hint: "CROSS JOIN cartesian syntax.", expected_output: "product_name" },
          "CROSS JOIN har left row ko har right row ke sath multiply karke complete cartesian matrix produce karta hai.",
          [
            { tag: "CROSS JOIN", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Cartesian Product", desc: "N x M matrix multiplication for SKU and calendar matrix generation." }
          ],
          `<div class="theory-card"><h3>Combinatorial Matrices</h3><p>Generates date-range dimension tables and complete SKU catalogs.</p></div>`
        ),
        makeLesson("test6-l-4-5", "test6-mod-5", 5, "Lesson 4.5: Self-Referential JOINs & Employee Manager Trees", 4, 25, "sql",
`-- Mapping employees to their respective managers within the same table
SELECT 
    emp.full_name AS employee_name,
    emp.title AS role,
    mgr.full_name AS direct_manager
FROM employees emp
LEFT JOIN employees mgr ON emp.manager_id = mgr.employee_id;`,
          { task: "Self-join employees table to display employee and manager names.", hint: "Self JOIN query.", expected_output: "direct_manager" },
          "Self JOIN ek hi table ko do alag roles (jaise employee vs manager) mein represent karke hierarchical data query karta hai.",
          [
            { tag: "Self JOIN", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Hierarchical Join", desc: "Joining a relation to itself for tree node traversal." }
          ],
          `<div class="theory-card"><h3>Graph Node Traversal</h3><p>Resolves parent-child pointers within flat table models.</p></div>`
        )
      ]
    },

    // Mod 5: 3 lessons
    {
      id: "test6-mod-5",
      course_id: "course-test-6-sql",
      module_number: 5,
      title: "Module 5: Subqueries & Common Table Expressions (CTEs)",
      description: "Scalar subqueries, correlated subqueries, WITH CTE statements, and recursive graph traversal CTEs.",
      order_index: 5,
      lessons: [
        makeLesson("test6-l-5-1", "test6-mod-5", 1, "Lesson 5.1: Scalar vs Correlated Subqueries & EXISTS vs IN Performance", 1, 25, "sql",
`-- Correlated Subquery with high-performance EXISTS check
SELECT c.customer_id, c.full_name
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.customer_id = c.customer_id AND o.amount > 5000.00
);`,
          { task: "Use WHERE EXISTS (SELECT 1 ...) for high-performance subquery check.", hint: "EXISTS subquery syntax.", expected_output: "Arjun Mehta" },
          "EXISTS match milte hi evaluation stop kar deta hai (early-exit short-circuiting), making it much faster than IN.",
          [
            { tag: "Correlated Subqueries", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "EXISTS Operator", desc: "Short-circuit boolean relational evaluation." }
          ],
          `<div class="theory-card"><h3>Subquery Optimization</h3><p>EXISTS avoids loading massive ID arrays into memory buffers.</p></div>`
        ),
        makeLesson("test6-l-5-2", "test6-mod-5", 2, "Lesson 5.2: WITH Common Table Expressions (CTEs) & Modular SQL", 2, 25, "sql",
`-- Clean modular multi-stage query using WITH CTE
WITH RegionalSales AS (
    SELECT region, SUM(amount) AS total_revenue
    FROM orders
    GROUP BY region
),
TopRegions AS (
    SELECT region FROM RegionalSales WHERE total_revenue > 100000.00
)
SELECT * FROM RegionalSales WHERE region IN (SELECT region FROM TopRegions);`,
          { task: "Write a WITH CTE query named RegionalSales and select from it.", hint: "WITH CTE syntax.", expected_output: "total_revenue" },
          "Common Table Expressions (WITH clause) nested spaghetti subqueries ko clean, readable aur reusable stages mein transform karte hain.",
          [
            { tag: "CTEs", color: "rgba(16, 185, 129, 0.15); #10b981", title: "WITH Clause", desc: "Declarative modular intermediate query stages." }
          ],
          `<div class="theory-card"><h3>Query Readability</h3><p>Self-documenting SQL pipeline architecture.</p></div>`
        ),
        makeLesson("test6-l-5-3", "test6-mod-5", 3, "Lesson 5.3: Recursive CTEs & Organizational Graph Trees", 3, 30, "sql",
`-- Recursively traverse entire corporate organizational hierarchy
WITH RECURSIVE OrgChart AS (
    -- Anchor member: CEO (top of tree)
    SELECT employee_id, full_name, manager_id, 1 AS level
    FROM employees WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive member: Subordinates
    SELECT e.employee_id, e.full_name, e.manager_id, o.level + 1
    FROM employees e
    INNER JOIN OrgChart o ON e.manager_id = o.employee_id
)
SELECT * FROM OrgChart ORDER BY level, full_name;`,
          { task: "Construct a WITH RECURSIVE query for tree traversal.", hint: "Recursive CTE syntax.", expected_output: "OrgChart" },
          "WITH RECURSIVE infinite depth category trees, folder structures, aur bill-of-materials graphs ko single query mein traverse karta hai.",
          [
            { tag: "Recursive CTE", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Graph Traversal", desc: "Arbitrary-depth recursive tree parsing in pure SQL." }
          ],
          `<div class="theory-card"><h3>Graph Processing</h3><p>Powers category taxonomies and social network connection depth calculations.</p></div>`
        )
      ]
    },

    // Mod 6: 4 lessons
    {
      id: "test6-mod-6",
      course_id: "course-test-6-sql",
      module_number: 6,
      title: "Module 6: Advanced Analytical SQL & Window Functions",
      description: "OVER (PARTITION BY ... ORDER BY), ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD(), and Running Totals with Frame specifications.",
      order_index: 6,
      lessons: [
        makeLesson("test6-l-6-1", "test6-mod-6", 1, "Lesson 6.1: The OVER() Clause & PARTITION BY vs GROUP BY", 1, 25, "sql",
`-- Computing individual transactions alongside total department revenue
SELECT 
    department,
    employee_name,
    salary,
    AVG(salary) OVER(PARTITION BY department) AS dept_avg_salary,
    SUM(salary) OVER(PARTITION BY department) AS dept_total_payroll
FROM employees;`,
          { task: "Calculate AVG(salary) OVER(PARTITION BY department) from employees.", hint: "Window function OVER PARTITION BY.", expected_output: "dept_avg_salary" },
          "Window functions row grouping collapse kiye bina har individual row ke sath aggregate metrics calculate karti hain.",
          [
            { tag: "Window Functions", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "OVER() Clause", desc: "Analytical aggregations preserving individual row identity." }
          ],
          `<div class="theory-card"><h3>No Row Collapse</h3><p>Retains all original records while appending contextual partition calculations.</p></div>`
        ),
        makeLesson("test6-l-6-2", "test6-mod-6", 2, "Lesson 6.2: Ranking Functions (ROW_NUMBER, RANK & DENSE_RANK)", 2, 25, "sql",
`-- Top 3 highest earning employees per department
WITH RankedSalaries AS (
    SELECT 
        department,
        employee_name,
        salary,
        DENSE_RANK() OVER(PARTITION BY department ORDER BY salary DESC) as salary_rank
    FROM employees
)
SELECT * FROM RankedSalaries WHERE salary_rank <= 3;`,
          { task: "Use DENSE_RANK() OVER(PARTITION BY dept ORDER BY score DESC) to rank records.", hint: "DENSE_RANK window function.", expected_output: "salary_rank" },
          "ROW_NUMBER sequential unique numbers deta hai; RANK ties par gaps chhodta hai (1, 2, 2, 4); DENSE_RANK bina gap ke rank karta hai (1, 2, 2, 3).",
          [
            { tag: "Ranking", color: "rgba(16, 185, 129, 0.15); #10b981", title: "DENSE_RANK", desc: "Gapless partition ranking for leaderboards." }
          ],
          `<div class="theory-card"><h3>Leaderboard Queries</h3><p>The standard pattern for 'Top N per category' analytical reports.</p></div>`
        ),
        makeLesson("test6-l-6-3", "test6-mod-6", 3, "Lesson 6.3: Period-Over-Period Analysis with LAG() & LEAD()", 3, 25, "sql",
`-- Month-over-Month Revenue Growth Percentage
SELECT 
    sales_month,
    revenue,
    LAG(revenue, 1) OVER(ORDER BY sales_month) AS prev_month_revenue,
    ROUND(((revenue - LAG(revenue, 1) OVER(ORDER BY sales_month)) / LAG(revenue, 1) OVER(ORDER BY sales_month)) * 100.0, 2) AS mom_growth_pct
FROM monthly_sales;`,
          { task: "Calculate LAG(revenue, 1) OVER(ORDER BY month) for period comparison.", hint: "LAG window function.", expected_output: "mom_growth_pct" },
          "LAG aur LEAD bina self-join kiye previous ya next rows ki values ko current row par access karne dete hain.",
          [
            { tag: "Time-Series", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "LAG & LEAD", desc: "Offset row lookahead and lookbehind for growth velocity." }
          ],
          `<div class="theory-card"><h3>Growth Analytics</h3><p>Eliminates expensive self-joins on date offsets.</p></div>`
        ),
        makeLesson("test6-l-6-4", "test6-mod-6", 4, "Lesson 6.4: Running Totals & Moving Averages with FRAME Windows", 4, 25, "sql",
`-- 7-Day Moving Average & Cumulative Running Total
SELECT 
    transaction_date,
    daily_sales,
    SUM(daily_sales) OVER(
        ORDER BY transaction_date 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_revenue,
    AVG(daily_sales) OVER(
        ORDER BY transaction_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7d
FROM daily_revenue;`,
          { task: "Compute cumulative sum using ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.", hint: "Running total window frame.", expected_output: "cumulative_revenue" },
          "Frame specifications (ROWS BETWEEN ...) rolling financial metrics aur dynamic moving averages calculate karti hain.",
          [
            { tag: "Frame Windows", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Moving Frames", desc: "Dynamic sliding window calculations for algorithmic analysis." }
          ],
          `<div class="theory-card"><h3>Sliding Frames</h3><p>Calculates rolling 7-day, 30-day, and 90-day moving averages.</p></div>`
        )
      ]
    },

    // Mod 7: 3 lessons
    {
      id: "test6-mod-7",
      course_id: "course-test-6-sql",
      module_number: 7,
      title: "Module 7: Database Normalization & Schema Design",
      description: "1NF, 2NF, 3NF Normal Forms, Many-to-Many junction tables, and foreign keys with ON DELETE CASCADE.",
      order_index: 7,
      lessons: [
        makeLesson("test6-l-7-1", "test6-mod-7", 1, "Lesson 7.1: Relational Normalization (1NF, 2NF & 3NF) Rules", 1, 25, "sql",
`-- 3NF Compliant Schema Architecture
CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_title VARCHAR(100) NOT NULL,
    base_salary NUMERIC(10, 2) NOT NULL
);`,
          { task: "Design 3NF normalized tables eliminating transitive functional dependencies.", hint: "3NF schema design.", expected_output: "departments" },
          "Normalization (1NF: Atomic values, 2NF: No partial dependency, 3NF: No transitive dependency) data redundancy aur update anomalies ko eliminate karta hai.",
          [
            { tag: "3NF Design", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Normalization", desc: "Eliminating update anomalies and duplicate storage." }
          ],
          `<div class="theory-card"><h3>Anomalies Eliminated</h3><p>Guarantees zero insertion, deletion, or update inconsistency.</p></div>`
        ),
        makeLesson("test6-l-7-2", "test6-mod-7", 2, "Lesson 7.2: Many-to-Many Relationships & Junction Tables", 2, 25, "sql",
`-- Junction / Bridge table for Students <-> Courses M:N relationship
CREATE TABLE student_courses (
    student_id UUID REFERENCES customers(customer_id) ON DELETE CASCADE,
    course_id VARCHAR(50) NOT NULL,
    enrolled_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    grade VARCHAR(2),
    PRIMARY KEY (student_id, course_id) -- Composite Primary Key!
);`,
          { task: "Create junction table with composite PRIMARY KEY (student_id, course_id).", hint: "Junction table DDL.", expected_output: "student_courses" },
          "Composite Primary Keys junction tables mein duplicate associations ko storage layer par automatically block karte hain.",
          [
            { tag: "Junction Table", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Bridge Relation", desc: "Models N:M relationships with composite key enforcement." }
          ],
          `<div class="theory-card"><h3>Composite Key Integrity</h3><p>Ensures a user cannot accidentally enroll twice in the exact same course.</p></div>`
        ),
        makeLesson("test6-l-7-3", "test6-mod-7", 3, "Lesson 7.3: Foreign Key Cascading Actions (ON DELETE CASCADE / SET NULL)", 3, 20, "sql",
`CREATE TABLE order_items (
    item_id SERIAL PRIMARY KEY,
    order_id UUID REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INT NOT NULL,
    quantity INT CHECK (quantity > 0)
);`,
          { task: "Define foreign key constraint with ON DELETE CASCADE.", hint: "ON DELETE CASCADE rule.", expected_output: "order_items" },
          "ON DELETE CASCADE parent record delete hone par associated child items ko automatically delete karta hai, preventing orphaned records.",
          [
            { tag: "Cascading", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "CASCADE Deletes", desc: "Automated child record lifecycle cleanup." }
          ],
          `<div class="theory-card"><h3>Referential Integrity</h3><p>Prevents broken foreign key pointers in high-velocity microservices.</p></div>`
        )
      ]
    },

    // Mod 8: 5 lessons
    {
      id: "test6-mod-8",
      course_id: "course-test-6-sql",
      module_number: 8,
      title: "Module 8: Transactions, ACID & Concurrency Control",
      description: "ACID guarantees, BEGIN/COMMIT/ROLLBACK savepoints, isolation levels, concurrency anomalies, and SELECT FOR UPDATE locking.",
      order_index: 8,
      lessons: [
        makeLesson("test6-l-8-1", "test6-mod-8", 1, "Lesson 8.1: ACID Principles & Atomic Money Transfer Transaction", 1, 25, "sql",
`-- Atomic Bank Transfer Transaction
BEGIN;

-- Step 1: Deduct from sender
UPDATE accounts SET balance = balance - 500.00 WHERE account_id = 'ACC_A';

-- Step 2: Credit to receiver
UPDATE accounts SET balance = balance + 500.00 WHERE account_id = 'ACC_B';

COMMIT; -- All or nothing! Zero partial states.`,
          { task: "Execute BEGIN; UPDATE ...; COMMIT; atomic transaction block.", hint: "SQL transaction block.", expected_output: "COMMIT" },
          "ACID (Atomicity, Consistency, Isolation, Durability) guarantees provide karta hai ki multi-step financial updates ya to poore complete honge ya poore rollback honge.",
          [
            { tag: "ACID", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Atomicity", desc: "All-or-nothing execution guarantees." }
          ],
          `<div class="theory-card"><h3>Write-Ahead Logging (WAL)</h3><p>Ensures durability even if the power cable is pulled mid-transaction.</p></div>`
        ),
        makeLesson("test6-l-8-2", "test6-mod-8", 2, "Lesson 8.2: SAVEPOINTs & Partial Transaction Rollback", 2, 20, "sql",
`BEGIN;
INSERT INTO audit_logs (event) VALUES ('Batch process initiated');

SAVEPOINT stage_one;

-- Risky third-party payment insert
INSERT INTO payment_sync VALUES ('INV-99', 'FAILED');

-- Rollback ONLY the failed stage!
ROLLBACK TO SAVEPOINT stage_one;

COMMIT;`,
          { task: "Create and rollback to a SAVEPOINT stage_one inside a transaction.", hint: "SAVEPOINT syntax.", expected_output: "SAVEPOINT" },
          "SAVEPOINTs nested checkpoints provide karte hain jisse poore transaction ko cancel kiye bina specific sub-operations ko rollback kiya ja sakta hai.",
          [
            { tag: "Savepoints", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Nested Checkpoints", desc: "Granular rollback control in complex pipelines." }
          ],
          `<div class="theory-card"><h3>Error Recovery</h3><p>Permits graceful recovery from expected partial step errors.</p></div>`
        ),
        makeLesson("test6-l-8-3", "test6-mod-8", 3, "Lesson 8.3: Transaction Isolation Levels (Read Committed to Serializable)", 3, 25, "sql",
`-- Set Strict Serializable Isolation for Critical Financial Calculations
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

BEGIN;
SELECT SUM(balance) FROM bank_vaults;
-- Guarantees zero phantom reads or concurrent snapshot skews
COMMIT;`,
          { task: "Set isolation level: SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;.", hint: "Isolation level command.", expected_output: "SERIALIZABLE" },
          "Isolation levels (Read Committed, Repeatable Read, Serializable) speed aur data consistency safety ke trade-off ko configure karte hain.",
          [
            { tag: "Isolation Levels", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "MVCC Isolation", desc: "Balances concurrent throughput against strict consistency." }
          ],
          `<div class="theory-card"><h3>Serializable Guarantees</h3><p>Simulates pure sequential execution without race conditions.</p></div>`
        ),
        makeLesson("test6-l-8-4", "test6-mod-8", 4, "Lesson 8.4: Concurrency Anomalies (Dirty Reads, Phantom Reads, Skews)", 4, 25, "sql",
`-- Understanding Write Skew & Phantom Reads
-- Phantom Read: Transaction re-runs range query and discovers newly inserted rows!
SELECT * FROM inventory WHERE stock_count < 10;`,
          { task: "Query inventory under Repeatable Read to prevent phantom reads.", hint: "Concurrency isolation check.", expected_output: "stock_count" },
          "MVCC (Multi-Version Concurrency Control) readers aur writers ko ek doosre ko lock kiye bina concurrently read/write karne deta hai.",
          [
            { tag: "MVCC Engine", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "MVCC Snapshots", desc: "Readers never block writers; writers never block readers." }
          ],
          `<div class="theory-card"><h3>Concurrency Anomaly Shield</h3><p>Prevents dirty reads and serialization anomalies.</p></div>`
        ),
        makeLesson("test6-l-8-5", "test6-mod-8", 5, "Lesson 8.5: Pessimistic Row Locking with SELECT FOR UPDATE", 4, 25, "sql",
`-- Preventing Flash-Sale Overselling via Pessimistic Row Lock
BEGIN;

SELECT item_id, stock_quantity 
FROM inventory 
WHERE item_id = 101 
FOR UPDATE; -- Locks this specific row exclusively until transaction COMMIT!

UPDATE inventory 
SET stock_quantity = stock_quantity - 1 
WHERE item_id = 101;

COMMIT;`,
          { task: "Lock row with SELECT ... FOR UPDATE inside a transaction block.", hint: "FOR UPDATE locking.", expected_output: "FOR UPDATE" },
          "SELECT FOR UPDATE high-concurrency ticket booking aur inventory checkout mein race conditions aur negative balance overselling ko 100% prevent karta hai.",
          [
            { tag: "Row Locks", color: "rgba(239, 68, 68, 0.15); #ef4444", title: "Pessimistic Lock", desc: "Hardware row-level mutex preventing inventory double-booking." }
          ],
          `<div class="theory-card"><h3>E-Commerce Checkout Lock</h3><p>The standard pattern for high-traffic flash-sale order placement.</p></div>`
        )
      ]
    },

    // Mod 9: 3 lessons
    {
      id: "test6-mod-9",
      course_id: "course-test-6-sql",
      module_number: 9,
      title: "Module 9: Performance Tuning, Indexing & EXPLAIN ANALYZE",
      description: "B-Tree vs Hash vs GIN indexes, EXPLAIN (ANALYZE, BUFFERS) execution plans, partial indexes, and covering indexes.",
      order_index: 9,
      lessons: [
        makeLesson("test6-l-9-1", "test6-mod-9", 1, "Lesson 9.1: B-Tree vs Hash vs GIN Indexes & Index Architecture", 1, 25, "sql",
`-- 1. Standard High-Performance B-Tree Index for range and equality searches
CREATE INDEX idx_customers_email ON customers(email);

-- 2. Composite Index with Leftmost Prefix matching
CREATE INDEX idx_orders_customer_status ON orders(customer_id, status);

-- 3. Partial Index (Zero wasted disk space for active rows!)
CREATE INDEX idx_active_subscriptions ON subscriptions(user_id) WHERE status = 'ACTIVE';`,
          { task: "Create a partial index on subscriptions WHERE status = 'ACTIVE'.", hint: "CREATE INDEX partial syntax.", expected_output: "CREATE INDEX" },
          "B-Tree indexes table scans ko O(N) se O(log N) binary search tree seeks mein convert karte hain.",
          [
            { tag: "Indexing", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "B-Tree Indexes", desc: "O(log N) tree seek algorithm for instantaneous lookups." }
          ],
          `<div class="theory-card"><h3>Partial Index Advantage</h3><p>Indexes only relevant active rows, reducing index disk footprint by 90%.</p></div>`
        ),
        makeLesson("test6-l-9-2", "test6-mod-9", 2, "Lesson 9.2: Reading Execution Plans with EXPLAIN (ANALYZE, BUFFERS)", 2, 30, "sql",
`-- Inspecting exact physical database execution plan
EXPLAIN (ANALYZE, BUFFERS)
SELECT c.full_name, o.amount
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE c.email = 'arjun@antigravity.io';`,
          { task: "Run EXPLAIN (ANALYZE, BUFFERS) on a query to view execution timings.", hint: "EXPLAIN ANALYZE syntax.", expected_output: "EXPLAIN" },
          "EXPLAIN ANALYZE query ko actual database engine par execute karke physical timings, memory buffers, aur Index Scan vs Seq Scan report karta hai.",
          [
            { tag: "Execution Plans", color: "rgba(16, 185, 129, 0.15); #10b981", title: "EXPLAIN ANALYZE", desc: "Reveals exact cost, execution time, and heap buffer hits." }
          ],
          `<div class="theory-card"><h3>Plan Diagnostics</h3><p>Detects missing indexes, slow sequential scans, and expensive nested loops.</p></div>`
        ),
        makeLesson("test6-l-9-3", "test6-mod-9", 3, "Lesson 9.3: Covering Indexes & Index-Only Scans", 3, 25, "sql",
`-- Covering Index with INCLUDE clause for 100% Index-Only Scans (Zero Heap Access!)
CREATE INDEX idx_orders_covering ON orders(customer_id) INCLUDE (amount, status);

-- This query resolves entirely within RAM index pages without touching table heap!
SELECT customer_id, amount, status FROM orders WHERE customer_id = '550e8400-e29b-41d4-a716-446655440000';`,
          { task: "Create covering index using CREATE INDEX ... INCLUDE (columns).", hint: "Covering index syntax.", expected_output: "CREATE INDEX" },
          "Covering Index (INCLUDE clause) query ko table data heap visit kiye bina purely index RAM pages se resolve karne deta hai (Index-Only Scan).",
          [
            { tag: "Covering Index", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Index-Only Scan", desc: "Bypasses heap disk table lookups completely for maximum throughput." }
          ],
          `<div class="theory-card"><h3>Zero Heap Access</h3><p>Achieves 10x-50x speedups in read-heavy SaaS telemetry pipelines.</p></div>`
        )
      ]
    },

    // Mod 10: 2 lessons
    {
      id: "test6-mod-10",
      course_id: "course-test-6-sql",
      module_number: 10,
      title: "Module 10: Stored Procedures, Triggers & Views",
      description: "Standard Views, Materialized Views (with REFRESH), PL/pgSQL Stored Functions, and automated audit Triggers.",
      order_index: 10,
      lessons: [
        makeLesson("test6-l-10-1", "test6-mod-10", 1, "Lesson 10.1: Standard Views vs Fast Materialized Views (REFRESH)", 1, 25, "sql",
`-- 1. Standard View (Logical stored query)
CREATE OR REPLACE VIEW active_vip_customers AS
SELECT customer_id, full_name, email, balance
FROM customers
WHERE balance > 50000.00;

-- 2. Materialized View (Physically persisted cache on disk)
CREATE MATERIALIZED VIEW mv_daily_sales_summary AS
SELECT DATE(created_at) as sale_date, SUM(amount) as revenue
FROM orders
GROUP BY DATE(created_at);

-- Refresh cached materialized view
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_daily_sales_summary;`,
          { task: "Create a MATERIALIZED VIEW and refresh it.", hint: "MATERIALIZED VIEW syntax.", expected_output: "CREATE MATERIALIZED VIEW" },
          "Materialized Views heavy analytical aggregations ko disk par pre-compute karke instant sub-millisecond BI dashboard reporting provide karti hain.",
          [
            { tag: "Materialized Views", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Disk-Cached Queries", desc: "Pre-calculated aggregation cache with concurrent background refresh." }
          ],
          `<div class="theory-card"><h3>BI Analytics Acceleration</h3><p>Converts a 30-second multi-table aggregation query into a 1ms disk seek.</p></div>`
        ),
        makeLesson("test6-l-10-2", "test6-mod-10", 2, "Lesson 10.2: Triggers & Automated Audit Trail Logging", 2, 25, "sql",
`-- Automated Trigger Function for Audit Trails
CREATE OR REPLACE FUNCTION log_balance_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.balance <> NEW.balance THEN
        INSERT INTO balance_audit_log (customer_id, old_balance, new_balance, changed_at)
        VALUES (NEW.customer_id, OLD.balance, NEW.balance, CURRENT_TIMESTAMP);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_balance_audit
AFTER UPDATE ON customers
FOR EACH ROW EXECUTE FUNCTION log_balance_changes();`,
          { task: "Create trigger AFTER UPDATE ON customers to log balance mutations.", hint: "SQL Trigger syntax.", expected_output: "CREATE TRIGGER" },
          "Triggers application code se bypass kiye gaye direct database updates ko bhi capture karke 100% compliance audit trail guarantee karte hain.",
          [
            { tag: "Audit Triggers", color: "rgba(16, 185, 129, 0.15); #10b981", title: "PL/pgSQL Triggers", desc: "Database-enforced immutable financial audit logging." }
          ],
          `<div class="theory-card"><h3>Compliance Engine</h3><p>SOC2 and ISO27001 tamper-proof audit enforcement.</p></div>`
        )
      ]
    },

    // Mod 11: 4 lessons
    {
      id: "test6-mod-11",
      course_id: "course-test-6-sql",
      module_number: 11,
      title: "Module 11: Capstone Project — High-Scale E-Commerce Database Architecture",
      description: "Production e-commerce schema, analytical reporting pipeline, ACID order placement transaction, and final performance review.",
      order_index: 11,
      lessons: [
        makeLesson("test6-l-11-1", "test6-mod-11", 1, "Lesson 11.1: Complete Enterprise E-Commerce Schema DDL", 1, 25, "sql",
`-- Production Enterprise E-Commerce DDL Architecture
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE inventory_items (
    item_id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(category_id),
    sku VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock_qty INT NOT NULL DEFAULT 0 CHECK (stock_qty >= 0)
);`,
          { task: "Create categories and inventory_items with relational constraints.", hint: "E-Commerce schema DDL.", expected_output: "inventory_items" },
          "Enterprise schemas modular foreign keys aur strict mathematical constraints ke sath zero-downtime microservices support karte hain.",
          [
            { tag: "Enterprise DDL", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "E-Commerce Schema", desc: "Production relational data model with constraint guards." }
          ],
          `<div class="theory-card"><h3>Enterprise Blueprint</h3><p>Scalable foundation for millions of SKUs and orders.</p></div>`
        ),
        makeLesson("test6-l-11-2", "test6-mod-11", 2, "Lesson 11.2: E-Commerce Analytical Pipeline with CTEs & Window Functions", 2, 25, "sql",
`-- Executive Sales Velocity & Customer Cohort Analysis
WITH CustomerSpend AS (
    SELECT 
        customer_id,
        COUNT(order_id) AS total_orders,
        SUM(amount) AS lifetime_value
    FROM orders
    GROUP BY customer_id
)
SELECT 
    customer_id,
    lifetime_value,
    DENSE_RANK() OVER(ORDER BY lifetime_value DESC) as vip_rank
FROM CustomerSpend
WHERE total_orders >= 3;`,
          { task: "Run analytical CTE computing customer lifetime value and rank.", hint: "Analytical pipeline query.", expected_output: "vip_rank" },
          "CTEs aur Window Functions combine karke complex business metrics ko high-performance single query execution mein resolve karte hain.",
          [
            { tag: "Analytics", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Cohort Analysis", desc: "Multi-stage analytical business intelligence pipeline." }
          ],
          `<div class="theory-card"><h3>Executive Intelligence</h3><p>Calculates customer lifetime value and cohort retention.</p></div>`
        ),
        makeLesson("test6-l-11-3", "test6-mod-11", 3, "Lesson 11.3: ACID Order Checkout & Concurrency Locking Procedure", 3, 30, "sql",
`-- ACID E-Commerce Checkout Engine
BEGIN;

-- 1. Pessimistic lock item to verify stock
SELECT stock_qty FROM inventory_items WHERE item_id = 42 FOR UPDATE;

-- 2. Deduct inventory
UPDATE inventory_items SET stock_qty = stock_qty - 1 WHERE item_id = 42;

-- 3. Create Order Record
INSERT INTO orders (customer_id, amount, status) 
VALUES ('550e8400-e29b-41d4-a716-446655440000', 99.99, 'PAID');

COMMIT;`,
          { task: "Execute complete ACID checkout with row locking.", hint: "Order checkout transaction.", expected_output: "COMMIT" },
          "ACID checkout pipeline flash sale ke dauran negative inventory overselling ko 100% block karti hai.",
          [
            { tag: "ACID Engine", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Checkout Transaction", desc: "Zero-defect concurrent e-commerce ordering engine." }
          ],
          `<div class="theory-card"><h3>Inventory Lock</h3><p>Enterprise grade concurrent order execution.</p></div>`
        ),
        makeLesson("test6-l-11-4", "test6-mod-11", 4, "Lesson 11.4: Final Capstone Performance Review & EXPLAIN Tuning", 4, 30, "sql",
`-- Final Capstone Database Architecture Verification
SELECT 'Enterprise SQL & Database Architecture 100% Operational!' AS status;`,
          { task: "Run database verification query.", hint: "Status verification query.", expected_output: "Enterprise SQL & Database Architecture 100% Operational!" },
          "Mubarak ho! Aapne Relational Modeling, DDL/DML, JOINs, CTEs, Window Functions, ACID Transactions, B-Tree Index Tuning aur Enterprise Database Architecture master kar liya hai!",
          [
            { tag: "Database Architect", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Enterprise SQL Master", desc: "Production database engineering and query optimization mastery unlocked." }
          ],
          `<div class="theory-card"><h3>Mastery Achievement</h3><p>Elite database architecture skills unlocked!</p></div>`
        )
      ]
    }
  ]
};

fs.writeFileSync('Courses/test-6.json', JSON.stringify(sqlCourse, null, 2));
console.log("✅ Course 6 (SQL) fully built with pure, unique SQL content!");
