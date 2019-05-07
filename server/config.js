const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

console.log('inside config file');

passport.use(new GoogleStrategy({
    clientID: '839858628910-gcl2hjih9vacbhopd60thr28evmvt14o.apps.googleusercontent.com',
    clientSecret: 'DfYz9n-d3SSPFaxo-6K6ltaa',
    callbackURL: '/auth/google/redirect'
}, ()=>{
    console.log('comething');
}));