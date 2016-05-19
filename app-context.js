export default function() {
  this.runlevel('configured')
    .use('connie', 'file', 'config/${environment}.json');

  this.runlevel('connected')
    .use('access-mongo', '$mongodb')

  this.runlevel('running')
    .use('express');
}
