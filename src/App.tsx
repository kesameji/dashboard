import './App.css'
import Grid from '@mui/material/Grid2'
import IndicatorWeather from './Components/IndicatorWeather'
import TableWeather from './Components/TableWeather';
import ControlWeather from './Components/ControlWeather';
import LineChartWeather from './Components/LineChartWeather';
import {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";

interface Weather {
    city?: string;
    temperature?: string;
    cloud?: string;
    precipitation?: string;
}

interface Row {
    date?: string
    temperature?: string
    feel?: string
    humidity?: string
}

function App() {

    {/* Variable de estado y función de actualización */
    }
    const [weather, setWeather] = useState<Weather>()
    const [rows, setRows] = useState<Row[]>([])
    const [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"))

    {/* Hook: useEffect */
    }
    useEffect(() => {
        const request = async () => {

            {/* Referencia a las claves del LocalStorage: openWeatherMap y expiringTime */
            }
            const savedTextXML = localStorage.getItem("openWeatherMap") || "";
            const expiringTime = localStorage.getItem("expiringTime");

            {/* Obtenga la estampa de tiempo actual */
            }
            const nowTime = (new Date()).getTime();
            if (expiringTime === null || nowTime > parseInt(expiringTime)) {

                {/* Request */
                }
                const API_KEY = "36e4725f56a20e911fce6588948e8f37"
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Quito&mode=xml&appid=${API_KEY}`)
                const savedTextXML = await response.text();

                {/* Tiempo de expiración */
                }
                const hours = 0.01
                const delay = hours * 3600000
                const expiringTime = nowTime + delay


                {/* En el LocalStorage, almacene el texto en la clave openWeatherMap, estampa actual y estampa de tiempo de expiración */
                }
                localStorage.setItem("openWeatherMap", savedTextXML)
                localStorage.setItem("expiringTime", expiringTime.toString())
                localStorage.setItem("nowTime", nowTime.toString())

                {/* DateTime */
                }
                localStorage.setItem("expiringDateTime", new Date(expiringTime).toString())
                localStorage.setItem("nowDateTime", new Date(nowTime).toString())

                {/* Modificación de la variable de estado mediante la función de actualización */
                }
                setOWM(savedTextXML)

            }

            if (savedTextXML) {
                {/* XML Parser */
                }
                const parser = new DOMParser();
                const xml = parser.parseFromString(savedTextXML, "application/xml");

                {/* Arreglo para agregar los resultados */
                }
                {/* Análisis, extracción y almacenamiento del contenido del XML
        en el arreglo de resultados*/
                }
                console.log("hola 1")
                const city = xml.getElementsByTagName("name")[0].innerHTML ?? ""
                console.log(city)
                const fore = xml.getElementsByTagName("forecast")[0].getElementsByTagName("time")[0];
                const temperature = Number.parseInt(fore.getElementsByTagName("temperature")[0].getAttribute("value")?.toString() as string) - 273.15;
                console.log(temperature)
                const cloud = fore.getElementsByTagName("clouds")[0].getAttribute("all")?.toString();
                console.log(cloud)
                const precipitation = fore.getElementsByTagName("precipitation")[0].getAttribute("probability")?.toString();
                console.log(precipitation)
                {/* Modificación de la variable de estado mediante la función de actualización */}
                setWeather({"city": city, "temperature": temperature.toFixed(1), "cloud":cloud, "precipitation": precipitation})
                console.log("hola 2")
                const dataToRows: Row[] = new Array<Row>();
                const forecast = xml.getElementsByTagName("forecast")[0];

                for (let i = 0; i < forecast.childElementCount; i++) {
                    const time = forecast.getElementsByTagName("time")[i];
                    const date = time.getAttribute("from")?.toString();
                    const temperature = Number.parseInt(time.getElementsByTagName("temperature")[0].getAttribute("value")!) - 273.15;
                    const feel = Number.parseInt(time.getElementsByTagName("feels_like")[0].getAttribute("value")!) - 273.15;
                    const humidity = Number.parseInt(time.getElementsByTagName("humidity")[0].getAttribute("value")!);
                    dataToRows.push({"date": date, "temperature": temperature.toFixed(2), "feel": feel.toFixed(2), "humidity": humidity.toString()})
                }
                setRows(dataToRows);
                console.log(dataToRows)
            }
        }

        request();
    }, [owm])

    return (
        <Grid container spacing={2}>
            <Grid size ={{xs: 12, xl: 12}}>
                <Typography variant="h4" component="h5" sx={{ textDecoration: 'none'}} align={"left"} >
                    ElectroBoard
                </Typography>
            </Grid>
            <></>
                <Grid key={1} size={{xs: 12, xl: 3}}>
                    <IndicatorWeather city={weather?.city}
                                      temperature={weather?.temperature}
                                      cloud={weather?.cloud}
                                      precipitation={weather?.precipitation} >
                    </IndicatorWeather>
                </Grid>
            {/* Tabla */}
            <Grid size={{xs: 12, xl: 8}}>
                {/* Grid Anidado */}
                <Grid container spacing={2}>
                    <Grid size={{xs: 12, xl: 3}}>
                        <ControlWeather/>
                    </Grid>

                    <Grid size={{xs: 12, xl: 9}}>
                        <TableWeather filas={rows}/>
                    </Grid>

                </Grid>
            </Grid>

            {/* Gráfico */}
            <Grid size={{xs: 12, xl: 4}}>
                <LineChartWeather/>
            </Grid>

        </Grid>
    )
}

export default App
