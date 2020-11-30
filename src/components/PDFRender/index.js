import { Button, Divider, Grid } from '@material-ui/core';
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import LazyLoad from 'react-lazyload';
import { GrPrevious, GrNext, GrZoomIn, GrZoomOut, GrDocumentDownload, GrClose } from 'react-icons/gr'
import { Element, Events, scrollSpy, scroller } from 'react-scroll'
import { Waypoint } from 'react-waypoint';
import useStyles from './index.styles'
import { SizeMe } from 'react-sizeme';
import { useHistory } from 'react-router-dom';
import Loading from '../loading';

function PageDivider() {
    const classes = useStyles()
    return (
        <div className={classes.PageDivider}>
            <Divider />
        </div>
    )
}

function _getPageNumber(numPages, pageNumber) {
    let tempText = ""
    for (let i = String(pageNumber).length; i < String(numPages).length; i++) {
        tempText = tempText + "0"
    }
    return tempText + pageNumber
}

export default function PDFRenderer(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageScale, setPageScale] = useState(1)
    const [pageSizes, setPageSize] = useState(null);
    const [buttonScrolling, setButtonScrolling] = useState(false)
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const classes = useStyles({ pageScale })

    let timerForButtonScrolling = null

    useEffect(() => {
        Events.scrollEvent.register('begin', function (to, element) {
            console.log('begin', arguments);
        });

        Events.scrollEvent.register('end', function (to, element) {
            console.log('end', arguments);
        });

        scrollSpy.update();
        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        }
    }, [])

    async function _onDocumentLoadSuccess(pdf) {
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(Number(i))
            setPageSize(state => ({
                ...state, [i]: {
                    width: page["_pageInfo"].view[2],
                    height: page["_pageInfo"].view[3]
                }
            }))
        }
        setNumPages(pdf.numPages);
        setPageNumber(1);
        setLoading(false)
    }

    function _changePage(offset) {
        timerForButtonScrolling = null
        setButtonScrolling(true)
        const newPageNumber = pageNumber + offset
        setPageNumber(prevPageNumber => prevPageNumber + offset);
        _scrollTo(newPageNumber)
        timerForButtonScrolling = setTimeout(() => setButtonScrolling(false), 1500)
    }

    function _previousPage() {
        _changePage(-1);
    }

    function _nextPage() {
        _changePage(1);
    }

    function _changeScale(offset) {
        if ((offset === 1 && pageScale >= 2) || (offset === -1 && pageScale <= 0.1)) return
        setPageScale(state => state + (offset * .1))
    }

    function _addScale() {
        _changeScale(1)
    }

    function _removeScale() {
        _changeScale(-1)
    }

    function _scrollTo(to) {
        scroller.scrollTo(`page${String(to)}`, {
            containerId: "scrollContainer"
        })
    }

    function _handleWaypointEnter(to) {
        if (buttonScrolling) return
        setPageNumber(to)
    }

    function _handleBackButtonClick() {
        history.goBack()
    }

    return (
        <>
            <div className={classes.MainContainer}>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.ToolbarContainer}>
                            <div className={classes.ScaleButtonContainer}>
                                <Button
                                    type="button"
                                    disabled={pageScale >= 2}
                                    onClick={_addScale}
                                >
                                    <GrZoomIn size={14} />
                                </Button>
                                <Button
                                    type="button"
                                    disabled={pageScale <= 0.1}
                                    onClick={_removeScale}
                                >
                                    <GrZoomOut size={14} />
                                </Button>
                            </div>
                            <div className={classes.NavigationButtonContainer}>
                                <Button
                                    type="button"
                                    disabled={pageNumber <= 1}
                                    onClick={_previousPage}
                                >
                                    <GrPrevious size={14} />
                                </Button>
                                <div className={classes.PageInfoContainer}>
                                    <p>
                                        Sayfa {pageNumber && numPages ? _getPageNumber(numPages, pageNumber) : (numPages ? 1 : '--')} - {numPages || '--'}
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    disabled={pageNumber >= numPages}
                                    onClick={_nextPage}
                                >
                                    <GrNext size={14} />
                                </Button>
                            </div>
                            <div className={classes.OtherButtonContainer}>
                                <Button
                                    href={props.pdf_link}
                                    target="_blank"
                                >
                                    <GrDocumentDownload size={16} style={{ marginTop: -3, marginRight: 8 }} /> Dosyayı İndir
                                </Button>
                            </div>
                            <div className={classes.BackButtonContainer}>
                                <Button
                                    onClick={_handleBackButtonClick}
                                >
                                    <GrClose size={16} />
                                </Button>
                            </div>
                        </div>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <SizeMe
                            monitorHeight
                            refreshRate={256}
                            refreshMode={"debounce"}
                            render={({ size }) => (
                                <div
                                    className={classes.PDFContainer}
                                    style={
                                        {
                                            height: `calc(100vh - ${document && document.getElementsByClassName(classes.ToolbarContainer) && document.getElementsByClassName(classes.ToolbarContainer)[0] ? document.getElementsByClassName(classes.ToolbarContainer)[0].clientHeight + 1 : "0"}px)`,
                                            minHeight: `calc(100vh - ${document && document.getElementsByClassName(classes.ToolbarContainer) && document.getElementsByClassName(classes.ToolbarContainer)[0] ? document.getElementsByClassName(classes.ToolbarContainer)[0].clientHeight + 1 : "0"}px)`,
                                            maxHeight: `calc(100vh - ${document && document.getElementsByClassName(classes.ToolbarContainer) && document.getElementsByClassName(classes.ToolbarContainer)[0] ? document.getElementsByClassName(classes.ToolbarContainer)[0].clientHeight + 1 : "0"}px)`
                                        }
                                    }
                                    id="scrollContainer">
                                    <Document
                                        file={props.pdf_link}
                                        onLoadSuccess={_onDocumentLoadSuccess}
                                    >
                                        {!loading ?
                                            Array.from(new Array(numPages),
                                                (el, index) => (
                                                    <Element name={`page${String(index + 1)}`} key={`page_${index + 1}`}>
                                                        <Waypoint
                                                            onEnter={() => _handleWaypointEnter(index + 1)}
                                                            bottomOffset={(((size.width - 64) * pageScale / pageSizes[index + 1].width) * pageSizes[index + 1].height) / 2} />
                                                        <LazyLoad
                                                            unmountIfInvisible
                                                            scrollContainer="#scrollContainer"
                                                            height={pageSizes ? ((size.width - 64) * pageScale / pageSizes[index + 1].width) * pageSizes[index + 1].height : 0}
                                                        >
                                                            <Page width={size.width * pageScale - 64}
                                                                renderTextLayer={false}
                                                                renderAnnotationLayer={false}
                                                                pageNumber={index + 1}
                                                            />
                                                            <p className={classes.PageNumber}>Sayfa {index + 1}</p>
                                                            <PageDivider />
                                                        </LazyLoad>
                                                    </Element>
                                                ))
                                            : <Loading />}
                                    </Document>
                                </div>
                            )}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

PDFRenderer.propTypes = {
    pdf_link: PropTypes.string.isRequired
}