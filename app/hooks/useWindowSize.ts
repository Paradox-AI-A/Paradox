import React from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

/**
 * Custom hook for tracking window dimensions
 * @returns Current window width and height
 */
function useWindowSize(): WindowSize {
  // Initialize state with undefined to indicate window size is not yet known
  const [windowSize, setWindowSize] = React.useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect runs only on mount and unmount

  return windowSize;
}

export default useWindowSize; 