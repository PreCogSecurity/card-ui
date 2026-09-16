import * as React from "react";

export interface TnxBtnProps {
   func:() => void;
 }

export class TnxBtn extends React.Component<TnxBtnProps> {
    render() {
        return (
          <span>
            <button className="btn" id="tnx-btn" onClick={this.props.func}>thanks</button>
          </span>
        );
    }
}