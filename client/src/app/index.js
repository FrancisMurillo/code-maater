import {
    Provider as InternalizationProvider,
    reducer as internalizationReducer
} from "./Internationalization";
import {
    Provider as PersistenceProvider
} from "./Persistence";
import {
    Provider as RoutingProvider,
    reducer as routingReducer,
    middleware as routingMiddleware
} from "./Routing";
import {
    Provider as ThemeProvider
} from "./Theme";

export {
    internalizationReducer,
    InternalizationProvider,
    PersistenceProvider,
    RoutingProvider,
    routingMiddleware,
    routingReducer,
    ThemeProvider
};
