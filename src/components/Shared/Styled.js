import styled from 'styled-components'
// This primary button is used to create a green button used app-wide, if the props 'wrong' are set to true it is instead a unclickable red button
export const PrimaryButton = styled.button`
         background: transparent;
         width: max-content;
         font-size: 1.3rem;
         color: #155724;
         border-radius: 7px;
         margin: 0.3em;
         padding: 0.25em 1em;
         border: 2px solid #c3e6cb;

         ${props =>
    props.wrong
      ? `
       color: white;
       border-color: #f5c6cb;
       background-color:#721c24;
       cursor:default !important; 

    `
      : `
       &:hover {
           background: #155724;
           color: white;
         }
    `}
       `
