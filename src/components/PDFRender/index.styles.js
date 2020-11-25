import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export default makeStyles(theme => ({
    MainContainer: {
        boxShadow: theme.shadows[6],
        "& button, a": {
            borderRadius: 0
        }
    },
    PDFPage: {
        width: "100%"
    },
    PDFContainer: {
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflow: "auto",
        "& .react-pdf": {
            "&__Page": {
                display: "flex",
                justifyContent: props => props.pageScale > 1 ? "initial" : "center",
                "& canvas": {
                    boxShadow: theme.shadows[6]
                }
            }
        },
        "& $PageNumber": {
            marginTop: theme.spacing(2),
            textAlign: "right"
        },
        "&::-webkit-scrollbar": {
            width: 6,
            height: 6
        },
        "&::-webkit-scrollbar-button": {
            width: 0,
            height: 0,
        },
        "&::-webkit-scrollbar-thumb": {
            background: "#e1e1e1",
            border: "0px none #ffffff",
            borderRadius: 50,
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: "#ffffff",
        },
        "&::-webkit-scrollbar-thumb:active": {
            background: "#ffffff",
        },
        "&::-webkit-scrollbar-track": {
            background: "#666666",
            border: "0px none #ffffff",
            borderRadius: 50
        },
        "&::-webkit-scrollbar-track:hover": {
            background: "#666666"
        },
        "&::-webkit-scrollbar-track:active": {
            background: "#333333"
        },
        "&::-webkit-scrollbar-corner": {
            background: "transparent"
        }
    },
    PageNumber: {

    },
    AltContainer: {

    },
    PageDivider: {
        margin: theme.spacing(2, 0, 4)
    },
    ToolbarContainer: {
        display: "flex",
        backgroundColor: theme.palette.background.paper
    },
    ScaleButtonContainer: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "1fr 1fr",
        // Grommet ikonlarının rengini değişmek için gerekiyor. Normalde
        // component içerisinde değiştirebiliyor.
        "& path": {
            stroke: theme.palette.type === "dark" ? "#fff" : "#000"
        },
        "& .Mui-disabled": {
            "& path": {
                stroke: grey[700]
            }
        }
    },
    NavigationButtonContainer: {
        display: "grid",
        justifyContent: "center",
        fontFamily: "'Roboto Mono', monospace",
        gridTemplateColumns: "auto 1fr auto",
        // Grommet ikonlarının rengini değişmek için gerekiyor. Normalde
        // component içerisinde değiştirebiliyor.
        "& polyline": {
            stroke: theme.palette.type === "dark" ? "#fff" : "#000"
        },
        "& .Mui-disabled": {
            "& polyline": {
                stroke: grey[700]
            }
        }
    },
    OtherButtonContainer: {
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "auto",
        // Grommet ikonlarının rengini değişmek için gerekiyor. Normalde
        // component içerisinde değiştirebiliyor.
        "& path": {
            stroke: theme.palette.type === "dark" ? "#fff" : "#000"
        },
        "& .Mui-disabled": {
            "& path": {
                stroke: grey[700]
            }
        }
    },
    PageInfoContainer: {
        padding: theme.spacing(1, 2),
        textAlign: "center"
    }
}))