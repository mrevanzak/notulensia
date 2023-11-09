import type { ReactElement } from "react";

export default function ModalDate(): ReactElement {
  return (
    <div className="tw-w-full tw-flex tw-flex-col tw-gap-10">
      <div className="tw-flex tw-flex-col tw-gap-2">
        <h1 className="tw-font-semibold tw-text-2xl">Description</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          provident earum doloribus fuga facilis? Sequi, magni. Dolor,
          repudiandae debitis cupiditate sed modi, iusto ducimus aliquid
          laboriosam facere maiores recusandae necessitatibus minima placeat
          voluptatem laudantium adipisci facilis a iure culpa. A consequatur
          consectetur debitis? Animi, dolores eius quos reiciendis, ex
          voluptates molestiae vel et rem odio consequuntur? Unde incidunt
          assumenda fugiat dolore tempore, labore doloremque nostrum! Nihil
          laudantium perspiciatis fuga, maiores asperiores id impedit
          praesentium neque magnam vero ad modi quia minus nisi quidem repellat
          aspernatur voluptatum dolore accusamus ratione sequi. Eveniet
          reprehenderit nisi animi cumque beatae. Veritatis autem facilis neque.
        </p>
      </div>
      <div className="tw-flex tw-gap-2 tw-justify-between tw-items-center">
        <div className="tw-flex tw-flex-col tw-gap-2">
          <p className="tw-text-2xl tw-font-semibold">Start</p>
          <span className="tw-flex tw-gap-2 tw-items-center">
            <i className="pi pi-clock" /> 08.00
          </span>
        </div>
        <div className="tw-flex tw-flex-col tw-gap-2">
          <p className="tw-text-2xl tw-font-semibold">End</p>
          <span className="tw-flex tw-gap-2 tw-items-center">
            <i className="pi pi-clock" /> 10.00
          </span>
        </div>
      </div>
      <div className="tw-flex tw-flex-col tw-gap-2">
        <h1 className="tw-font-semibold tw-text-2xl">Location / LinkUrl</h1>
        <p>
          <i className="pi pi-video tw-text-pink-500" />{" "}
          https://zoom.id/193948hsh2293i9q/meet
        </p>
      </div>
    </div>
  );
}
