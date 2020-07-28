// ============================
//           PORT 
// ============================


process.env.PORT = process.env.PORT || 3000;


// ============================
//        ENVIRONMENT 
// ===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//    TOKEN EXPIRATION TIME
// ===========================
//60 second
//60 min
//24 hr
//30 day


process.env.TOKEN_EXP = 60 * 60 * 24 * 30;


// ============================
//     SEED authentication
// ===========================

process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';

// ============================
//          DATA BASE 
// ===========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost/cafe';

} else {

    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ============================
//      GOOGLE CLIENT ID
// ===========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '638158956153-v4pc5mmusbr8u6f7hfmqli2pqv0k14st.apps.googleusercontent.com';