import React from "react";
import { Route, Switch } from 'react-router-dom';
import NestedTrainContainer from './NestedTrainContainer'
import TeamContainer from './TeamContainer'
import './MainContainer.css'
import AllQuestions from './AllQuestions';
import AllTeamContainer from './AllTeamContainer'
class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        trainitems: []
    }
    this.updateTrainStateOnChange = this.updateTrainStateOnChange.bind(this);
    this.addTrainStateOnChange = this.addTrainStateOnChange.bind(this);
}

updateTrainStateOnChange (fullTrainData, changedTrainData)  {
    console.log("Going to update new train " , fullTrainData);
    console.log("Changed train data",changedTrainData);
    const requestOptions = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(changedTrainData)
    };

    console.log("Train id is " , fullTrainData._id);
    const patchurl = 'http://localhost:3001/trains/' +fullTrainData._id; 
    fetch(patchurl, requestOptions)
    .then(res => res.json())
    .then((data) => {
        console.log("Patch is successfully sent and response is received ", data);
       var newTrainItems = this.state.trainitems;
       for (const i in this.state.trainitems) {
        if ( this.state.trainitems[i]._id === fullTrainData._id ) {
            this.state.trainitems[i] = fullTrainData;
             }
        }
        this.setState({ trainitems: newTrainItems });
    })
    .catch(console.log)
}

addTrainStateOnChange (newTrainModelItem)  {
    console.log("Going to update new train " , newTrainModelItem);
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(newTrainModelItem)
    };
    fetch('http://localhost:3001/trains', requestOptions)
    .then(res => res.json())
    .then((data) => {
        console.log("Post is successfully sent and response is received ", data);
       var newTrainItems = this.state.trainitems;
       newTrainItems.push(data);
       this.setState({ trainitems: newTrainItems });
    })
    .catch(console.log)
}

componentDidMount() {
fetch('http://localhost:3001/trains')
    .then(res => res.json())
    .then((data) => {
      this.setState({ trainitems: data })
    })
    .catch(console.log)
}

render() {
    //            

    /*
                <Route path="/questions" component={ props => (<QuestionSetupContainer/>)} />
            <Route path="/add" component={AddQues}/>

    */

  return (
      <div className="maincontent" >
        
        <Switch>
            <Route path="/trains/:trainName/:teamName"  component={ props => (<TeamContainer />)} />
            <Route path="/trains/:trainName"  component={ props => (<AllTeamContainer propitems={this.state.trainitems} onAdd={this.addTrainStateOnChange} onChange={this.updateTrainStateOnChange}/>)} />
            <Route path="/trains" component={ props => (<NestedTrainContainer propitems={this.state.trainitems} onAdd={this.addTrainStateOnChange} onChange={this.updateTrainStateOnChange}/>)} />
            <Route path="/questions" component={ props => (<AllQuestions/>)} />
            <Route exact path="/" component={ props => (<NestedTrainContainer propitems={this.state.trainitems}  onAdd={this.addTrainStateOnChange} onChange={this.updateTrainStateOnChange}/>)} />
        </Switch>
      </div>

  );
}
}

export default MainContainer;