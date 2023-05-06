import React, {useEffect, useState} from "react";

const Forecast = (props) => {

    const [futureData, setFutureData] = useState();
    const [dates, setDates] = useState([])

    useEffect(()=>{
        getForecast()
    }, []);

    useEffect(()=>{
        console.log(futureData);
    },[futureData]);

    const getForecast = () => {
        //console.log(props.forecastData.list[0])
        let dateTemp = props.forecastData.list[0].dt_txt.substring(0,10)
        let tempCounter = 0
        let entryCounter = 0
        let avgTemperature = 0
        var tempDict = {}
        var dateArray = []
        for(let i = 0; i < props.forecastData.list.length; i++){
            //console.log(props.forecastData.list[i].dt_txt.substring(0,10))
            let date = props.forecastData.list[i].dt_txt.substring(0,10)
            let temperature = props.forecastData.list[i].main.temp
            if(date === dateTemp){
                //console.log(date)
                tempCounter += temperature
                entryCounter++
            } else {
                dateArray.push(dateTemp)
                avgTemperature = tempCounter/entryCounter
                //console.log(dateTemp,avgTemperature)
                tempDict[dateTemp] = avgTemperature
                tempCounter = 0
                entryCounter = 0
                dateTemp = date
                tempCounter += temperature
                entryCounter++
            }
            
        }
        dateArray.push(dateTemp)
        //console.log(dateArray)
        avgTemperature = tempCounter/entryCounter
        //console.log(dateTemp,avgTemperature)
        tempDict[dateTemp] = avgTemperature
        setFutureData(tempDict)
        setDates(dateArray)
        //console.log(futureData['2023-05-06'])
        //for(var key in tempDict) {
            //console.log(key + " : " + tempDict[key]);
        //}


    }

    //test{futureData['2023-05-06']}
    //{Object.keys(futureData)}
    return (
        <div className="container">
            <div className="info">
                <p>
                </p>
                
            </div>
            
        </div>
    );
}

export default Forecast;