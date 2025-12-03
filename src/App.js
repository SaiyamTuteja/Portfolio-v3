import React from 'react';
import './styles/main.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/index';
import About from './apps/About';
import Experience from './apps/Experience';
import Projects from './apps/Projects';
import Skills from './apps/Skills';
import AIAssistant from './apps/AIAssistant';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/experience" component={Experience} />
                <Route path="/projects" component={Projects} />
                <Route path="/skills" component={Skills} />
                <Route path="/ai-assistant" component={AIAssistant} />
            </Switch>
        </Router>
    );
};

export default App;