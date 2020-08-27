// @flow

type Location = {
    pathname: string;
    search: string;
    hash: string;
    state?: any;
    key?: string;
    ...
};

export type HistoryAction = "PUSH" | "REPLACE" | "POP";

type Match = {
    params: { [key: string]: ?string; ... };
    isExact: boolean;
    path: string;
    url: string;
    ...
};

type StaticRouterContext = { url?: string; ... };

export type ContextRouter = {
    history: History;
    location: Location;
    match: Match;
    staticContext?: StaticRouterContext;
};

export type GeometryType = {
    type: string;
    coordinates: string[];
}
