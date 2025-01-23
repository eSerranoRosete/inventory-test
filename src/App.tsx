import { useState } from "react";

type State = {
  registry: {
    id: string;
    name: string;
    createAt: string;
    status: "pending" | "completed";
  }[];
};

function App() {
  const [state, setState] = useState<State>({
    registry: [],
  });

  const [isScanning, setIsScanning] = useState(false);
  const [value, setValue] = useState("");

  const onSaveRegistry = () => {
    const newEntry: State["registry"][number] = {
      id: Math.random().toString(36).substr(2, 9),
      name: value,
      createAt: new Date().toISOString(),
      status: "pending",
    };

    setState((prevState) => ({
      ...prevState,
      registry: [...prevState.registry, newEntry],
    }));

    setIsScanning(false);
  };

  return (
    <main className="p-6 flex flex-col gap-6 h-screen relative">
      <h1 className="text-2xl font-medium">Inventario</h1>
      <div className="p-2">
        <h2>Registros: {state.registry.length}</h2>
        <ul className="p-2 grow">
          {state.registry.map((registry) => (
            <li key={registry.id} className="p-2">
              <div className="flex flex-col gap-1">
                <span>ID: {registry.name}</span>
                <span>Fecha de creación: {registry.createAt}</span>
                <span>Estado: {registry.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => setIsScanning(true)}
        className="mt-auto px-10 py-4 bg-zinc-900 text-zinc-50 w-full"
      >
        Agregar registro
      </button>

      {isScanning && (
        <div className="w-full h-full absolute top-0 left-0 bg-zinc-950/50 flex items-center justify-center">
          <div className="w-[90%] h-96 p-6 bg-zinc-50 text-center flex flex-col items-center justify-center gap-8">
            <input
              onChange={(e) => setValue(e.target.value)}
              type="text"
              className="w-full p-2"
              autoFocus
            />
            <p className="text-2xl">Escanea el código de barras</p>
            <div className="space-y-2">
              <button
                onClick={() => setIsScanning(false)}
                className="px-10 py-2 bg-zinc-200 text-zinc-950 w-full"
              >
                Cancelar
              </button>
              <button
                disabled={!value}
                onClick={onSaveRegistry}
                className="px-10 py-2 bg-zinc-900 text-zinc-50 w-full"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
