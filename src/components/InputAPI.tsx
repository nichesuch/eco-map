"use client"

import { useRef } from "react"
import { JSONData } from "./JSONData";

type Props = {
  onData: Function
}

function InputAPI(props: Props) {
  const urlObj = useRef<HTMLInputElement>(null);
  const onSubmit = () => {

    const url = urlObj.current!.value;

    fetch(url).then(async (res) => {
      const json = await res.json();
      const dataList = json as Array<JSONData>;
      props.onData(dataList);
    });
    return false;
  }

  return (
    <div className="sm:flex p-2">
      <label htmlFor="api-url" className="mr-2 w-[200px]">APIから取得</label>
      <input ref={urlObj} type="text" id="api-url" name="url" className="w-full py-3 px-4 m-2 inline-block border border-gray-200 rounded-lg text-sm
        focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
        dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder="https://some.site/api/json"/>
      <button type="submit" className="py-3 px-4 w-[100px] items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent
        bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none
        dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={onSubmit}>
        表示
      </button>
    </div>
  )
}

export default InputAPI;
