import React, { Component } from 'react';
require('../css/Loading.css');

class Loading extends Component {
    render() {
        return (
            <div>
                <div class='face'>
                    <div class='container'>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png' width='48px' height='48px' />
                        <span class='loading'></span>
                        <div class="caption">
                            <h2>Opportunities</h2>
                            <ul>
                                <li>O</li>
                                <li>N</li>
                                <li>T</li>
                                <li>H</li>
                                <li>E</li>
                                <li>W</li>
                                <li>A</li>
                                <li>Y</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loading;