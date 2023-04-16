import {Hearts} from  'react-loader-spinner'

export const Loader = () => {
return (
<Hearts 
  height="80"
  width="80"
  color="blue"
  ariaLabel="hearts-loading"
  wrapperStyle={{margin: '0 auto'}}
/>
)
};