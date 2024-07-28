// import React, { useState, useEffect } from "react";
// import { getColors, ImageColorsResult } from "react-native-image-colors";

// const useImageColors = (imageUrl: string | null) => {
//   const [colors, setColors] = React.useState<ImageColorsResult | null>(null);

//   useEffect(() => {
//     if (!imageUrl) return;

//     const fetchColors = async () => {
//       try {
//         const colorsResult = await getColors(imageUrl, {
//           fallback: "#228B22",
//           cache: true,
//           key: imageUrl,
//         });
//         setColors(colorsResult);
//       } catch (error) {
//         console.error("Error fetching colors:", error);
//         // Optionally handle error state here
//         setColors(null); // Reset colors state on error
//       }
//     };

//     fetchColors();
//   }, [imageUrl]);

//   return colors;
// };

// export default useImageColors;
