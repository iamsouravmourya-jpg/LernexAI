import initSqlJs from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm.wasm?url";

type WorkerLog = { type: "log" | "error" | "info" | "success"; text: string };

self.onmessage = async (event: MessageEvent<{ code: string }>) => {
  const logs: WorkerLog[] = [];
  try {
    if (event.data.code.length > 100_000) throw new Error("SQL script is too large (maximum 100 KB).");

    const SQL = await initSqlJs({ locateFile: () => wasmUrl });
    const database = new SQL.Database();
    const statements = event.data.code.split(";").map((query) => query.trim()).filter(Boolean);
    if (statements.length > 100) throw new Error("SQL script has too many statements (maximum 100).");

    for (const statement of statements) {
      const results = database.exec(statement);
      if (results.length === 0) {
        logs.push({ type: "success", text: `${statement.slice(0, 60)}... executed successfully.` });
        continue;
      }

      for (const result of results) {
        const rows = result.values.slice(0, 500).map((row) =>
          result.columns.map((column, index) => `${column}: ${String(row[index] ?? "NULL")}`).join(" | ")
        );
        logs.push({ type: "log", text: [result.columns.join(" | "), ...rows].join("\n") });
      }
    }

    database.close();
    logs.push({ type: "success", text: `SQL execution complete (${statements.length} statement${statements.length === 1 ? "" : "s"}).` });
    self.postMessage({ logs });
  } catch (error) {
    self.postMessage({
      logs: [{ type: "error", text: `SQL Error: ${error instanceof Error ? error.message : String(error)}` }],
    });
  }
};

export {};
