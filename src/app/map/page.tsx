"use client"

import React, { useEffect, useRef, useState } from "react";
import colormap from "colormap";
import InputFile from "@/components/InputFile";
import InputAPI from "@/components/InputAPI";
import { JSONData } from "@/components/JSONData";
import dynamic from "next/dynamic";
import { ColorMarkerProps, ImageMarkerProps } from "@/components/Map";
import InputImageFile from "@/components/InputImageFile";
import { CSVFormat, isCSV } from "@/components/CSVFormat";
import CSVDataView from "@/components/CSVDataView";

const STEPS = 255
const colors = colormap({
  colormap: 'jet',
  nshades: STEPS,
  format: 'hex',
  alpha: 1
})

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
  const [markers, setMarkers] = useState<(ColorMarkerProps | ImageMarkerProps)[]>([]);
  const addData = function (data: Array<JSONData|CSVFormat>) {
    data.map((value, index) => {
      if(isCSV(value)){
        if(value.LATITUDE == undefined || value.LONGITUDE == undefined) return;
        const marker = {
          position: [value.LATITUDE, value.LONGITUDE],
          color: value.RISK != undefined ? colors[Math.round(value.RISK * ((STEPS - 1) / 10))] : "black",
          size: 10,
          popup: (<CSVDataView data={value} colors={colors} colorStep={STEPS} />)
        } as ColorMarkerProps;
        setMarkers((markers) => [...markers, marker]);
      }else{
        if(value.lat == undefined || value.long == undefined) return;
        const marker = {
          position: [value.lat, value.long],
          color: value.val != undefined ? colors[value.val] : "black",
          size: 10,
          popup: (<>
            {value.img ? (
              <img src={value.img} alt={JSON.stringify(value.type)}></img>
            ) : <></>}
            {value.type ? (
              <pre>{JSON.stringify(value.type)}</pre>
            ) : <></>}
            {value.val ? (
              <p>{value.val}</p>
            ) : <></>}
          </>)
        } as ColorMarkerProps;
        setMarkers((markers) => [...markers, marker]);  
      }
      
    });
  }

  const addImage = function (data: Array<JSONData>) {
    data.map((value, index) => {
      if(value.lat == undefined || value.long == undefined) return;
      console.log(value);
      const marker = {
        position: [value.lat, value.long],
        html: value.img,
        size: 10,
      } as ImageMarkerProps;
      setMarkers((markers) => [...markers, marker]);  
    });
  }
  const clearData = function () {
    setMarkers([]);
  }
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      ColorBar(ref.current, colors, 40, ref.current.width);
    }
  }, [ref]);

  const Map = React.useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return <main className="container mx-auto">
    <div className="flex flex-col p-2">
      <InputImageFile onData={addImage} />
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
      <Map center={[35.454954, 139.6313859]} zoom={16} markers={markers} >
      </Map>
    </div>
  </main>
}

export default MapPage;