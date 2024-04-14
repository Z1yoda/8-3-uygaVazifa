import React, { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import currency from "./assets/data/currency.json";
import arrow from './assets/images/arrow.svg'
import { RotatingLines } from "react-loader-spinner";

function AppChart() {
    const [data, setData] = useState([]);
    const [realData, setRealData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currencyCodes, setCurrencyCodes] = useState([]);
    const selectFromRef = useRef(null);
    const selectToRef = useRef(null);
    const toInputref = useRef(1)
    const fromInputref = useRef(0)
    const [inputFrom, setInputFrom] = useState(1);
    const [inputTo, setInputTo] = useState('');
    const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState('USD - US Dollar');
    const [selectedCurrencyTo, setSelectedCurrencyTo] = useState('UZS - Uzbekistan Som');

    useEffect(() => {
        setCurrencyCodes(currency);

        const fetchData = async () => {
            try {
                const apiKey = "PMoVV4ZPFcaFjjIDgo6xR26BLvbDdWbT";
                const url =
                    `https://api.polygon.io/v2/aggs/ticker/C:USDUZS/range/1/day/2024-03-14/2024-04-14?apiKey=` +
                    apiKey;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData.results);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchRealData = async () => {
            try {
                const apiKey = "PMoVV4ZPFcaFjjIDgo6xR26BLvbDdWbT";
                const url =
                    `https://api.polygon.io/v1/conversion/${selectedCurrencyFrom}/${selectedCurrencyTo}` +
                    apiKey;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setRealData(jsonData.results);
                console.log(realData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedCurrencyTo]);

    const chartOptions = {
        chart: {
            type: "line",
            height: 350,
        },
        xaxis: {
            type: "datetime",
        },
        series: [
            {
                name: "Price",
                data: data.map((item) => [
                    new Date(item.t).getTime(),
                    Number(item.c.toFixed(1)),
                ]),
            },
        ],
    };

    function handleArrow() {
        setSelectedCurrencyFrom(selectedCurrencyTo);
        setSelectedCurrencyTo(selectedCurrencyFrom);
        setInputFrom(toInputref.current.value);
        setInputTo(fromInputref.current.value);
        console.log(selectedCurrencyFrom, inputTo);
    }

    if (loading) {
        return <div style={{ marginTop: "300px", marginLeft: "650px" }}>
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperClass=""
            />
        </div>;
    }

    if (error) {
        return < div > Error: {error.message}</div >;
    }

    return (
        <div className="">
            <header className="container-float bg-primary p-3">
                <h1 className="text-white text-center">Currency Converter</h1>
            </header>
            <div className="mt-5 container d-flex gap-">
                <div style={{ marginRight: "64px" }} className="d-flex flex-column col-6">
                    <h1 className="pb-2 fw-bold">{selectedCurrencyFrom} to {selectedCurrencyTo}</h1>
                    <div className="d-flex rounded shadow">
                        <form className="p-3 rounded">
                            <select
                                ref={selectFromRef}
                                className="form-select form-select-lg mb-4"
                                aria-label="Large select example"
                                onChange={(event) => setSelectedCurrencyFrom(event.target.value)}
                                value={selectedCurrencyFrom}
                            >
                                {/* {currencyCodes &&
                                    Object.keys(currencyCodes).map((currencyCode) => (
                                        <option key={currencyCode} value={currencyCode}>
                                            {currencyCode} - {currencyCodes[currencyCode].name}
                                        </option>
                                    ))} */}
                                <option value='PLN'>PLN - Polish Zloty</option>
                                <option value='ILS'>ILS - Israeli New Sheqel</option>
                                <option value='HKG'>HKG - Hong Kong Dollar</option>
                                <option value='CHF'>CHF - Swiss Franc</option>
                                <option value='EUR'>EUR - Euro</option>
                                <option value='USD'>USD - US Dollar</option>
                                <option value='USD'>USD - US Dollar</option>
                                <option value='UZS'>UZS - Uzbekistan Som</option>
                            </select>
                            <div className="col-auto ">
                                <input ref={fromInputref} onChange={(event) => setInputFrom(event.target.value)} value={inputFrom} type="text" className="py-3 form-control rounded-0 outline-none border-0 outline-0 bg-body-secondary" id="autoSizingInput" />
                            </div>
                        </form>
                        <img onClick={handleArrow} src={arrow} alt="" />
                        <form className="p-3 rounded">
                            <select
                                ref={selectToRef}
                                className="form-select form-select-lg mb-4"
                                aria-label="Large select example"
                                onChange={(event) => setSelectedCurrencyTo(event.target.value)}
                                value={selectedCurrencyTo}
                            >
                                {/* {currencyCodes &&
                                    Object.keys(currencyCodes).map((currencyCode) => (
                                        <option key={currencyCode} value={currencyCode}>
                                            {currencyCode} - {currencyCodes[currencyCode].name}
                                        </option>
                                    ))} */}
                                <option value='PLN'>PLN - Polish Zloty</option>
                                <option value='ILS'>ILS - Israeli New Sheqel</option>
                                <option value='HKG'>HKG - Hong Kong Dollar</option>
                                <option value='CHF'>CHF - Swiss Franc</option>
                                <option value='EUR'>EUR - Euro</option>
                                <option value='USD'>USD - US Dollar</option>
                                <option value='USD'>USD - US Dollar</option>
                                <option value='UZS'>UZS - Uzbekistan Som</option>
                            </select>
                            <div className="col-auto ">
                                <input ref={toInputref} onChange={(event) => setInputTo(event.target.value)} value={inputTo} type="text" className="py-3 form-control rounded-0 outline-none border border-start-0 border-top-0 border-end-0 outline-0 bg-body-secondary" id="autoSizingInput" />
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <h1>USD to UZS</h1>
                    <Chart options={chartOptions} series={chartOptions.series} type="area" width={600} height={400} />
                </div>
            </div>
        </div>
    );
}

export default AppChart;
