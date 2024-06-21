import { body } from 'express-validator'

const createUserValidator = [
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('Необходимо указать имя')
    .matches(/^[а-яА-Я]+$/)
    .withMessage('Имя должно состоять только из букв'),
  body('lastName')
    .not()
    .isEmpty()
    .withMessage('Необходимо указать фамилию')
    .matches(/^[а-яА-Я]+$/)
    .withMessage('Фамилия должна состоять только из букв'),
  body('email')
    .not()
    .isEmpty()
    .withMessage('Необходимо указать email')
    .isEmail()
    .withMessage('Некорректный email'),
  body('age')
    .not()
    .isEmpty()
    .withMessage('Необходимо указать возраст')
    .isInt()
    .withMessage('Возраст должен быть числом')
]

export default createUserValidator
