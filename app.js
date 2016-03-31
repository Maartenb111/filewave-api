var Superagent = require('Superagent');
var Mysql = require('mysql');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

Superagent
  .get('https://its001.itsight.com:20445/inv/api/v1/query/')
  .set('Authorization', 'ezdkYjcwNDNkLTIzNTAtNDM3YS05YTJlLTVkYWQwM2FkZGVkMH0=')
  .set('Accept', 'application/json')
  .end(function (err, res) {
    if (!err) {
      var pJSON = JSON.parse(res.text);

      for (var n = 0; n < pJSON.length; n++) {
        var nId = pJSON[n].id;
        var sName = pJSON[n].name;

        var pConnection = Mysql.createConnection({
          host: 's209.webhostingserver.nl',
          user: 'deb17423n7_test',
          password: '12345',
          database: 'deb17423n7_test',
        });

        var pPost  = { ID: nId, Name: sName };

        pConnection.connect();
        pConnection.query('TRUNCATE inventory', function (err, result) {
          if (err) {
            console.log('Er ging iets mis tijdens het leegmaken!');
          }
        });

        pConnection.query('INSERT INTO inventory SET ?', pPost, function (err, result) {
          if (err) {
            console.log('Er ging iets mis tijdens het opslaan!');
          }
        });

        pConnection.end();
      }
    }
  });
