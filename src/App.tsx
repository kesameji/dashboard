import './App.css'
import Grid from '@mui/material/Grid2'
import IndicatorWeather from './Components/IndicatorWeather'
import TableWeather from './Components/FullForecast.tsx';
import {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs';
import Forecast from "./Components/Forecast";
import Data from "./Components/Data";
import {Cities} from "./Components/Cities.tsx";

interface Weather {
    city?: string;
    temperature?: string;
    cloudTitle?: string;
    cloudValue?: string;
    precipitation?: string;
}

interface Row {
    date?: string
    temperature?: string
    feel?: string
    humidity?: string,
    precipitation?: string,
}

interface City {
    name?: string;
    country?: string;
    timezone?: string;
    temperature?: string;
}

interface Datas {
    temperature?: string
    feel?: string
    humidity?: string
    precipitation?: string
}

const popularCities = [
    "Paris",
    "London",
    "New York",
    "Buenos Aires",
    "Sao Paulo",
    "Roma",
    "Bangkok",
    "Madrid",
    "Quito",
    "Dubai",
]

function App() {

    {/* Variable de estado y función de actualización */
    }
    const [weather, setWeather] = useState<Weather>()
    const [rows, setRows] = useState<Row[]>([])
    const [city, setCity] = useState<City[]>([])
    const [data, setData] = useState<Datas>({
        temperature: 'N/A',
        feel: 'N/A',
        humidity: 'N/A',
        precipitation: 'N/A',
    })
    const [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"))

    {/* Hook: useEffect */
    }
    useEffect(() => {
        const request = async () => {

            const savedTextXML = localStorage.getItem("openWeatherMap") || "";
            const expiringTime = localStorage.getItem("expiringTime");

            const nowTime = (new Date()).getTime();
            if (expiringTime === null || nowTime > parseInt(expiringTime)) {
                const API_KEY = "36e4725f56a20e911fce6588948e8f37"
                const city = "Guayaquil"
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=xml&appid=${API_KEY}`)
                const savedTextXML = await response.text();

                const hours = 0.01
                const delay = hours * 3600000
                const expiringTime = nowTime + delay

                localStorage.setItem("openWeatherMap", savedTextXML)
                localStorage.setItem("expiringTime", expiringTime.toString())
                localStorage.setItem("nowTime", nowTime.toString())

                localStorage.setItem("expiringDateTime", new Date(expiringTime).toString())
                localStorage.setItem("nowDateTime", new Date(nowTime).toString())

                setOWM(savedTextXML)

            }
            if (!savedTextXML) {
                return;
            }

            {/* XML Parser */
            }
            const parser = new DOMParser();
            const xml = parser.parseFromString(savedTextXML, "application/xml");
            {/* Arreglo para agregar los resultados */
            }
            {/* Análisis, extracción y almacenamiento del contenido del XML
    en el arreglo de resultados*/
            }
            const city = xml.getElementsByTagName("name")[0].innerHTML ?? ""
            const fore = xml.getElementsByTagName("forecast")[0].getElementsByTagName("time")[0];
            const temperature = Number.parseInt(fore.getElementsByTagName("temperature")[0].getAttribute("value")?.toString() as string) - 273.15;
            const cloudTitle = fore.getElementsByTagName("clouds")[0].getAttribute("value")?.toString();
            const cloudValue = fore.getElementsByTagName("clouds")[0].getAttribute("all")?.toString();
            let precipitation = fore.getElementsByTagName("precipitation")[0].getAttribute("probability")?.toString();
            {/* Modificación de la variable de estado mediante la función de actualización */
            }
            setWeather({
                "city": city,
                "temperature": temperature.toFixed(1),
                "cloudValue": cloudValue,
                "cloudTitle": cloudTitle,
                "precipitation": precipitation
            })
            const dataToRows: Row[] = new Array<Row>();
            const forecast = xml.getElementsByTagName("forecast")[0];
            for (let i = 0; i < forecast.childElementCount; i++) {
                const time = forecast.getElementsByTagName("time")[i];
                const date = time.getAttribute("from")?.toString();
                const temperature = Number.parseInt(time.getElementsByTagName("temperature")[0].getAttribute("value")!) - 273.15;
                const feel = Number.parseInt(time.getElementsByTagName("feels_like")[0].getAttribute("value")!) - 273.15;
                const humidity = time.getElementsByTagName("humidity")[0].getAttribute("value") ?? "";
                precipitation = time.getElementsByTagName("precipitation")[0].getAttribute("probability") ?? ""
                dataToRows.push({
                    "date": date,
                    "temperature": temperature.toFixed(2),
                    "feel": feel.toFixed(2),
                    "humidity": humidity,
                    "precipitation": precipitation,
                })
            }
            setRows(dataToRows);
            const dataToCities: City[] = new Array<City>();
            const API_KEY = "36e4725f56a20e911fce6588948e8f37"
            for (const c of popularCities) {
                const r = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${c}&mode=xml&appid=${API_KEY}`)
                const textXML = await r.text();
                const parser = new DOMParser();
                const data = parser.parseFromString(textXML, "application/xml");
                const name = data.getElementsByTagName("name")[0].innerHTML;
                const country = data.getElementsByTagName("country")[0].innerHTML;
                const timeZone = data.getElementsByTagName("timezone")[0].innerHTML;
                const temp = data.getElementsByTagName("temperature")[0].getAttribute("value")?.toString();
                dataToCities.push({"name": name, "country": country, "timezone": timeZone, "temperature": temp});
            }
            setCity(dataToCities)

            const dataToGauge : Datas = {
                "temperature": temperature.toFixed(1),
                "feel" : fore.getElementsByTagName("feels_like")[0].getAttribute("value")?.toString() ?? "",
                "precipitation" : fore.getElementsByTagName("precipitation")[0].getAttribute("probability")?.toString() ?? "",
                "humidity" : fore.getElementsByTagName("humidity")[0].getAttribute("value")?.toString() ?? "",
            };
            setData(dataToGauge);
        }

        request();
    }, [owm])


    return (
        <Grid container spacing={2}>
            <Grid sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
                  size={{xs: 12, xl: 12}}>
                <Grid size={{xs: 12, xl: 9}}>
                    <Typography variant="h4" component="h5" sx={{textDecoration: 'none'}} align={"left"}>
                        ElectroBoard
                    </Typography>
                    <Typography variant="h5" component="p" sx={{textDecoration: 'none'}} align={"left"}>
                        Hello Human, let's look at the weather forecast
                    </Typography>
                </Grid>
                <Grid size={{xs: 12, xl: 3}}>
                    <Typography variant="h5" component="p" sx={{textDecoration: 'none'}} align={"left"}>
                        Showing data from
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimePicker']}>
                            <DateTimePicker sx={{
                                color: 'white',
                                backgroundColor: 'white'
                            }} disabled={true} defaultValue={dayjs('2022-04-17')}/>
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid size={{xs: 12, xl: 12}}>
                <div className="container">
                    <div className="box">
                        <IndicatorWeather city={weather?.city}
                                          temperature={weather?.temperature}
                                          cloudTitle={weather?.cloudTitle}
                                          cloudValue={weather?.cloudValue}
                                          precipitation={weather?.precipitation}>
                        </IndicatorWeather>
                    </div>
                    <div className="box">
                        <Forecast filas={rows}/>
                    </div>
                    <div className="box">
                        <Data temperature={data.temperature}
                              feel={data.feel}
                              humidity={data.humidity}
                              precipitation={data.precipitation}>

                        </Data>
                    </div>
                    <div className="box box4">
                        <Cities cities={city}/>
                    </div>
                    <div className="box box5">
                        <TableWeather filas={rows}/>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default App
