"use client";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import type { ReactElement } from "react";
import React, { useState, useEffect, useContext } from "react";
import type { ChartData, ChartOptions } from "chart.js";
import { useRouter } from "next/navigation";
import { classNames } from "primereact/utils";
import { LayoutContext } from "@/src/context/layout-context";

let visitorChart: ChartData;
let visitorChartOptions: ChartOptions;

function Banking(): ReactElement {
  const { layoutConfig } = useContext(LayoutContext);
  const router = useRouter();
  const navigateToDashboard = (): void => {
    router.push("/");
  };

  const getOverviewChartData1 = (): {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string;
      fill: boolean;
      barPercentage: number;
      stepped: boolean;
    }[];
  } => {
    const primaryColor =
      getComputedStyle(document.body).getPropertyValue("--primary-color") ||
      "#883cae";

    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          data: [600, 671, 660, 665, 700, 610, 810, 790, 710, 860, 810, 780],
          backgroundColor: primaryColor,
          fill: true,
          barPercentage: 0.75,
          stepped: true,
        },
      ],
    };
  };

  const getChartOptions = (): ChartOptions => {
    const textColor =
      getComputedStyle(document.body).getPropertyValue("--text-color") ||
      "#212529";
    const surfaceLight =
      getComputedStyle(document.body).getPropertyValue("--surface-100") ||
      "#f8f9fa";
    return {
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
      hover: {
        mode: "index",
      },
      scales: {
        y: {
          min: 500,
          max: 900,
          ticks: {
            color: textColor,
          },
          grid: {
            color: surfaceLight,
          },
        },
        x: {
          ticks: {
            color: textColor,
          },
          grid: {
            display: false,
          },
        },
      },
    };
  };

  const [payments, setPayments] = useState([
    { name: "Electric Bill", amount: 75.6, paid: true, date: "06/04/2022" },
    { name: "Water Bill", amount: 45.5, paid: true, date: "07/04/2022" },
    { name: "Gas Bill", amount: 45.2, paid: false, date: "12/04/2022" },
    { name: "Internet Bill", amount: 25.9, paid: true, date: "17/04/2022" },
    { name: "Streaming", amount: 40.9, paid: false, date: "20/04/2022" },
    { name: "Phone Bill", amount: 32.9, paid: false, date: "23/04/2022" },
  ]);

  useEffect(() => {
    visitorChart = getOverviewChartData1();
    visitorChartOptions = getChartOptions();
  }, [layoutConfig]);

  const formatCurrency = (value: any): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  const amountBodyTemplate = (rowData: any): string => {
    return formatCurrency(rowData.amount);
  };
  const statusBodyTemplate = (rowData: any): ReactElement => {
    return rowData.paid ? (
      <Tag severity="success" value="COMPLETED" />
    ) : (
      <Tag severity="warning" value="PENDING" />
    );
  };
  return (
    <div className="grid">
      <div className="col-12 md:col-4 xl:col-2">
        <Button className="w-full surface-card flex flex-wrap h-full surface-border text-primary p-3">
          <div
            className={classNames(
              "p-3 flex justify-content-center align-items-center border-circle bg-primary-50 text-primary mr-2",
              { "bg-primary-900": layoutConfig.colorScheme === "dark" }
            )}
          >
            <i className="pi pi-send text-xl" />
          </div>

          <div className="flex flex-column align-items-start text-900">
            <span className="block h-auto font-bold">Make</span>
            <span className="block h-auto">Swift Transfer</span>
          </div>
        </Button>
      </div>
      <div className="col-12 md:col-4 xl:col-2">
        <Button className="w-full surface-card flex flex-wrap h-full surface-border text-primary p-3">
          <div
            className={classNames(
              "p-3 flex justify-content-center align-items-center border-circle bg-primary-50 text-primary mr-2",
              { "bg-primary-900": layoutConfig.colorScheme === "dark" }
            )}
          >
            <i className="pi pi-money-bill text-xl" />
          </div>
          <div className="flex flex-column align-items-start text-900">
            <span className="block h-auto font-bold">Pay</span>
            <span className="block h-auto">Credit Cards</span>
          </div>
        </Button>
      </div>
      <div className="col-12 md:col-4 xl:col-2">
        <Button className="w-full surface-card flex flex-wrap h-full surface-border text-primary p-3">
          <div
            className={classNames(
              "p-3 flex justify-content-center align-items-center border-circle bg-primary-50 text-primary mr-2",
              { "bg-primary-900": layoutConfig.colorScheme === "dark" }
            )}
          >
            {" "}
            <i className="pi pi-credit-card text-xl" />
          </div>
          <div className="flex flex-column align-items-start text-900">
            <span className="block h-auto font-bold">Make</span>
            <span className="block h-auto">Card Transfer</span>
          </div>
        </Button>
      </div>
      <div className="col-12 md:col-4 xl:col-2">
        <Button className="w-full surface-card flex flex-wrap h-full surface-border text-primary p-3">
          <div
            className={classNames(
              "p-3 flex justify-content-center align-items-center border-circle bg-primary-50 text-primary mr-2",
              { "bg-primary-900": layoutConfig.colorScheme === "dark" }
            )}
          >
            <i className="pi pi-download text-xl" />
          </div>
          <div className="flex flex-column align-items-start text-900">
            <span className="block h-auto font-bold">Receive</span>
            <span className="block h-auto">Money</span>
          </div>
        </Button>
      </div>
      <div className="col-12 md:col-4 xl:col-2">
        <Button className="w-full surface-card flex flex-wrap h-full surface-border text-primary p-3">
          <div
            className={classNames(
              "p-3 flex justify-content-center align-items-center border-circle bg-primary-50 text-primary mr-2",
              { "bg-primary-900": layoutConfig.colorScheme === "dark" }
            )}
          >
            <i className="pi pi-arrow-right-arrow-left text-xl" />
          </div>
          <div className="flex flex-column align-items-start text-900">
            <span className="block h-auto font-bold">See</span>
            <span className="block h-auto">Transactions</span>
          </div>
        </Button>
      </div>
      <div className="col-12 md:col-4 xl:col-2">
        <Button className="w-full surface-card flex flex-wrap h-full surface-border text-primary p-3">
          <div
            className={classNames(
              "p-3 flex justify-content-center align-items-center border-circle bg-primary-50 text-primary mr-2",
              { "bg-primary-900": layoutConfig.colorScheme === "dark" }
            )}
          >
            <i className="pi pi-prime text-xl" />
          </div>
          <div className="flex flex-column align-items-start text-900">
            <span className="block h-auto font-bold">Open</span>
            <span className="block h-auto">Ticket</span>
          </div>
        </Button>
      </div>
      <div className="col-12 md:col-6 xl:col-3">
        <div className="py-4 px-2 border-round-md surface-card flex flex-wrap h-full align-items-center justify-content-between gap-3 border-1 surface-border">
          <div className="flex gap-3 align-items-center">
            <div
              className={classNames(
                "p-2 flex justify-content-center align-items-center border-circle bg-primary text-0 mr-2",
                { "bg-primary-900 text-900": layoutConfig.colorScheme === "dark" }
              )}
            >
              <i className="pi pi-dollar text-2xl" />
            </div>
            <div>
              <div className="text-xl font-medium text-left">USD</div>
              <div className="text-base text-color-secondary">Dollar</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-column gap-1">
              <span className="text-sm text-color-secondary">Latest</span>
              <span className="text-base font-medium">3,5232</span>
            </div>
            <div className="flex flex-column gap-1">
              <span className="text-sm text-color-secondary">Change</span>
              <span className="text-base font-medium">-0.85</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 md:col-6 xl:col-3">
        <div className="py-4 px-2 border-round-md surface-card flex flex-wrap h-full align-items-center justify-content-between gap-3 border-1 surface-border">
          <div className="flex gap-3 align-items-center">
            <div
              className={classNames(
                "p-2 flex justify-content-center align-items-center border-circle bg-primary text-0 mr-2",
                { "bg-primary-900 text-900": layoutConfig.colorScheme === "dark" }
              )}
            >
              <i className="pi pi-euro text-2xl" />
            </div>
            <div>
              <div className="text-xl font-medium text-left">EUR</div>
              <div className="text-base text-color-secondary">Euro</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-column gap-1">
              <span className="text-sm text-color-secondary">Latest</span>
              <span className="text-base font-medium">4,1246</span>
            </div>
            <div className="flex flex-column gap-1">
              <span className="text-sm text-color-secondary">Change</span>
              <span className="text-base font-medium">-0.16</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 md:col-6 xl:col-3">
        <div className="py-4 px-2 border-round-md surface-card flex flex-wrap h-full align-items-center justify-content-between gap-3 border-1 surface-border">
          <div className="flex gap-3 align-items-center">
            <div
              className={classNames(
                "p-2 flex justify-content-center align-items-center border-circle bg-primary text-0 mr-2",
                { "bg-primary-900 text-900": layoutConfig.colorScheme === "dark" }
              )}
            >
              <i className="pi pi-pound text-2xl" />
            </div>
            <div>
              <div className="text-xl font-medium text-left">GBP</div>
              <div className="text-base text-color-secondary">Pound</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-column gap-1">
              <span className="text-sm text-color-secondary">Latest</span>
              <span className="text-base font-medium">4,6300</span>
            </div>
            <div className="flex flex-column gap-1">
              <span className="text-sm text-color-secondary">Change</span>
              <span className="text-base font-medium">-0.25</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 md:col-6 xl:col-3">
        <div
          className={`py-4 px-2 border-round-md surface-card flex flex-wrap h-full align-items-center justify-content-between gap-3 border-1 surface-border ${layoutConfig.colorScheme === "dark" ? "border-primary-900" : ""
            }`}
        >
          <div className="flex gap-3 align-items-center">
            <div
              className={classNames(
                "p-2 flex justify-content-center align-items-center border-circle bg-primary text-0 mr-2",
                { "bg-primary-900 text-900": layoutConfig.colorScheme === "dark" }
              )}
            >
              <i className="pi pi-bitcoin text-2xl" />
            </div>
            <div>
              <div className="text-xl font-medium text-left">BTC</div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-column gap-1">
              <span className="text-sm text-color-secondary">Latest</span>
              <span className="text-base font-medium">143,059</span>
            </div>
            <div className="flex flex-column gap-1">
              <span className="text-sm text-color-secondary">Change</span>
              <span className="text-base font-medium">-0.85</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6">
        <div className="card h-full">
          <h5>Accounts</h5>
          <div className="flex justify-content-between border-bottom-1 surface-border p-3">
            <span className="font-semibold text-color-secondary text-xl">
              Grand Total
            </span>
            <span className="text-green-500 text-2xl font-bold">
              $624,504.00
            </span>
          </div>

          <div className="p-3">
            <div className="flex align-items-center justify-content-between py-2">
              <div className="flex gap-3 text-lg align-items-center">
                <i className="pi pi-money-bill text-color-secondary" />
                <span className="text-color-secondary">Bank Accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base">$320,521.25</span>
                <a className="text-color-secondary" href="#">
                  <i
                    className="pi pi-angle-double-right"
                    onClick={navigateToDashboard}
                  />
                </a>
              </div>
            </div>
            <div className="flex align-items-center justify-content-between py-2">
              <div className="flex gap-3 text-lg align-items-center">
                <i className="pi pi-briefcase text-color-secondary" />
                <span className="text-color-secondary">Saving</span>
              </div>
              <div className="flex align-items-center gap-2">
                <span className="font-semibold text-base">$94,305.00</span>
                <a className="text-color-secondary" href="#">
                  <i className="pi pi-angle-double-right" />
                </a>
              </div>
            </div>
            <div className="flex align-items-center justify-content-between py-2">
              <div className="flex gap-3 text-lg align-items-center">
                <i className="pi pi-globe text-color-secondary" />
                <span className="text-color-secondary">Stocks</span>
              </div>
              <div className="flex align-items-center gap-2">
                <span className="font-semibold text-base">$5,000.00</span>
                <a className="text-color-secondary" href="#">
                  <i className="pi pi-angle-double-right" />
                </a>
              </div>
            </div>
            <div className="flex align-items-center justify-content-between py-2">
              <div className="flex gap-3 text-lg align-items-center">
                <i className="pi pi-dollar text-color-secondary" />
                <span className="text-color-secondary">Profit</span>
              </div>
              <div className="flex align-items-center gap-2">
                <span className="font-semibold text-base">$21.25</span>
                <a className="text-color-secondary" href="#">
                  <i className="pi pi-angle-double-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6">
        <div className="card h-full">
          <h5>Debt Management</h5>
          <div className="flex justify-content-between border-bottom-1 surface-border p-3">
            <span className="font-semibold text-color-secondary text-xl">
              Grand Total
            </span>
            <span className="text-red-500 text-2xl font-bold">
              $-125,330.00
            </span>
          </div>

          <div className="p-3">
            <div className="flex align-items-center justify-content-between py-2">
              <div className="flex gap-3 text-lg align-items-center">
                <i className="pi pi-briefcase text-color-secondary" />
                <span className="text-color-secondary">Used Credits</span>
              </div>
              <div className="flex align-items-center gap-2">
                <span className="font-semibold text-base">$100,240.00</span>
                <a className="text-color-secondary" href="#">
                  <i className="pi pi-angle-double-right" />
                </a>
              </div>
            </div>

            <div className="flex align-items-center justify-content-between py-2">
              <div className="flex gap-3 text-lg align-items-center">
                <i className="pi pi-calendar text-color-secondary" />
                <span className="text-color-secondary">Loans</span>
              </div>
              <div className="flex align-items-center gap-2">
                <span className="font-semibold text-base">$25,090.00</span>
                <a className="text-color-secondary" href="#">
                  <i className="pi pi-angle-double-right" />
                </a>
              </div>
            </div>

            <div className="flex align-items-center justify-content-between py-2">
              <div className="flex gap-3 text-lg align-items-center">
                <i className="pi pi-ticket text-color-secondary" />
                <span className="text-color-secondary">Overdrafts</span>
              </div>
              <div className="flex align-items-center gap-2">
                <span className="font-semibold text-base">$0</span>
                <a className="text-color-secondary" href="#">
                  <i className="pi pi-angle-double-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6">
        <div className="card h-full">
          {layoutConfig.colorScheme === "light" && (
            <div
              className="w-full h-17rem bg-cover bg-center bg-no-repeat"
              style={{
                background:
                  "url(/demo/images/dashboard-banking/asset-japan.jpg)",
              }}
            />
          )}
          {layoutConfig.colorScheme === "dark" && (
            <div
              className="w-full h-17rem bg-cover bg-center bg-no-repeat"
              style={{
                background:
                  "url(/demo/images/dashboard-banking/asset-japan-night.jpg)",
              }}
            />
          )}
          <div>
            <h3 className="mt-3">
              <strong>Journey to Japan</strong>
            </h3>
            <div>
              <ProgressBar
                className="border-round"
                showValue={false}
                style={{ height: ".5rem" }}
                value={30}
              />
            </div>

            <div className="text-color-secondary my-3">
              <p>
                <span>
                  <b>$3,000.00</b>
                </span>{" "}
                from $10,000.00
              </p>
            </div>

            <div className="flex align-items-center justify-content-between my-3">
              <Button label="Deposit" />
              <a className="p-button-link" href="#">
                Withdraw
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6">
        <div className="card">
          <div className="text-900 text-xl font-semibold mb-3">
            Monthly Payments
          </div>
          <DataTable
            className="datatable-responsive"
            emptyMessage="No products found."
            rows={5}
            value={payments}
          >
            <Column
              className="white-space-nowrap w-4"
              field="name"
              header="Name"
              key="name"
            />
            <Column
              body={amountBodyTemplate}
              className="white-space-nowrap w-4"
              field="amount"
              header="Amount"
              key="amount"
            />
            <Column
              className="white-space-nowrap w-4"
              field="date"
              header="Date"
              key="date"
            />
            <Column
              body={statusBodyTemplate}
              className="white-space-nowrap w-4 text-right"
              field="paid"
              header="Status"
              key="status"
            />
          </DataTable>
        </div>
      </div>
      <div className="col-12 lg:col-6">
        <div className="card h-full">
          <h5>Transactions</h5>

          <div className="flex align-items-center justify-content-between">
            <div className="flex w-7 align-items-center justify-content-between">
              <img
                alt="avalon-layout"
                src="/demo/images/dashboard-banking/asset-visa.png"
                width="52"
              />
              <div className="flex flex-column">
                <span className="font-medium">07 July 2023</span>
                <span className="text-color-secondary">11.05</span>
              </div>
              <div className="flex flex-column">
                <span className="font-medium">Online Payment</span>
                <span className="text-color-secondary">Visa Card</span>
              </div>
            </div>
            <div className="w-5 flex justify-content-end">
              <Button label="See Details" />
            </div>
          </div>

          <div className="flex align-items-center justify-content-between">
            <div className="flex w-7 align-items-center justify-content-between">
              <img
                alt="avalon-layout"
                src="/demo/images/dashboard-banking/asset-netflix.png"
                width="52"
              />
              <div className="flex flex-column">
                <span className="font-medium">06 July 2023</span>
                <span className="text-color-secondary">11.05</span>
              </div>
              <div className="flex flex-column">
                <span className="font-medium">Online Payment</span>
                <span className="text-color-secondary">Netflix</span>
              </div>
            </div>
            <div className="w-5 flex justify-content-end">
              <Button label="See Details" />
            </div>
          </div>

          <div className="flex align-items-center justify-content-between">
            <div className="flex w-7 align-items-center justify-content-between">
              <img
                alt="avalon-layout"
                src="/demo/images/dashboard-banking/asset-spotify.png"
                width="52"
              />
              <div className="flex flex-column">
                <span className="font-medium">05 July 2023</span>
                <span className="text-color-secondary">08.32</span>
              </div>
              <div className="flex flex-column">
                <span className="font-medium">Online Payment</span>
                <span className="text-color-secondary">Spotify</span>
              </div>
            </div>
            <div className="w-5 flex justify-content-end">
              <Button label="See Details" />
            </div>
          </div>

          <div className="flex align-items-center justify-content-between">
            <div className="flex w-7 align-items-center justify-content-between">
              <img
                alt="avalon-layout"
                src="/demo/images/dashboard-banking/asset-newyorker.png"
                width="52"
              />
              <div className="flex flex-column">
                <span className="font-medium">02 July 2023</span>
                <span className="text-color-secondary">14.46</span>
              </div>
              <div className="flex flex-column">
                <span className="font-medium">Purchase</span>
                <span className="text-color-secondary">The New Yorker</span>
              </div>
            </div>
            <div className="w-5 flex justify-content-end">
              <Button label="See Details" />
            </div>
          </div>
          <div className="flex align-items-center justify-content-between">
            <div className="flex w-7 align-items-center justify-content-between">
              <img
                alt="avalon-layout"
                src="/demo/images/dashboard-banking/asset-google.png"
                width="52"
              />
              <div className="flex flex-column">
                <span className="font-medium">02 July 2023</span>
                <span className="text-color-secondary">12.51</span>
              </div>
              <div className="flex flex-column">
                <span className="font-medium">Online Payment</span>
                <span className="text-color-secondary">Google</span>
              </div>
            </div>
            <div className="w-5 flex justify-content-end">
              <Button label="See Details" />
            </div>
          </div>
          <div className="flex align-items-center justify-content-between">
            <div className="flex w-7 align-items-center justify-content-between">
              <img
                alt="avalon-layout"
                src="/demo/images/dashboard-banking/asset-soundcloud.png"
                width="52"
              />
              <div className="flex flex-column">
                <span className="font-medium">01 July 2023</span>
                <span className="text-color-secondary">09.27</span>
              </div>
              <div className="flex flex-column">
                <span className="font-medium">Online Payment</span>
                <span className="text-color-secondary">SoundCloud</span>
              </div>
            </div>
            <div className="w-5 flex justify-content-end">
              <Button label="See Details" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 lg:col-6">
        <div className="card h-full">
          <h5>Monthly Statistics</h5>
          <Chart
            data={visitorChart}
            id="visitor-chart"
            options={visitorChartOptions}
            type="bar"
          />
        </div>
      </div>
    </div>
  );
}

export default Banking;
