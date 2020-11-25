import { useEffect, useState } from 'react'
import useStyles from './selected_school.styles'
import PropTypes from 'prop-types'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import postDataToAPI from '../../helpers/postDataToAPI'
import { schoolRoute } from '../../config/api-routes'

export default function SelectedSchool(props) {
    const { schoolData, error, setError, schoolDatabaseData, setSelectedSchoolDatabaseData } = props
    const classes = useStyles()

    const [handleClickLoading, setHandleClickLoading] = useState(false)
    const [handleClickError, setHandleClickError] = useState(null)

    useEffect(() => {
        setHandleClickError(null)
    }, [schoolData])

    function _handleAddSchoolClick() {
        setHandleClickLoading(true)
        postDataToAPI({
            route: schoolRoute,
            data: {
                school_name: schoolData.name
            }
        }).then(res => {
            if (res.status === 200) setSelectedSchoolDatabaseData(res.data)
            setHandleClickLoading(false)
            setError(null)
        }).catch(err => {
            console.log(err)
            setHandleClickError(err.response.data)
            setHandleClickLoading(false)
        })
    }

    return (
        <>
            <div className={classes.MainContainer}>
                {schoolDatabaseData ?
                    <div className={classes.InformationContainer}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            {schoolDatabaseData.name}
                        </Typography>
                        {schoolDatabaseData.id ?
                            <Typography variant="body1">
                                <b>ID</b>: {schoolDatabaseData.id}
                            </Typography>
                            : ""}
                        {schoolDatabaseData.webpage ?
                            <Typography variant="body1">
                                <b>Website</b>: {schoolDatabaseData.webpage}
                            </Typography>
                            : ""}
                        {schoolDatabaseData.domain ?
                            <Typography variant="body1">
                                <b>Domain</b>: {schoolDatabaseData.domain}
                            </Typography>
                            : ""}
                        {schoolDatabaseData.country ?
                            <Typography variant="body1">
                                <b>Ülke</b>: {schoolDatabaseData.country}
                            </Typography>
                            : ""}
                    </div>
                    :
                    <div className={classes.InformationContainer}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            {schoolData.name}
                        </Typography>
                        {schoolData.web_pages.length ?
                            <a href={schoolData.web_pages[0]} target="_blank" rel="noreferrer">
                                <Typography variant="body1">
                                    <b>Website</b>: {schoolData.web_pages[0]}
                                </Typography>
                            </a>
                            : ""}
                        {schoolData.domains.length ?
                            <Typography variant="body1">
                                <b>Domain</b>: {schoolData.domains[0]}
                            </Typography>
                            : ""}
                        {schoolData.country ?
                            <Typography variant="body1">
                                <b>Ülke</b>: {schoolData.country}
                            </Typography>
                            : ""}
                    </div>

                }
                {error && error.status === "school-not-found" ?
                    <div className={classes.ErrorContainer}>
                        <Typography variant="body1" gutterBottom>
                            {handleClickError ?
                                "Okulu eklerken bir sorunla karşılaştık. Lütfen daha sonra tekrar deneyin."
                                : "Görünüşe göre bu okul sistemimizde ekli değil, eklemek ister misiniz?"}
                        </Typography>
                        <Button fullWidth variant="outlined" disabled={handleClickError ? true : undefined} onClick={_handleAddSchoolClick}>
                            {handleClickLoading ? <CircularProgress size={24} /> : handleClickError ? handleClickError.message : "Okulu Sisteme Ekle"}
                        </Button>
                    </div>
                    : ""}
            </div>
        </>
    )
}

SelectedSchool.propTypes = {
    schoolData: PropTypes.object.isRequired,
    schoolDatabaseData: PropTypes.object,
    setSelectedSchoolDatabaseData: PropTypes.func.isRequired,
    error: PropTypes.object,
    setError: PropTypes.func.isRequired
}