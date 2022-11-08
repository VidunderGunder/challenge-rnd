import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import { Button, ButtonProps, Modal } from "@mantine/core";

type ModalButtonProps = {
  onClick?: ComponentPropsWithoutRef<"button">["onClick"];
  children?: ComponentPropsWithoutRef<"button">["children"];
} & (
  | /**
   * Accepts either a an entire Modal component for JSX-interface or just props for simple use. But you obviously choose how you go about it.
   */
  { modal: ReactNode; modalProps?: undefined; modalChildren?: undefined }
  | {
      modal?: undefined;
      modalChildren?: ComponentPropsWithoutRef<typeof Modal>["children"];
      modalProps?: Partial<
        Omit<ComponentPropsWithoutRef<typeof Modal>, "children">
      >;
    }
) &
  Omit<ButtonProps, "onClick" | "component">;

export default function ModalButton({
  onClick,
  children,
  modal,
  modalProps,
  modalChildren,
  ...buttonProps
}: ModalButtonProps) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {modal ?? (
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          centered
          title={modalProps?.title ?? children}
          {...modalProps}
        >
          {modalChildren}
        </Modal>
      )}
      <Button
        {...buttonProps}
        onClick={(e: any) => {
          setOpened(true);
          onClick?.(e);
        }}
      >
        {children}
      </Button>
    </>
  );
}
