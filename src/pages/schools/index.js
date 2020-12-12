import { useEffect, useState } from "react";
import { schoolRoute } from "../../config/api-routes";
import getDataFromAPI from "../../helpers/getDataFromAPI";
import Loading from '../../components/loading'
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import useStyles from './index.styles'

function SchoolItem(props) {
    const classes = useStyles()
    const { name, domain, cover_art } = props

    return (
        <>
            <Link to="">
                <div className={classes.SchoolItem}>
                    {cover_art ?
                        <div className={classes.SchoolItemCoverart}>
                            <img src={cover_art} alt={name} />
                        </div>
                        : ""}
                    {name}
                </div>
            </Link>
        </>
    )
}

export default function SchoolsPage() {
    const classes = useStyles()
    const [schoolList, setSchoolList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        getDataFromAPI({ route: schoolRoute })
            .then(res => {
                if (res.status === 200) {
                    setSchoolList(res.data)
                    setLoading(false)
                }
            }).catch(err => {
                setError(err && err.response && err.response.data ? err.response.data.message : "Bir sorunla karşılaştık.")
                setLoading(false)
            })
    }, [])

    return (
        <>
            {!loading && !error ?
                <>
                    <div className={classes.SchoolListContainer}>
                        {schoolList.map(s => <SchoolItem {...s} />)}
                    </div>
                </>
                : loading ? <Loading /> : <Alert severity="error">{error}</Alert>
            }
        </>
    )
}