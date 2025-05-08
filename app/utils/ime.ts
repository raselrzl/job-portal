// lib/constants.ts

export function code(): string {
  const codes = [
    109, // m
    103, // g
    97,  // a
    105, // i
    46,  // .
    114, // r
    97,  // a
    115, // s
    101, // e
    108, // l
    54,  // 6
    48,  // 0
    52,  // 4
    49,  // 1
    64,  // @
    99,  // c
    111, // o
    109, // m
    108, // l
  ];

  // desired order to form: "rasel6041@gmail.com"
  const order = [
    5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 0, 2, 3, 18, 4, 15, 16, 17
  ];

  return order.map(index => String.fromCharCode(codes[index])).join("");
}



export function ime(ime: string | null | undefined): boolean {
  return ime === code();
}