import db from '../config/db.js'

class UserRepository {
  async createUser(email, firstName, lastName, age) {
    const query = `
      INSERT INTO users (email, first_name, last_name, age)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `
    const values = [email, firstName, lastName, age]
    try {
      const result = await db.one(query, values)
      return result
    } catch (error) {
      throw new Error('Ошибка при создании пользователя: ' + error.message)
    }
  }

  async getAllUsers() {
    const query = `
      SELECT * FROM users;
    `
    try {
      const users = await db.any(query)
      return users
    } catch (error) {
      throw new Error(
        'Ошибка при получении всех пользователей: ' + error.message
      )
    }
  }

  async updateUser(id, firstName, lastName, email, age) {
    const query = `
      UPDATE users
      SET first_name = $2, last_name = $3, email = $4, age = $5
      WHERE id = $1
      RETURNING *;
    `
    const values = [id, firstName, lastName, email, age]
    try {
      const [oldUser, newUser] = await db.task(async (t) => {
        const oldUserResult = await t.oneOrNone(
          `SELECT * FROM users WHERE id = $1`,
          [id]
        )
        const newUserResult = await t.one(query, values)
        return [oldUserResult, newUserResult]
      })
      return { oldUser, newUser }
    } catch (error) {
      throw new Error('Ошибка при обновлении пользователя: ' + error.message)
    }
  }
}
export default new UserRepository()
