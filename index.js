import jsonData from "./data.json" assert {type: "json"}

const myChart = document.getElementById("chart")
const days = jsonData.map(i => i.day)
const data = jsonData.map(i => i.amount)
const d = new Date()
let day = d.getDay() - 1

day = day === -1 ? 6 : day

const backgroundColor = days.map((i, index) => index === day ?
   "hsl(186, 34%, 60%)" : "hsl(10, 79%, 65%)")
const hoverBackgroundColor = days.map((i, index) => index === day ?
   "#b4dfe5" : "#ff9b87")

let w = window.innerWidth
const fontSize = w <= 550 ? 12 : 16

const plugins = {
   legend: {
      labels: {
         boxWidth: 0,
         boxHeight: 20,
      }
   },
   tooltip: {
      backgroundColor: "hsl(25, 47%, 15%)",
      bodyColor: "#fffdf3",
      yAlign: 'bottom',
      xAlign: 'center',
      caretSize: 0,
      displayColors: false,
      caretPadding: 8,
      padding: {
         top: w <= 550 ? 8 : 12,
         left: w <= 550 ? 6 : 10,
         right: w <= 550 ? 6 : 10,
         bottom: w <= 550 ? 4 : 8,
      },
      bodyFont: {
         size: fontSize,
         family: "'DM Sans', sans-serif"
      },
      callbacks: {
         title: () => { },
         label: (context) => {
            return "$" + context.formattedValue
         },
      }
   }
}

new Chart(myChart, {
   type: "bar",
   data: {
      labels: days,
      datasets: [{
         label: "",
         hoverBackgroundColor: hoverBackgroundColor,
         data: data,
         backgroundColor: backgroundColor,
         borderRadius: 4,
         borderSkipped: false,
      }]
   },
   options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: plugins,
      onHover: (event, chartElement) => {
         event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default'

      },
      scales: {
         x: {
            grid: {
               display: false,
               drawBorder: false,
            }
         },
         y: {
            grid: {
               display: false,
               drawBorder: false,
            },
            ticks: {
               display: false
            }
         }
      }
   }
})