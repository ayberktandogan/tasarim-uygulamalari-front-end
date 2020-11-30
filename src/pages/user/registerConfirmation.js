import { Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Loading from '../../components/loading'
import { authRoute } from '../../config/api-routes'
import getDataFromAPI from '../../helpers/getDataFromAPI'
// import useStyles from './registerConfirmation.styles'

export default function RegisterConfirmationPage(props) {
    const { confirmation_hash } = props.match.params
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!confirmation_hash) return
        getDataFromAPI({ route: authRoute + `/kullanici-dogrula/${confirmation_hash}` })
            .then(res => {
                if (res.status === 200) {
                    setLoading(false)
                }
            }).catch(err => {
                setError(err)
                setLoading(false)
            })
    }, [confirmation_hash])

    console.log(error.response)

    return (
        <>
            {!loading ?
                !error ?
                    <Typography variant="h3">
                        Kullanıcı başarıyla doğrulandı.
                    </Typography>
                    :
                    <>
                        <Typography variant="h3">
                            Kullanıcı doğrularken bir sorunla karşılaştık.
                        </Typography>
                        <Typography variant="body1">
                            {error && error.response && error.response.data ? error.response.data.message : ""}
                        </Typography>
                    </>
                :
                <Loading size={24} />
            }
        </>
    )
}