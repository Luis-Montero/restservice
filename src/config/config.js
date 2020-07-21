// ============================
//           PORT 
// ============================


process.env.PORT = process.env.PORT || 3000;


// ============================
//        ENVIRONMENT 
// ===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//          DATA BASE 
// ===========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost/cafe';

} else {

    urlDB = 'mongodb+srv://coffe-user:25403748@cluster0.jroby.mongodb.net/coffe?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;