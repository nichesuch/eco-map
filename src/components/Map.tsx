"use client"

import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, divIcon } from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

//delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

type ColorMarkerProps = {
  position: LatLngExpression;
  color: string;
  size?: number;
  popup?: React.ReactNode;
}

type ImageMarkerProps = {
  position: LatLngExpression;
  html: string | HTMLElement;
  size?: number;
  popup?: React.ReactNode;
}

type MapProps = {
  center: LatLngExpression;
  zoom: number;
  markers?: Array<ColorMarkerProps | ImageMarkerProps>;
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
      {props.markers?.map((mark, index) => {
        if ('color' in mark) {
          return (
            <Marker key={"color-marker-" + index} position={mark.position} icon={divIcon({
              html: `
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="100" fill=${mark.color} /></svg>
                `,
              iconSize: [mark.size ?? 10, mark.size ?? 10],
              className: "color-marker"
            })}>
              {
                mark.popup ? (
                  <Popup>
                    {mark.popup!}
                  </Popup>
                ) : (<></>)
              }
            </Marker>
          )
        } else if ('html' in mark) {
          return (
            <Marker key={"color-marker-" + index} position={mark.position} icon={divIcon({
              html: mark.html,
              iconSize: [mark.size ?? 100, mark.size ?? 100],
              className: "image-marker"
            })}>
              {
                mark.popup ? (
                  <Popup>
                    {mark.popup!}
                  </Popup>
                ) : (<></>)
              }
            </Marker>
          )
        }
      }
      )}
    </MapContainer>
  );
};

export default Map;
export type { ColorMarkerProps, ImageMarkerProps };