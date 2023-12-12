import { Modal } from "antd";
import { ReactElement, ReactNode } from "react";

interface IModal {
  isOpen: boolean;
  closeModal: () => void;
  title: string | ReactNode;
  children: ReactElement;
  // handleOk?: (values: any) => Promise<void> | () => void;
  handleOk?: any;
  showCancelButton?: boolean;
  showOkButton?: boolean;
  okText?: string;
  okType?: "primary" | "dashed" | "link" | "danger" | "default";
  cancelText?: string;
  confirmLoading?: boolean;
}

const CustomModal = ({
  isOpen,
  closeModal,
  title,
  children,
  handleOk,
  showCancelButton = true,
  showOkButton = true,
  okText = "Ok",
  okType = "primary",
  cancelText = "Cancel",
  confirmLoading = false,
}: IModal) => {
  return (
    <Modal
      title={title}
      okText={okText}
      okType={okType}
      cancelText={cancelText}
      open={isOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={closeModal}
      cancelButtonProps={{
        style: { display: showCancelButton ? "inline" : "none" },
      }}
      okButtonProps={{ style: { display: showOkButton ? "inline" : "none" } }}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
