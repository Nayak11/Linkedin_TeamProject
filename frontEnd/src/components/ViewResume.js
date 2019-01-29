import React, { Component } from 'react';
import { Page} from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack';

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

class ViewResume extends Component {

    constructor(props){
        super(props);
        this.state = {
            numPages : null,
            pageNumber : 1,
        }
    }

    onSuccessfulLoad = ({numPages}) => {
        this.setState({
            numPages,
        })
    }

  render() {
      let {pageNumber, numPages} = this.state;
    return (
      <div>
            <Document file="localhost:3002/PP-18.pdf"
                    onLoadSuccess = {this.onSuccessfulLoad}
                    options = {options}>
            <Page pageNumber = {pageNumber}/>            
        </Document>
      </div>
    )
  }
}

export default ViewResume;