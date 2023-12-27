import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
const Loading = () => {
  return (
    <div className="flex justify-center">
      <FontAwesomeIcon
        className="text-black text-center block h-[25px] w-[25px]"
        spin
        icon={faCircleNotch}
      />
    </div>
  );
};

export default Loading;
