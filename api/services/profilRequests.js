const config = require('../config/config')
const emptyPictureProfil = `${config.HOST}:${config.PORT}/files/assets/empty_avatar.jpg`

const geoQuery = (location, distance = 1000) => `
  SELECT *
  FROM profils
  WHERE ST_DWithin
  (
    ST_GeomFromGeoJSON('${JSON.stringify(location)}')::geography,
    ST_GeomFromGeoJSON(profils.location::json ->> 'loc')::geography,
    ${distance * 1000}
  )`

const _exceptUser = (id) => `
  EXCEPT
  SELECT *
  FROM profils
  WHERE id = '${id}'`

const _expectEmptyPictures = () => `
  EXCEPT 
  SELECT *
  FROM profils
  WHERE "profilPicture" = '${emptyPictureProfil}'`

const _intersectTagQuery = (tags) => (tags && tags.length > 0) ? `
  INTERSECT SELECT *
  FROM profils
  WHERE tags && ${JSON.stringify(tags)}::text[]` : ``

const _intersectOrientationQuery = orientation => orientation !== '3' ? `
  INTERSECT SELECT *
  FROM profils
  WHERE sex = '${orientation}'` : ``

const _intersectAgeQuery = age => (age && age.min && age.max) ? `
  INTERSECT SELECT *
  FROM profils
  WHERE birthday
    BETWEEN to_timestamp(${age.max})
    AND to_timestamp(${age.min})` : ``

const _rowPictures = () => `
  ARRAY
  (
    SELECT json_build_object('id', id, 'url', public_path)
    FROM pictures
    WHERE id = result.id
  )`
const _rowTagsIntersects = () => `
  array_length
  (
    ARRAY
    (
      SELECT unnest(result.tags)
      INTERSECT
      SELECT unnest(array['Longskate', 'Racketlon', 'Oulak', 'Alpinisme'])
    ),
    1
  )`

const _rowCalculateDistances = (location) => `
  ST_Distance 
  (
    ST_FlipCoordinates(ST_GeomFromGeoJSON('${JSON.stringify(location)}'))::geography,
    ST_FlipCoordinates(ST_GeomFromGeoJSON(result.location::json ->> 'loc'))::geography,
    false
  ) / 1000`

const _rowCommonTags = (tags1, tags2) => `
  ARRAY
  (
    SELECT unnest(${tags1})
    INTERSECT
    SELECT unnest(${tags2})
  )`

const queryConstructor = ({profilId, location, distance, ageRange, tags, orientation}) => `
  SELECT "biography", "birthday", "location", "profilPicture", "pseudo", "id",
    ${_rowCalculateDistances(location)} AS distance,
    ${_rowPictures()} AS pictures,
    ${tags ? _rowTagsIntersects(`result.tags`, JSON.stringify(tags))` AS "tagsIntersect"` : ``}
    ${_rowCommonTags(`result.tags`, JSON.stringify(tags || []))} AS "commonsTags"
  FROM (
    (
      ${geoQuery(location, distance)}
      ${_exceptUser(profilId)}
      ${_expectEmptyPictures()}
    )
    ${_intersectOrientationQuery(orientation)}
    ${_intersectTagQuery(tags)}
    ${_intersectAgeQuery(ageRange)}
  ) AS result
  ORDER BY distance ASC
  LIMIT 48
  `

const purposedProfils = (profil) => `
  SELECT "biography", "birthday", "location", "profilPicture", "pseudo", "id",
    ${_rowCalculateDistances(profil.location)} AS distance,
    ${_rowPictures()} AS pictures,
    ${_rowTagsIntersects()} AS "tagsIntersect",
    ${_rowCommonTags()} AS "commonsTags"
  FROM (
    (
      ${geoQuery(profil.location.loc, 500)}
      ${_exceptUser(profil.id)}
      ${_expectEmptyPictures()}
    )
    ${_intersectOrientationQuery(profil.orientation)}
  ) AS result
  ORDER BY "tagsIntersect" DESC NULLS LAST
  LIMIT 48
  `

module.exports = {
  queryConstructor,
  purposedProfils
}
