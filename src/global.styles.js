import { injectGlobal }  from 'styled-components'
export const inject = () =>
  injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,500');
    @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

    body, input, button {
      font-family: 'Source Sans Pro';
    }`