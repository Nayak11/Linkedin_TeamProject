import React, { Component } from 'react';
require('../css/Footer.css');

class Footer extends Component {
    render() {
        return (
            <div>
                <img className="col-md-12 footerImg" src={require('../images/footerImg.PNG')}>
                </img>
            </div>
        );
    }
}

export default Footer;