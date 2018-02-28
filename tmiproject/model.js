var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tester',
  password : 'tester',
  database : 'moods'
});

connection.connect(function (err) {
  if (err) { console.log('DATABASE CONNECTION ERROR!', err); }
  console.log('connected as id ' + connection.threadId);
})

//WHY NOT WORKED?
// connection.query('SELECT * FROM mooddata', function (err, rows, fields) {
//   if (err) { console.log('DATABASE ERROR = ', err) };
//   console.log('ROWS  = ', rows);
//   console.log('FIELDS = ', fields);

// });



// origMessageData =  { person: 'harry', text: 'sally' }
//itemData =  { probability: { neg: 0.5095519989067516, neutral: 0.7813520119145044, pos: 0.4904480010932484 }, label: 'neutral' }
var save = function(origMessageData, itemData, callback) {
  // console.log('origMessageData = ', origMessageData);
  // console.log('origMessageData TYPE = ', typeof origMessageData);
  // console.log('itemData = ', itemData);
  // console.log('itemData TYPE = ', typeof itemData);
  connection.query(
    `INSERT INTO mooddata (ownerName, message, moodDataPositive, moodDataNeutral, moodDataNegative, moodLabel) VALUES ('${origMessageData.person}', '${origMessageData.text}', ${itemData.probability.pos}, ${itemData.probability.neutral}, ${itemData.probability.neg}, '${itemData.label}' );`,
    function (err, rows, fields) {
      if (err) { console.log('ERROR SAVING TO DATABASE'); throw err};
      console.log('Your Message Data Was Saved To The Database!');
      callback();
      // if (err) {
      //   callback(err, null);
      // } else {
      //   callback(null, rows);
      // }
    })
}


var find = function(callback) {
  connection.query('SELECT * FROM mooddata', function (err, rows, fields){
    // if (err) {console.log('There was an error retrieving data from the datbase')};
    //console.log('QUERIED ROWS = ', rows);
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

var findOne = function(callback) {
  connection.query('SELECT * FROM mooddata ORDER BY id DESC LIMIT 1;', function (err, rows, fields){
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

var findAllUsernames = function(callback) {
  connection.query('SELECT DISTINCT ownerName FROM mooddata;', function (err, rows, fields){
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}


var deleteFn = function(callback) {
  //connection.query('TRUNCATE TABLE mooddata;', function (err, rows, fields){
  connection.query('DELETE FROM mooddata WHERE id > 3', function (err, rows, fields){
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}



var getCurrentUserDataFn = function(username, callback) {
  connection.query(`SELECT * FROM mooddata WHERE ownerName = '${username}';`, function (err, rows, fields){
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

module.exports.connection = connection;
module.exports.save = save;
module.exports.find = find;
module.exports.findOne = findOne;
module.exports.findAllUsernames = findAllUsernames;
module.exports.deleteFn = deleteFn;
module.exports.getCurrentUserDataFn = getCurrentUserDataFn;


 