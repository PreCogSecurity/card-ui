"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Image_1 = require("./Image");
var Images = (function (_super) {
    __extends(Images, _super);
    function Images() {
        _super.apply(this, arguments);
    }
    Images.prototype.render = function () {
        return (React.createElement(Image_1.Image, {frontid: this.props.data[1].id, frontimg: this.props.data[1].img, backid: this.props.data[0].id, backimg: this.props.data[0].img}));
    };
    return Images;
}(React.Component));
exports.Images = Images;
//# sourceMappingURL=Images.js.map