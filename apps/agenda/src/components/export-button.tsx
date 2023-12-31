import type { UseMutateFunction } from "@tanstack/react-query";
import type { ButtonProps } from "primereact/button";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useRef } from "react";

type ExportButtonProps = {
  action: UseMutateFunction<Blob, unknown, string>;
} & ButtonProps;

export default function ExportButton({ action, ...props }: ExportButtonProps) {
  const menuRef = useRef<Menu>(null);
  const exportMenu = [
    {
      label: "CSV",
      icon: "pi pi-file",
      command: () => {
        action("CSV");
      },
    },
    {
      label: "Excel",
      icon: "pi pi-file-excel",
      command: () => {
        action("EXCEL");
      },
    },
  ];

  return (
    <>
      <Button onClick={(event) => menuRef?.current?.toggle(event)} {...props}>
        Export
      </Button>
      <Menu model={exportMenu} popup ref={menuRef} />
    </>
  );
}
