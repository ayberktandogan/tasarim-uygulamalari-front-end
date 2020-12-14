const INDEX_ROUTE = "/"
const SCHOOLS_ROUTE = ({ school_domain }) => school_domain ? `/okul/${school_domain}` : "/okullar"
const DEPARTMENTS_ROUTE = "/bolumler"
const CLASSES_ROUTE = "/dersler"
const NOTES_ROUTE = ({ note_id }) => note_id ? `/not/${note_id}` : "/notlar"

const LOGIN_ROUTE = "/giris-yap"
const REGISTER_ROUTE = "/kayit-ol"
const REGISTER_CONFIRMATION_ROUTE = "/kullanici-dogrula"


export { INDEX_ROUTE, SCHOOLS_ROUTE, DEPARTMENTS_ROUTE, CLASSES_ROUTE, NOTES_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, REGISTER_CONFIRMATION_ROUTE }