/**
 * Couche de standardisation des données.
 *
 * Le schéma renvoyé par l'API varie légèrement selon les utilisateurs
 * (ex. `todayScore` vs `score`). Ces fonctions transforment les données
 * brutes en modèles stables et prêts à l'emploi pour les composants.
 */

/**
 * @typedef {Object} User
 * @property {number} id - Identifiant de l'utilisateur.
 * @property {string} firstName - Prénom.
 * @property {string} lastName - Nom.
 * @property {number} age - Âge.
 * @property {number} score - Score du jour, entre 0 et 1.
 * @property {number} scorePercentage - Score du jour, entre 0 et 100.
 * @property {Object} keyData - Données nutritionnelles clés.
 * @property {number} keyData.calories - Calories (kCal).
 * @property {number} keyData.proteins - Protéines (g).
 * @property {number} keyData.carbohydrates - Glucides (g).
 * @property {number} keyData.lipids - Lipides (g).
 */

/**
 * @typedef {Object} ActivitySession
 * @property {number} index - Numéro du jour affiché sur l'axe (1, 2, 3…).
 * @property {string} date - Date de la session (format ISO `YYYY-MM-DD`).
 * @property {number} kilogram - Poids de l'utilisateur (kg).
 * @property {number} calories - Calories brûlées (kCal).
 */

/**
 * @typedef {Object} AverageSession
 * @property {string} day - Initiale du jour de la semaine (L, M, M, J, V, S, D).
 * @property {number} sessionLength - Durée moyenne de la session (min).
 */

/**
 * @typedef {Object} PerformanceEntry
 * @property {string} kind - Libellé français de la catégorie (Cardio, Force…).
 * @property {number} value - Valeur de performance.
 */

/** Initiales des jours de la semaine, du lundi au dimanche. */
const WEEK_DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

/** Traductions françaises des catégories de performance de l'API. */
const KIND_LABELS = {
  cardio: 'Cardio',
  energy: 'Énergie',
  endurance: 'Endurance',
  strength: 'Force',
  speed: 'Vitesse',
  intensity: 'Intensité',
}

/**
 * Ordre d'affichage des catégories sur le radar,
 * dans le sens horaire en partant du haut (conforme à la maquette).
 */
const KIND_ORDER = ['intensity', 'speed', 'strength', 'endurance', 'energy', 'cardio']

/**
 * Standardise les informations principales d'un utilisateur.
 * Unifie notamment `todayScore` et `score` en un unique champ `score`.
 * @param {Object} data - Données principales brutes de l'API.
 * @returns {User} L'utilisateur standardisé.
 */
export function formatUser(data) {
  const score = data.todayScore ?? data.score ?? 0

  return {
    id: data.id,
    firstName: data.userInfos.firstName,
    lastName: data.userInfos.lastName,
    age: data.userInfos.age,
    score,
    scorePercentage: Math.round(score * 100),
    keyData: {
      calories: data.keyData.calorieCount,
      proteins: data.keyData.proteinCount,
      carbohydrates: data.keyData.carbohydrateCount,
      lipids: data.keyData.lipidCount,
    },
  }
}

/**
 * Standardise l'activité quotidienne d'un utilisateur.
 * Chaque session reçoit un index numérique utilisé sur l'axe du graphique.
 * @param {Object} data - Activité brute de l'API.
 * @returns {Array<ActivitySession>} Les sessions d'activité standardisées.
 */
export function formatActivity(data) {
  return data.sessions.map((session, index) => ({
    index: index + 1,
    date: session.day,
    kilogram: session.kilogram,
    calories: session.calories,
  }))
}

/**
 * Standardise la durée moyenne des sessions d'un utilisateur.
 * Convertit le numéro du jour (1 à 7) en initiale française.
 * @param {Object} data - Sessions moyennes brutes de l'API.
 * @returns {Array<AverageSession>} Les sessions moyennes standardisées.
 */
export function formatAverageSessions(data) {
  return data.sessions.map((session) => ({
    day: WEEK_DAYS[session.day - 1] ?? String(session.day),
    sessionLength: session.sessionLength,
  }))
}

/**
 * Standardise les performances d'un utilisateur.
 * Traduit les catégories en français et les ordonne comme sur la maquette.
 * @param {Object} data - Performances brutes de l'API.
 * @returns {Array<PerformanceEntry>} Les performances standardisées.
 */
export function formatPerformance(data) {
  return KIND_ORDER.map((kindKey) => {
    const entry = data.data.find((item) => data.kind[item.kind] === kindKey)

    return {
      kind: KIND_LABELS[kindKey],
      value: entry?.value ?? 0,
    }
  })
}
