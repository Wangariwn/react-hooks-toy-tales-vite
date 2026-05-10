import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // 1. Display all toys on startup (GET)
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  function handleToggleForm() {
    setShowForm((showForm) => !showForm);
  }

  // Helper: Add new toy to state (POST response handler)
  function onAddToy(newToy) {
    setToys([...toys, newToy]);
  }

  // 2. Delete toy from state (DELETE response handler)
  function onDeleteToy(id) {
    const updatedToys = toys.filter((toy) => toy.id !== id);
    setToys(updatedToys);
  }

  // 3. Update toy likes in state (PATCH response handler)
  function onUpdateToy(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );
    setToys(updatedToys);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={onAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleToggleForm}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys} 
        onDeleteToy={onDeleteToy} 
        onUpdateToy={onUpdateToy} 
      />
    </>
  );
}

export default App;

