import { Close } from "../common/Icon";

const AlertModal = (props: { content: string; onClose: any }) => {
  return (
    <div className="fixed flex bg-black bottom-14 left-0 right-0 text-white  border-none phone-width z-50">
      <Close className="m-4" onClick={props.onClose} color="white" />
      <div className="h-10 text-center text-white  place-content-center mt-2">
        {props.content}
      </div>
    </div>
  );
};

export default AlertModal;
