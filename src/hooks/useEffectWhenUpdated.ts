import React, { useEffect, useRef } from 'react';

const useEffectWhenUpdated = (effectCallback: Function, dependencies: React.DependencyList) => {
    const didRenderFirstTime = useRef(false);

    useEffect(() => {
        if (didRenderFirstTime.current) {
            effectCallback();
        } else {
            didRenderFirstTime.current = true;
        }
    }, dependencies);
};

export default useEffectWhenUpdated;