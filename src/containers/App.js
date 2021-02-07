import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';
import AuthContext from '../context/auth-context';

class App extends Component {
   constructor(props) {
      super(props);
      console.log('[App.js] constructor');
      // de esta forma se inicializa el state dentro del constructor()
      // this.state = {
      //    persons: [
      //       { id: 'p1', name: 'Mario', age: 28 },
      //       { id: 'p2', name: 'Judith', age: 29 },
      //       { id: 'p3', name: 'Berta', age: 80 }
      //    ],
      //    otherState: 'other value',
      //    showPersons: false
      // }
   }

   // de esta fora se hace lo mismo que con el constructor, por defecto al inicializar el state asi el llamado a super(props) se hace automatico
   state = {
      persons: [
         { id: 'p1', name: 'Mario', age: 28 },
         { id: 'p2', name: 'Judith', age: 29 },
         { id: 'p3', name: 'Berta', age: 80 }
      ],
      otherState: 'other value',
      showPersons: false,
      showCockpit: true,
      changeCounter: 0,
      authenticated: false
   }

   static getDerivedStateFromProps(props, state) {
      console.log('[App.js] getDerivedStateFromProps', props);
      return state;
   }

   nameChangeHandler = (id, event) => {
      const personIndex = this.state.persons.findIndex(p => p.id === id);
      const person = {
         ...this.state.persons[personIndex],
         name: event.target.value
      };
      const persons = [...this.state.persons];
      persons[personIndex] = person;

      // CUando cambiar el state necesita del estado anterior es mejor utilizar la version setState() con arrow function ya que esta funcion recibe el estado anterior y las props actuales
      this.setState((prevState, props) => {
         return { persons: persons, changeCounter: prevState.changeCounter + 1 };
      });
   }

   deletePersonHandler = (personIndex) => {
      // const persons = this.state.persons.slice(); //crea un nuevo array identico
      const persons = [...this.state.persons];
      persons.splice(personIndex, 1);
      this.setState({ persons: persons });
   }

   togglePersonsHandler = () => {
      this.setState({
         showPersons: !this.state.showPersons
      });
   }

   loginHandler = () => {
      this.setState({ authenticated: true });
   }

   render() {
      console.log('[App.js] render');

      let persons = null;
      if (this.state.showPersons) {
         persons = <Persons persons={this.state.persons} clicked={this.deletePersonHandler} changed={this.nameChangeHandler} isAuthenticated={this.state.authenticated} />;
      }

      return (
         <WithClass classes={classes.App}>
            <button onClick={() => { this.setState({ showCockpit: false }) }}>Remove Cockpit</button>
            <AuthContext.Provider value={{ authenticated: this.state.authenticated, login: this.loginHandler }}>
               {this.state.showCockpit &&
                  <Cockpit
                     title={this.props.appTitle}
                     persons={this.state.persons.length}
                     showPersons={this.state.showPersons}
                     toggle={this.togglePersonsHandler}
                  />
               }
               {persons}
            </AuthContext.Provider>
         </WithClass>
      );
   }

   componentDidMount() {
      console.log('[App.js] componentDidMount');
   }

   shouldComponentUpdate(nextProps, nextState) {
      console.log('[App.js] shouldComponentUpdate');
      return true;
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      console.log('[App.js] componentDidUpdate');
   }

   // componentWillMount() {
   //    console.log('[App.js] componentWillMount');
   // }
}

// export default Radium(App);
export default App;
