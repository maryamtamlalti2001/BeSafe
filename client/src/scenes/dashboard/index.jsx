import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FormControl, Select, MenuItem, Button, Grid, Paper, Typography } from '@mui/material';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import AlertComponent from '../../components/AlertComponent';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [averageValue, setAverageValue] = useState(null);
  const [sumValue, setSumValue] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5003/api/airquality');
        const jsonData = await response.json();
        const filteredData = filterDataByPeriod(jsonData, selectedPeriod); // Filter data for the selected period
        setData(filteredData);
        calculateStatistics(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [selectedPeriod]);

  // Helper function to filter data based on period
  const filterDataByPeriod = (data, period) => {
    let filteredData = [];
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    switch (period) {
      case 'today':
        filteredData = data.filter((item) => item.timestamp.split('T')[0] === currentDate);
        break;
      case 'yesterday':
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDate = yesterday.toISOString().split('T')[0]; // Get yesterday's date in YYYY-MM-DD format
        filteredData = data.filter((item) => item.timestamp.split('T')[0] === yesterdayDate);
        break;
      // Add more cases for other periods
      default:
        filteredData = data;
        break;
    }

    return filteredData;
  };

  const handleFilterChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const exportToCSV = () => {
    const currentDate = new Date();
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);

    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.timestamp);
      return isWithinInterval(itemDate, { start: startDate, end: endDate });
    });

    const csvData = Papa.unparse(filteredData);
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(csvBlob, 'data.csv');
  };

  const calculateStatistics = (data) => {
    const aqValues = data.map((item) => parseInt(item.aq));
    const temperatureValues = data.map((item) => parseInt(item.temperature));
    const humidityValues = data.map((item) => parseInt(item.humidity));
  
    const minAq = Math.min(...aqValues);
    const maxAq = Math.max(...aqValues);
    const averageAq = aqValues.reduce((sum, value) => sum + value, 0) / aqValues.length;
  
    const sumAq = aqValues.reduce((sum, value) => sum + value, 0);
    const sumTemperature = temperatureValues.reduce((sum, value) => sum + value, 0);
    const sumHumidity = humidityValues.reduce((sum, value) => sum + value, 0);
    const sum = sumAq + sumTemperature + sumHumidity; // Somme des composants
  
    setMinValue(minAq);
    setMaxValue(maxAq);
    setAverageValue(averageAq);
    setSumValue(sum); // Ajout de la somme aux valeurs de statistiques
  };
  
  /*const calculateStatistics = (data) => {
    const values = data.map((item) => item.aq);

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const averageValue = values.reduce((sum, value) => sum + value, 0) / values.length;

    setMinValue(minValue);
    setMaxValue(maxValue);
    setAverageValue(averageValue);
  };
  */

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Grid container justifyContent="space-between">
          <Grid item>
            <FormControl variant="outlined" sx={{ minWidth: 200, marginLeft: '65px' , marginTop: '10px'} }>
              <Select value={selectedPeriod} onChange={handleFilterChange} label="Période">
                <MenuItem value="today">Aujourd'hui</MenuItem>
                <MenuItem value="yesterday">Hier</MenuItem>
                {/* Ajoutez d'autres options de période */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={exportToCSV} sx={{ width: '200px', height: '56px', fontSize: '1rem', marginRight: '125px', marginTop: '10px', color: '#21295c',backgroundColor: '#F2FAE3', }}>
              Export to CSV
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <LineChart width={1000} height={480} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="aq" stroke="rgba(75, 192, 192, 1)" name="Air Quality" />
              <Line type="monotone" dataKey="humidity" stroke="rgba(255, 99, 132, 1)" name="Humidity" />
              <Line type="monotone" dataKey="temperature" stroke="rgba(54, 162, 235, 1)" name="Temperature" />
            </LineChart>
          </Grid>
          <Grid item sx={{ marginTop: '100px' }}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                {/* Max Value */}
                <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px', marginRight: '68px', width: '300px' , textAlign: 'center', backgroundColor :'rgba(54, 162, 235, 1)'}}>
                  <Typography variant="h6" component="span" >
                    Max AQI: {maxValue}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                {/* Min Value */}
                <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px', marginRight: '68px', width: '300px' , textAlign: 'center', backgroundColor :'rgba(54, 162, 235, 1)'}}>
                  <Typography variant="h6" component="span">
                    Min AQI: {minValue}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                {/* Average Value */}
                <Paper elevation={3} sx={{ padding: '16px' , marginRight: '68px', width: '300px', textAlign: 'center', backgroundColor :'rgba(54, 162, 235, 1)'}}>
                  <Typography variant="h6" component="span">
                    Average AQI: {averageValue}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
      <Grid item>
      {data && data.length > 0 ? (
       <AlertComponent data={data} />
        ) : null}
      </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;