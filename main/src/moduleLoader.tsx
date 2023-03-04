import React, { Suspense } from "react";
import useDynamicScript from './useDynamicScript';

declare global {
    interface Window {
        __remotes__: Record<string, string>;
        init: (param: string) => void;
        get: (param: string) => any;
    }

    const __webpack_init_sharing__: any;
    const __webpack_share_scopes__: any;
}

function loadComponent(scope: any, module: any) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

function ModuleLoader(props: any) {
  const { ready, failed } = useDynamicScript({
    url: props.module && props.url
  });

  if (!props.module) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.url}</h2>;
  }

  const Component = React.lazy(
    loadComponent(props.scope, props.module)
  );

  return (
    <Suspense fallback="Loading Module">
      <Component />
    </Suspense>
  );
}

export default ModuleLoader;