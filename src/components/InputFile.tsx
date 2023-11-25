"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import Papa, { ParseResult } from 'papaparse';
import { JSONData } from "./JSONData";
import { CSVFormat } from "./CSVFormat";


type Inputs = {
  example: FileList
}

type Props = {
  onData: Function
}

function InputFile(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    const inputFile = data.example[0];

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      try{
        const dataList = JSON.parse(target?.result as string) as Array<JSONData>;
        props.onData(dataList);
      }catch(e){
        Papa.parse(inputFile, {
          complete: (results: ParseResult<CSVFormat>) => {
            console.log(results.data)
            props.onData(results.data);
          },
          header: true,
          dynamicTyping: true,
          error: () => {
            alert('エラーが発生しました')
          },
        })
      }
    };
    reader.readAsText(inputFile);
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="sm:flex p-2" onSubmit={handleSubmit(onSubmit)}>

      <label htmlFor="json-file-input" className="mr-2 w-[200px]">ファイルから取得</label>
      <input type="file" id="json-file-input" className="m-2 block w-full border border-gray-200 shadow-sm rounded-lg text-sm
                focus:z-10 focus:border-blue-500 focus:ring-blue-500
                disabled:opacity-50 disabled:pointer-events-none
                dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
                file:bg-gray-50 file:border-0 file:bg-gray-100 file:me-4 file:py-3 file:px-4
                dark:file:bg-gray-700 dark:file:text-gray-400"
        {...register("example")}
      />
      <button type="submit" className="py-3 px-4 w-[100px] items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent
                bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none
                dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        表示
      </button>

      {/* errors will return when field validation fails  */}
      {errors.example && <span>This field is required</span>}

    </form>
  )
}

export default InputFile;