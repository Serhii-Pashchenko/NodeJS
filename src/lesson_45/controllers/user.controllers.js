const db = require('../db');

class UserController {
  async createUser(req, res) {
    const { name } = req.body;
    const newUser = await db.query(
      'INSERT INTO users (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.json(newUser.rows[0]);
  }
  async getUsers(req, res) {
    const users = await db.query('SELECT * FROM users');
    res.json(users.rows);
  }
  async getOneUser(req, res) {
    const id = req.params.id;
    const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(user.rows[0]);
  }
  async updateUser(req, res) {
    const id = req.params.id;
    const { name } = req.body;
    const user = await db.query(
      'UPDATE users SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    res.json(user.rows[0]);
  }
  async deleteUser(req, res) {
    const id = req.params.id;

    if (req.query.login === 'admin' && req.query.password === '12345') {
      try {
        await db.query('BEGIN');

        await db.query('DELETE FROM tokens WHERE user_id = $1', [id]);
        const user = await db.query(
          'DELETE FROM users WHERE id = $1 RETURNING *',
          [id]
        );

        await db.query('COMMIT');

        res.json({
          success: true,
          message: 'Обліковий запис успішно видалено',
          user: user.rows[0],
        });
      } catch (error) {
        await db.query('ROLLBACK');
        res.status(500).json({
          success: false,
          message: 'Помилка при видаленні облікового запису',
          error: error.message,
        });
      }
    } else {
      res
        .status(403)
        .json({ success: false, message: 'Невірні дані для авторизації' });
    }
  }
}

module.exports = new UserController();
