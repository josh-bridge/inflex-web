import {Component} from "react";
import * as React from "react";

export default class FilteredThumbs extends Component {
    render() {
        const res = this.props.result;
        const st = this.props.state;
        const preview = this.props.preview;

        function ready() {
            return res;
        }

        return <div>
            {st.proc && <span>processing</span>}
            {ready() && <FilterRail original={res.original_url} filters={res.filtered}/>}
        </div>
    }
}

export class FilterRail extends Component {
    render() {
        return <div className="thumbRail">
            { <Thumb text="Original" url={ this.props.original }/> }
            { this.props.filters.map((filter, i) => <FilterThumb filter={filter} key={i}/>) }
        </div>
    }
}

export class FilterThumb extends Component {
    render() {
        const filter = this.props.filter;

        return <Thumb url={filter.thumb_url} filterId={filter.id} text={filter.name}/>
    }
}

export class Thumb extends Component {
    render() {
        const text = this.props.text ? this.props.text : "";

        return <div className="imgBox" style={{backgroundImage: 'url(' + this.props.url + ')'}}>
            { text }
        </div>
    }
}

export class ImgBox extends Component {
    render() {
        return <div className="bigImgBox">
            <img src={this.props.url} className="bigImg"/>
        </div>
    }
}
