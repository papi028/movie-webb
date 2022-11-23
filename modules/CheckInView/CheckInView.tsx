import useIntersectionObserver from "hooks/useIntersectionObserver";
import React, { useEffect, useRef } from "react";

interface CheckLoadMoreProps extends React.HTMLProps<HTMLDivElement> {
  onInView: () => void;
}

const CheckInView = ({ onInView, children, ...props }: CheckLoadMoreProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    rootMargin: "0px 0px 100px 0px",
  });
  const isVisible = !!entry?.isIntersecting;
  useEffect(() => {
    if (isVisible) onInView();
  }, [isVisible, onInView]);
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
};

export default CheckInView;
