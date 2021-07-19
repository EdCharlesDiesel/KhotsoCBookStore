
// interface MockRouterStateSnapshot {
//   url: string;
//   root: MockActiveStateSnapshot;
// }


// describe('CustomSerializer: unit', () => {

//   let serializer:CustomSerializer();
// });

// describe('serialize', () => {

//   it('should return only URL', () => {
//     // Set up the testing data
//     const expected: RouterStateUrl = {
//       url: 'this-is-url',
//       queryParams: {},
//       params: {}
//     };
//     const input: MockRouterStateSnapshot = {
//       url: 'this-is-url',
//       root: {
//         queryParams: {},
//         firstChild: {
//           firstChild: null,
//           params: {}
//         }
//       }
//     };

//     // Run the test logic
//     expect(serializer.serialize(input as any)).toEqual(expected);
//   });

//   it('should return route and query params', () => {
//     // Set up the testing data
//     const expected: RouterStateUrl = {
//       url: 'this-is-url',
//       queryParams: {
//         param1: 'val1',
//         param2: 'val2'
//       },
//       params: {
//         param1: 'val1',
//         param2: 'val2'
//       }
//     };
//     const input: MockRouterStateSnapshot = {
//       url: 'this-is-url',
//       root: {
//         queryParams: {
//           param1: 'val1',
//           param2: 'val2'
//         },
//         firstChild: {
//           firstChild: {
//             firstChild: {
//               firstChild: null,
//               params: {
//                 param1: 'val1',
//                 param2: 'val2'
//               }
//             }
//           }
//         }
//       }
//     };

//     // Run the test logic
//     expect(serializer.serialize(input as any)).toEqual(expected);
//   });

// });

// });
