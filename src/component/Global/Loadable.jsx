import { Suspense } from 'react';


const Loadable = (Component) => (props) => (
    <Suspense fallback={<div>loding...</div>}>
        <Component {...props} />
    </Suspense>
);

export default Loadable



