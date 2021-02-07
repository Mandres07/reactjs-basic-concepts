import React from 'react';

const authContext = React.createContext({
   authenticated: false,
   login: () => { }
});

// Sirve para pasar informacion desde un compnente padre a un componente hijo del hijo del hijo.. para no estar pasando las props en toda la cadena se usa context para crearla global

export default authContext;