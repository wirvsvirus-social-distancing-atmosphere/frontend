import React, {Component} from "react";
import {Popup, withLeaflet} from "react-leaflet";
import L from "leaflet";

class MyPopup extends Component {

    componentDidMount() {
        const {map} = this.props.leaflet;

        map.on("popupopen", e => {
            L.DomEvent.off(
                this.getWrapper(),
                "mousedown",
                L.DomEvent.stopPropagation
            );
        });
        map.on("popupclose", e => {
            L.DomEvent.on(this.getWrapper(), "mousedown", L.DomEvent.stopPropagation);
        });
    }

    getWrapper() {
        console.log(
            "wrapper",
            document.querySelector(".leaflet-popup-content-wrapper")
        );
        return document.querySelector(".leaflet-popup-content-wrapper");
    }

    render() {
        return <Popup {...this.props} />
    }
}

export default withLeaflet(MyPopup);
