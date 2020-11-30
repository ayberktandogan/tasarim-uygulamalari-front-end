const schoolRoute = `/school`
const departmentRoute = `/department`
const noteRoute = (props) => `/note${props && props.note_id ? `/${props.note_id}` : ""}`
const authRoute = `/auth`
const roleRoute = `/role`
const userRoleRoute = `/user_role`
const proxyRoute = `/proxy`

const noteFileRoute = ({ school_domain, department_id, note_id, file_id }) => `/storage/notes/${school_domain}/${department_id}/${note_id}/${file_id}`

export { schoolRoute, departmentRoute, noteRoute, authRoute, roleRoute, userRoleRoute, proxyRoute, noteFileRoute }