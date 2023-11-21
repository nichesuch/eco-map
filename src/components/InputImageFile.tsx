import loadImage, { Exif } from 'blueimp-load-image';


type Props = {
    onData: Function
}

function InputImageFile(props: Props) {
    const calcDegree = (gpsExif: any, key: "Latitude"|"Longitude") => {
        const gps = gpsExif.get('GPS'+ key);
        const ref = gpsExif.get('GPS'+ key +'Ref');
        if(gps instanceof Array) {
            const degrees = gps[0];
            const minutes = gps[1];
            const seconds = gps[2];
            let dd = degrees + minutes/60 + seconds/(60*60);

            if (['S', 'W'].includes(ref)) { // 南半球、西経の場合はマイナス
                dd *= -1;
            }
            return dd
        }
        return undefined
    }

    const getGps = (exif?: Exif) => {
        var gpsInfo:any = exif && exif.get('GPSInfo')
        if(!gpsInfo) return;
        return {
            lat: calcDegree(gpsInfo, "Latitude"),
            long: calcDegree(gpsInfo, "Longitude"),
        };
    }

    const getExifData = (file: File) => {
        return new Promise<Exif|undefined>((resolve) => {
            loadImage.parseMetaData(file, (data) => {
                console.log(data)
                console.log('Exif data: ', data.exif)
                resolve(data.exif);
            })
        });
    }
    
    const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const images = []
        for (var i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i]
            const exif = await getExifData(file);
            const position = getGps(exif);
            console.log("position:",position);
            if(!position) {
                alert("位置情報がない画像でした。");
                continue;
            }
            if(props.onData && position) {
                const result = await loadImage(file, { maxWidth: 100, canvas: true });
                const image = result.image as HTMLCanvasElement
                images.push({
                    lat: position.lat,
                    long: position.long,
                    img: image
                });
            }
        }
        if(props.onData) props.onData(images);
    }

    return (
        <div className="sm:flex p-2">
            <label htmlFor="image-input" className="mr-2 w-[200px]">位置情報付写真</label>
            <input type="file" id="image-input" className="m-2 block w-full border border-gray-200 shadow-sm rounded-lg text-sm
                        focus:z-10 focus:border-blue-500 focus:ring-blue-500
                        disabled:opacity-50 disabled:pointer-events-none
                        dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
                        file:bg-gray-50 file:border-0 file:bg-gray-100 file:me-4 file:py-3 file:px-4
                        dark:file:bg-gray-700 dark:file:text-gray-400"
                        onChange={onChangeFile} accept=".jpeg, .jpg, .png, .webp, .gif" multiple
            />
        </div>
    )
}

export default InputImageFile;