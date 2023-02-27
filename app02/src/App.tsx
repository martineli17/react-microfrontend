function App() {
  const HandleRemoveUser = () => {
    localStorage.removeItem("user");
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Application 02</p>
        <p>Usuário: {localStorage.getItem("user")}</p>
        <button onClick={HandleRemoveUser}>Remover usuário</button>
      </header>
    </div>
  );
}

export default App;
