const validator = require('express-validator')
const commonRules = ['notEmpty', 'isNumeric', 'isEmail', 'isArray', 'isLength', 'isString']

global.bodyValidation = (field, rules) => {
  return validation('body', field, rules)
}

global.queryValidation = (field, rules) => {
  return validation('query', field, rules)
}

global.paramsValidation = (field, rules) => {
  return validation('params', field, rules)
}

const validation = (type, field, rules) => {
  let validationBuilder = [],
    rule = null,
    value = null,
    option = null,
    condition = null

  for (let rule in rules) {
    value = rules[rule]
    if (commonRules.indexOf(rule) > -1) {
      if (typeof value === 'object') {
        for (option in value) {
          condition = {}
          condition[option] = value[option]
          validationBuilder.push(
            validator[type](field, global.trans(`validation.${rule}.${option}`,
              rules.field || 'field',
              value[option]))[rule](condition)
          )
        }
        continue
      }

      validationBuilder.push(validator[type](field, global.trans(`validation.${rule}`,
        rules.field || 'field'))[rule]())
    }

    if (rule === 'isIn') {
      validationBuilder.push(
        validator[type](field, global.trans('validation.isIn',
          rules.field || 'field',
          value.join(', '))).isIn(
          rules[rule]
        )
      )
    }
  }

  return validationBuilder
}
