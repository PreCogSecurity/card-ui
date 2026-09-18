import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "../Card";

const baseProps = {
  frontid: 1,
  backid: 2,
  frontimg: "img/img1.jpg",
  backimg: "img/img2.jpg",
  class: "",
  cardname: "ゆりこ",
  cardage: "20歳",
  cardpref: "東京都",
  cardmsg: "よろしく",
  cardjob: "社会人",
  cardheight: "170cm",
  precardname: "ふぁにー",
  precardage: "28歳",
  precardpref: "石川県",
  precardmsg: "はろー",
  precardjob: "学生",
  precardheight: "167cm"
};

describe("Card", () => {
  test("renders the front card details", () => {
    render(<Card {...baseProps} />);
    expect(screen.getByText("ゆりこ:20歳:東京都")).toBeInTheDocument();
    expect(screen.getByText("よろしく")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("社会人") && content.includes("170cm"))
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "img/img1.jpg");
  });

  test("applies the shift class when provided", () => {
    const { container } = render(<Card {...baseProps} class="shift-left" />);
    expect(container.querySelector(".front-img")).toHaveClass("shift-left");
  });
});