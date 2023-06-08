const db = require('../db');

class TokenController {
  async createToken(req, res) {
    const { token, user_id } = req.body;
    const newToken = await db.query(
      'INSERT INTO tokens (token, user_id) VALUES ($1, $2) RETURNING *',
      [token, user_id]
    );
    res.json(newToken.rows[0]);
  }
  async getTokensByUser(req, res) {
    const id = req.query.id;
    const tokens = await db.query('SELECT * FROM tokens WHERE user_id = $1', [
      id,
    ]);
    res.json(tokens.rows);
  }
  async updateToken(req, res) {
    const id = req.params.id;
    const { token } = req.body;
    const user = await db.query(
      'UPDATE tokens SET token = $1 WHERE id = $2 RETURNING *',
      [token, id]
    );
    res.json(user.rows[0]);
  }
  async deleteToken(req, res) {
    const id = req.params.id;
    // if (req.query.login === 'admin' && req.query.password === '12345') {
    const user = await db.query('DELETE FROM tokens WHERE id = $1', [id]);
    // }
    res.json(user.rows[0]);
  }
}

module.exports = new TokenController();
