/**
 * Fournisseur de données basé sur les données mockées.
 * Il expose exactement la même interface que le fournisseur API
 * afin de pouvoir passer de l'un à l'autre de façon transparente.
 */

import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from './mockData'

/**
 * Recherche l'entrée d'un utilisateur dans un jeu de données mockées.
 * @param {Array<Object>} dataset - Jeu de données à interroger.
 * @param {string} idKey - Nom de la clé identifiant l'utilisateur (`id` ou `userId`).
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Object>} L'entrée trouvée.
 * @throws {Error} Si l'utilisateur n'existe pas dans les données mockées.
 */
async function findUserEntry(dataset, idKey, userId) {
  const entry = dataset.find((item) => item[idKey] === userId)

  if (!entry) {
    throw new Error(`Erreur 404 : aucun utilisateur avec l'identifiant ${userId}`)
  }

  return entry
}

/**
 * Récupère les informations principales d'un utilisateur (version mockée).
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Object>} Données principales brutes.
 */
export function getUserMainData(userId) {
  return findUserEntry(USER_MAIN_DATA, 'id', userId)
}

/**
 * Récupère l'activité quotidienne d'un utilisateur (version mockée).
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Object>} Activité brute (sessions jour par jour).
 */
export function getUserActivity(userId) {
  return findUserEntry(USER_ACTIVITY, 'userId', userId)
}

/**
 * Récupère la durée moyenne des sessions d'un utilisateur (version mockée).
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Object>} Sessions moyennes brutes.
 */
export function getUserAverageSessions(userId) {
  return findUserEntry(USER_AVERAGE_SESSIONS, 'userId', userId)
}

/**
 * Récupère les performances d'un utilisateur (version mockée).
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Object>} Performances brutes.
 */
export function getUserPerformance(userId) {
  return findUserEntry(USER_PERFORMANCE, 'userId', userId)
}
