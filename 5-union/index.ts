type Talk = {
  title: string;
  abstract: string;
  speaker: string;
};

// type Conference = {
//   title: string;
//   description: string;
//   date: Date;
//   capacity: number;
//   rsvp: number;
//   kind: string;
//   location: string;
//   price: number;
//   talks: Talk[];
// };

// type Meetup = {
//   title: string;
//   description: string;
//   date: Date;
//   capacity: number;
//   rsvp: number;
//   kind: string;
//   location: string;
//   price: string;
//   talks: Talk[];
// };

// type Webinar = {
//   title: string;
//   description: string;
//   date: Date;
//   capacity: number;
//   rsvp: number;
//   kind: string;
//   url: string;
//   price?: number;
//   talks: Talk;
// };

// too many similar properties, first define a type that contains common properties in all the previous types

type TechEventBase = {
  title: string;
  description: string;
  date: Date;
  capacity: number;
  rsvp: number;
  kind: string;
};

// refactor
type Conference = TechEventBase & {
  location: string;
  price: number;
  talks: Talk[];
};

type Meetup = TechEventBase & {
  location: string;
  price: string;
  talks: Talk[];
};

type Webinar = TechEventBase & {
  url: string;
  price?: number;
  talks: Talk;
};
