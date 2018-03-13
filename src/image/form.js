import {Component} from "react";
import * as React from "react";
import Dropzone from 'react-dropzone'
import request from 'superagent';
import FilteredThumbs, {ImgBox} from "./show";
import $ from 'jquery'

const handleDropRejected = (...args) => console.log('reject', args);

export class ImageDrop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: {preview: ""},
            result: null,
            isError: false,
            processing: false
        };

        this.handleDrop = this.handleDrop.bind(this);
    }

    getImg = (result) => {
        this.setState({
            isLoaded: true,
            isError: false,
            result: result,
            processing: false
        });
        console.log(result)
    };

    getErr = (error) => {
        this.setState({
            isLoaded: true,
            isError: true,
            error,
            processing: false
        });
        console.log(error)
    };

    handleDrop(files) {

        // const fetch_retry = async (url, options, n) => {
        //     for (let i = 0; i < n; i++) {
        //         try {
        //             return await fetch(url, options);
        //         } catch (err) {
        //             const isLastAttempt = i + 1 === n;
        //             if (isLastAttempt) throw err;
        //         }
        //     }
        // };
        //
        // function fetch_retry(url, options, n) {
        //     return new Promise(function(resolve, reject) { // <--- we know it is asynchronous, so just return a promise first!
        //         fetch(url, options)
        //             .then(function(result) {
        //                 prev.getImg()
        //             }).catch(function(error) {
        //             /* on failure */
        //         })
        //     });
        // }

        this.setState({ file: files[0], processing: true });
        console.log("Sending post");
        let upload = request.post(this.props.apiUrl + '/users/47e37f73ba/images')
            .field('user_file', files[0]);

        console.log("Sent - mabye");

        let prev = this;

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            } else {
                // prev.setState({
                //     processing: true
                // });
                console.log(response.body);

                $.ajax({
                    url : response.body.im_url,
                    type : 'GET',
                    tryCount : 0,
                    retryLimit : 3,
                    success : prev.getImg,
                    error : function(xhr, textStatus, errorThrown ) {
                        function retry() {
                            $.ajax(this);
                        }
                        // if (textStatus === 'timeout') {
                        if (xhr.status >= 400) {
                            console.log(xhr.body);
                            this.tryCount++;
                            if (this.tryCount <= this.retryLimit) {
                                setTimeout(retry, 1000)
                            }
                        } else {
                            prev.getErr(xhr.body)
                        }
                    }
                });


                // fetch(response.body.im_url)
                //     .then(res => res.json())
                //     .then(
                //         prev.getImg,
                //         // Note: it's important to handle errors here
                //         // instead of a catch() block so that we don't swallow
                //         // exceptions from actual bugs in components.
                //         prev.getErr);
            }
        });
    }

    render() {
        const { preview } = this.state.file;
        // window.URL.revokeObjectURL(preview);

        const style = preview ? {} : {height: '500px'};

        return (
            <section>
                <Dropzone onDropAccepted={this.handleDrop}
                          accept="image/jpeg,image/jpg,image/png"
                          multiple={ false }
                          onDropRejected={ handleDropRejected }
                          name='file'
                          className="dragZone"
                          style={ style }>
                    {({ isDragReject }) => {
                        if (isDragReject) {
                            alert("This file is not authorized");
                        }
                    }}
                    { preview && <ImgBox url={ preview }/> }
                    { this.props.children }
                </Dropzone>
                { preview && <FilteredThumbs
                    result={this.state.result}
                    preview={this.state.file.preview}
                    state={{proc: this.state.processing,
                            read: this.state.isReady,
                            err: this.state.isError}}/> }

            </section>
        )
    }
}

// export class ImageSubmit extends Component {
//     render() {
//         return (
//             <button type="submit">Upload</button>
//         )
//     }
// }

// export default class ImageForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: null
//         };
//
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleChange() {
//         this.setState({value: this.im.state.image});
//     }
//
//     handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.value);
        // event.preventDefault();

        // let reader = new FileReader(),
        //     file = this.im.state.file;
        //
        // reader.onload = (upload) => {
        //     form.setState({
        //         processing: true
        //     });
        //
        //     let data = new FormData();
        //     data.append("user_file", upload.target.result);
        //
        //     const promise = $.ajax({
        //         url: form.props.apiUrl + '/users/47e37f73ba/images',
        //         type: "POST",
        //         data: data,
        //         processData: false, // Don't process the files
        //         contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        //         // mimeType: 'multipart/form-data',
        //         dataType: 'json'
        //     });
        //
        //     promise.done(function(data){
        //         form.clearForm();
        //         window.URL.revokeObjectURL(form.im.state.preview);
        //         form.setState({
        //             processing: false,
        //             // uploaded_uri: data.uri
        //         });
        //         console.log(data)
        //     });
        //
        //     promise.fail(function(data) {
        //         console.log('failed to register');
        //     });
        // };
        //
        // reader.readAsDataURL(file);
        //
        // const form = this;


//     }
//
//     clearForm() {
//         this.setState({
//             value: null
//         });
//     }
//
//     render() {
//         return <ImageDrop ref={(im) => {this.im = im;}} apiUrl={this.props.apiUrl}/>
//     }
// }