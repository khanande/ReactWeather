import { CircularProgress, Slide, TextField } from "@mui/material";
import { useEffect, useState } from "react";
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./App.css";
import "./footer.css"
import BackgroundVideo from './BackgroundVideo';
import Footer from "./footer";



function App() {
  const [cityName, setCityName] = useState("New Delhi");
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2eb9e0a69cf6dcf8b2aa2ba984038918&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          error && setError(false);
          return res.json();
        } else {
          throw new Error("Something went wrong")
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [cityName, error]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setCityName(e.target.value);
      setInputText("");
    }
  };

  return (
    
    <div className="bg_img">
      <h1 id="op">Khanande Weather App </h1>
      
      {!loading && Object.keys(data).length > 0 ? (
        <>
          <TextField
            variant="filled"
            label="Search location"
            className="input"
            error={error}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleSearch}
          />
          <h1 className="city">{data.name}</h1>
          <div className="group">
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              alt=""
            />
            <h1>{data.weather[0].main}</h1>
          </div>

          <h1 className="temp">{data.main.temp.toFixed()} °C</h1>
          

          <div className="box_container">

  <Slide direction="left" timeout={800} in={!loading}>
    <div className="box left">
      <p>Humidity</p>
      <h1>{data.main.humidity.toFixed()}%</h1>
    </div>
  </Slide>

  <Slide direction="right" timeout={800} in={!loading}>
    <div className="box right">
      <p>Wind</p>
      <h1>{data.wind.speed.toFixed()} km/h</h1>
    </div>
  </Slide>

  <Slide direction="up" timeout={800} in={!loading}>
    <div className="box center">
      <p>Feels Like</p>
      <h1>{data.main.feels_like.toFixed()} °C</h1>
    </div>
  </Slide>
</div>

<BackgroundVideo/>


<div>
<p className="developed_by" onClick={() => window.open('https://www.linkedin.com/in/khanande/', '_blank')}>Developed by Aakash Khanande</p>

<Footer/>



    </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
    
    
  );
}

export default App;