import "./style.css";
export default function Card({
  text = "/l/",
  textColor = "#fff",
  backgroundColor = "#df7b32",
}) {
  return (
    <div
      className="card"
      style={{
        color: textColor,
        background: backgroundColor,
      }}
    >
      {text}
    </div>
  );
}
