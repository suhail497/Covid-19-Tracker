import React from 'react';
import './Map.styles.css'
import { Map as LeafletMap, TileLayer } from "react-leaflet";

const Map = ({ center, zoom }) => {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    //from leaflet lib
                    url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />


            </LeafletMap>
        </div>
    );
}

export default Map;
