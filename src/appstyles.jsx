const { makeStyles } = require("@material-ui/core");


export const useStyles = makeStyles((theme) => ({
    app: {
        display: "flex",
        justifyContent: "space-evenly",
        padding: "20px",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column"
        }

    },
    appheader: {
        display: "flex",
        // flexDirection: "column"
        marginBottom: "20px",

        alignItems: "center",
        justifyContent: "space-between"
    },
    appstats: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        [theme.breakpoints.down('lg')]: {
            justifyContent: 'space-between'
        }

    },
    appleft: {
        flex: 0.9
    }


}))