import { render, screen, fireEvent } from "@testing-library/react";
import ShoppingCart from "./ShoppingCart";

describe("Componente ShoppingCart", () => {
  it("debe iniciar con el carrito vacío y total en cero", () => {
    console.info("Iniciando test: estado inicial vacío");
    render(<ShoppingCart />);

    expect(screen.getByText(/no hay productos en el carrito/i)).toBeInTheDocument();
    expect(screen.getByText(/total:\s*\$0/i)).toBeInTheDocument();

    console.info("Finalizado test de estado inicial");
  });

  it("incrementa el total al agregar un producto", () => {
    console.info("Test: agregar producto");
    render(<ShoppingCart />);

    const botonesAgregar = screen.getAllByRole("button", { name: /añadir/i });
    fireEvent.click(botonesAgregar[0]);

    expect(screen.getByText(/artículo A x 1/i)).toBeInTheDocument();
    expect(screen.getByText(/total:\s*\$10/i)).toBeInTheDocument();

    console.info("Producto agregado correctamente");
  });

  it("reduce el total al eliminar un artículo", () => {
    console.info("Test: eliminar producto");
    render(<ShoppingCart />);

    const botonAgregar = screen.getAllByRole("button", { name: /añadir/i })[0];
    fireEvent.click(botonAgregar);

    const botonEliminar = screen.getByRole("button", { name: /quitar/i });
    console.log("Tomando Botón Eliminar:");

    fireEvent.click(botonEliminar);
    console.log("Botón Eliminar presionado");

    expect(screen.getByText(/no hay productos en el carrito/i)).toBeInTheDocument();
    console.log("Carro vacio:");
    expect(screen.getByText(/total:\s*\$0/i)).toBeInTheDocument();

    console.info("Producto eliminado correctamente");
  });

  it("calcula el precio total con varios productos", () => {
    console.info("Test: cálculo de total múltiple");
    render(<ShoppingCart />);

    const botones = screen.getAllByRole("button", { name: /añadir/i });

    // Agregar productos
    fireEvent.click(botones[0]); // Artículo A
    fireEvent.click(botones[1]); // Artículo B
    fireEvent.click(botones[2]); // Artículo C
    fireEvent.click(botones[0]); // Artículo A nuevamente

    // Verificar cantidades
    expect(screen.getByText(/artículo A x 2/i)).toBeInTheDocument();
    expect(screen.getByText(/artículo B x 1/i)).toBeInTheDocument();
    expect(screen.getByText(/artículo C x 1/i)).toBeInTheDocument();

    // Verificar total final
    expect(screen.getByText(/total:\s*\$70/i)).toBeInTheDocument();

    console.info("Cálculo de total múltiple completado");
  });
});
