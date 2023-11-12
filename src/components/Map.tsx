"use client"

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

type MapProps = {
  center: [number, number];
  zoom: number;
  children: React.ReactNode;
}

const Map = (props: MapProps) => {
  return (
    <MapContainer
      center={props.center}
      zoom={props.zoom}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", minHeight: '100px', minWidth: '100px' }}
    >
      {false ??
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />}
      {null ??
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />}
      {props.children}
      <Marker position={[35.454954, 139.6313859]}>
        <Popup>
          ランドマークタワー
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;