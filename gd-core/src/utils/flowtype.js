// @flow

type Location = {
    pathname: string;
    search: string;
    hash: string;
    state?: any;
    key?: string;
    ...
};

type LocationShape = {
    pathname?: string;
    search?: string;
    hash?: string;
    state?: any;
    ...
};

export type HistoryAction = "PUSH" | "REPLACE" | "POP";

type History = {
    length: number;
    location: Location;
    action: HistoryAction;
    listen(
        callback: (location: Location, action: HistoryAction) => void
    ): () => void;
    push(path: string | LocationShape, state?: any): void;
    replace(path: string | LocationShape, state?: any): void;
    go(n: number): void;
    goBack(): void;
    goForward(): void;
    canGo?: (n: number) => boolean;
    block(
        callback: string | (location: Location, action: HistoryAction) => ?string
    ): () => void;
    // createMemoryHistory
    index?: number;
    entries?: Array<Location>;
    ...
};

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
