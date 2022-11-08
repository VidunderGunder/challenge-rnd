import { useIntersection } from "@mantine/hooks";
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

/**
 * # Scroll trigger
 *
 * Initially designed for infinite scroll and based on [Mantine's `use-intersection`](https://mantine.dev/hooks/use-intersection/)
 *
 * ## Usage
 *
 * ```tsx
 * <div
 *   css={css`
 *     height: 110vh;
 *     display: flex;
 *     flex-direction: column;
 *     justify-content: space-between;
 *     align-items: center;
 *  `}
 * >
 *   <div>
 *     <Center>
 *       <Text>Scroll Down to Demo</Text>
 *     </Center>
 *     <Center>
 *       <TbArrowDown />
 *     </Center>
 *   </div>
 *   <ScrollTrigger
 *     onTrigger={() => alert("Triggered")}
 *   />
 * </div>
 * ```
 */
export default function ScrollTrigger({
  children,
  onTrigger,
  ...props
}: {
  onTrigger: () => void;
} & ComponentPropsWithoutRef<"div">) {
  const [triggered, setTriggered] = useState(false);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      if (triggered === false) {
        onTrigger?.();
        setTriggered(true);
      }
    } else {
      setTriggered(false);
    }
  }, [entry?.isIntersecting, onTrigger, triggered]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
