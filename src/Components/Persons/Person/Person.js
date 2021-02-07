import React, { Component } from 'react';
import classes from './Person.css';
import WithClass from '../../../hoc/WithClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
   constructor(props) {
      super(props)
      this.inputElementRef = React.createRef();
   }

   static contextType = AuthContext;

   componentDidMount() {
      this.inputElementRef.current.focus();
      console.log(this.context.authenticated);
   }

   // props = {
   //    name: '',
   //    age: null,
   //    clicked: () => { },
   //    changed: () => { },
   //    isAuth: false
   // }


   render() {
      console.log('[Person.js] rendering...')
      return (
         <WithClass classes={classes.Person}>
            {this.context.authenticated ? <p>Authenticated</p> : <p>please Log in</p>}
            <p onClick={this.props.click}>I'm {this.props.name} and i'm {this.props.age} years old!</p>
            <p >{this.props.children}</p>
            <input ref={this.inputElementRef} type="text" value={this.props.name} onChange={this.props.changed} />
         </WithClass>
      );
   }
}

// const Person = ({ name, age, children, click, changed }) => {
//    console.log('[Person.js] rendering...')
//    return (
//       <div className={classes.Person}>
//          <p onClick={click}>I'm {name} and i'm {age} years old!</p>
//          <p>{children}</p>
//          <input type="text" value={name} onChange={changed} />
//       </div>
//    );
// }

Person.propTypes = {
   click: PropTypes.func,
   changed: PropTypes.func,
   name: PropTypes.string,
   age: PropTypes.number
};

export default Person;