import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePokemon } from "../lib/controller";

interface IProps {
  editDescription: boolean;
  setEditDescription: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  height: string;
  weight: string;
  id?: string;
}

function Edit({
  editDescription,
  setEditDescription,
  type,
  height,
  weight,
  id,
}: IProps) {
  const [newType, setNewType] = useState(type);
  const [newHeight, setNewHeight] = useState(height);
  const [newWeight, setNewWeight] = useState(weight);

  const navigate = useNavigate();

  const handleUpdate = () => {
    // update pokemon
    updatePokemon(id, { type: newType });
    updatePokemon(id, { height: newHeight });
    updatePokemon(id, { weight: newWeight });
    setEditDescription(!editDescription);
    // navigate back to homepage
    navigate("/");
  };

  return (
    <div className="edit">
      <label>New type:</label>
      <input
        type="text"
        required
        value={newType}
        onChange={(e) => setNewType(e.target.value)}
      />
      <label>New height:</label>
      <input
        type="number"
        required
        value={newHeight}
        onChange={(e) => setNewHeight(e.target.value)}
      />
      <label>New weight:</label>
      <input
        type="number"
        required
        value={newWeight}
        onChange={(e) => setNewWeight(e.target.value)}
      />
      <button className="update-button" onClick={() => handleUpdate()}>
        Confirm Edit
      </button>
    </div>
  );
}

export default Edit;
