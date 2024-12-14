// I removed Framer Motion and the classnames lib

import React, { ReactNode, useState, useRef, useEffect } from "react";
import { useClickOutside } from "./useClickOutside";

import s from "./styles.module.css";

export type BottomSheetChildProps = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

type BottomSheetProps = {
  children?: ReactNode | ((props: BottomSheetChildProps) => ReactNode);
  rootClassName?: string;
  wrapperClassName?: string;
  lineClassName?: string;
  contentClassName?: string;
  compactHeight?: string;
  fullHeight?: string;
  onClickOutside?: () => void;
  closeOnClickOutside?: boolean;
};

export const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  rootClassName,
  wrapperClassName,
  lineClassName,
  contentClassName,
  compactHeight = "auto",
  fullHeight = "90vh",
  onClickOutside,
  closeOnClickOutside = true,
}) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<string>(compactHeight);
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setHeight(isOpen ? fullHeight : compactHeight);
  }, [isOpen, setHeight, compactHeight, fullHeight]);

  useClickOutside([componentRef], () => {
    onClickOutside?.();

    if (closeOnClickOutside) {
      setOpen(false);
    }
  });

  if (!children) return null;

  const Children =
    typeof children === "function"
      ? children({ isOpen, setOpen })
      : React.Children.only(children as React.ReactElement);

  return (
    <div
      className={`${s.root} ${rootClassName}`}
      style={{
        height: height,
      }}
      ref={componentRef}
    >
      <div className={`${s.wrapper} ${wrapperClassName}`}>
        <div className={s.line}>
          <div className={`${s.innerLine} ${lineClassName}`}></div>
        </div>
        <div className={`${s.content} ${contentClassName}`}>{Children}</div>
      </div>
    </div>
  );
};
