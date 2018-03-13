import {Component} from "react";
import * as React from "react";

export default class ImageHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            result: []
        };
        this.api_url = "http://localhost:8080/users/47e37f73ba/images/dc0e2";
    }

    api_url;

    componentDidMount() {
        fetch(this.api_url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        result: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, result } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {result.filtered.map(filter => (
                            <li key={filter.id}>
                                <a href={filter.thumb_url}>{filter.name}</a>
                            </li>
                        ))
                    }
                </ul>
            );
        }
    }
}