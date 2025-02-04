export default function dateformat(date: Date) {
    return new Intl.DateTimeFormat('fr-FR').format(date);
}
