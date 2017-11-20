const keys = {
  PSEUDO_EXIST: 'Ce pseudonyme esxiste déja',
  EMAIL_EXIST: 'Cet email existe déja',
  UNKNOWN_ERROR: 'Une érreur inconnue s\'est produite.',
  NETWORK_ERROR: 'Ils semblerait que vous n\'ayez pas de connection avec internet',
  LOGIN_UNKNOWN_PSEUDO: 'Aucun compte ne correspond à ce pseudo',
  LOGIN_BAD_PASSWORD: 'Le mot de passe ne correspond pas'
}

const Keys = (key) => {
  if (!key) return null
  return keys[key] || key
}

export default Keys
