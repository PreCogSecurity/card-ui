import * as React from "react";
import { TnxBtn } from "./TnxBtn";
import { SryBtn } from "./SryBtn";
import { CardList } from "./CardList";
import { sampleCards } from "../data/sampleCards";

export interface MainProps { compiler: string; framework: string; }

interface MainState { index:number; left:string; }

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    this.state = {index: 0, left: ''};
  }

  changeCardLeft() {
    this.setState({
      left: "shift-left",
      index: this.state.index
    });
    setTimeout(() => {
      this.setState({
        left: "",
        index: this.state.index + 1
      });
    }, 1000);
  }

  changeCardRight() {
    this.setState({
      left: "shift-right",
      index: this.state.index
    });
    setTimeout(() => {
      this.setState({
        left: "",
        index: this.state.index + 1
      });
    }, 1000);
  }

  render() {
    const showButtons = this.state.index < sampleCards.length - 2;
    return (
      <article className="main-bg">
        <CardList left={this.state.left} data={sampleCards} index={this.state.index} />
        <section id="btn-sec">
          {showButtons && (
            <span>
              <SryBtn func={this.changeCardLeft.bind(this)} />
              <TnxBtn func={this.changeCardRight.bind(this)} />
            </span>
          )}
        </section>
      </article>
    );
  }
}