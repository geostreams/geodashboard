// @flow
export type ElementRect = {
    width: number | null;
    height: number | null;
    top: number | null;
    right: number | null;
    bottom: number | null;
    left: number | null;
    marginTop: number | null;
    marginRight: number | null;
    marginBottom: number | null;
    marginLeft: number | null;
    paddingTop: number | null;
    paddingRight: number | null;
    paddingBottom: number | null;
    paddingLeft: number | null;
}

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

export type MapLayerConfig = {
    title: string;
    id: string;
    type: string;
    legend: ?string;
    initialVisibility: ?boolean;
    initialOpacity: ?number;
};
