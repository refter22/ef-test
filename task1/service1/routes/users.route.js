import express from 'express'

import {
  getUsersList,
  createUser,
  updateUser
} from '../controllers/users.controller.js'
import createUserValidator from '../validators/user.validator.js'
import validateRequest from '../middlewares/validateRequest.middleware.js'

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - age
 *       properties:
 *         id:
 *           type: string
 *           description: Уникальный идентификатор пользователя
 *         firstName:
 *           type: string
 *           description: Имя пользователя
 *         lastName:
 *           type: string
 *           description: Фамилия пользователя
 *         email:
 *           type: string
 *           description: Электронная почта пользователя
 *         age:
 *           type: number
 *           description: Возраст пользователя
 *       example:
 *         id: 1
 *         firstName: Иван
 *         lastName: Иванов
 *         email: ivanov@example.com
 *         age: 30
 */

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Создание нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - age
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: Имя пользователя
 *               lastName:
 *                 type: string
 *                 description: Фамилия пользователя
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Электронная почта пользователя
 *               age:
 *                 type: integer
 *                 minimum: 1
 *                 description: Возраст пользователя
 *             example:
 *               firstName: Иван
 *               lastName: Иванов
 *               email: ivanov@example.com
 *               age: 30
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/create', createUserValidator, validateRequest, createUser)

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Обновление существующего пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Объект обновленного пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.put('/update', updateUser)

/**
 * @swagger
 * /users/list:
 *   get:
 *     summary: Получение списка всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Массив объектов пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/list', getUsersList)

export default router
