// Type definitions for Next.js and React components

// React
declare module 'react' {
  import * as ReactOriginal from 'react';
  
  // Exporting all the original React exports
  export = ReactOriginal;
  export as namespace React;
  
  // Explicitly define useState and other hooks
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: ReadonlyArray<any>): void;
  export function useContext<T>(context: Context<T>): T;
  export function useReducer<R extends React.Reducer<any, any>, I>(
    reducer: R,
    initializerArg: I,
    initializer?: (arg: I) => React.ReducerState<R>
  ): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: ReadonlyArray<any>): T;
  export function useMemo<T>(factory: () => T, deps: ReadonlyArray<any> | undefined): T;
  export function useRef<T = any>(initialValue: T): { current: T };
  
  // Define FunctionComponent and FC types
  export interface FunctionComponent<P = {}> {
    (props: P & { children?: ReactOriginal.ReactNode }, context?: any): ReactOriginal.ReactElement<any, any> | null;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
  }
  
  export interface FC<P = {}> extends FunctionComponent<P> {}
  
  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }
  
  export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }
  
  export interface FormEvent<T = Element> extends SyntheticEvent<T> {}
  
  export interface SyntheticEvent<T = Element, E = Event> {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: EventTarget & T;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: E;
    preventDefault(): void;
    stopPropagation(): void;
    target: EventTarget;
    timeStamp: number;
    type: string;
  }
  
  // Define other commonly used types
  export type Key = string | number;
  export type JSXElementConstructor<P> = ((props: P) => ReactElement<any, any> | null) | (new (props: P) => Component<any, any>);
  export type Context<T> = ReactOriginal.Context<T>;
}

// React default export declaration
declare module 'react' {
  import React from 'react';
  export = React;
  export default React;
  export as namespace React;
}

// Next.js
declare module 'next/link' {
  import { ReactNode } from 'react';
  
  export interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    className?: string;
    children?: ReactNode;
  }
  
  export default function Link(props: LinkProps): JSX.Element;
}

declare module 'next/head' {
  import { ReactNode } from 'react';
  
  export interface HeadProps {
    children?: ReactNode;
  }
  
  export default function Head(props: HeadProps): JSX.Element;
}

// Document module declaration for _document.tsx
declare module 'next/document' {
  import { DocumentContext, DocumentInitialProps } from 'next/document';
  import * as React from 'react';

  export default class Document extends React.Component {
    static getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps>;
    static renderDocument(Document: typeof Document, props: DocumentInitialProps): React.ReactElement;
  }

  export interface DocumentContext {
    readonly pathname: string;
    readonly query: any;
    readonly asPath?: string;
    req?: any;
    res?: any;
    err?: any;
    renderPage: (options?: PageOptions) => Promise<RenderPageResult>;
  }

  export interface DocumentInitialProps {
    html: string;
    head?: Array<JSX.Element | null>;
    styles?: React.ReactElement[];
  }

  export interface PageOptions {
    enhanceApp?: (App: React.ComponentType) => React.ComponentType;
    enhanceComponent?: (Component: React.ComponentType) => React.ComponentType;
  }

  export interface RenderPageResult {
    html: string;
    head?: Array<JSX.Element | null>;
    styles?: React.ReactElement[];
  }

  export class Head extends React.Component<{}> {}
  export class Main extends React.Component<{}> {}
  export class NextScript extends React.Component<{}> {}

  export function Html(props: React.HTMLAttributes<HTMLHtmlElement>): JSX.Element;
  export function Main(): JSX.Element;
  export function NextScript(): JSX.Element;
  export function Head(): JSX.Element;
}

declare module 'next/app' {
  import { NextPage } from 'next';
  import { AppProps as NextAppProps } from 'next/app';
  import { ReactElement, ReactNode } from 'react';

  export type NextComponentType<C = any, IP = any, P = any> = NextPage<P, IP> & {
    getInitialProps?(context: C): IP | Promise<IP>;
  };

  export interface AppProps<P = any> extends NextAppProps<P> {
    Component: NextComponentType<any, any, P>;
    router: any;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
  }

  export type AppType<P = any> = (props: AppProps<P>) => ReactElement;

  export default function App<P = any>(props: AppProps<P>): ReactElement;
}

declare module 'next/router' {
  import { NextComponentType } from 'next';
  import { ParsedUrlQuery } from 'querystring';
  
  export type Url = string;
  
  export interface UrlObject {
    auth?: string | null;
    hash?: string | null;
    hostname?: string | null;
    href?: string | null;
    pathname?: string | null;
    protocol?: string | null;
    search?: string | null;
    slashes?: boolean | null;
    port?: string | number | null;
    query?: {[key: string]: string | string[]} | null;
  }
  
  export type TransitionOptions = {
    shallow?: boolean;
    locale?: string | false;
    scroll?: boolean;
  };
  
  export interface NextRouter {
    route: string;
    pathname: string;
    query: ParsedUrlQuery;
    asPath: string;
    isFallback: boolean;
    basePath: string;
    locale?: string;
    locales?: string[];
    defaultLocale?: string;
    isReady: boolean;
    push(url: Url | UrlObject, as?: Url | UrlObject, options?: TransitionOptions): Promise<boolean>;
    replace(url: Url | UrlObject, as?: Url | UrlObject, options?: TransitionOptions): Promise<boolean>;
    reload(): void;
    back(): void;
    prefetch(url: string, asPath?: string, options?: {priority?: boolean; locale?: string | false}): Promise<void>;
    beforePopState(cb: (state: any) => boolean): void;
    events: {
      on(type: 'routeChangeStart' | 'routeChangeComplete' | 'routeChangeError' | 'beforeHistoryChange' | 'hashChangeStart' | 'hashChangeComplete', handler: (...args: any[]) => void): NextRouter;
      off(type: 'routeChangeStart' | 'routeChangeComplete' | 'routeChangeError' | 'beforeHistoryChange' | 'hashChangeStart' | 'hashChangeComplete', handler: (...args: any[]) => void): NextRouter;
    };
  }
  
  export function useRouter(): NextRouter;
}

// Framer Motion
declare module 'framer-motion' {
  import { ComponentType, ReactNode } from 'react';
  
  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    variants?: any;
    style?: any;
    className?: string;
    children?: ReactNode;
  }
  
  export type motion = {
    [K in keyof JSX.IntrinsicElements]: ComponentType<JSX.IntrinsicElements[K] & MotionProps>;
  };
  
  export const motion: motion;
}

// Axios
declare module 'axios' {
  export interface AxiosRequestConfig {
    url?: string;
    method?: string;
    baseURL?: string;
    headers?: any;
    params?: any;
    data?: any;
    timeout?: number;
    withCredentials?: boolean;
    responseType?: string;
    auth?: {
      username: string;
      password: string;
    };
  }
  
  export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request?: any;
  }
  
  export interface AxiosError<T = any> extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse<T>;
    isAxiosError: boolean;
  }
  
  export interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<AxiosResponse>;
    (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    defaults: AxiosRequestConfig;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  }
  
  export function create(config?: AxiosRequestConfig): AxiosInstance;
  export default create();
}

// Add process environment variables for TypeScript
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_OPENAI_API_KEY: string;
    NEXT_PUBLIC_BLOCKCHAIN_NETWORK: string;
  }
}

// Add JSX namespace for custom elements
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// User-related types
export interface User {
  _id: string;
  username: string;
  email: string;
  profileInfo: Profile;
  lieProfile: LieProfile;
  gameState: GameState;
  digitalAssets: DigitalAssets;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  avatar?: string;
  bio?: string;
  level: number;
  premium: boolean;
  joinedAt: string;
}

export interface LieProfile {
  lieAbility: number;
  paradoxResistance: number;
  truthDiscernment: number;
  specialAbilities: string[];
}

export interface GameState {
  completedStories: string[];
  currentStory?: string;
  storyProgress: Record<string, StoryProgress>;
  stats: UserStats;
}

export interface StoryProgress {
  currentChapter: number;
  choices: Record<string, string>;
  liesUsed: number;
  truthsRevealed: number;
  lastPlayed: string;
}

export interface UserStats {
  totalTimePlayed: number; // in minutes
  storiesCompleted: number;
  fragmentsDiscovered: number;
  achievementsUnlocked: number;
  completionRate: number; // percentage
}

export interface DigitalAssets {
  paradoxCoins: number;
  fragments: string[]; // IDs of discovered fragments
  achievements: string[]; // IDs of unlocked achievements
}

// Story-related types
export interface Story {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  releaseDate: string;
  premium: boolean;
  requiredLevel: number;
  requiredCoins: number;
  fragments: string[]; // IDs of fragments that can be discovered
  chapters: Chapter[];
  ratings: Rating[];
  averageRating: number;
  completionCount: number;
}

export interface Chapter {
  _id: string;
  title: string;
  content: string;
  choices: Choice[];
  truthThreshold: number; // Minimum truth discernment to reveal hidden content
}

export interface Choice {
  _id: string;
  text: string;
  lieRequired: boolean;
  nextChapterId: string;
  consequences: Consequence[];
}

export interface Consequence {
  type: 'coin' | 'fragment' | 'ability' | 'story';
  value: number | string;
  condition?: string;
}

export interface Rating {
  userId: string;
  username: string;
  score: number;
  review: string;
  date: string;
}

// Fragment-related types
export interface Fragment {
  _id: string;
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  obtainedAt: string;
  storySource?: string;
  combinable: boolean;
  combinableWith?: string[];
  specialEffect?: FragmentEffect;
}

export interface FragmentEffect {
  type: 'ability_boost' | 'coin_multiplier' | 'story_unlock';
  value: number | string;
  duration?: number; // Duration in minutes, if applicable
}

export interface CombinationRecipe {
  inputs: string[]; // Fragment IDs
  output: string; // Fragment ID
  chance: number; // Percentage chance of success (0-100)
}

// Transaction-related types
export interface Transaction {
  _id: string;
  userId: string;
  type: 'purchase' | 'reward' | 'spend';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface CoinPackage {
  _id: string;
  name: string;
  amount: number;
  price: number;
  discount?: number;
  popular?: boolean;
  limited?: boolean;
  limitedUntil?: string;
}

// Community-related types
export interface CommunityPost {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
  category: 'discussion' | 'theory' | 'announcement' | 'question';
  tags: string[];
}

export interface Comment {
  _id: string;
  postId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  replies: Reply[];
}

export interface Reply {
  _id: string;
  commentId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  likes: number;
}

// API-related types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  results: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} 