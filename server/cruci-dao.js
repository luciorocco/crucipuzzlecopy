'use strict';
/* Data Access Object (DAO) module for accessing tasks and exams */

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('cruciPuzzle.db', (err) => {
    if (err) throw err;
});


exports.getHallOfFame = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM HALL_OF_FAME';
        db.all(sql, [], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ errors: ' Not found.' });
            } else {
                const classification = row.map((p) => ({
                    point: p.punteggio, id_user: p.id_user, name: p.name
                }));
                resolve(classification);
            }
        });
    });
};


exports.getWord = (value) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM WORDS WHERE word = ?';
        db.get(sql, [value], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};



exports.createClassification = (c) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO HALL_OF_FAME(punteggio, id_user, name) VALUES( ?, ?, ?)";
        db.run(sql, [c.point, c.id_user, c.name], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.updateClass = (id_user, point) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE HALL_OF_FAME SET punteggio= punteggio + ? WHERE id_user = ?';
        db.run(sql, [point,id_user], function (err) {
            if (err) {
                reject(err);
                return;
            }
            if (this.changes === 0) {
                resolve({ errors: 'User not found.' });
            }
            resolve(this.lastID);
        });
    });
};


exports.getUserGame = (id_user) => {
    console.log(id_user)
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM STORY_GAME WHERE id_utente = ?';
        db.all(sql, [id_user], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ errors: ' Not found.' });
            } else {
                const games = row.map((p) => ({
                    id: p.id, id_utente: p.id_utente, data: p.creation_date, difficult: p.difficolta, point: p.punteggio, duration: p.game_duration
                }));

                resolve(games);
            }
        });
    });
};

exports.createGame = (game) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO STORY_GAME(id_utente, creation_date, difficolta, punteggio, game_duration, name) VALUES( ?, ?, ?, ?,?, ?)";
        db.run(sql, [game.id_utente, game.date, game.difficult, game.point, game.duration, game.name], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};



exports.getLetter = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM LETTERE ';
        db.all(sql, [], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ errors: ' Not found.' });
            } else {
                const letter = row.map((p) => ({ lettera: p.lettera, frequenza: p.frequenza }));
                resolve(letter);
            }
        });
    });
};