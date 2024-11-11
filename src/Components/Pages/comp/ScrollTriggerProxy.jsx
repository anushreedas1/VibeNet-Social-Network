import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

const ScrollTriggerProxy = () => {
  const { scroll } = useLocomotiveScroll();
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (scroll && scroll.el) {
      const element = scroll.el; // Locomotive scroll container element

      scroll.on("scroll", ScrollTrigger.update); // Synchronize GSAP with LocomotiveScroll

      ScrollTrigger.scrollerProxy(element, {
        scrollTop(value) {
          return arguments.length
            ? scroll.scrollTo(value, 0, 0)
            : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: element.style.transform ? "transform" : "fixed",
      });

      // Refresh ScrollTrigger when LocomotiveScroll updates
      ScrollTrigger.addEventListener("refresh", () => scroll.update());
      ScrollTrigger.refresh();
    }

    return () => {
      // Cleanup on component unmount
      ScrollTrigger.removeEventListener("refresh", () => scroll.update());
    };
  }, [scroll]);

  return null;
};

export default ScrollTriggerProxy;
