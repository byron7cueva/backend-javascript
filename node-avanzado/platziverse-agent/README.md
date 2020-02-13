# Platziverse-agent

## Usage

```js
const PlatzivreseAgent = require('platziverse-agent')

const agent = new PlatzivreseAgent({
  interval: 2000
})

agent.connect()


agent.on('agent/message', payload => {
  console.log(payload);
})

setTimeout(() => agent.disconnect(), 20000)
```