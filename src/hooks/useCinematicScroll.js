import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

function useCinematicScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 52,
            filter: 'blur(14px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 78%',
              end: 'bottom 42%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      gsap.utils.toArray('.section').forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            section.style.setProperty('--section-progress', self.progress.toFixed(3));
          },
        });
      });

      gsap.to(':root', {
        '--global-scroll': 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    });

    return () => context.revert();
  }, []);
}

export default useCinematicScroll;
