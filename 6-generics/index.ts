type VideoFormatURLs = {
  format360p: URL;
  format480p: URL;
  format720p: URL;
  format1080p: URL;
};

declare const videos: VideoFormatURLs;

declare function loadFormat(format: string): void;

function isFormatVailable(
  obj: VideoFormatURLs,
  key: string
): key is keyof VideoFormatURLs {
  return key in obj;
}

type SubtitleURLs = {
  english: URL;
  german: URL;
  french: URL;
};

function isSubtitleAvailable(
  obj: SubtitleURLs,
  key: string
): key is keyof SubtitleURLs {
  return key in obj;
}

//? using generics

function isAvailable<Formats extends object>(
  obj: Formats,
  key: string | number | symbol
): key is keyof Formats {
  return key in obj;
}

type URLList = {
  [k: string]: URL;
};

type URLObject = {
  [k: string]: URL;
};

// async function loadFile<Formats extends URLObject>(
//   fileFormats: Formats,
//   format: string
// ) {
//   const data = await fetch(fileFormats[format].href)
//   return {
//     format,
//     loaded: data.response === 200
//   }
// }

type Loaded<Key> = {
  format: Key;
  loaded: boolean;
};

//? stronger type checking
// async function loadFile<Formats extends URLObject, Key extends keyof Formats>(
//   fileFormats: Formats,
//   format: Key
// ) {
//   const data = await fetch(fileFormats[format].href);
//   return {
//     format,
//     loaded: data.response === 2000,
//   };
// }

async function loadFile<Formats extends URLObject, Key extends keyof Formats>(
  fileFormats: Formats,
  format: Key
): Promise<Loaded<Key>> {
  const data = await fetch(fileFormats[format].href);
  return {
    format,
    loaded: data.response === 2000,
  };
}

function loadVideoFormat(
  fileFormats: VideoFormatURLs,
  format: keyof VideoFormatURLs
) {}

//? Pick<O, K> creates a new object with seelcted property keys K of object O. it is defined as
type Picks<O, K extends keyof O> = {
  [P in K]: O[P];
};

type HD = Picks<VideoFormatURLs, 'format1080p' | 'format720p'>;
// Equivalent to
// type HD = {
// format1080p: URL,
// format720p: URL
// }

//? Record<O, T> creates an object type where all types in T get the type K. Like a dictionary. It is defined as

type Records<K extends string | number | symbol, T> = {
  [P in K]: T;
};

type URLObject2 = Records<string, URL>;

type Format360 = {
  format360p: URL;
};
type Format480 = {
  format480p: URL;
};
type Format720 = {
  format720p: URL;
};
type Format1080 = {
  format1080p: URL;
};
type AvailableFormats = Format360 | Format480 | Format720 | Format1080;

const hq: AvailableFormats = {
  format720p: new URL('...'),
  format1080p: new URL('...'),
}; // OK!
const lofi: AvailableFormats = {
  format360p: new URL('...'),
  format480p: new URL('...'),
}; // OK!

type Split = keyof VideoFormatURLs;
// Equivalent to
// type Split =
// “format360p” | “format480p” |
// “format720p” | “format1080p”

type Split2 = {
  [P in keyof VideoFormatURLs]: P;
};
// Equivalent to
// type Split2 = {
// format360p: “format360p”,
// format480p: "format480p”,
// format720p: “format720p”,
// format1080p: “format1080p”
// }

type Split3 = {
  [P in keyof VideoFormatURLs]: P;
}[keyof VideoFormatURLs];
// Equivalent to
// type Split3 =
// “format360p” | “format480p” |
// “format720p” | “format1080p”

type Split4 = {
  [P in keyof VideoFormatURLs]: Record<P, VideoFormatURLs[P]>;
}[keyof VideoFormatURLs];
// Equivalent to
// type Split4 =
// Record<”format360p”, URL> |
// Record<”format480p”, URL> |
// Record<”format720p”, URL> |
// Record<”format1080p”, URL>

// Equivalent to
// type Split4 =
// { format360p: URL } |
// { format480p: URL } |
// { format720p: URL } |
// { format1080p: URL }

type Split5<Obj> = {
  [Prop in keyof Obj]: Record<Prop, Obj[P]>;
}[keyof Obj];
type AvailableFormats2 = Split5<VideoFormatURLs>;
