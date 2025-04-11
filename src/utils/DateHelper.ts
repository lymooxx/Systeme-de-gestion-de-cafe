
/**
 * Formate une date pour l'affichage dans l'UI.
 * @param date - Date à formater
 * @returns Date au format "JJ/MM/AAAA"
 */
export function formatDisplayDate(date: Date): string {
    return date.toLocaleDateString("fr-FR");
}