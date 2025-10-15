import { useState } from "react";

export default function Survey() {
  const [valoracion, setValoracion] = useState<number | null>(null);
  const [enviado, setEnviado] = useState(false);

  const calificaciones = [1, 2, 3, 4, 5];

  const enviarEncuesta = () => {
    if (valoracion !== null) {
      setEnviado(true);
    }
  };

  const reiniciarEncuesta = () => {
    setValoracion(null);
    setEnviado(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-3">
          Opinión del Usuario
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm">
          Evalúa tu nivel de satisfacción con nuestro servicio:
        </p>

        {!enviado ? (
          <div data-testid="survey-form" className="space-y-4">
            {calificaciones.map((nivel) => (
              <label
                key={nivel}
                data-testid={`rating-option-${nivel}`}
                className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                  valoracion === nivel
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900"
                    : "border-gray-200 hover:border-indigo-400 dark:hover:border-indigo-500"
                }`}
              >
                <input
                  type="radio"
                  name="nivel"
                  value={nivel}
                  checked={valoracion === nivel}
                  onChange={() => setValoracion(nivel)}
                  className="w-4 h-4 text-indigo-600"
                  data-testid={`rating-radio-${nivel}`}
                />
                <span className="text-gray-800 dark:text-gray-100 font-medium">
                  {nivel} {nivel === 1 ? "estrella" : "estrellas"} ⭐
                </span>
              </label>
            ))}

            <button
              onClick={enviarEncuesta}
              disabled={valoracion === null}
              data-testid="submit-button"
              className={`w-full mt-4 font-semibold py-3 px-6 rounded-xl transition ${
                valoracion === null
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-105 active:scale-95"
              }`}
            >
              Enviar respuesta
            </button>
          </div>
        ) : (
          <div
            data-testid="confirmation-message"
            className="text-center space-y-3"
          >
            <div className="text-6xl">🎯</div>
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
              ¡Gracias por participar!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Tu puntuación fue:
            </p>
            <div
              className="text-3xl font-bold text-indigo-600 dark:text-indigo-400"
              data-testid="submitted-rating"
            >
              {valoracion} {valoracion === 1 ? "estrella" : "estrellas"} ⭐
            </div>

            <button
              onClick={reiniciarEncuesta}
              data-testid="reset-button"
              className="mt-4 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Volver a evaluar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
