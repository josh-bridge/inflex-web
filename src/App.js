import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Inflex from "./image/inflex";


class App extends Component {
  render() {
      const title = 'Inflex';
      const apiUrl = 'http://localhost:8080';
      const creators = 'https://vignette.wikia.nocookie.net/itsalwayssunny/images/0/06/We%27re_lawyers%21.jpg/revision/latest?cb=20111101233038';

      return (
      <div className="App">
          <div id="main">
              <nav id="header">
                  <div id="navRightLinks">
                      <ul>
                          <li><a href={ creators }>Creators</a></li>&nbsp;
                          <li><h3 id="title">{ title }</h3></li>&nbsp;
                          <li><a href={ apiUrl }>Login</a></li>
                      </ul>
                  </div>
              </nav>
              <div id="container">
                  <div id="innerTopBox">
                      <div id="innerInner">
                          <div id="upload">
                              {/*<ImageForm apiUrl={ apiUrl }/>*/}
                              <Inflex apiUrl={apiUrl}>

                              </Inflex>
                              {/*<form action={ apiUrl + '/users/47e37f73ba/images' } method="POST" enctype="multipart/form-data">*/}
                              {/*/!*<label for="user_file">Upload Your File</label>*!/*/}
                              {/*<input type="file" name="user_file"/>*/}

                              {/*</form>*/}

                          </div>
                      </div>

                  </div>
              </div>
          </div>

      </div>
    );
  }
}

export default App;
