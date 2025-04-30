import { useEffect, useState } from 'react';
import './App.css';
import { excelData } from './population';
import ReactApexChart from 'react-apexcharts';

const convertPopulationData = (data, country) => {
  let returnData;
  if (country === '' || !country) {
    returnData = data.filter((item, index) => index === 0).map((item) => ({
      name: item["Country Name"],
      data: [item["2018"], item["2019"], item["2020"], item["2021"], item["2022"], item["2023"]]
    }))
  } else {
    returnData = data.filter((item) => item["Country Name"] === country).map((item) => ({
      name: item["Country Name"],
      data: [item["2018"], item["2019"], item["2020"], item["2021"], item["2022"], item["2023"]]
    }))
  }
  return returnData;
};

function App() {
  const [country, setCountry] = useState('');
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [state, setState] = useState({
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
          borderRadiusApplication: 'end'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ["2018", "2019", "2020", "2021", "2022", "2023"]
      },
      yaxis: {
        title: {
          text: 'Population'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val.toLocaleString();
          }
        }
      }
    },
  });

  const selectCountry = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
  };

  useEffect(() => {
    const fileData = convertPopulationData(excelData, country);
    setData(fileData);

    if (country === '') {
      setTableData(excelData);
    } else {
      const found = excelData.filter((item) => item["Country Name"] === country);
      setTableData(found);
    }
  }, [country]);

  const optionsList = excelData.map((data) => data["Country Name"]);

  return (
    <div style={{ backgroundColor: '#e6f2ff', minHeight: '100vh', padding: '30px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 className="main-heading" style={{ fontSize: '3em', marginBottom: '10px', color: '#003366' }}>
          Task 1: Population Analysis
        </h1>
        <p style={{ fontSize: '1.2em', color: '#333' }}>
          This project displays the population trend of different countries from 2018 to 2023 using an interactive bar chart and a detailed table.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 className="sub-heading" style={{ fontSize: '2em', color: '#004080' }}>Select a Country</h2>
        <select value={country} onChange={selectCountry} style={{ padding: '10px 20px', fontSize: '1em', borderRadius: '5px', border: '1px solid #ccc' }}>
          <option value=''>All Countries</option>
          {optionsList.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Section */}
      <div style={{ margin: '40px auto', maxWidth: '800px', backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
        <ReactApexChart options={state.options} series={data} type="bar" height={350} />
      </div>

      {/* Full Table Section */}
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2em', color: '#004080', marginBottom: '20px' }}>Population Data Table</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '90%', backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
            <thead style={{ backgroundColor: '#007acc', color: '#fff' }}>
              <tr>
                <th style={{ padding: '10px' }}>Country</th>
                <th style={{ padding: '10px' }}>2018</th>
                <th style={{ padding: '10px' }}>2019</th>
                <th style={{ padding: '10px' }}>2020</th>
                <th style={{ padding: '10px' }}>2021</th>
                <th style={{ padding: '10px' }}>2022</th>
                <th style={{ padding: '10px' }}>2023</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{item["Country Name"]}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{item["2018"]?.toLocaleString()}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{item["2019"]?.toLocaleString()}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{item["2020"]?.toLocaleString()}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{item["2021"]?.toLocaleString()}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{item["2022"]?.toLocaleString()}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{item["2023"]?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default App;