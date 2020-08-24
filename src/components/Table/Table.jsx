import React from 'react';
import "./Table.styles.css";
import numeral from "numeral";

const Table = ({ countries }) => {
    return (
        <div className='table'>
            {
                //destructing from api 
                countries.map(({ country, cases }) => (

                    <tr>
                        <td>{country}</td>
                        
                        <td>{numeral(cases).format("0,0")}</td>

                    </tr>
                ))

            }
        </div>
    );
}

export default Table;
