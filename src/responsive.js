import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 900px) {
      ${props}
    }
  `;
};

// export default firstport const tablet = (props) => {
//   return css`
//     @media (min-width: 768px) and (max-width: 900px) {
//       ${props}
//     }
//   `;
// };
