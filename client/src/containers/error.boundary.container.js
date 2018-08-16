// import React, { Component } from 'react';
// import LazyLoad from 'react-lazyload';

// /* -- Import Images -- */
// import ErrorImg from '../../assets/img/monkey.jpeg';

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       hasError: false,
//     };
//   }

//     componentDidCatch = (error, info) => {
//       console.log(info);
//       this.setState(state => ({
//         ...state,
//         hasError: true,
//       }));
//     }

//     render() {
//       if (this.state.hasError) {
//         return (
//           <div className="error--container">
//             <LazyLoad height={200} offset={100} once>
//               <img src={ErrorImg} alt="404" className="error--image" />
//             </LazyLoad>
//             <div className="tc f-regular lh-1 error--p">
//               <div className="f-xl lh-1 error--p-1">
//                 <p className="main-blue">Oops !</p>
//                 <p className="main-blue">Something went wrong !</p>
//               </div>
//               <div className="mt4 fw3 error--p-2">
//                 <p>Brace yourself till we get the error fixed.</p>
//                 <p>You may also refresh the page or try again later.</p>
//               </div>
//             </div>
//           </div>
//         );
//       }
//       return this.props.children;
//     }
// }

// export default ErrorBoundary;
