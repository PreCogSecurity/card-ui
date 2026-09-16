import * as React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Main } from "../Main";
import { sampleCards } from "../../data/sampleCards";

describe("Main", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders the first card and both action buttons", () => {
    render(<Main compiler="TypeScript" framework="React" />);
    expect(screen.getByText("ゆりこ:20歳:東京都")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "thanks" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "sorry" })).toBeInTheDocument();
  });

  test("advances to the next card after clicking thanks", () => {
    render(<Main compiler="TypeScript" framework="React" />);
    fireEvent.click(screen.getByRole("button", { name: "thanks" }));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("ふぁにー:28歳:石川県")).toBeInTheDocument();
  });

  test("advances to the next card after clicking sorry", () => {
    render(<Main compiler="TypeScript" framework="React" />);
    fireEvent.click(screen.getByRole("button", { name: "sorry" }));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("ふぁにー:28歳:石川県")).toBeInTheDocument();
  });

  test("hides the action buttons on the last card", () => {
    render(<Main compiler="TypeScript" framework="React" />);
    for (let i = 0; i < sampleCards.length - 2; i++) {
      fireEvent.click(screen.getByRole("button", { name: "thanks" }));
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }
    expect(screen.queryByRole("button", { name: "thanks" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "sorry" })).not.toBeInTheDocument();
  });
});