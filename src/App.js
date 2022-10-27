import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { useState, useEffect, useCallback, useMemo } from 'react'
import { getMoment } from './utils/helpers';
import WeatherCard from './views/WeatherCard';
import useWeatherAPI from './hooks/useWeatherAPI';

const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AUTHORIZATION_KEY = 'CWB-FBFF0FFF-E3C6-4FB7-AA79-1A8ACBAC1BAD'
const LOCATION_NAME = '臺北'
const LOCATION_NAME_FORECAST = '臺北市';

function App() {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [currentWeather, fetchData] = useWeatherAPI({
    authorizationKey: AUTHORIZATION_KEY,
    locationName: LOCATION_NAME,
    cityName: LOCATION_NAME_FORECAST,
  })

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const moment = useMemo(() => getMoment(LOCATION_NAME_FORECAST), [])

  useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light' : 'dark')
  }, [moment])

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        <WeatherCard
          currentWeather={currentWeather}
          moment={moment}
          fetchData={fetchData}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
