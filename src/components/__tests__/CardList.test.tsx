import * as React from "react";
import { render, screen } from "@testing-library/react";
import { CardList } from "../CardList";
import { sampleCards } from "../../data/sampleCards";

describe("CardList", () => {
  test("renders the front card for the current index", () => {
    render(<CardList data={sampleCards} index={0} left="" />);
    expect(screen.getByText("ゆりこ:20歳:東京都")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "img/img1.jpg");
  });

  test("renders nothing when there is no next card", () => {
    const { container } = render(<CardList data={sampleCards} index={sampleCards.length - 1} left="" />);
    expect(container.firstChild).toBeNull();
  });
});