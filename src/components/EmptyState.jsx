export default function EmptyState({ children }) {
  return (
    <div className="card">
      <div className="empty">{children}</div>
    </div>
  );
}