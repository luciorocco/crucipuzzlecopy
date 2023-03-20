'use strict';

const express = require('express');
const morgan = require('morgan');
const { check, body, validationResult } = require('express-validator');
const cruciDao = require('./cruci-dao'); // module for accessing the exams in the DB
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./user-dao'); // module for accessing the users in the DB

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
    function (username, password, done) {
        userDao.getUser(username, password).then((user) => {
            if (!user)
                return done(null, false, { message: 'Incorrect username and/or password.' });

            return done(null, user);
        })
    }
));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
    userDao.getUserById(id)
        .then(user => {
            done(null, user); // this will be available in req.user
        }).catch(err => {
            done(err, null);
        });
});

const port = 3001;
const app = new express();

app.use(morgan('dev'));
app.use(express.json());

// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();

    return res.status(401).json({ error: 'User not authenticated' });
}

// set up the session
app.use(session({
    // by default, Passport uses a MemoryStore to keep track of the sessions
    secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
    resave: false,
    saveUninitialized: false
}));



// then, init passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/classification',  async (req, res) => {
    try {
        const result = await cruciDao.getHallOfFame();
        if (result.error)
            res.status(404).json(result);
        else
            res.json(result);
    } catch (err) {
        res.status(500).json({ errors: 'Database error getting classification.' });
    }
});





// POST 
app.post('/api/classification', [
    check('point').isInt(),
    check('id_user').isInt(),
    check('name').isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const classification = {
        point: req.body.point,
        id_user: req.body.id_user,
        name: req.body.name
    };

    try {
        const lastID = await cruciDao.createClassification(classification);
        res.status(201).json({ lastID: lastID });
    } catch (err) {
        res.status(503).json({ errors: 'Database error during the creation of classification ' });
    }
});

app.put('/api/classification/',
        [check('id_user').isInt({ min: 1 }),
        check('point').isInt()],
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() })
            }

            cruciDao.updateClass(req.body.id_user, req.body.point).then((id) => res.status(201).json({ id: id }))
                .catch((err) => res.status(500).json({
                    error: "error " + err
                }));
        });

    





//get
app.get('/api/games/:id_user',  async (req, res) => {
    try {
        const result = await cruciDao.getUserGame(req.params.id_user);
        if (result.error)
            res.status(404).json(result);
        else
            res.json(result);
    } catch (err) {
        res.status(500).json({ errors: 'Database error getting user games.' +'...'+err});
    }
});



//Post
app.post('/api/game', [
    check('id_utente').isInt(),
    check('date').isString(),
    check('difficult').isInt(),
    check('point').isInt(),
    check('duration').isInt(),
    check('name').isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const game = {
        id_utente: req.body.id_utente,
        date: req.body.date,
        difficult: req.body.difficult,
        point: req.body.point,
        duration: req.body.duration,
        name:req.body.name
    };

    

    try {
        const lastID = await cruciDao.createGame(game);
        res.status(201).json({ lastID: lastID });
    } catch (err) {
        res.status(503).json({ errors: 'Database error during the creation of game ' +'...'+ err});
    }
});

//get
app.get('/api/letter',  async (req, res) => {
    try {
        const result = await cruciDao.getLetter();
        if (result.error)
            res.status(404).json(result);
        else
            res.json(result);
    } catch (err) {
        res.status(500).json({ errors: 'Database error getting letter.' });
    }
});

app.get('/api/word/:value',  async (req, res) => {
    try {
        const result = await cruciDao.getWord(req.params.value);
        if (result.error)
            res.status(404).json(result);
        else
            res.json(result);
    } catch (err) {
        res.status(500).json({ errors: 'Database error getting word.....' + err  });
    }
});

/*** Users APIs ***/

// POST /sessions 
// login
app.post('/api/sessions', function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user) {
            // display wrong login messages
            return res.status(401).json(info);
        }
        // success, perform the login
        req.login(user, (err) => {
            if (err)
                return next(err);

            // req.user contains the authenticated user, we send all the user info back
            // this is coming from userDao.getUser()
            return res.json(req.user);
        });
    })(req, res, next);
});

// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
    req.logout();
    res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
    }
    else
        res.status(401).json({ error: 'Unauthenticated user!' });;
});




// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
debugger;