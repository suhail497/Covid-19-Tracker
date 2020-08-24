import React from 'react';
import './Map.styles.css'
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataonMap } from '../../utlils';

const Map = ({ center, zoom, countries, casesType }) => {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    //from leaflet lib
                    url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {
                    showDataonMap(countries, casesType)
                }
            </LeafletMap>
        </div>
    );
}

export default Map;
