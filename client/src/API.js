const BASEURL = '/api';

//get classification (HALL_OF_FAME)
async function getClassification() {
    const response = await fetch(BASEURL + '/classification');
    const tasksJson = await response.json();
    if (response.ok) {
        return tasksJson.map((t) => { return {   point: t.point, id_user: t.id_user, name: t.name } });
    } else {
        throw tasksJson;  // An object with the error coming from the server
    }
};





function createClassificatio(c) {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/classification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({point: c.point, id_user: c.id_user, name:c.name } ),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {             
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
};

async function updateClassification(id_user, point) {

    const response = await fetch(BASEURL + '/classification', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_user : id_user,
          point : point
        })
      });
  
    return response.ok;
}

function createGame(game) {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_utente:game.id_utente, date:game.date, difficult:game.difficult, point:game.point, duration:game.duration, name:game.name} ),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {             
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
};

async function getUserGames(id_user) {
    
    const response = await fetch(BASEURL + '/games/' + id_user);
    const tasksJson = await response.json();
    if (response.ok) {
        return tasksJson.map((game) => { return { id:game.id, id_utente:game.id_utente, date:game.data, difficult:game.difficult, point: game.point, duration:game.duration } });
    } else {
        throw tasksJson;  // An object with the error coming from the server
    }
};





async function getLetter() {
    const response = await fetch(BASEURL + '/letter');
    const tasksJson = await response.json();
    if (response.ok) {
        return tasksJson.map((t) => {return {lettera:t.lettera , frequenza:t.frequenza}});
    } else {
        throw tasksJson;  // An object with the error coming from the server
    }
};

async function getWord(value) {
    const response = await fetch(BASEURL + '/word/' + value);
    const tasksJson = await response.json();
    if (response.ok) {
        return tasksJson;
    } else {
        throw tasksJson;  // An object with the error coming from the server
    }
};


//login
async function logIn(credentials,history) {
    return new Promise((resolve, reject) => {
        fetch(BASEURL+'/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        }).then((response) => {
          if (response.ok) {
            response.json().then((user) => {
              resolve(user)
            }).finally(()=>{
                
              }).catch((err) => reject(err));
          } else {
            reject();
          }
        }).catch((err) => reject(err));
      });
};

//logout
async function logOut() {
    await fetch(BASEURL + '/sessions/current', { method: 'DELETE' });
};



const API = {  logIn, logOut, getClassification,  createClassificatio, createGame, getUserGames,  getLetter,  updateClassification, getWord};
export default API;