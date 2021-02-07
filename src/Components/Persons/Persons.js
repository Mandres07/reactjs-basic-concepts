import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
   // static getDerivedStateFromProps(props, state) {
   //    console.log('[Persons.js] getDerivedStateFromProps', props);
   //    return state;
   // }


   // Si se quiere verificar que ninguna prop cambia para decidir si se renderiza o no es mejor extender la clase a PureComponent porque esto ya tiene definido ese metodo
   // de shouldComponentUpdate comprobndo que todo el prop sea igual al anterior o no.
   shouldComponentUpdate(nextProps, nextState) {
      console.log('[Persons.js] shouldComponentUpdate', nextProps, nextState);
      // aqui verificamos que los props utilizados son diferentes para poder renderizar
      if (nextProps.persons !== this.props.persons || nextProps.clicked !== this.props.clicked || nextProps.changed !== this.props.changed || nextProps.isAuthenticated !== this.props.isAuthenticated) {
         return true;
      }
      else {
         return false;
      }
   }

   getSnapshotBeforeUpdate(prevProps, prevState) {
      console.log('[Persons.js] getSnapshotBeforeUpdate', prevProps, prevState);
      return { message: 'Snapchot!' };
   }

   componentWillUnmount() {
      console.log('[Persons.js] componentWillUnmount');
   }

   render() {
      console.log('[Persons.js] rendering...');
      return this.props.persons.map((person, index) => {
         return (
            <Person key={person.id} name={person.name} age={person.age} click={this.props.clicked.bind(this, index)} changed={this.props.changed.bind(this, person.id)} isAuth={this.props.isAuthenticated} />
         );
      });
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      console.log('[Persons.js] componentDidUpdate', snapshot);
   }
}

// const Persons = ({ persons, clicked, changed }) => {
//    console.log('[Persons.js] rendering...')
//    return (
//       <div>
//          {persons.map((person, index) => {
//             return (
//                <Person key={person.id} name={person.name} age={person.age} click={clicked.bind(this, index)} changed={changed.bind(this, person.id)} >
//                   <span>My Hobbies: cooking</span>
//                </Person>
//             );
//          })}
//       </div>
//    );
// };

export default Persons;