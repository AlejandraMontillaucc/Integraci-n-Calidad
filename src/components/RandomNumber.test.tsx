import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RandomNumber from "./RandomNumber";

describe("Componente de número aleatorio", () => {
  it("debe mostrar el mensaje inicial y generar un número controlado al presionar el botón", () => {
    render(<RandomNumber />);

    const mensajeInicial = screen.getByText(/clic para generar/i);
    expect(mensajeInicia).toBeInTheDocument();

    const botonGenerar = screen.getByRole("button", { name: /Generar Número/i });

    const randomOriginal = Math.random;
    (Math as unknown as { random: () => number }).random = jest.fn(() => 0.42);

    fireEvent.click(botonGenerar);

    const resultado = screen.getByTestId("random-number");
    expect(resultado.textContent).toBe("43");

    // Se restaura el valor original de random
    Math.random = randomOriginal;
  });

  it("debe devolver diferentes resultados en clics consecutivos usando mock", () => {
    render(<RandomNumber />);
    const boton = screen.getByRole("button", { name: /Generar Número/i });

    const randomBackup = Math.random;
    const mockRandom = jest.fn()
      .mockReturnValueOnce(0.01)
      .mockReturnValueOnce(0.99);

    (Math as any).random = mockRandom;

    fireEvent.click(boton);
    const primerNumero = screen.getByTestId("random-number");
    expect(primerNumero.textContent).toBe("2");

    fireEvent.click(boton);
    const segundoNumero = screen.getByTestId("random-number");
    expect(segundoNumero.textContent).toBe("100");

    Math.random = randomBackup;
  });
});
