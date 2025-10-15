import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Survey from "./Survey";

describe("Componente Encuesta", () => {
  test("Debe mostrar el formulario, aceptar un puntaje y confirmar el envío", () => {
    render(<Survey />);

    // Se carga el formulario base
    const formulario = screen.getByTestId("survey-form");
    expect(formulario).toBeInTheDocument();

    const botonEnviar = screen.getByTestId("submit-button") as HTMLButtonElement;
    expect(botonEnviar).toBeDisabled();

    // El usuario selecciona el puntaje 4
    const opcionCuatro = screen.getByTestId("rating-radio-4") as HTMLInputElement;
    fireEvent.click(opcionCuatro);
    expect(opcionCuatro.checked).toBeTruthy();
    expect(botonEnviar.disabled).toBeFalsy();

    // Enviar la encuesta
    fireEvent.click(botonEnviar);

    // Verificar mensaje de confirmación y puntaje mostrado
    expect(screen.getByTestId("confirmation-message")).toBeInTheDocument();
    expect(screen.getByTestId("submitted-rating")).toHaveTextContent("4");

    // Reiniciar encuesta
    const botonReiniciar = screen.getByTestId("reset-button");
    fireEvent.click(botonReiniciar);

    // Debe volver a mostrarse el formulario original
    expect(screen.getByTestId("survey-form")).toBeInTheDocument();
  });

  test("Impide el envío si no se ha seleccionado ningún puntaje", () => {
    render(<Survey />);

    const botonEnviar = screen.getByTestId("submit-button") as HTMLButtonElement;
    expect(botonEnviar.disabled).toBeTruthy();

    fireEvent.click(botonEnviar);

    // No debería existir mensaje de confirmación
    expect(screen.queryByTestId("confirmation-message")).toBeNull();
  });
});
