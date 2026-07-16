/**
 * Fournisseur de données branché sur l'API SportSee.
 * Toutes les fonctions retournent les données brutes de l'API
 * (contenu de la propriété `data` de la réponse JSON).
 */

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

/**
 * Effectue un appel HTTP GET vers l'API et retourne le contenu de `data`.
 * @param {string} endpoint - Chemin de la ressource (ex. `/user/12`).
 * @returns {Promise<Object>} Les données brutes retournées par l'API.
 * @throws {Error} Si la requête échoue ou si le serveur répond en erreur.
 */
async function fetchFromApi(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Erreur ${response.status} lors de l'appel à ${endpoint}`)
  }

  const { data } = await response.json()
  return data
}

/**
 * Récupère les informations principales d'un utilisateur.
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Object>} Données principales brutes.
 */
export function getUserMainData(userId) {
  return fetchFromApi(`/user/${userId}`)
}

/**
 * Récupère l'activité quotidienne d'un utilisateur.
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Object>} Activité brute (sessions jour par jour).
 */
export function getUserActivity(userId) {
  return fetchFromApi(`/user/${userId}/activity`)
}

/**
 * Récupère la durée moyenne des sessions d'un utilisateur.
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Object>} Sessions moyennes brutes.
 */
export function getUserAverageSessions(userId) {
  return fetchFromApi(`/user/${userId}/average-sessions`)
}

/**
 * Récupère les performances d'un utilisateur.
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {Promise<Object>} Performances brutes.
 */
export function getUserPerformance(userId) {
  return fetchFromApi(`/user/${userId}/performance`)
}
