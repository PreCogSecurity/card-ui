import * as React from "react";
import { Card } from "./Card";
import { CardData } from "../data/sampleCards";

export interface CardListProps {
  data: CardData[];
  index: number;
  left: string;
}

export class CardList extends React.Component<CardListProps> {

    render() {
        const { data, index, left } = this.props;
        const front = data[index];
        const next = data[index + 1];
        if (!front || !next) {
            return null;
        }
        return (
          <Card cardname={front.name}
                cardage={front.age}
                cardpref={front.pref}
                cardmsg={front.msg}
                cardjob={front.job}
                cardheight={front.height}
                precardname={next.name}
                precardage={next.age}
                precardpref={next.pref}
                precardmsg={next.msg}
                precardjob={next.job}
                precardheight={next.height}
                class={left}
                frontid={front.id}
                frontimg={front.img}
                backid={next.id}
                backimg={next.img} />
        );
    }
}