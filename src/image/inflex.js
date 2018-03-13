import {Component} from "react";
import * as React from "react";
import {ImageDrop} from "./form";


export default class Inflex extends Component {
    render() {
        return <div className="infContainer">
            <ImageDrop apiUrl={ this.props.apiUrl }/>
            {this.props.children}
        </div>
    }
}