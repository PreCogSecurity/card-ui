import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TnxBtn } from "../TnxBtn";
import { SryBtn } from "../SryBtn";

describe("TnxBtn", () => {
  test("renders a thanks button and calls the callback on click", () => {
    const onClick = jest.fn();
    render(<TnxBtn func={onClick} />);
    const button = screen.getByRole("button", { name: "thanks" });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});

describe("SryBtn", () => {
  test("renders a sorry button and calls the callback on click", () => {
    const onClick = jest.fn();
    render(<SryBtn func={onClick} />);
    const button = screen.getByRole("button", { name: "sorry" });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});