import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const Cockpit = ({ title, toggle, persons, showPersons }) => {
   const btnRef = useRef(null);
   const authContext = useContext(AuthContext);

   // useEffect hace el trabajo de componentDidMount y componentDidUpdate simultaneamente
   // el primer paraetro es la funcion que se ejecutara y el segundo paramentro es un array que define que elementos deben cambiar para que se ejecute la funcion nuevamente
   // en caso de solo querer que se ejecute una vez se puede dejar el array vacio []
   useEffect(() => {
      console.log('[Cockpit.js] useEffect()');
      // Http request...
      // setTimeout(() => {
      //    alert('Saved data to cloud.');
      // }, 1000);

      btnRef.current.click();

      return () => {
         // clearTimeout(timer);
         console.log('[Cockpit.js] cleanup work in useEffect()');
      };
   }, []);

   // se pueden tener los useEffect que quiera en caso ta se quieran hacer operaciones que dependen de diferentes cosas

   useEffect(() => {
      console.log('[Cockpit.js] 2nd useEffect()');
      return () => {
         console.log('[Cockpit.js] cleanup work in 2nd useEffect()');
      };
   });

   let btnClass = [classes.Button];

   if (showPersons) {
      btnClass.push(classes.Red);
   }

   let assignedClasses = [];
   if (persons <= 2) {
      assignedClasses.push(classes.red);
   }
   if (persons <= 1) {
      assignedClasses.push(classes.bold);
   }

   return (
      <div>
         <h1>{title}</h1>
         <p className={assignedClasses.join(' ')}>This is really working!</p>
         <button ref={btnRef} className={btnClass.join(' ')} onClick={toggle}>Toggle Persons</button>
         <button onClick={authContext.login}>LogIn</button>
      </div>
   );
}

// React.memo() sirve para hacer una especie de shouldComponentUpdate() donde React compara las props anteriores vs las actuales y renderiza solo si es necesario
export default React.memo(Cockpit);