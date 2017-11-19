const _isExisty = (value) => value !== null && value !== undefined
const isEmpty = (value) => value === ''

const validations = {
  isDefaultRequiredValue: (value) => value === undefined || value === '' || value === null,
  isExisty: (value) => _isExisty(value),
  matchRegexp: (value, regexp) => !_isExisty(value) || isEmpty(value) || regexp.test(value),
  isUndefined: (value) => value === undefined,
  isEmptyString: (value) => isEmpty(value),
  isEmail: (value) => validations.matchRegexp(value, /^((([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#$%&'*+\-/=?^_`{|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i),
  isUrl: (value) => validations.matchRegexp(value, /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,=]|:|@)|\/|\?)*)?$/i),
  isTrue: (value) => value === true,
  isFalse: (value) => value === false,
  isNumeric: (value) => (typeof value === 'number') ? true : validations.matchRegexp(value, /^[-+]?(?:\d*[.])?\d+$/),
  isAlpha: (value) => validations.matchRegexp(value, /^[A-Z]+$/i),
  isAlphanumeric: (value) => validations.matchRegexp(value, /^[0-9A-Z]+$/i),
  isInt: (value) => validations.matchRegexp(value, /^(?:[-+]?(?:0|[1-9]\d*))$/),
  isFloat: (value) => validations.matchRegexp(value, /^(?:[-+]?(?:\d+))?(?:\.\d*)?(?:[eE][+-]?(?:\d+))?$/),
  isWords: (value) => validations.matchRegexp(value, /^[A-Z\s]+$/i),
  isSpecialWords: (value) => validations.matchRegexp(value, /^[A-Z\s\u00C0-\u017F]+$/i),
  isPseudo: (value) => validations.matchRegexp(value, /#[a-zA-Z0-9._]#/i),
  haveSpace: (value) => validations.matchRegexp(value, /[\b \b]/i),
  haveNumeric: (value) => validations.matchRegexp(value, /[\b0-9\b]/i),
  isLength: (value, length) => !_isExisty(value) || isEmpty(value) || value.length === length,
  equals: (value, eql) => !_isExisty(value) || isEmpty(value) || value === eql,
  maxLength: (value, length) => !_isExisty(value) || value.length <= length,
  minLength: (value, length) => !_isExisty(value) || isEmpty(value) || value.length >= length
}

const validate = (value, rules, required) => {
  if (!rules) return true
  if (_isExisty(rules.isRequired) && validations.isDefaultRequiredValue(value)) return false
  if (_isExisty(rules.isPseudo) && !validations.isPseudo(value)) return false
  if (_isExisty(rules.noSpace) && !isEmpty(value) && validations.haveSpace(value)) return false
  if (_isExisty(rules.haveNumeric) && !validations.haveNumeric(value)) return false
  if (_isExisty(rules.isEmail) && !validations.isEmail(value)) return false
  if (_isExisty(rules.url) && !validations.isEmail(value)) return false
  if (_isExisty(rules.isEqual) && !validations.isEqual(value, rules.isEqual)) return false
  if (_isExisty(rules.maxLength) && !validations.maxLength(value, rules.maxLength)) return false
  if (_isExisty(rules.minLength) && !validations.minLength(value, rules.minLength)) return false
  if (_isExisty(rules.isInt) && !validations.isInt(value)) return false
  if (_isExisty(rules.isTrue) && !validations.isTrue(value)) return false
  if (_isExisty(rules.isFalse) && !validations.isFalse(value)) return false
  if (_isExisty(rules.isFloat) && !validations.isFloat(value)) return false
  if (_isExisty(rules.isAlpha) && !validations.isAlpha(value)) return false
  if (_isExisty(rules.isAlphanumeric) && !validations.isAlphanumeric(value)) return false
  if (_isExisty(rules.isNumeric) && !validations.isNumeric(value)) return false
  if (_isExisty(rules.isWords) && !validations.isWords(value)) return false
  if (_isExisty(rules.isEmptyString) && !validations.isEmptyString(value)) return false
  if (_isExisty(rules.isLength) && !validations.isLength(value, rules.isLength)) return false
  if (_isExisty(rules.isUndefined) && !validations.isUndefined(value)) return false
  if (_isExisty(rules.isSpecialWords) && !validations.isSpecialWords(value, rules.isSpecialWords)) return false
  return true
}

export default validate
