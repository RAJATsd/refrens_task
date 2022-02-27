import { useEffect, useState } from "react";

const useKeyPress = (keyHitToBeChecked) => {
  const [pressedKey, setPressedKey] = useState(false);
  useEffect(() => {
    const downKeyHandler = ({ key }) => {
      if (key === keyHitToBeChecked) {
        setPressedKey(true);
      }
    };

    const upKeyHandler = ({ key }) => {
      if (key === keyHitToBeChecked) {
        setPressedKey(false);
      }
    };

    window.addEventListener("keydown", downKeyHandler);
    window.addEventListener("keyup", upKeyHandler);

    return () => {
      window.removeEventListener("keydown", downKeyHandler);
      window.removeEventListener("keyup", upKeyHandler);
    };
  }, [keyHitToBeChecked]);

  return pressedKey;
};

export default useKeyPress;
