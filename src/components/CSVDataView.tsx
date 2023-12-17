import { CSVFormat } from "./CSVFormat";

type Props = {
    data: CSVFormat,
    colors: string[],
    colorStep: number,
} 

const CSVDataView = (props:Props) =>{
    return (
<div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr>
              <th scope="col" className="px-6 py-2 text-start text-xs font-medium text-gray-500 uppercase">ID</th>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{props.data.IDENTIFIER}</td>
            </tr>
            <tr>
              <th scope="col" className="px-6 py-2 text-start text-xs font-medium text-gray-500 uppercase">日時</th>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{props.data.DT}</td>
            </tr>
            <tr>
              <th scope="col" className="px-6 py-2 text-start text-xs font-medium text-gray-500 uppercase">リスク</th>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium text-white dark:text-white"
                  style={{backgroundColor:props.colors[Math.round(Math.min(props.data.RISK, 10) * ((props.colorStep - 1) / 10))]}}>
                  {props.data.RISK}
                </span>
              </td>
            </tr>
            <tr>
              <th scope="col" className="px-6 py-2 text-start text-xs font-medium text-gray-500 uppercase">PM2.5</th>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium text-white dark:text-white"
                  style={{backgroundColor:props.colors[Math.round(Math.min(props.data.PM25, 700) * ((props.colorStep - 1) / 700))]}}>
                  {props.data.PM25}
                </span>
              </td>
            </tr>
            <tr>
              <th scope="col" className="px-6 py-2 text-start text-xs font-medium text-gray-500 uppercase">VOC</th>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium text-white dark:text-white"
                  style={{backgroundColor:props.colors[Math.round(Math.min(props.data.VOC, 320) * ((props.colorStep - 1) / 320))]}}>
                  {props.data.VOC}
                </span>
              </td>
            </tr>
            <tr>
              <th scope="col" className="px-6 py-2 text-start text-xs font-medium text-gray-500 uppercase">CO2</th>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium text-white dark:text-white"
                  style={{backgroundColor:props.colors[Math.round(Math.min(props.data.CO2, 5000) * ((props.colorStep - 1) / 5000))]}}>
                  {props.data.CO2}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    )
}

export default CSVDataView;