import React, {Component} from 'react';
import logo from './logo.svg';
import Caro from './Caro';
import './App.css';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
const store = createStore(reducer, compose(
    window.devToolsExtension?window.devToolsExtension(): f => f
));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </header>
                    <p className="App-intro">
                        My Caro
                    </p>

                    <Caro cols="29" rows="13" />
                </div>
            </Provider>
        );
    }
}

export default App;
