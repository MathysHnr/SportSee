import { useEffect, useState } from 'react'

/**
 * Hook générique de récupération de données.
 *
 * Il délègue l'appel au service passé en paramètre (les appels HTTP
 * restent donc en dehors des composants React) et expose l'état de
 * chargement ainsi que l'éventuelle erreur rencontrée.
 *
 * @param {function(number): Promise<*>} fetcher - Fonction du service de données à appeler.
 * @param {number} userId - Identifiant de l'utilisateur.
 * @returns {{ data: *, isLoading: boolean, error: Error|null }}
 * L'état courant de la requête.
 */
export function useFetchData(fetcher, userId) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    setIsLoading(true)
    setError(null)

    fetcher(userId)
      .then((result) => {
        if (!cancelled) {
          setData(result)
          setIsLoading(false)
        }
      })
      .catch((fetchError) => {
        if (!cancelled) {
          setError(fetchError)
          setIsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [fetcher, userId])

  return { data, isLoading, error }
}
