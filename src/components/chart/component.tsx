import React from "react";
import "./styles.css";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export const BarChart = () => {
  //const ctx = document.getElementById("myChart");
  const place_name = "Омск"; //тут задаем город
  const API_KEY_YANDEX = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de";
  const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`;

  fetch(API_URL_GEO_DATA)
    .then((resp) => resp.json())
    .then(function (data) {
      let strCoordinates =
        data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos; //получили координаты нашего города
      //console.log(strCoordinates);
      let coordinates = strCoordinates.split(" "); //разбили строку на массив строк используя разделитель пробел
      const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`;
      let avgData: any = {
        date: [],
        pm10: [],
        pm2_5: [],
      };
      fetch(API_OPEN_METEO)
        .then((resp) => resp.json())
        .then(function (data) {
          //время : количество частиц pm10 : количество частиц pm2_5
          let newDate = data.hourly.time.map(function (item: any) {
            return new Date(item).toLocaleDateString();
          });
          avgData.date = Array.from(new Set(newDate));

          avgData.date.forEach((date: any, index: any) => {
            avgData.pm10[index] = 0;
            avgData.pm2_5[index] = 0;
            let count = 1;
            for (let i = 0; i < newDate.length; i++) {
              if (newDate[i] == date) {
                avgData.pm10[index] = avgData.pm10[index] + data.hourly.pm10[i];
                avgData.pm2_5[index] =
                  avgData.pm2_5[index] + data.hourly.pm2_5[i];
                count++;
              }
            }
            avgData.pm10[index] = avgData.pm10[index] / count;
            avgData.pm2_5[index] = avgData.pm2_5[index] / count;
          });

          //   new Chart(ctx, {
          //     type: "bar",
          const barChartdata = {
            labels: avgData.date,
            datasets: [
              {
                label: "pm10",
                data: avgData.pm10,
                borderWidth: 1,
              },
              {
                label: "pm2_5",
                data: avgData.pm2_5,
                borderWidth: 1,
              },
            ],
          };
          // options: {
          //   scales: {
          //     y: {
          //       beginAtZero: true,
          //     },
          //   },
          // },
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <div>
      <Bar data={BarChart} />
    </div>
  );
};
export default BarChart;
