import './main.css';

import React from 'react';
import {render} from 'react-dom';
import App from './components/App.jsx';

import alt from './libs/alt'
import storage from './libs/storage'
import persist from './libs/persist'

persist(alt, storage, 'app')

render(<App />, document.getElementById('app'));