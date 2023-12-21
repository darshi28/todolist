

function getRefreshToken () {
    let refToken ='';
    refToken = localStorage.getItem('refresh_token');
   return refToken;
}

function setRefreshToken (ref_token) {
    localStorage.setItem('refresh_token', ref_token);
}

function setAccessToken(response) {
    let jwt = response.data['jwt'];
    let reftoken = response.data['refresh_token'];
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('refresh_token', reftoken);

}
function setJwtToken (jwt_token) {
   localStorage.setItem('jwt',jwt_token);
}


export { setRefreshToken, setAccessToken, setJwtToken, getRefreshToken};