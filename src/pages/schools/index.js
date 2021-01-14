import { useEffect, useState } from "react";
import { schoolRoute } from "../../config/api-routes";
import getDataFromAPI from "../../helpers/getDataFromAPI";
import Loading from '../../components/loading'
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import useStyles from './index.styles'
import { SCHOOLS_ROUTE } from "../../config/front-routes";
import { UniversityPlaceholder } from "../../config/images";
import { Button } from "@material-ui/core";

function SchoolItem(props) {
    const classes = useStyles()
    const { name, domain, cover_art } = props

    return (
        <>
            <Link to={SCHOOLS_ROUTE({ school_domain: domain })}>
                <div className={classes.SchoolItem}>
                    <div>
                        <img
                            className={classes.SchoolItemCoverart}
                            src={cover_art || UniversityPlaceholder} alt={name} />
                    </div>
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
    const [page, setPage] = useState(0)
    const [canLoadMore, setLoadMore] = useState(false)

    useEffect(() => {
        getDataFromAPI({ route: schoolRoute, config: { params: page ? { offset: page * 24 } : null } })
            .then(res => {
                if (res.status === 200) {
                    setSchoolList(state => state.length ? ([...state, ...res.data.rows]) : res.data.rows)
                    setLoadMore(Boolean(Math.floor(Number(res.data.count) / (24 * (page + 1)))))
                    setLoading(false)
                }
            }).catch(err => {
                setError(err && err.response && err.response.data ? err.response.data.message : "Bir sorunla karşılaştık.")
                setLoading(false)
            })
    }, [page])

    function _handleLoadMoreButton() {
        setPage(state => state + 1)
    }

    return (
        <>
            {
                !loading && !error ?
                    <>
                        <div className={classes.SchoolListContainer}>
                            {schoolList.map(s => <SchoolItem {...s} />)}
                        </div>
                        <div className={classes.ButtonContainer}>
                            {canLoadMore ?
                                <Button onClick={_handleLoadMoreButton}>
                                    Daha fazla Yükle
                            </Button>
                                : ""
                            }
                        </div>

                    </>
                    : loading ? <Loading /> : <Alert severity="error">{error}</Alert>
            }
        </>
    )
}