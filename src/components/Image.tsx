import * as React from "react";

var data = [
  {id:1, img:"img/img1.jpg"},
  {id:2, img:"img/img2.jpg"},
  {id:3, img:"img/img3.jpg"},
  {id:4, img:"img/img4.jpg"},
  {id:5, img:"img/img5.jpg"}
]

export interface ImageProps { compiler: string; framework: string; }

export class Image extends React.Component<ImageProps, {}> {
    render() {
        return (
          <img src='img/ex1.png' />
        );
    }
}
