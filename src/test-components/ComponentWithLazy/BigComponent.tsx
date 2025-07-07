import { PROMISE_DELAY } from './_config';

export default function BigComponent() {
  return <div>{`I should show after a ${PROMISE_DELAY}ms timeout.`}</div>;
}
