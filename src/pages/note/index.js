import { useEffect, useState } from 'react'
//import useStyles from './index.styles'
import getDataFromAPI from '../../helpers/getDataFromAPI'
import { noteFileRoute, noteRoute } from '../../config/api-routes'
import { Alert } from '@material-ui/lab'
import { Typography } from '@material-ui/core'
import PDFRenderer from '../../components/PDFRender'
import Loading from '../../components/loading'

export default function NotePage(props) {
    //const classes = useStyles()
    const { note_id } = props.match.params
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        getDataFromAPI({ route: noteRoute({ note_id: note_id }) })
            .then(res => {
                if (res.status === 200) {
                    setData(res.data)
                    setLoading(false)
                }
            }).catch(err => {
                setError(err && err.response && err.response.data ? err.response.data.message : "Internal server error.")
                setLoading(false)
            })
    }, [note_id])


    return (
        <>
            {!loading && !error ?
                <>
                    <PDFRenderer
                        pdf_link={process.env.REACT_APP_HOST_URL + noteFileRoute({ school_domain: data.School.domain, department_id: data.DepartmentId, note_id: data.id, file_id: data.fileId })} />
                </>
                :
                error ?
                    <>
                        <Typography variant="h4">
                            Bir sorun oluştu.
                        </Typography>
                        <Alert severity="error">
                            {error}
                        </Alert>
                    </>
                    : <Loading size={24} />
            }
        </>
    )
}