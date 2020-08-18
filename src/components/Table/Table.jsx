import React from 'react';
import "./Table.styles.css"

const Table = ({ countries }) => {
    return (
        <div className='table'>
            {
                //destructing from api 
                countries.map(({ country, cases }) => (

                    <tr>
                        <td>{country}</td>
                        <td>{cases}</td>

                    </tr>
                ))

            }
        </div>
    );
}

export default Table;
