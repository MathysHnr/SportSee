/**
 * Service de données de l'application.
 *
 * C'est le seul point d'entrée utilisé par les composants React pour
 * récupérer des données. Selon la configuration (`VITE_USE_MOCK`),
 * il s'appuie sur les données mockées ou sur l'API SportSee.
 */

import * as apiProvider from './apiProvider'
import * as mockProvider from './mockProvider'

const USE_MOCK =
  import.meta.env.VITE_USE_MOCK !== undefined
    ? import.meta.env.VITE_USE_MOCK === 'true'
    : true

const provider = USE_MOCK ? mockProvider : apiProvider

/**
 * Récupère les informations principales d'un utilisateur.
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Object>} Les informations principales de l'utilisateur.
 */
export function getUser(userId) {
  return provider.getUserMainData(userId)
}

/**
 * Récupère l'activité quotidienne (poids et calories) d'un utilisateur.
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Object>} L'activité quotidienne de l'utilisateur.
 */
export function getUserActivity(userId) {
  return provider.getUserActivity(userId)
}

/**
 * Récupère la durée moyenne des sessions d'un utilisateur.
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Object>} La durée moyenne des sessions par jour.
 */
export function getUserAverageSessions(userId) {
  return provider.getUserAverageSessions(userId)
}

/**
 * Récupère les performances (cardio, énergie, etc.) d'un utilisateur.
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Object>} Les performances de l'utilisateur.
 */
export function getUserPerformance(userId) {
  return provider.getUserPerformance(userId)
}
