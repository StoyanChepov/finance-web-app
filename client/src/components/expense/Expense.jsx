import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Expense({ _id, title, amount, date, category }) {
  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    if (hoveredId !== null) {
      navigate(`/expenses/${hoveredId}/details`);
    }
  };

  return (
    <tr
      key={_id}
      onMouseEnter={() => handleMouseEnter(_id)}
      onClick={handleClick}
    >
      <td>{title}</td>
      <td>{amount} $</td>
      <td>{date}</td>
      <td>{category}</td>
    </tr>
  );
}
