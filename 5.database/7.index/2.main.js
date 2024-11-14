const {connectToDatabase, queryName, queryAll} = require('./queryTime');

const db = connectToDatabase();

const searchName = '정다사'; // 찾고자 하는 이름

queryName(db, searchName);

db.close();
