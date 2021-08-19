// @flow

import React from 'react';

type Props = {|
  +someText: string;
|};
const MyComponent = ({ someText }: Props) => <div>{someText}</div>;
