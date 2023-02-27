function App() {
  const HandleAddUser = () => {
    localStorage.setItem("user", "Fabio");
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Application 01</p>
        <p>Usuário: {localStorage.getItem("user")}</p>
        <button onClick={HandleAddUser}>Adicionar usuário</button>
      </header>
    </div>
  );
}

export default App;
