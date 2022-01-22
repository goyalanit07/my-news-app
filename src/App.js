import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import NewsComponent from './Components/NewsComponent';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  const [progress, setProgress] = useState(20);

  return (
    <div>

      <Router>
        <Navbar />
        <LoadingBar color='#f11946' height={2} progress={progress} />
        <Switch>
          <Route exact path="/"><NewsComponent setProgress={setProgress} pageSize={15} key={'general'} category={'general'} /></Route>
          <Route exact path="/business"><NewsComponent setProgress={setProgress} pageSize={15} key={'business'} category={'business'} /></Route>
          <Route exact path="/entertainment"><NewsComponent setProgress={setProgress} pageSize={15} key={'entertainment'} category={'entertainment'} /></Route>
          <Route exact path="/health"><NewsComponent setProgress={setProgress} pageSize={15} key={'health'} category={'health'} /></Route>
          <Route exact path="/science"><NewsComponent setProgress={setProgress} pageSize={15} key={'science'} category={'science'} /></Route>
          <Route exact path="/sports"><NewsComponent setProgress={setProgress} pageSize={15} key={'sports'} category={'sports'} /></Route>
          <Route exact path="/technology"><NewsComponent setProgress={setProgress} pageSize={15} key={'technology'} category={'technology'} /></Route>
        </Switch>

      </Router>
    </div>
  )

}
