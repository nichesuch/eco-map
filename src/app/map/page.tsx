"use client"

import React, { useEffect, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import colormap from "colormap";
import Map from "@/components/Map";
import InputFile from "@/components/InputFile";
import InputAPI from "@/components/InputAPI";
import { Data } from "@/components/Data";

const colors = colormap({
  colormap: 'RdBu',
  nshades: 255,
  format: 'hex',
  alpha: 1
})

function ColorIcon(type: string, val: number, size: number = 10) {
  return L.divIcon({
    html:
      '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="100" fill="' + colors[val] + '" /></svg>',
    className: 'color marker',
    iconSize: [size, size]
  })
}

function ColorBar(canvas: HTMLCanvasElement, colors: string[], height: number, width: number) {
  const c = canvas.getContext('2d');
  if (c == null || colors == null || colors.length <= 0) return;

  const colorWidth = width / colors.length;
  colors.map((color, i) => {
    c.fillStyle = color;      // start ind at index 0
    c.fillRect(i * colorWidth, height, colorWidth, 40);
  });
}

function MapPage() {
  const [markers, setMarkers] = useState<React.ReactNode[]>([]);
  const addData = function (data: Array<Data>) {
    const tmp = data.map((value, index) => {
      console.log(value);
      return <Marker key={index} position={[value.lat, value.long]} icon={ColorIcon(value.type, value.val)}>
        <Popup>{value.type}:{value.val}</Popup>
      </Marker>;
    });
    setMarkers((markers) => [...markers, tmp]);
  };
  const clearData = function () {
    setMarkers([]);
  }
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      ColorBar(ref.current, colors, 40, ref.current.width);
    }
  }, [ref]);

  return <main className="container mx-auto">
    <div className="flex flex-col p-2">
      <InputFile onData={addData} />
      <InputAPI onData={addData} />
      <button type="button" className="py-3 px-4 items-center gap-x-2 text-sm font-semibold rounded-lg
                border border-transparent bg-gray-500 text-white hover:bg-gray-600
                disabled:opacity-50 disabled:pointer-events-none
                dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={clearData}>
        クリア
      </button>
    </div>
    <div>
      <canvas ref={ref} id="colorBar" className="w-full h-[40px]" />
    </div>
    <div className="h-[80vh]">
      <Map center={[35.454954, 139.6313859]} zoom={16} >
        {markers}
      </Map>
    </div>
  </main>
}

export default MapPage;