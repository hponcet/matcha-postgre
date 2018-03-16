const config = require('../config/config')
const emptyPictureProfil = `${config.HOST}:${config.PORT}/files/assets/empty_avatar.jpg`

module.exports = (tableName) => ({
  geoQuery: (location, distance = 1000) => `
    SELECT *
    FROM profils
    WHERE ST_DWithin
    (
      ST_GeomFromGeoJSON('${JSON.stringify(location)}')::geography,
      ST_GeomFromGeoJSON(profils.location::json ->> 'loc')::geography,
      ${distance * 1000}
    )`,
  expect: {
    id: (id) => `
      EXCEPT
      SELECT *
      FROM profils
      WHERE id = '${id}'`,
    emptyPicture: () => `
      EXCEPT 
      SELECT *
      FROM profils
      WHERE "profilPicture" = '${emptyPictureProfil}'`
  },
  intersect: {
    tags: (valuesIndex) => ` 
      INTERSECT SELECT *
      FROM profils
      WHERE tags && ${valuesIndex}::text[]`,

    orientation: orientation => orientation !== '3' ? `
      INTERSECT SELECT *
      FROM profils
      WHERE sex = '${orientation}'` : ``,

    age: age => {
      return (age && age.min && age.max) ? `
        INTERSECT SELECT *
        FROM profils
        WHERE birthday
        BETWEEN to_timestamp(${age.max} / 1000)
        AND to_timestamp(${age.min} / 1000)` : ``
    }
  },
  addRow: {
    pictures: () => `
      ARRAY
      (
        SELECT json_build_object('id', id, 'url', public_path)
        FROM pictures
        WHERE id = ${tableName}.id
      )`,
    tagsIntersect: (valuesIndex) => `
      array_length
      (
        ARRAY
        (
          SELECT unnest(${tableName}.tags)
          INTERSECT
          SELECT unnest(${valuesIndex}::text[])
        ),
        1
      )`,
    distances: (location) => `
      ST_Distance 
      (
        ST_FlipCoordinates(ST_GeomFromGeoJSON('${JSON.stringify(location)}'))::geography,
        ST_FlipCoordinates(ST_GeomFromGeoJSON(${tableName}.location::json ->> 'loc'))::geography,
        false
      ) / 1000`,
    commonsTags: (valuesIndex) => `
      ARRAY
      (
        SELECT unnest(${tableName}.tags)
        INTERSECT
        SELECT unnest(${valuesIndex}::text[])
      )`,
    score: () => `
      COALESCE
      (  
        array_length
        (
          ARRAY(
            SELECT "id"
            FROM "history"
            WHERE "id" = ${tableName}.id AND "type" = 'LIKE'
          ), 1
        ), 0
      ) * 100 +
      COALESCE
      (
        array_length
        (
          ARRAY(
            SELECT "id"
            FROM "history"
            WHERE "id" = ${tableName}.id AND "type" = 'MATCH'
          ), 1
        ), 0
       ) * 1000`,
    chatId: (id1, id2) => `
      (
        SELECT "chatId"
        FROM "matchs"
        WHERE "id" = '${id1}' AND "matchedId" = '${id2}'
        OR "id" = '${id2}' AND "matchedId" = '${id1}'
      )`,
    isLiked: (id1, id2) => `
    (
      SELECT "likedId"
      FROM "likes"
      WHERE "id" = '${id1}' AND "likedId" = '${id2}'
    )`
  },
  order: {
    by: (order) => `
      ORDER BY ${
        order === 0 ? '"distance" ASC'
        : order === 1 ? '"distance" DESC'
        : order === 2 ? '"birthday" DESC'
        : order === 3 ? '"birthday" ASC'
        : order === 4 ? '"tagsIntersect" ASC NULLS LAST'
        : order === 5 ? '"tagsIntersect" DESC NULLS LAST'
        : order === 6 ? '"score" ASC'
        : order === 7 ? '"score" DESC'
        : '"distance" ASC'
      }`
  }
})
