export function log(...args: unknown[]) {
  // simple logger wrapper
  // eslint-disable-next-line no-console
  console.log(new Date().toISOString(), ...args);
}

export default { log };
