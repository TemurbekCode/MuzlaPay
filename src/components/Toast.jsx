export function Toast({ message }) {
  return <div className={`toast${message ? " toast--show" : ""}`}>{message}</div>;
}