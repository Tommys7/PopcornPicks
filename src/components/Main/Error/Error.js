export function ErrorMessage({ message }) {
  return (
    <p className="error box">
      <span>❌</span> {message}
    </p>
  );
}
