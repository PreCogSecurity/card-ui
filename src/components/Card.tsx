import * as React from "react";

export interface CardProps {
  frontid:number;
  backid:number;
  frontimg:string;
  backimg:string;
  class:string;
  cardname:string;
  cardage:string;
  cardpref:string;
  cardmsg:string;
  cardjob:string;
  cardheight:string;
  precardname:string;
  precardage:string;
  precardpref:string;
  precardmsg:string;
  precardjob:string;
  precardheight:string;
}

export class Card extends React.Component<CardProps> {

    render() {
        return (
          <div>
            <div className={"front-img " + this.props.class} >
              <img src={this.props.frontimg}/>
              <article className="card-contents">
              <div className="upper-txt">
                <p className="main-detail">{this.props.cardname}:{this.props.cardage}:{this.props.cardpref}</p>
                <p className="massage">{this.props.cardmsg}</p>
                </div>
                <p className="more-detail">{this.props.cardjob}&nbsp;&nbsp;|&nbsp;&nbsp;{this.props.cardheight}</p>
              </article>
            </div>
          </div>
        );
    }
}