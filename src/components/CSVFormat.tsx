export interface CSVFormat {
    IDENTIFIER: string,
    DT: string,
    LATITUDE: number,
    LONGITUDE: number,
    RISK: number,
    PM25: number,
    VOC: number,
    CO2: number
}

export const isCSV = (data:any):data is CSVFormat => {
    return "IDENTIFIER" in data
    && "DT" in data
    && "LATITUDE" in data
    && "LONGITUDE" in data
    && "RISK" in data
    && "PM25" in data
    && "VOC" in data
    && "CO2" in data;
}