import allModules from "@/store/modules";
import store from "@/store";

export default function dispatchActionForAllModules(
  actionName: string,
  {
    modules = allModules,
    modulePrefix = "",
    flags = { dispatchGlobal: false }
  } = {}
) {
  // For every module...
  // eslint-disable-next-line no-unused-vars
  for (const moduleName in modules) {
    const moduleDefinition = modules[moduleName];

    // If the action is defined on the module...
    if (moduleDefinition.actions && moduleDefinition.actions[actionName]) {
      // Dispatch the action if the module is namespaced. Otherwise,
      // set a flag to dispatch the action globally at the end.
      if (moduleDefinition.namespaced) {
        store.dispatch(`${modulePrefix}${moduleName}/${actionName}`);
      } else {
        flags.dispatchGlobal = true;
      }
    }

    // If there are any nested sub-modules...
    if (moduleDefinition.modules) {
      // Also dispatch the action for these sub-modules.
      dispatchActionForAllModules(actionName, {
        modules: moduleDefinition.modules,
        modulePrefix: modulePrefix + moduleName + "/",
        flags
      });
    }
  }

  // If this is the root and at least one non-namespaced module
  // was found with the action...
  if (!modulePrefix && flags.dispatchGlobal) {
    // Dispatch the action globally.
    store.dispatch(actionName);
  }
}
