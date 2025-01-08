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
  // kind: string;
  // kind: 'conference' | 'meetup' | 'webinar';
};

// refactor
type Conference = TechEventBase & {
  location: string;
  price: number;
  talks: Talk[];
  kind: 'conference';
};

type Meetup = TechEventBase & {
  location: string;
  price: string;
  talks: Talk[];
  kind: 'meetup';
};

type Webinar = TechEventBase & {
  url: string;
  price?: number;
  talks: Talk;
  kind: 'webinar';
};

type TechEvent = Webinar | Conference | Meetup;

function printEvent(event: TechEvent) {
  if (event.price) {
    // Price exists!
    if (typeof event.price === 'number') {
      // We know that price is a number
      console.log('Price in EUR: ', event.price);
    } else {
      // We know that price is a string, so the
      // event is free!
      console.log('It is free!');
    }
  }
  if (Array.isArray(event.talks)) {
    // talks is an array
    event.talks.forEach((talk) => {
      console.log(talk.title);
    });
  } else {
    // It's just a single talk
    console.log(event.talks.title);
  }
}

type EventKind = 'webinar' | 'conference' | 'meetup' | 'hackathon';

function getEventTeaser(event: TechEvent) {
  switch (event.kind) {
    case 'conference':
      // We now know that I'm in type Conference
      return (
        `${event.title} (Conference), ` +
        // Suddenly I don't have to check for price as
        // TypeScript knows it will be there
        `priced at ${event.price} USD`
      );
    case 'meetup':
      // We now know that we're in type Meetup
      return (
        `${event.title} (Meetup), ` +
        // Suddenly we can say for sure that this
        // event will have a location, because the
        // type tells us
        `hosted at ${event.location}`
      );
    case 'webinar':
      // We now know that we're in type Webinar
      return (
        '${event.title} (Webinar), ' +
        // Suddenly we can say for sure that there will
        // be a URL
        `available online at ${event.url}`
      );
    default:
      throw new Error('Not sure what to do with that!');
  }
}

const script19 = {
  title: 'ScriptConf',
  date: new Date('2019-10-25'),
  capacity: 300,
  rsvp: 289,
  description: 'The feel-good JS conference',
  kind: 'conference' as const,
  price: 129,
  location: 'Central Linz',
  talks: [
    {
      speaker: 'Vitaly Friedman',
      title: 'Designing with Privacy in mind',
      abstract: '...',
    },
  ],
};

getEventTeaser(script19);

function filtterByKind(list: TechEvent[], kind: EventKind): TechEvent[] {
  return list.filter((el) => el.kind === kind);
}

declare const events: TechEvent;

type EventKind2 = TechEvent['kind'];

//?mapped Type
type GroupdedEvents = {
  [kind in EventKind2]: TechEvent[];
};

type UserEvents = {
  watching: TechEvent[];
  rsvp: TechEvent[];
  attended: TechEvent[];
  signedout: TechEvent[];
};

type UserEVentCategory = 'watching' | 'rsvp' | 'attended' | 'signedoff';

type TalkProperties = keyof Talk;
type StringKeys = keyof 'speaker';
type ArrayKeys = keyof [];

function fileterUserEvent(
  userEventList: UserEvents,
  category: keyof UserEvents,
  filterKind?: EventKind2
) {
  const filteredList = userEventList[category];
  if (filterKind) {
    return filteredList.filter((event) => event.kind === filterKind);
  }
  return filteredList;
}

function isUserEVentListCategory(list: UserEvents, category: string) {
  return Object.keys(list).includes(category);
}

function neverError(message: string, token: never) {
  return new Error(`${message},  ${token} should not exist`);
}

function getEventTeaser2(event: TechEvent) {
  switch (event.kind) {
    case 'conference':
      return `${event.title} (Conference), ` + `priced at ${event.price} USD`;
    case 'meetup':
      return `${event.title} (Meetup), ` + `hosted at ${event.location}`;
    case 'webinar':
      return `${event.title} (Webinar), ` + `available online at ${event.url}`;
    case 'hackathon':
      return `even that: ${event.title}`
    default:
      throw neverError('Not sure what to do with that', event);
  }
}


