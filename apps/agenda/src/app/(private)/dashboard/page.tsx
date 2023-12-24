import type { ReactElement } from "react";
import React from "react";
import { InputText } from "primereact/inputtext";
import TimeManagement from "~/svg/time-management.svg";
import { Button } from "primereact/button";
import Calendar from "@/components/ui/calendar";
import EventCategoryChart from "@/components/dashboard/event-category-chart";
import Link from "next/link";

export default function Dashboard(): ReactElement {
  return (
    <div className="grid">
      <div className="col-12 mb-4">
        <span className="p-input-icon-right tw-w-1/4">
          <i className="pi pi-search" />
          <InputText
            placeholder="Search"
            pt={{
              root: { className: "tw-w-full" },
            }}
          />
        </span>
      </div>
      <div className="col-12">
        <div className="card tw-flex tw-justify-between">
          <div className="tw-space-y-4 tw-flex tw-flex-col tw-min-h-full tw-w-1/2 tw-min-w-max tw-p-6">
            <p className="h0">Today Task</p>
            <h4 className="font-light">Check your daily tasks and schedules</h4>
            <Link className="mt-auto" href="/events/add">
              <Button className="mt-auto w-12rem tw-justify-center">
                Today&apos;s schedule
              </Button>
            </Link>
          </div>
          <TimeManagement className="tw-max-w-xs" />
        </div>
      </div>
      <div className="tw-grid col-12 tw-grid-cols-5 tw-gap-4">
        {/* {[...Array(3)].map((_, i) => ( */}
        {/*   <div */}
        {/*     className={classNames("card tw-space-y-2", i === 0 && "mb-0")} */}
        {/*     key={Math.random()} */}
        {/*   > */}
        {/*     <div className="tw-flex tw-justify-between tw-items-center"> */}
        {/*       <p className="tw-text-gray-300 tw-font-bold"> */}
        {/*         {new Date().toLocaleDateString("en-US", { */}
        {/*           month: "short", */}
        {/*           day: "numeric", */}
        {/*           year: "numeric", */}
        {/*         })} */}
        {/*       </p> */}
        {/*       <BiDotsVerticalRounded className="tw-text-gray-300" /> */}
        {/*     </div> */}
        {/*     <div className="tw-px-2"> */}
        {/*       <p className="tw-font-semibold">Title</p> */}
        {/*       <p className="tw-font-light">Category</p> */}
        {/*       <ProgressBar */}
        {/*         className="!tw-h-2 tw-my-2" */}
        {/*         showValue={false} */}
        {/*         value={50} */}
        {/*       /> */}
        {/*       <div className="tw-flex tw-justify-between"> */}
        {/*         <p className="tw-text-sm">Progress</p> */}
        {/*         <p className="tw-text-sm">50%</p> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*     <div className="tw-flex tw-flex-col tw-justify-between tw-items-center tw-border-t"> */}
        {/*       <div className="tw-flex tw-justify-between tw-items-center tw-w-full tw-p-2"> */}
        {/*         <div className="tw-flex tw-items-center"> */}
        {/*           <AvatarGroup> */}
        {/*             <Avatar */}
        {/*               image="/layout/images/avatar/avatar.png" */}
        {/*               shape="circle" */}
        {/*               size="normal" */}
        {/*             /> */}
        {/*             <Avatar */}
        {/*               image="/layout/images/avatar/avatar1.png" */}
        {/*               shape="circle" */}
        {/*               size="normal" */}
        {/*             /> */}
        {/*           </AvatarGroup> */}
        {/*         </div> */}
        {/*         <Chip label="25 days left" /> */}
        {/*       </div> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* ))} */}
        <div className="card tw-col-span-3 tw-row-span-2 !tw-p-8 tw-space-y-4 tw-flex tw-flex-col mb-0">
          <h4>Event Category</h4>
          <EventCategoryChart />
        </div>
        <div className="card border-none border-0 tw-col-span-2 tw-row-span-2 bg-purple-50">
          <Calendar simple />
        </div>
      </div>
    </div>
  );
}
