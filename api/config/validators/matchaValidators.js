const UsersValidation = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'email',
        'pseudo',
        'sex',
        'birthday',
        'password',
        'firstName',
        'lastName',
        'profilId'
      ],
      properties: {
        email: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        pseudo: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        sex: {
          enum: ['1', '2'],
          description: 'must be a string number between [1, 2] and is required'
        },
        birthday: {
          bsonType: 'date',
          description: 'must be a timestamp and is required'
        },
        password: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        firstName: {
          bsonType: ['string', 'null'],
          description: 'must be a string and is required'
        },
        lastName: {
          bsonType: ['string', 'null'],
          description: 'must be a string and is required'
        },
        profilId: {
          bsonType: ['objectId', 'null'],
          description: 'must be an ObjectId and is required'
        }
      }
    }
  }
}

const ProfilsValidation = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'tags',
        'pseudo',
        'sex',
        'location',
        'birthday',
        'orientation',
        'biography',
        'pictures',
        'profilPicture',
        'userId',
        'profilScore',
        'consultedBy',
        'likes'
      ],
      properties: {
        tags: {
          bsonType: 'array',
          description: 'must be an array and is required'
        },
        pseudo: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        sex: {
          enum: ['1', '2'],
          description: 'must be a string number between [1, 2] and is required'
        },
        location: {
          bsonType: 'object',
          required: [
            'ip',
            'city',
            'region',
            'country',
            'zip',
            'loc'
          ],
          properties: {
            ip: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            city: {
              bsonType: ['string', 'null'],
              description: 'must be a string'
            },
            region: {
              bsonType: ['string', 'null'],
              description: 'must be a string'
            },
            country: {
              bsonType: ['string', 'null'],
              description: 'must be a string'
            },
            zip: {
              bsonType: ['string', 'null'],
              description: 'must be a string'
            },
            loc: {
              bsonType: 'array',
              description: 'must be an array and is required'
            }
          }
        },
        birthday: {
          bsonType: 'date',
          description: 'must be a timestamp and is required'
        },
        orientation: {
          enum: ['1', '2', '3'],
          description: 'must be a string number between [1, 2, 3] and is required'
        },
        biography: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        pictures: {
          bsonType: 'array',
          description: 'must be an array and is required'
        },
        profilPicture: {
          bsonType: ['string', 'null'],
          description: 'must be a string and is required'
        },
        userId: {
          bsonType: 'objectId',
          description: 'must be an ObjectId and is required'
        },
        profilScore: {
          bsonType: 'int',
          description: 'must be an int and is required'
        },
        consultedBy: {
          bsonType: 'array',
          description: 'must be an array and is required'
        },
        likes: {
          bsonType: 'array',
          description: 'must be an array and is required'
        }
      }
    }
  }
}

const TagsValidation = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [ 'name', 'ids' ],
      properties: {
        name: {
          bsonType: 'string',
          description: 'must be a string and is required.'
        },
        ids: {
          bsonType: 'array',
          description: 'must be an array and is required.'
        }
      }
    }
  }
}

module.exports = {
  UsersValidation,
  ProfilsValidation,
  TagsValidation
}
