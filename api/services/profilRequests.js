const query = require('./SQLQueries')('result')

const purposedProfils = (profil, order, offset) => {
  return {
    query: `
      SELECT "biography", "birthday", "location", "profilPicture", "pseudo", "id",
        ${query.addRow.distances(profil.location.loc)} AS distance,
        ${query.addRow.pictures()} AS pictures,
        ${query.addRow.tagsIntersect('$1')} AS "tagsIntersect",
        ${query.addRow.commonsTags('$1')} AS "commonsTags",
        ${query.addRow.score()}  AS "score"
      FROM (
        (
          ${query.geoQuery(profil.location.loc)}
          ${query.expect.id(profil.id)}
          ${query.expect.emptyPicture()}
        )
        ${query.intersect.orientation(profil.orientation)}
      ) AS result
      ${query.order.by(order)}
      LIMIT 12
      OFFSET ${offset || 0}
      `,
    values: [profil.tags]
  }
}

const searchProfils = ({
  profil,
  order,
  offset,
  rangeDistance,
  tags,
  age
}) => {
  return {
    query: `
      SELECT "biography", "birthday", "location", "profilPicture", "pseudo", "id",
        ${query.addRow.distances(profil.location.loc)} AS distance,
        ${query.addRow.pictures()} AS pictures,
        ${query.addRow.tagsIntersect('$1')} AS "tagsIntersect",
        ${query.addRow.commonsTags('$1')} AS "commonsTags",
        ${query.addRow.score()}  AS "score"
      FROM (
        (
          ${query.geoQuery(profil.location.loc, rangeDistance)}
          ${query.expect.id(profil.id)}
          ${query.expect.emptyPicture()}
        )
        ${query.intersect.orientation(profil.orientation)}
        ${query.intersect.age(age)}
        ${tags.length > 0 ? query.intersect.tags('$1') : ``}
      ) AS result
      ${query.order.by(order)}
      LIMIT 12
      OFFSET ${offset || 0}
      `,
    values: [tags]
  }
}

module.exports = {
  purposedProfils,
  searchProfils
}
