import React, { Component } from "react";
import CanvasJSReact from "../../../assets/Charts/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class CategorySales extends Component {
  render() {
    const options = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Your Products sold",
      },
      data: [
        {
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: [
            { y: 18, label: "Cloths Collections" },
            { y: 49, label: "Electronics" },
            { y: 9, label: "Footwear" },
            { y: 5, label: "Home Accoseries" },
            { y: 19, label: "Laptops" },
          ],
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default CategorySales;
