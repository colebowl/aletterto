//https://www.hyperui.dev/components/marketing/popups
import React from "react";
import {
  backgroundColorVariants,
  borderColorVariants,
  PaletteColor,
} from "../styles";
import { clsx } from "@utils/css";

type Props = {
  actions: {
    variant?: "contained" | "outlined" | "text";
    color: PaletteColor;
    label: string;
    onClick: () => void;
  }[];
  children: React.ReactNode | React.ReactNode[];
  onClose: () => void;
};

const Dialog: React.FC<Props> = (props) => {
  const { actions, children, onClose } = props;

  return (
    <>
      <div
        id="popup-modal"
        tabIndex={-1}
        className="overflow-y-auto overflow-x-hidden fixed  z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <div>{children}</div>
            <div className="mx-4 pb-4 text-center">
              {actions.map((action, i) => {
                const { color, label, onClick, variant = "outlined" } = action;
                const variantStyles = [];

                if (variant === "contained") {
                  variantStyles.push(backgroundColorVariants[color]);
                }

                if (variant !== "text") {
                  variantStyles.push(borderColorVariants[color]);
                }

                return (
                  <button
                    key={`button-${i}`}
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={onClick}
                    className={clsx([
                      `focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`,
                      ...variantStyles,
                      "mx-1"
                    ])}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
