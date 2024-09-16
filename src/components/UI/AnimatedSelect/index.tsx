import { ReactElement, useEffect, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";
import { createPortal } from "react-dom";

interface AnimatedDialogProps {
  children: ReactElement;
  display: boolean;
  dismiss: () => void;
  extraClass?: string;
  noRest?: boolean;
  up?: number;
  dismisable?: boolean;
}

const AnimatedSelect = ({
  children,
  display,
  extraClass,
  noRest,
  dismiss,
  up,
}: AnimatedDialogProps) => {
  const [show, setShow] = useState(display);
  const [zIndex] = useState(22);

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches,
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    if (!dialogRef.current) return;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (dialogRef.current) {
        const deltaY = e.touches[0].clientY - touchStartY.current;
        currentY.current = deltaY;
        dialogRef.current.style.transform = `translateY(${deltaY}px)`;
      }
    };

    const handleTouchEnd = () => {
      if (dialogRef.current) {
        dialogRef.current.style.transform = "";
        if (currentY.current > 150) {
          // Close the dialog or perform an action if dragged down enough
          dismiss();
        }
      }
      currentY.current = 0;
    };

    const dialogElement = dialogRef.current;
    if (isMobile && dialogElement) {
      if (dialogElement) {
        dialogElement.addEventListener("touchstart", handleTouchStart);
        dialogElement.addEventListener("touchmove", handleTouchMove);
        dialogElement.addEventListener("touchend", handleTouchEnd);

        // Clean up event listeners on unmount or when screen size changes
        return () => {
          dialogElement.removeEventListener("touchstart", handleTouchStart);
          dialogElement.removeEventListener("touchmove", handleTouchMove);
          dialogElement.removeEventListener("touchend", handleTouchEnd);
        };
      }
    }
  }, [dismiss, dialogRef.current, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (display) {
      setShow(true);
      document.body.classList.add("overflow-hidden");
    } else if (!noRest) {
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    } else {
      setShow(false);
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [display, noRest]);

  const transitions = useTransition(display, {
    from: { opacity: 0, transform: "translateY(100%) scale(1)" },
    enter: { opacity: 1, transform: "translateY(0%) scale(1)" },
    leave: { opacity: 0, transform: "translateY(100%) scale(1)" },
    config: { duration: 300 },
  });

  return (
    <>
      {show &&
        createPortal(
          transitions((styles, item) =>
            item ? (
              <animated.div
                style={{ ...styles, zIndex: !up ? zIndex + 1 : up + 1 }}
                className={`fixed inset-0 z-[${!up ? zIndex + 2 : up + 1}]`}
              >
                <div
                  ref={dialogRef}
                  className={`fixed bottom-0 left-0 right-0 min-h-[50vh] max-h-[85vh] w-full bg-white dark:bg-black rounded-t-2xl shadow-lg md:max-h-[80vh] md:max-w-[600px] md:rounded-2xl md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 ${
                    extraClass || ""
                  }`}
                >
                  <div className="flex md:hidden justify-center mt-1">
                    <hr className="w-12 border-2 hover:dark:border-neutral-600 dark:border-neutral-700" />
                  </div>
                  {children}
                </div>
              </animated.div>
            ) : null,
          ),
          document.body,
        )}

      {show &&
        createPortal(
          <div
            onClick={dismiss}
            style={{ zIndex: !up ? zIndex - 1 : up - 2 }}
            className={`fixed left-0 right-0 top-0 bottom-0`}
          />,
          document.body,
        )}
    </>
  );
};

export default AnimatedSelect;
