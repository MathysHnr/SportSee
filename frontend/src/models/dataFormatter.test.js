import { describe, it, expect } from 'vitest'
import {
  formatUser,
  formatActivity,
  formatAverageSessions,
  formatPerformance,
} from './dataFormatter'

describe('formatUser', () => {
  const baseUser = {
    id: 12,
    userInfos: { firstName: 'Karl', lastName: 'Dovineau', age: 31 },
    keyData: {
      calorieCount: 1930,
      proteinCount: 155,
      carbohydrateCount: 290,
      lipidCount: 50,
    },
  }

  it('utilise todayScore quand il est présent', () => {
    const user = formatUser({ ...baseUser, todayScore: 0.12 })

    expect(user.score).toBe(0.12)
    expect(user.scorePercentage).toBe(12)
  })

  it('utilise score quand todayScore est absent', () => {
    const user = formatUser({ ...baseUser, score: 0.3 })

    expect(user.score).toBe(0.3)
    expect(user.scorePercentage).toBe(30)
  })

  it('retourne 0 quand aucun score n’est fourni', () => {
    const user = formatUser(baseUser)

    expect(user.score).toBe(0)
    expect(user.scorePercentage).toBe(0)
  })

  it('aplatit les informations et renomme les données clés', () => {
    const user = formatUser({ ...baseUser, todayScore: 0.12 })

    expect(user.firstName).toBe('Karl')
    expect(user.lastName).toBe('Dovineau')
    expect(user.age).toBe(31)
    expect(user.keyData).toEqual({
      calories: 1930,
      proteins: 155,
      carbohydrates: 290,
      lipids: 50,
    })
  })
})

describe('formatActivity', () => {
  it('numérote les sessions à partir de 1 et conserve les valeurs', () => {
    const activity = formatActivity({
      userId: 12,
      sessions: [
        { day: '2020-07-01', kilogram: 80, calories: 240 },
        { day: '2020-07-02', kilogram: 79, calories: 220 },
      ],
    })

    expect(activity).toEqual([
      { index: 1, date: '2020-07-01', kilogram: 80, calories: 240 },
      { index: 2, date: '2020-07-02', kilogram: 79, calories: 220 },
    ])
  })
})

describe('formatAverageSessions', () => {
  it('convertit les numéros de jour en initiales françaises', () => {
    const sessions = formatAverageSessions({
      userId: 12,
      sessions: [
        { day: 1, sessionLength: 30 },
        { day: 7, sessionLength: 60 },
      ],
    })

    expect(sessions).toEqual([
      { day: 'L', sessionLength: 30 },
      { day: 'D', sessionLength: 60 },
    ])
  })

  it('garde le numéro brut pour un jour inattendu', () => {
    const sessions = formatAverageSessions({
      userId: 12,
      sessions: [{ day: 9, sessionLength: 10 }],
    })

    expect(sessions).toEqual([{ day: '9', sessionLength: 10 }])
  })
})

describe('formatPerformance', () => {
  it('traduit les catégories et les ordonne comme sur la maquette', () => {
    const performance = formatPerformance({
      userId: 12,
      kind: {
        1: 'cardio',
        2: 'energy',
        3: 'endurance',
        4: 'strength',
        5: 'speed',
        6: 'intensity',
      },
      data: [
        { value: 80, kind: 1 },
        { value: 120, kind: 2 },
        { value: 140, kind: 3 },
        { value: 50, kind: 4 },
        { value: 200, kind: 5 },
        { value: 90, kind: 6 },
      ],
    })

    expect(performance).toEqual([
      { kind: 'Intensité', value: 90 },
      { kind: 'Vitesse', value: 200 },
      { kind: 'Force', value: 50 },
      { kind: 'Endurance', value: 140 },
      { kind: 'Énergie', value: 120 },
      { kind: 'Cardio', value: 80 },
    ])
  })

  it('met 0 pour une catégorie absente des données', () => {
    const performance = formatPerformance({
      userId: 12,
      kind: { 1: 'cardio' },
      data: [{ value: 80, kind: 1 }],
    })

    expect(performance.find((entry) => entry.kind === 'Cardio').value).toBe(80)
    expect(performance.find((entry) => entry.kind === 'Force').value).toBe(0)
  })
})
