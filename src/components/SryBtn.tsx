import * as React from "react";

export interface SryBtnProps {
  func:() => void;
}

export class SryBtn extends React.Component<SryBtnProps> {
    render() {
        return (
          <span>
            <button className="btn" id="sry-btn" onClick={this.props.func}>sorry</button>
          </span>
        );
    }
}