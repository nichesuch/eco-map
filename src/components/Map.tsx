"use client"

import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";

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
  const mapRef = useRef<L.Map>(null)
  const markers: (L.CircleMarker | L.Marker)[] = [];
  
  const setMarker = () => {
    props.markers?.map((mark, index) => {
      if ('color' in mark) {
        var marker = new L.CircleMarker(
          mark.position,
          {
            radius: 5,
            fillOpacity: 1.0,
            stroke: false,
            color: mark.color,
          }
        );
        if(mark.popup){
          const str = ReactDOMServer.renderToString(<>{mark.popup}</>)
          marker.bindPopup(str);
        }
        markers.push(marker);
        if(mapRef?.current){
          marker.addTo(mapRef.current)
        }
      } else if ('html' in mark) {
        var image = new L.Marker(
          mark.position,
          {
            icon: L.divIcon(
              {
                html: mark.html,
                iconSize: [mark.size ?? 100, mark.size ?? 100],
                className: "image-marker"
              }
            )
          }
        );
        markers.push(image);
        if(mapRef?.current){
          image.addTo(mapRef.current)
        }
      }
    })
  }

  const clearMarker = () => {
    markers.map((mark)=>{
      mark.remove()
    });
    markers.splice(0);
  }

  useEffect(() => {
    clearMarker();
    setMarker();
  },[props.markers]);

  return (
    <MapContainer
      ref={mapRef}
      preferCanvas={true}
      center={props.center}
      zoom={props.zoom}
      minZoom={10}
      maxZoom={24}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", minHeight: '100px', minWidth: '100px' }}
    >
      {null ??
        <TileLayer className="dark:hidden"
        maxZoom={24}
        maxNativeZoom={18}
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />}
      {null ??
        <TileLayer className="hidden dark:block"
          maxZoom={24}
          maxNativeZoom={18}
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
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
export type { ColorMarkerProps, ImageMarkerProps };