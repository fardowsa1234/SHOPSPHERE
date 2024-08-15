// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Protector = ({ Component }) => {
//   const navigate = useNavigate();

//   // Assuming you store the token in localStorage or use a context hook
//   const userData = () => {
//     return { jwt: localStorage.getItem('token') };
//   };

//   const { jwt } = userData();

//   useEffect(() => {
//     if (!jwt) {
//       navigate('/login');
//     }
//   }, [navigate, jwt]);

//   return Component;
// };

// export default Protector;
