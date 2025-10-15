import { useState } from "react";

export default function FormularioRegistro() {
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [datos, setDatos] = useState({ usuario: "", correo: "" });

  const formularioValido = usuario.trim() !== "" && correo.trim() !== "";

  const enviarFormulario = () => {
    if (!formularioValido) return;
    setDatos({ usuario, correo });
    setEnviado(true);
    setUsuario("");
    setCorreo("");
  };

  const reiniciarRegistro = () => {
    setEnviado(false);
    setDatos({ usuario: "", correo: "" });
  };

  return (
    <section className="flex flex-col justify-center items-center w-full h-full p-8 gap-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-7">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-3">
          Registro de Usuario
        </h1>
        <p className="text-gray-600 text-sm mb-5 text-center">
          Completa tus datos y regístrate al instante 🚀
        </p>

        {!enviado ? (
          <form data-testid="registration-form" className="space-y-5">
            <div>
              <label
                htmlFor="usuario"
                className="block text-gray-700 font-medium mb-2"
              >
                Nombre completo
              </label>
              <input
                type="text"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ej: Ana López"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                data-testid="name-input"
              />
            </div>

            <div>
              <label
                htmlFor="correo"
                className="block text-gray-700 font-medium mb-2"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                data-testid="email-input"
              />
            </div>

            <button
              type="button"
              onClick={enviarFormulario}
              disabled={!formularioValido}
              className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
                formularioValido
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              data-testid="submit-button"
            >
              Enviar Registro
            </button>
          </form>
        ) : (
          <div
            className="text-center animate-fadeIn"
            data-testid="confirmation-message"
          >
            <div className="text-5xl mb-3">✅</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ¡Registro completado!
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-gray-700 mb-1">
                <strong>Nombre:</strong>{" "}
                <span data-testid="confirmed-name">{datos.usuario}</span>
              </p>
              <p className="text-gray-700">
                <strong>Correo:</strong>{" "}
                <span data-testid="confirmed-email">{datos.correo}</span>
              </p>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Tus datos se han enviado correctamente 🎉
            </p>
            <button
              onClick={reiniciarRegistro}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg transition duration-200"
              data-testid="new-registration-button"
            >
              Registrar otro usuario
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
