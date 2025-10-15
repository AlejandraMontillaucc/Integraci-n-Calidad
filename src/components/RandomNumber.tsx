import { useState } from "react";

export default function NumeroAleatorio() {
  const [valor, setValor] = useState<number | null>(null);

  const manejarClick = () => {
    const aleatorio = Math.floor(Math.random() * 100) + 1;
    setValor(aleatorio);
  };

  return (
    <section className="flex flex-col items-center justify-center w-full h-full p-8 gap-5">
      <article className="bg-slate-50 shadow-md rounded-xl p-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-slate-700 mb-5 text-center">
          Generador Aleatorio
        </h2>

        <div className="flex items-center justify-center bg-gray-200 rounded-lg p-5 min-h-[5rem] mb-5">
          {valor === null ? (
            <span className="text-gray-500 text-base italic">
              Clic para generar
            </span>
          ) : (
            <span
              className="text-5xl font-extrabold text-indigo-600"
              data-testid="random-number"
            >
              {valor}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={manejarClick}
          className="bg-indigo-600 text-white rounded-md px-5 py-2 w-full hover:bg-indigo-700 active:scale-[0.98] transition-transform"
          data-testid="generate-button"
        >
          Generar Número
        </button>
      </article>
    </section>
  );
}
