import type { ReactElement } from "react";

type CustomerDetailInfoProps = {
  title: string;
  content: string;
};

export default function CustomerDetailInfo({
  title,
  content,
}: CustomerDetailInfoProps): ReactElement {
  return (
    <div className="tw-flex tw-flex-col tw-gap-1">
      <p className="tw-text-sm tw-text-gray-400">{title}</p>
      <p className="tw-text-xl tw-font-semibold tw-text-black">{content}</p>
    </div>
  );
}
