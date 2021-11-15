# This project was bootstrapped with [boxes/react](https://www.trufflesuite.com/boxes/react).

## TODO

- [ ] Store encrypted object, with user sign
- [ ] Retrieve encrypted object after sign verification

## Available Scripts

Run the development console.

```
truffle develop
```

Compile and migrate the smart contracts. Note inside the development console we don't preface commands with truffle.

```
compile
migrate
```

In the client directory, we run the React app. Smart contract changes must be manually recompiled and migrated.
in another terminal (i.e. not in the truffle develop prompt)

```
cd client
npm run start
```

Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.

inside the development console.

```
test
```

outside the development console..

```
truffle test
```

Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.

ensure you are inside the client directory when running this

```
npm run test
```

To build the application for production, use the build script. A production build will be in the client/build folder.

ensure you are inside the client directory when running this

```
npm run build
```
