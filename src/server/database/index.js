import Mysql from 'mysql'

export default class Database {
  constructor(config) {
    this.connection = Mysql.createConnection(config);
    this.connection.connect();
  }

  close() {
    this.connection.close();
  }

  /**
   * Nacte info o hraci
   * @param int playerId id hrace
   * @returns {Promise}
   */
  getPlayer(playerId) {

    return new Promise((resolve, reject) => {
      console.log(`TODO nacist hrace id: ${playerId} vracim hodnotu napevno`);

      let res = {}

      switch (parseInt(playerId)) {
        case 1:
            res = {
              id: 1,
              name: 'Vaclav',
              surname: 'Jurecek'
            };

          break;

        case 2:
            res = {
              id: 2,
              name: 'Jan',
              surname: 'Novak'
            };

          break;

        default:
          return reject(`Unknown player with id ${playerId}.`)
      }


      return resolve(res);
    });
  }

  /**
   * Nacte info o moderatorovi
   * @param int moderatorId id moderatora
   * @returns {Promise}
   */
  getModerator(moderatorId) {

    return new Promise((resolve, reject) => {
      const query = `
              SELECT
                *
              FROM
                jom35_kviz_moderator
              WHERE
                id = ${moderatorId}
            `;

      this.connection.query(query, (err, rows, fields) => {
        if (err) {
          return reject(err);
        } else {
          if (rows.length > 1) {
            return reject(`More then one row returned by query, id ${moderatorId} is not unique. Cannot load moderator.`)
          }

          return resolve(rows[0]);
        }
      });
    });
  }

  getPlayerTeam(playerId) {
    return new Promise((resolve, reject) => {
      console.log('TODO nacitani tymu');

      return resolve({
        id: 1,
        title: 'team 1',
      });
    });
  }

  /**
   * Nacte info o udalosti
   * @param int id udalosti
   * @returns {Promise}
   */
  getEvent(eventId) {
    return new Promise((resolve, reject) => {
      const query = `
              SELECT
                *
              FROM
                jom35_kviz_event 
              WHERE
                id = ${eventId}
            `;

      this.connection.query(query, (err, rows, fields) => {
        if (err) {
          return reject(err);
        } else {
          if (rows.length > 1) {
            return reject(`More then one row returned by query, id ${eventId} is not unique. Cannot load event.`)
          }

          return resolve(rows[0]);
        }
      });
    });
  }

  /**
   * Nacte info o moderatorovi udalosti
   * @param int id udalosti
   * @returns {Promise}
   */
  getModeratorForEvent(eventId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          * 
        FROM 
          jom35_kviz_moderator 
        WHERE 
          id = (
            SELECT 
              moderator_id 
            FROM 
              jom35_kviz_event 
            WHERE 
              id = ${eventId}
          )
      `;

      this.connection.query(query, (err, rows, fields) => {
        if (err) {
          return reject(err);
        } else {
          if (rows.length > 1) {
            return reject(`More then one row returned by query, id ${eventId} is not unique. Cannot load moderator.`)
          }

          return resolve(rows[0]);
        }
      });
    });
  }


}

