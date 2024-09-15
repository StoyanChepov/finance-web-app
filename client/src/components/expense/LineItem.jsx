import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LineItem({ quantity, price, amount, itemId }) {
  console.log("LineItem", quantity, price, amount);
  return (
    <tr>
      <td>{itemId.name}</td>
      <td>{quantity}</td>
      <td>{price} $</td>
      <td>{amount} $</td>
    </tr>
  );
}
