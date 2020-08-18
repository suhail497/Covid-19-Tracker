import React from 'react';
import { useStylesInfo } from './InfoBox.styles';
import { Grid, Card, CardContent, Typography, Paper } from '@material-ui/core';



const InfoBox = ({ title, cases, total }) => {
    const classes = useStylesInfo()
    return (
        <div>
            <Card className={classes.infoBox}>
                <CardContent>
                    <Typography className={classes.title} >
                        {title}
                    </Typography>
                    <Typography variant="h6" className={classes.cases}>
                        {cases}
                    </Typography>
                    <Typography className={classes.total}>
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>


        </div>
    );
}

export default InfoBox;


// <Grid container>
// <Grid item sm={12} >
//     <Grid
//         container
//         direction="row"
//         justify="center"
//         alignItems="baseline"

//     >

//         <Card className={classes.card}>
//             <CardContent>
//                 <Typography>
//                     Total No of cases
//             </Typography>
//             </CardContent>
//         </Card>



//         <Card className={classes.card}>
//             <CardContent>
//                 <Typography>
//                     No of Recoverd
//             </Typography>
//             </CardContent>
//         </Card>



//         <Card className={classes.card}>
//             <CardContent>
//                 <Typography>
//                     No of Deaths
//             </Typography>
//             </CardContent>
//         </Card>



//     </Grid>


// </Grid>
// </Grid>