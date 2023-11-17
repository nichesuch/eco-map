"use client"

import React, { useEffect, useRef, useState } from "react";
import colormap from "colormap";
import InputFile from "@/components/InputFile";
import InputAPI from "@/components/InputAPI";
import { Data } from "@/components/Data";
import dynamic from "next/dynamic";
import { ColorMarkerProps } from "@/components/Map";

const colors = colormap({
  colormap: 'RdBu',
  nshades: 255,
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
  const [markers, setMarkers] = useState<ColorMarkerProps[]>([]);
  const addData = function (data: Array<Data>) {
    data.map((value, index) => {
      console.log(value);
      const marker = {
        position: [value.lat, value.long],
        color: colors[value.val],
        size: 10,
        popup: (<>{value.type}:{value.val}</>)
      } as ColorMarkerProps;
      setMarkers((markers) => [...markers, marker]);
    });
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