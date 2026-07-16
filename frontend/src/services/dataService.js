/**
 * Service de données de l'application.
 *
 * C'est le seul point d'entrée utilisé par les composants React pour
 * récupérer des données. Selon la configuration (`VITE_USE_MOCK`),
 * il s'appuie sur les données mockées ou sur l'API SportSee, puis
 * standardise systématiquement les données avant de les retourner.
 */

import * as apiProvider from './apiProvider'
import * as mockProvider from './mockProvider'
import {
  formatUser,
  formatActivity,
  formatAverageSessions,
  formatPerformance,
} from '../models/dataFormatter'

const USE_MOCK =
  import.meta.env.VITE_USE_MOCK !== undefined
    ? import.meta.env.VITE_USE_MOCK === 'true'
    : true

const provider = USE_MOCK ? mockProvider : apiProvider

/**
 * Récupère les informations principales d'un utilisateur.
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<import('../models/dataFormatter').User>} L'utilisateur standardisé.
 */
export async function getUser(userId) {
  const data = await provider.getUserMainData(userId)
  return formatUser(data)
}

/**
 * Récupère l'activité quotidienne (poids et calories) d'un utilisateur.
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Array<import('../models/dataFormatter').ActivitySession>>}
 * Les sessions d'activité standardisées.
 */
export async function getUserActivity(userId) {
  const data = await provider.getUserActivity(userId)
  return formatActivity(data)
}

/**
 * Récupère la durée moyenne des sessions d'un utilisateur.
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Array<import('../models/dataFormatter').AverageSession>>}
 * Les sessions moyennes standardisées.
 */
export async function getUserAverageSessions(userId) {
  const data = await provider.getUserAverageSessions(userId)
  return formatAverageSessions(data)
}

/**
 * Récupère les performances (cardio, énergie, etc.) d'un utilisateur.
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Array<import('../models/dataFormatter').PerformanceEntry>>}
 * Les performances standardisées.
 */
export async function getUserPerformance(userId) {
  const data = await provider.getUserPerformance(userId)
  return formatPerformance(data)
}
