import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';
import "./InfoBox.styles.css"


const InfoBox = ({ title, cases, total, isRed, active, ...props }) => {

    return (
        <div>

            <Card
                onClick={props.onClick}
                className={`infoBox ${active && "infoBox--selected"} ${
                    isRed && "infoBox--red"
                    }`}>
                <CardContent>
                    <Typography className="title" >
                        {title}
                    </Typography>
                    <Typography variant="h6" className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
                        {cases}
                    </Typography>
                    <Typography className="infoBox__total">
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>


        </div >
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