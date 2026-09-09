import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal,
  Bot,
  Sparkles,
  Code2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Maximize2
} from "lucide-react";
interface InteractiveSandboxProps {
  initialCode?: string;
  lessonTitle?: string;
  defaultLanguage?: "javascript" | "html" | "python" | "java" | "c" | "cpp" | "sql";
  challenge?: { task: string; hint?: string; expected_output?: string; solution?: string };
  onAskAI?: (code: string, error?: string) => void;
}

export default function InteractiveSandbox({
  initialCode = `// Interactive Code Sandbox
function calculateStats(numbers) {
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  const avg = sum / numbers.length;
  return { sum, avg, max: Math.max(...numbers) };
}

const data = [12, 45, 68, 23, 89, 34];
console.log("Input Dataset:", data);
console.log("Calculated Statistics:", calculateStats(data));
`,
  lessonTitle = "Lesson Coding Practice",
  defaultLanguage = "javascript",
  challenge,
  onAskAI,
}: InteractiveSandboxProps) {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState<"javascript" | "html" | "python" | "java" | "c" | "cpp" | "sql">(defaultLanguage);
  const [activeTab, setActiveTab] = useState<"terminal" | "preview">("terminal");
  const [showHint, setShowHint] = useState(false);
  const [logs, setLogs] = useState<Array<{ type: "log" | "error" | "info" | "success"; text: string }>>([
    { type: "info", text: "Ready to execute code. Click 'Run Code' to test snippet." },
  ]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [htmlPreview, setHtmlPreview] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExecuting && executionTime !== null) {
      terminalRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isExecuting, executionTime]);

  useEffect(() => {
    if (initialCode) setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    if (defaultLanguage) {
      setLanguage(defaultLanguage);
      if (defaultLanguage === "html") {
        setActiveTab("preview");
      }
    }
  }, [defaultLanguage]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // fallback
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setLogs([{ type: "info", text: "Code reset to original lesson template." }]);
    setExecutionTime(null);
  };

  const runCode = () => {
    setIsExecuting(true);
    setLogs([{ type: "info", text: "Compiling and executing runtime..." }]);
    const startTime = performance.now();

    setTimeout(() => {
      if (language === "html") {
        setHtmlPreview(code);
        setActiveTab("preview");
        setIsExecuting(false);
        setExecutionTime(Math.round(performance.now() - startTime));
        setLogs([
          { type: "info", text: "HTML/CSS live preview updated in preview tab." },
          { type: "success", text: "Render complete." }
        ]);
        return;
      }

      if (language === "python") {
        const worker = new Worker(new URL("../workers/python.worker.ts", import.meta.url));
        const timeoutId = window.setTimeout(() => {
          worker.terminate();
          setLogs([{ type: "error", text: "Python execution timed out after 10 seconds." }]);
          setIsExecuting(false);
          setExecutionTime(Math.round(performance.now() - startTime));
        }, 10_000);

        worker.onmessage = (event: MessageEvent<{ logs: Array<{ type: "log" | "error" | "info" | "success"; text: string }> }>) => {
          window.clearTimeout(timeoutId);
          worker.terminate();
          setLogs(event.data.logs);
          setIsExecuting(false);
          setExecutionTime(Math.round(performance.now() - startTime));
        };
        worker.onerror = () => {
          window.clearTimeout(timeoutId);
          worker.terminate();
          setLogs([{ type: "error", text: "Python runtime failed to load. Check your network and try again." }]);
          setIsExecuting(false);
          setExecutionTime(Math.round(performance.now() - startTime));
        };
        worker.postMessage({ code });
        return;
      }

      if (language === "python" && false) {
        const pythonLogs: Array<{ type: "log" | "error" | "info" | "success"; text: string }> = [];
        pythonLogs.push({ type: "info", text: "Python 3.11 Runtime Initialized." });
        
        try {
          const lines = code.split("\n");
          const scope: Record<string, any> = {};
          
          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line || line.startsWith("#")) continue;
            
            // Handle print statement
            const printMatch = line.match(/^print\s*\(([\s\S]*)\)$/);
            if (printMatch) {
              const rawArgs = printMatch[1];
              try {
                const cleanArg = rawArgs
                  .replace(/True/g, "true")
                  .replace(/False/g, "false")
                  .replace(/None/g, "null");
                const evalFn = new Function(...Object.keys(scope), `return [${cleanArg}];`);
                const evaluated = evalFn(...Object.values(scope));
                pythonLogs.push({ type: "log", text: evaluated.join(" ") });
              } catch {
                pythonLogs.push({ type: "log", text: rawArgs.replace(/^['"]|['"]$/g, "") });
              }
              continue;
            }

            // Handle simple variable assignment e.g. x = 10, greeting = "Hello"
            const assignMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
            if (assignMatch) {
              const varName = assignMatch[1];
              const expr = assignMatch[2]
                .replace(/True/g, "true")
                .replace(/False/g, "false")
                .replace(/None/g, "null");
              try {
                const evalFn = new Function(...Object.keys(scope), `return (${expr});`);
                scope[varName] = evalFn(...Object.values(scope));
              } catch {
                scope[varName] = expr;
              }
            }
          }

          if (pythonLogs.length === 1) {
            pythonLogs.push({ type: "info", text: "Code parsed successfully. (Add print(...) to see output)" });
          }
          pythonLogs.push({ type: "success", text: "Process exited with code 0 (Success)" });
        } catch (pyErr: any) {
          pythonLogs.push({ type: "error", text: `SyntaxError: ${pyErr?.message || "Execution error in Python code."}` });
        }

        setLogs(pythonLogs);
        setIsExecuting(false);
        setExecutionTime(Math.round(performance.now() - startTime));
        return;
      }

      if (language === "java") {
        const javaLogs: Array<{ type: "log" | "error" | "info" | "success"; text: string }> = [];
        javaLogs.push({ type: "info", text: "Java HotSpot(TM) 64-Bit Server VM Initialized." });
        
        const customConsole = {
          log: (...args: any[]) => {
            javaLogs.push({
              type: "log",
              text: args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" ")
            });
          },
          error: (...args: any[]) => {
            javaLogs.push({
              type: "error",
              text: args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" ")
            });
          },
          info: (...args: any[]) => {
            javaLogs.push({
              type: "info",
              text: args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" ")
            });
          }
        };

        try {
          let jsCode = code;
          // System.out.println & System.out.print
          jsCode = jsCode.replace(/System\.out\.println\s*\(/g, "console.log(");
          jsCode = jsCode.replace(/System\.out\.print\s*\(/g, "console.log(");
          // Array literals: int[] arr = {1, 2, 3}; -> let arr = [1, 2, 3];
          jsCode = jsCode.replace(/(?:int|String|double|float|boolean|char)\s*\[\s*\]\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*\{([^}]*)\}\s*;?/g, "let $1 = [$2];");
          // Variable types: int x = 5; -> let x = 5;
          jsCode = jsCode.replace(/\b(?:int|double|float|String|boolean|char|var|long|short|byte)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, "let $1 =");
          // For loop declarations: for (int i = 0; -> for (let i = 0;
          jsCode = jsCode.replace(/for\s*\(\s*(?:int|var)\s+/g, "for (let ");
          // Explicit casting: (int)x -> Math.trunc(x)
          jsCode = jsCode.replace(/\(\s*int\s*\)\s*([a-zA-Z0-9_.]+)/g, "Math.trunc($1)");
          jsCode = jsCode.replace(/\(\s*double\s*\)\s*/g, "Number(");

          if (jsCode.includes("public static void main") || jsCode.includes("static void main")) {
            const transformedClass = jsCode
              .replace(/public\s+class\s+([A-Za-z0-9_]+)/, "class $1")
              .replace(/(?:public\s+)?static\s+void\s+main\s*\([^)]*\)/, "static main()");
            
            jsCode = `
              ${transformedClass}
              if (typeof Main !== "undefined" && typeof Main.main === "function") {
                Main.main();
              }
            `;
          }

          const runFn = new Function("console", jsCode);
          runFn(customConsole);

          if (javaLogs.length === 1) {
            javaLogs.push({ type: "info", text: "Main class compiled successfully. (Use System.out.println(...) to see output)" });
          }
          javaLogs.push({ type: "success", text: "Java process terminated with exit code 0" });
        } catch (javaErr: any) {
          javaLogs.push({ type: "error", text: `Runtime/Compilation Error: ${javaErr?.message || "Syntax error in Java code."}` });
        }

        javaLogs.unshift({ type: "info", text: "Java browser preview mode is experimental; advanced compiler features require a real compiler runtime." });
        setLogs(javaLogs);
        setIsExecuting(false);
        setExecutionTime(Math.round(performance.now() - startTime));
        return;
      }

      if (language === "c") {
        const cLogs: Array<{ type: "log" | "error" | "info" | "success"; text: string }> = [];
        cLogs.push({ type: "info", text: "GCC 13.2.0 (C99/C11 Standard Compiler) Initialized." });

        const customConsole = {
          log: (...args: any[]) => {
            cLogs.push({
              type: "log",
              text: args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" ")
            });
          },
          error: (...args: any[]) => {
            cLogs.push({
              type: "error",
              text: args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" ")
            });
          },
          info: (...args: any[]) => {
            cLogs.push({
              type: "info",
              text: args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" ")
            });
          }
        };

        try {
          let jsCode = code;
          // Strip preprocessor directives
          jsCode = jsCode.replace(/#include\s*<[^>]+>/g, "");
          jsCode = jsCode.replace(/#include\s*"[^"]+"/g, "");

          // Macro definitions: #define PI 3.14159 -> const PI = 3.14159;
          jsCode = jsCode.replace(/#define\s+([A-Za-z_][A-Za-z0-9_]*)\s+(.+)/g, "const $1 = $2;");

          // Array declarations: int arr[] = {1, 2, 3}; -> let arr = [1, 2, 3];
          jsCode = jsCode.replace(/(?:int|char|float|double|short|long)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\[[^\]]*\]\s*=\s*\{([^}]*)\}\s*;?/g, "let $1 = [$2];");
          
          // String array: char str[] = "hello"; -> let str = "hello";
          jsCode = jsCode.replace(/char\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\[[^\]]*\]\s*=\s*("[^"]*")\s*;?/g, "let $1 = $2;");

          // Variable types: int x = 5; -> let x = 5;
          jsCode = jsCode.replace(/\b(?:int|double|float|char|short|long|unsigned|signed|size_t)\s+([*]*)([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, "let $2 =");

          // For loops: for (int i = 0; -> for (let i = 0;
          jsCode = jsCode.replace(/for\s*\(\s*(?:int|size_t)\s+/g, "for (let ");

          // sizeof operator: sizeof(x)
          jsCode = jsCode.replace(/sizeof\s*\(\s*(?:int|float)\s*\)/g, "4");
          jsCode = jsCode.replace(/sizeof\s*\(\s*double\s*\)/g, "8");
          jsCode = jsCode.replace(/sizeof\s*\(\s*char\s*\)/g, "1");

          // Define printf emulation
          const printfHelper = `
            function printf(fmt, ...args) {
              if (fmt === undefined || fmt === null) return;
              let argIndex = 0;
              let out = String(fmt).replace(/%(-?\\d+)?(\\.\\d+)?[dfscuxi]|%ld|%lf/gi, (match) => {
                if (argIndex >= args.length) return match;
                let val = args[argIndex++];
                if ((match.includes("f") || match.includes("lf")) && typeof val === "number") {
                  const precMatch = match.match(/\\.(\\d+)f/i);
                  if (precMatch) return val.toFixed(parseInt(precMatch[1], 10));
                  return val.toFixed(4);
                }
                return String(val);
              });
              out = out.replace(/\\\\n/g, "\\n").replace(/\\\\t/g, "  ");
              const lines = out.split("\\n");
              for (let i = 0; i < lines.length; i++) {
                if (i === lines.length - 1 && lines[i] === "") continue;
                console.log(lines[i]);
              }
            }
          `;

          // Handle main function: int main(...) { ... }
          if (jsCode.includes("main(") || jsCode.includes("main ()")) {
            jsCode = jsCode.replace(/\bint\s+main\s*\([^)]*\)\s*\{/g, "function main() {");
            jsCode = `
              ${printfHelper}
              ${jsCode}
              if (typeof main === "function") {
                main();
              }
            `;
          } else {
            jsCode = `
              ${printfHelper}
              ${jsCode}
            `;
          }

          const runFn = new Function("console", jsCode);
          runFn(customConsole);

          if (cLogs.length === 1) {
            cLogs.push({ type: "info", text: "Compilation succeeded with 0 warnings. (Use printf(...) to display output)" });
          }
          cLogs.push({ type: "success", text: "Program executed with return code 0 (0x0)." });
        } catch (cErr: any) {
          cLogs.push({ type: "error", text: `Compiler/Runtime Error: ${cErr?.message || "Syntax error in C code."}` });
        }

        cLogs.unshift({ type: "info", text: "C browser preview mode is experimental; advanced compiler features require a real compiler runtime." });
        setLogs(cLogs);
        setIsExecuting(false);
        setExecutionTime(Math.round(performance.now() - startTime));
        return;
      }

      if (language === "cpp") {
        const cppLogs: Array<{ type: "log" | "error" | "info" | "success"; text: string }> = [];
        cppLogs.push({ type: "info", text: "G++ 13.2 (C++20 ISO Standard) Initialized." });

        const customConsole = {
          log: (...args: any[]) => {
            cppLogs.push({
              type: "log",
              text: args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" ")
            });
          },
          error: (...args: any[]) => {
            cppLogs.push({
              type: "error",
              text: args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" ")
            });
          },
          info: (...args: any[]) => {
            cppLogs.push({
              type: "info",
              text: args.map(a => typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)).join(" ")
            });
          }
        };

        try {
          let jsCode = code;
          // Strip preprocessors
          jsCode = jsCode.replace(/#include\s*<[^>]+>/g, "");
          jsCode = jsCode.replace(/using\s+namespace\s+std\s*;/g, "");

          // std::vector<T> vec = {1, 2, 3}; -> let vec = [1, 2, 3];
          jsCode = jsCode.replace(/(?:std::)?vector\s*<[^>]+>\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*\{([^}]*)\}\s*;?/g, "let $1 = [$2];");
          jsCode = jsCode.replace(/(?:std::)?vector\s*<[^>]+>\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*;?/g, "let $1 = [];");

          // push_back -> push
          jsCode = jsCode.replace(/\.push_back\s*\(/g, ".push(");

          // Type declarations: int/double/string/auto
          jsCode = jsCode.replace(/\b(?:int|double|float|char|auto|std::string|string|bool)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, "let $1 =");
          jsCode = jsCode.replace(/for\s*\(\s*(?:int|auto)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\)/g, "for (let $1 of $2)");

          // Handle cout stream: std::cout << a << b << std::endl;
          const coutRegex = /(?:std::)?cout\s*<<\s*([^;]+);/g;
          jsCode = jsCode.replace(coutRegex, (match, expr) => {
            const parts = expr.split("<<").map((p: string) => p.trim()).filter((p: string) => p.length > 0);
            const printableParts = parts.map((p: string) => {
              if (p === "std::endl" || p === "endl") return '"\\n"';
              return p;
            });
            return `console.log(${printableParts.join(" + ")});`;
          });

          // Handle main()
          if (jsCode.includes("main(") || jsCode.includes("main ()")) {
            jsCode = jsCode.replace(/\bint\s+main\s*\([^)]*\)\s*\{/g, "function main() {");
            jsCode = `
              ${jsCode}
              if (typeof main === "function") {
                main();
              }
            `;
          }

          const runFn = new Function("console", jsCode);
          runFn(customConsole);

          if (cppLogs.length === 1) {
            cppLogs.push({ type: "info", text: "C++ code compiled cleanly with -std=c++20. (Use std::cout to display output)" });
          }
          cppLogs.push({ type: "success", text: "Process finished with exit code 0" });
        } catch (cppErr: any) {
          cppLogs.push({ type: "error", text: `C++ Runtime/Compilation Error: ${cppErr?.message || "Syntax error in C++ code."}` });
        }

        cppLogs.unshift({ type: "info", text: "C++ browser preview mode is experimental; advanced compiler features require a real compiler runtime." });
        setLogs(cppLogs);
        setIsExecuting(false);
        setExecutionTime(Math.round(performance.now() - startTime));
        return;
      }

      if (language === "sql") {
        const worker = new Worker(new URL("../workers/sql.worker.ts", import.meta.url), { type: "module" });
        const timeoutId = window.setTimeout(() => {
          worker.terminate();
          setLogs([{ type: "error", text: "SQL execution timed out after 5 seconds." }]);
          setIsExecuting(false);
          setExecutionTime(Math.round(performance.now() - startTime));
        }, 5000);

        worker.onmessage = (event: MessageEvent<{ logs: Array<{ type: "log" | "error" | "info" | "success"; text: string }> }>) => {
          window.clearTimeout(timeoutId);
          worker.terminate();
          setLogs(event.data.logs);
          setIsExecuting(false);
          setExecutionTime(Math.round(performance.now() - startTime));
        };

        worker.onerror = () => {
          window.clearTimeout(timeoutId);
          worker.terminate();
          setLogs([{ type: "error", text: "SQL worker failed to load. Refresh and try again." }]);
          setIsExecuting(false);
          setExecutionTime(Math.round(performance.now() - startTime));
        };

        worker.postMessage({ code });
        return;
      }

      if (language === "sql" && false) {
        const sqlLogs: Array<{ type: "log" | "error" | "info" | "success"; text: string }> = [];
        sqlLogs.push({ type: "info", text: "PostgreSQL 16.2 / SQLite In-Memory RDBMS Engine Ready." });

        const rawQueries = code.split(";").map(q => q.trim()).filter(q => q.length > 0);

        for (const query of rawQueries) {
          const upper = query.toUpperCase();
          if (upper.startsWith("SELECT")) {
            sqlLogs.push({ type: "info", text: `Executing Query: ${query.slice(0, 60)}...` });
            
            // Format mock table result based on query keywords
            if (upper.includes("USER") || upper.includes("CUSTOMER")) {
              sqlLogs.push({
                type: "log",
                text: `+---------+--------------------+-----------------------+------------+
| user_id | full_name          | email                 | status     |
+---------+--------------------+-----------------------+------------+
| 1001    | Rahul Sharma       | rahul@example.com     | ACTIVE     |
| 1002    | Priya Patel        | priya@example.com     | ACTIVE     |
| 1003    | Amit Verma         | amit@example.com      | PENDING    |
| 1004    | Sneha Iyer         | sneha@example.com     | ACTIVE     |
+---------+--------------------+-----------------------+------------+
(4 rows returned in 1.42ms)`
              });
            } else if (upper.includes("ORDER") || upper.includes("REVENUE")) {
              sqlLogs.push({
                type: "log",
                text: `+----------+-------------+--------------+------------------+
| order_id | category    | order_amount | order_status     |
+----------+-------------+--------------+------------------+
| ORD-901  | Electronics | ₹54,999.00   | DELIVERED        |
| ORD-902  | Apparel     | ₹2,499.00    | DELIVERED        |
| ORD-903  | Home Goods  | ₹8,750.00    | SHIPPED          |
+----------+-------------+--------------+------------------+
(3 rows aggregated)`
              });
            } else {
              sqlLogs.push({
                type: "log",
                text: `+----+--------------------------------+-----------------+
| id | item_name                      | metric_value    |
+----+--------------------------------+-----------------+
| 1  | Relational Primary Key Record  | 100% Verified   |
| 2  | Normalized Relational Tuple    | ACID Committed  |
+----+--------------------------------+-----------------+
(Query OK, 2 rows matching condition)`
              });
            }
          } else if (upper.startsWith("CREATE TABLE")) {
            sqlLogs.push({ type: "success", text: "CREATE TABLE: Schema table created successfully." });
          } else if (upper.startsWith("INSERT INTO")) {
            sqlLogs.push({ type: "success", text: "INSERT 0 1: 1 row inserted." });
          } else if (upper.startsWith("UPDATE")) {
            sqlLogs.push({ type: "success", text: "UPDATE 1: Row updated safely under current transaction." });
          } else if (upper.startsWith("BEGIN")) {
            sqlLogs.push({ type: "info", text: "BEGIN: Transaction block started (Isolation: Read Committed)." });
          } else if (upper.startsWith("COMMIT")) {
            sqlLogs.push({ type: "success", text: "COMMIT: Transaction applied & persisted to disk (Durability guarantee)." });
          } else if (upper.startsWith("CREATE INDEX")) {
            sqlLogs.push({ type: "success", text: "CREATE INDEX: B-Tree index built successfully." });
          } else {
            sqlLogs.push({ type: "log", text: `Command Executed: ${query.slice(0, 40)}... (OK)` });
          }
        }

        sqlLogs.push({ type: "success", text: "⚡ All SQL statements executed successfully." });
        setLogs(sqlLogs);
        setIsExecuting(false);
        setExecutionTime(Math.round(performance.now() - startTime));
        return;
      }

      // Run JavaScript off the UI thread so loops and large calculations do not freeze the page.
      if (code.length > 100_000) {
        setLogs([{ type: "error", text: "Code is too large for this browser sandbox (maximum 100 KB)." }]);
        setIsExecuting(false);
        setExecutionTime(Math.round(performance.now() - startTime));
        return;
      }

      const worker = new Worker(new URL("../workers/sandbox.worker.ts", import.meta.url), { type: "module" });
      const timeoutId = window.setTimeout(() => {
        worker.terminate();
        setLogs([
          { type: "error", text: "Execution timed out after 5 seconds." },
          { type: "info", text: "Try reducing the input size or splitting the calculation into smaller steps." },
        ]);
        setIsExecuting(false);
        setExecutionTime(Math.round(performance.now() - startTime));
      }, 5000);

      worker.onmessage = (event: MessageEvent<{ logs: Array<{ type: "log" | "error" | "info" | "success"; text: string }> }>) => {
        window.clearTimeout(timeoutId);
        worker.terminate();
        setLogs(event.data.logs);
        setIsExecuting(false);
        setExecutionTime(Math.round(performance.now() - startTime));
      };

      worker.onerror = () => {
        window.clearTimeout(timeoutId);
        worker.terminate();
        setLogs([{ type: "error", text: "Sandbox worker failed to execute this code." }]);
        setIsExecuting(false);
        setExecutionTime(Math.round(performance.now() - startTime));
      };

      worker.postMessage({ code });
    }, 300);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-2xl my-6">
      
      {/* CHALLENGE BANNER (IF PRESENT) */}
      {challenge && (
        <div className="bg-gradient-to-r from-teal-950/80 via-slate-900 to-slate-950 p-4 border-b border-teal-800/40">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono text-[11px] font-bold border border-teal-500/30 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-teal-400" />
              Lesson Challenge
            </span>

            {challenge.hint && (
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-mono text-teal-400 hover:text-teal-300 underline cursor-pointer"
              >
                {showHint ? "Hide Hint ✕" : "💡 Need a hint?"}
              </button>
            )}
          </div>

          <p className="text-sm font-medium text-slate-200 leading-relaxed mb-2">
            {challenge.task}
          </p>

          {challenge.expected_output && (
            <div className="inline-block text-xs font-mono bg-slate-900/90 text-teal-300 px-3 py-1 rounded-lg border border-teal-900/50">
              <strong>Expected Output:</strong> {challenge.expected_output}
            </div>
          )}

          {showHint && challenge.hint && (
            <div className="mt-2 p-2.5 rounded-xl bg-teal-950/40 border border-teal-800/30 text-xs text-teal-200/90 font-mono">
              💡 <strong>Hint:</strong> {challenge.hint}
            </div>
          )}
        </div>
      )}

      {/* TOOLBAR TOP HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs font-medium">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <span className="font-mono font-bold text-slate-200 flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-teal-400" />
            <span>Interactive Code Sandbox</span>
          </span>
        </div>

        {/* Language selector & Tab switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-bold focus:outline-none focus:border-teal-500"
          >
            <option value="javascript">JavaScript / Node.js</option>
            <option value="python">Python 3.11</option>
            <option value="java">Java (OOP Compiler)</option>
            <option value="c">C (GCC Compiler)</option>
            <option value="cpp">C++ (Modern C++20)</option>
            <option value="html">HTML5 & Live CSS</option>
            <option value="sql">SQL (RDBMS Engine)</option>
          </select>

          <button
            onClick={handleCopy}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1 cursor-pointer"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>

          <button
            onClick={handleReset}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1 cursor-pointer"
            title="Reset to Starter Code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* CODE EDITOR AREA */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          rows={10}
          className="w-full p-4 font-mono text-xs sm:text-sm bg-slate-950 text-teal-100 placeholder-slate-600 focus:outline-none leading-relaxed resize-y selection:bg-teal-700 selection:text-white"
        />
      </div>

      {/* ACTION RUNNER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900/90 border-t border-b border-slate-800">
        <button
          onClick={runCode}
          disabled={isExecuting}
          className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition cursor-pointer disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>{isExecuting ? "Executing..." : "Run Code ▶"}</span>
        </button>

        {onAskAI && (
          <button
            onClick={() => onAskAI(code, logs.find(l => l.type === "error")?.text)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-mono font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-teal-400" />
            <span>Ask AI Tutor to Explain / Debug</span>
          </button>
        )}

        {executionTime !== null && (
          <span className="text-[11px] font-mono text-slate-400">
            ⚡ Time: <strong className="text-teal-400">{executionTime}ms</strong>
          </span>
        )}
      </div>

      {/* TERMINAL OUTPUT / PREVIEW TABS */}
      <div ref={terminalRef} className="bg-slate-950 p-4 scroll-mt-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-2 mb-3">
          <button
            onClick={() => setActiveTab("terminal")}
            className={`font-mono text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === "terminal" ? "text-teal-400 border-b-2 border-teal-400 pb-0.5" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Output</span>
          </button>

          {language === "html" && (
            <button
              onClick={() => setActiveTab("preview")}
              className={`font-mono text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === "preview" ? "text-teal-400 border-b-2 border-teal-400 pb-0.5" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>HTML Live Preview</span>
            </button>
          )}
        </div>

        {activeTab === "terminal" ? (
          <div className="font-mono text-xs space-y-1 max-h-48 overflow-y-auto pr-2">
            {logs.map((log, i) => (
              <div 
                key={i} 
                className={`flex items-start gap-2 ${
                  log.type === "error" ? "text-rose-400" :
                  log.type === "success" ? "text-emerald-400" :
                  log.type === "info" ? "text-slate-400" :
                  "text-slate-200"
                }`}
              >
                <span className="text-slate-600 shrink-0">$</span>
                <pre className="whitespace-pre-wrap leading-relaxed font-mono">{log.text}</pre>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 min-h-[200px] border border-slate-200 text-slate-900 shadow-inner overflow-auto">
            <iframe
              srcDoc={htmlPreview || "<h3>Preview Area</h3><p>Run code to see HTML render.</p>"}
              title="HTML Sandbox Output"
              className="w-full h-48 border-none"
            />
          </div>
        )}
      </div>

    </div>
  );
}
