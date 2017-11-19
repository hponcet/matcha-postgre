const keys = {
  PSEUDO_EXIST: 'Ce pseudonyme esxiste déja',
  EMAIL_EXIST: 'Cet email existe déja'
}

const Keys = (key) => {
  if (!key) return null
  return keys[key]
}

export default Keys
