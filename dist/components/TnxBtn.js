"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var TnxBtn = (function (_super) {
    __extends(TnxBtn, _super);
    function TnxBtn() {
        _super.apply(this, arguments);
    }
    TnxBtn.prototype.render = function () {
        return (React.createElement("span", null, 
            React.createElement("button", {className: "btn", id: "tnx-btn", onClick: this.props.func}, "thanks")
        ));
    };
    return TnxBtn;
}(React.Component));
exports.TnxBtn = TnxBtn;
//# sourceMappingURL=TnxBtn.js.map