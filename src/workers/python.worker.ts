type WorkerLog = { type: "log" | "error" | "info" | "success"; text: string };

type PyodideRuntime = {
  setStdout: (options: { batched: (text: string) => void }) => void;
  runPythonAsync: (code: string) => Promise<unknown>;
};

const workerScope = self as typeof self & {
  loadPyodide?: (options: { indexURL: string }) => Promise<PyodideRuntime>;
};

let runtimePromise: Promise<PyodideRuntime> | null = null;

function loadRuntime() {
  if (!runtimePromise) {
    importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js");
    if (!workerScope.loadPyodide) throw new Error("Pyodide runtime failed to load.");
    runtimePromise = workerScope.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/" });
  }
  return runtimePromise;
}

self.onmessage = async (event: MessageEvent<{ code: string }>) => {
  const logs: WorkerLog[] = [];
  try {
    if (event.data.code.length > 100_000) throw new Error("Python script is too large (maximum 100 KB).");
    const runtime = await loadRuntime();
    let outputLength = 0;
    runtime.setStdout({
      batched: (text) => {
        if (outputLength >= 12000) return;
        const safeText = text.slice(0, 12000 - outputLength);
        outputLength += safeText.length;
        logs.push({ type: "log", text: safeText });
      },
    });
    await runtime.runPythonAsync(event.data.code);
    logs.push({ type: "success", text: "Python 3.11 code executed in Pyodide WASM." });
  } catch (error) {
    logs.push({ type: "error", text: `Python Error: ${error instanceof Error ? error.message : String(error)}` });
  }
  self.postMessage({ logs });
};

