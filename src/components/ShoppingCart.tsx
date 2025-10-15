import React, { useState } from "react";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
};

type ItemCarrito = Producto & { cantidad: number };

const LISTA_PRODUCTOS: Producto[] = [
  { id: 1, nombre: "Artículo A", precio: 10 },
  { id: 2, nombre: "Artículo B", precio: 20 },
  { id: 3, nombre: "Artículo C", precio: 30 },
  { id: 4, nombre: "Artículo D", precio: 40 },
  { id: 5, nombre: "Artículo E", precio: 50 },
];

const CarritoDeCompras: React.FC = () => {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  const agregarProducto = (producto: Producto) => {
    setCarrito((prev) => {
      const repetido = prev.find((item) => item.id === producto.id);
      if (repetido) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarProducto = (id: number) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const total = carrito.reduce(
    (acum, item) => acum + item.precio * item.cantidad,
    0
  );

  return (
    <section className="p-6 max-w-3xl mx-auto bg-slate-50 dark:bg-gray-900 rounded-xl shadow-md mt-6">
      <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-5">
        🛍️ Carrito de Compras
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Productos disponibles
          </h2>
          {LISTA_PRODUCTOS.map((producto) => (
            <div
              key={producto.id}
              className="flex justify-between items-center bg-indigo-50 dark:bg-indigo-800 rounded-md px-4 py-2 mb-2"
            >
              <span className="font-medium text-gray-800 dark:text-gray-100">
                {producto.nombre}
              </span>
              <span className="text-indigo-600 dark:text-indigo-300 font-bold">
                ${producto.precio}
              </span>
              <button
                className="ml-3 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-md transition"
                onClick={() => agregarProducto(producto)}
                data-testid={`boton-agregar-${producto.id}`}
              >
                Añadir
              </button>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Tu carrito
          </h2>

          {carrito.length === 0 ? (
            <p className="text-gray-500 italic">No hay productos en el carrito</p>
          ) : (
            <ul className="space-y-2">
              {carrito.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-yellow-50 dark:bg-yellow-900 rounded-md px-4 py-2"
                >
                  <span className="text-gray-800 dark:text-gray-100 font-medium">
                    {item.nombre} x {item.cantidad}
                  </span>
                  <span className="text-yellow-700 dark:text-yellow-300 font-bold">
                    ${item.precio * item.cantidad}
                  </span>
                  <button
                    className="ml-3 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md transition"
                    onClick={() => quitarProducto(item.id)}
                    data-testid={`boton-quitar-${item.id}`}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="text-right mt-4">
            <span className="text-xl font-bold text-purple-700 dark:text-purple-300">
              Total: ${total}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarritoDeCompras;
