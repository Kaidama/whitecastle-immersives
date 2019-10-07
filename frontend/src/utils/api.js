import Axios from './Axios';
import jwt_decode from 'jwt-decode';
import setAuthJWT from './setAuthJWT';

export const apiHandleSignUp = (userInfo) => {

  return new Promise((resolve, reject) => {

      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': "*",
            
          }
      };

      Axios.post('/signup', userInfo, axiosConfig)
           .then( result => {

              const { token } = result.data;

              localStorage.setItem('jwtToken', token);

              const decoded = jwt_decode(token);

              setAuthJWT(token);

              resolve(decoded);

           })
           .catch( error => {
               reject(error);
           })
  

  });
}

export const apiHandleSignin = (userInfo) => {

  return new Promise((resolve, reject) => {

      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': "*",
            
          }
      };

      Axios.post('/signin', userInfo, axiosConfig)
           .then( result => {

              const { token } = result.data;

              localStorage.setItem('jwtToken', token);

              const decoded = jwt_decode(token);

              setAuthJWT(token);

              resolve(decoded);

           })
           .catch( error => {
               reject(error);
           })
  

  });
}

export const handleJWTExpirationApi = () => {

    return new Promise((resolve, reject) => {

        let token = localStorage.getItem('jwtToken');
        let currentTime = Date.now() / 1000;
        let decoded = jwt_decode(token);

        if (decoded.exp < currentTime) {
            localStorage.removeItem('jwtToken');
            setAuthJWT(null);
            reject(null);
        } else {
            setAuthJWT(token);
            resolve(decoded);
        }
    });
}

export const apiHandleCreateSurvey = (survey) => {

    //make ajax call to the server with survey data object and user ID
    return new Promise((resolve, reject) => {

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': "*"
            }
        };

        let token = localStorage.getItem('jwtToken');
        // console.log(token)
        const decoded = jwt_decode(token);
        console.log(token)
        survey.id = decoded.id


  
        Axios.post('/api/survey', survey, axiosConfig)
             .then( result => {
  
                const { token } = result.data;
  
        
                setAuthJWT(token);
  
                resolve(decoded);
  
             })
             .catch( error => {
                 reject(error);
             })
    
  
    });

}   