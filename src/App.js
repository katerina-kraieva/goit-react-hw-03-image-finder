import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css';
import Search from './components/Search';
import GalleryContainer from './components/GalleryContainer/GalleryContainer';

class App extends Component {
  state = {
    search: '',
  };

  addSearch = name => {
    this.setState({ search: name });
  };

  render() {
    const { search } = this.state;
    return (
      <>
        <Search onSubmit={this.addSearch} />
        <GalleryContainer search={search} />
        <ToastContainer position="top-right" />
      </>
    );
  }
}

export default App;
