type Customer = {
  customerId: number;
  firstName: string;
  lastName: string;
};

const customer = {
  id: 1,
  firstName: 'Emmanuel',
  lastName: 'Konga',
};

type Product = {
  productId: number;
  title: string;
  price: number;
};

const product = {
  id: 22,
  title: 'From Design Patterns',
  price: 29,
};

type Order = {
  orderId: number;
  customer: Customer;
  products: Product[];
  date: Date;
};

type FetchParams = number | Customer | Product;
type FetchReturn<Param extends FetchParams> = Param extends Customer
  ? Order[]
  : Param extends Product
  ? Order[]
  : Order;

type Medium = {
  id: number;
  title: string;
  artist: string;
};

type TrackInfo = {
  duration: number;
  tracks: number;
};

type CD = Medium &
  TrackInfo & {
    kind: 'cd';
  };

type LP = Medium & {
  sides: {
    a: TrackInfo;
    b: TrackInfo;
  };
  kind: 'lp';
};

type AllMedia = CD | LP;
type MediaKinds = AllMedia['kind'];

declare function createMedium<Kin extends MediaKinds>(
  kind: Kin,
  info
): AllMedia;

type SelectBranch<Brnch, Kin> = Brnch extends { kind: Kin } ? Brnch : never;
type SelectCD = SelectBranch<AllMedia, 'cd'>;

// This equals
// type SelectCD = SelectBranch<CD | LP, ‘cd’>
// A conditional of unions is like a union of
// conditionals

// type SelectCD =
// SelectBranch<CD, ‘cd’> |
// SelectBranch<LP, ‘cd’>
// Substitute for the implementation

// type SelectCD =
// (CD extends { kind: ‘cd’ } ? CD : never) |
// (LP extends { kind: ‘cd’ } ? LP : never)
// Evaluate!

// type SelectCD =
// This is true! Awesome! Let’s return CD
// (CD extends { kind: ‘cd’ } ? CD : never) |
// This is false. let’s return never
// (LP extends { kind: ‘cd’ } ? LP : never)

// Equal to
// type SelectCD = CD | never

// update to types