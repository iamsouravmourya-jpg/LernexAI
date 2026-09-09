type WorkerLog = { type: "log" | "error" | "info" | "success"; text: string };

const MAX_OUTPUT_LENGTH = 12000;

function formatValue(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

self.onmessage = (event: MessageEvent<{ code: string }>) => {
  const logs: WorkerLog[] = [];
  const append = (type: WorkerLog["type"], value: unknown) => {
    const text = [value].map(formatValue).join(" ");
    const currentLength = logs.reduce((total, item) => total + item.text.length, 0);
    if (currentLength < MAX_OUTPUT_LENGTH) {
      logs.push({ type, text: text.slice(0, MAX_OUTPUT_LENGTH - currentLength) });
    }
  };

  try {
    const safeConsole = {
      log: (...values: unknown[]) => append("log", values.map(formatValue).join(" ")),
      info: (...values: unknown[]) => append("info", values.map(formatValue).join(" ")),
      error: (...values: unknown[]) => append("error", values.map(formatValue).join(" ")),
      warn: (...values: unknown[]) => append("error", values.map(formatValue).join(" ")),
    };

    const run = new Function("console", event.data.code);
    const result = run(safeConsole);
    if (result !== undefined) append("success", `[Return Value]: ${formatValue(result)}`);
    if (logs.length === 0) append("info", "Code executed successfully with no console output.");
    append("success", "Execution completed in a worker thread.");
    self.postMessage({ logs });
  } catch (error) {
    self.postMessage({
      logs: [
        { type: "error", text: `Runtime Error: ${error instanceof Error ? error.message : String(error)}` },
        { type: "info", text: "Execution was isolated from the page. Check the code and try again." },
      ],
    });
  }
};

export {};
