import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterForm from "./RegisterForm";

describe("Formulario de Registro", () => {
  it("debe renderizar el formulario, validar los campos y mostrar el mensaje de confirmación", () => {
    render(<RegisterForm />);

    // Verifica que el formulario aparezca inicialmente
    const form = screen.getByTestId("registration-form");
    expect(form).toBeInTheDocument();

    const botonEnviar = screen.getByTestId("submit-button") as HTMLButtonElement;
    expect(botonEnviar).toBeDisabled();

    const inputNombre = screen.getByTestId("name-input") as HTMLInputElement;
    const inputCorreo = screen.getByTestId("email-input") as HTMLInputElement;

    // Simula escritura en los campos
    fireEvent.change(inputNombre, { target: { value: "Laura" } });
    fireEvent.change(inputCorreo, { target: { value: "laura@test.com" } });

    expect(inputNombre.value).toBe("Laura");
    expect(inputCorreo.value).toBe("laura@test.com");
    expect(botonEnviar.disabled).toBe(false);

    // Simula envío
    fireEvent.click(botonEnviar);

    const mensajeConfirmacion = screen.getByTestId("confirmation-message");
    expect(mensajeConfirmacion).toBeInTheDocument();
    expect(screen.getByTestId("confirmed-name")).toHaveTextContent("Laura");
    expect(screen.getByTestId("confirmed-email")).toHaveTextContent("laura@test.com");

    // Nuevo registro
    const botonNuevo = screen.getByTestId("new-registration-button");
    fireEvent.click(botonNuevo);

    // El formulario debe volver a mostrarse
    expect(screen.getByTestId("registration-form")).toBeInTheDocument();
  });

  it("impide el envío si los campos están vacíos", () => {
    render(<RegisterForm />);

    const boton = screen.getByTestId("submit-button") as HTMLButtonElement;
    expect(boton).toBeDisabled();

    // Intenta enviar sin llenar campos
    fireEvent.click(boton);
    expect(screen.queryByTestId("confirmation-message")).not.toBeInTheDocument();
  });
});
