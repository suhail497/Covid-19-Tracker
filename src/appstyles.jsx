const { makeStyles } = require("@material-ui/core");


export const useStyles = makeStyles((theme) => ({
    appheader: {
        display: "flex",
        // flexDirection: "column"
        marginBottom: "20px",
        alignItems: "center",
        justifyContent: "space-between"
    }
}))