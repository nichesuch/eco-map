export interface CSVFormat {
    IDENTIFIER: string,
    DT: string,
    LATITUDE: number,
    LONGITUDE: number,
    RESERVE2: number,
    PM25: number,
    S_VOC: number,
    CO2: number
}

export const isCSV = (data:any):data is CSVFormat => {
    return "IDENTIFIER" in data
    && "DT" in data
    && "LATITUDE" in data
    && "LONGITUDE" in data
    && "RESERVE2" in data
    && "PM25" in data
    && "S_VOC" in data
    && "CO2" in data;
}