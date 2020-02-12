'use restrict'

const test = require('ava')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const agentFixtures = require('./fixtures/agent')

let db = null
const config = {
  logging: () => {}
}

const MetricStub = {
  // Una funcio especifica que permite hacerle preguntas como
  // Cuantas veces fue llamada y con que argumentos
  belongsTo: sinon.spy()
}

let AgentStub = null

// Es un ambiente especifico para utilizarlo en un caso particular y poderlo reiniciarlo
let sanbox = null

// Argumentos
const id = 1
const uuid = 'yyy-yyy-yyy'
const username = 'platzi'

const uuidArgs = {
  where: { uuid }
}

const connectedArgs = {
  where: { connected: true }
}

const usernameArgs = {
  where: { username, connected: true }
}

// Datos a compaarar
const single = Object.assign({}, agentFixtures.single)
const newAgent = {
  uuid: '123-123-123',
  name: 'test',
  username: 'test',
  hostname: 'test',
  pid: 0,
  connected: false
}

// Esto se ejecuta antes de cada test
test.beforeEach(async () => {
  sanbox = sinon.createSandbox()
  // Esto se ejecuta por cada test por lo cual se necesita un sanbox
  AgentStub = {
    hasMany: sanbox.spy(),
    // Crando una funcion falsa
    findById: sanbox.stub(),
    findOne: sanbox.stub(),
    update: sanbox.stub(),
    create: sanbox.stub(),
    findAll: sanbox.stub()
  }
  // Stubs
  // Cuando llame a la funcion con el valor que tiene id  me retorne
  // Una promesa la cual me devuelve el fixture byId con el Id
  AgentStub.findById.withArgs(id).returns(Promise.resolve(agentFixtures.byId(id)))

  // findOne
  AgentStub.findOne.withArgs(uuidArgs).returns(Promise.resolve(agentFixtures.byUuid(uuid)))

  // Update
  AgentStub.update.withArgs(single, uuidArgs).returns(Promise.resolve(single))

  // Create
  AgentStub.create.withArgs(newAgent).returns(Promise.resolve({
    // Ya que del objeto sequelize se llama a la funcion toJSON
    toJSON () { return newAgent }
  }))

  // findAll
  // findAll sin argumentos
  AgentStub.findAll.withArgs().returns(Promise.resolve(agentFixtures.all))
  // findaAll con argumento de que esta conectado
  AgentStub.findAll.withArgs(connectedArgs).returns(Promise.resolve(agentFixtures.connected))
  // findAll con argumentos de un username
  AgentStub.findAll.withArgs(usernameArgs).returns(Promise.resolve(agentFixtures.platzi))

  // Con proxy requiere al traer la dependencia va sobrescribir sus dependencias
  // Para ello se debe indicar el path de la dependencia y sobreescribir lo que devuelve
  // Definiendo dependiendo de que argumento que quiero que me responda
  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })
  db = await setupDatabase(config)
})

test.afterEach(() => {
  // Restaurando el sanbox
  sanbox && sanbox.restore()
})

test('Agent', t => {
  // Valida que existe un valor no necesariamente verdadero, solo que este no sea
  // cero o vacio
  t.truthy(db.Agent, 'Agent service should exist')
})

// Es recomendado para garantizar el entorno de stubs no este saturado ya que ava
// ejecuta los test de forma paralela y por tal motivo no puede haber congruencia en los
// stubs
test.serial('Setup', t => {
  t.true(AgentStub.hasMany.called, 'AgentModel.hasMany was execute')
  t.true(MetricStub.belongsTo.called, 'MetricModel.belongsTo was execute')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argument should be the MetricModel')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argumnet should be the AgentModel')
})

test.serial('Agent#findById', async t => {
  const agent = await db.Agent.findById(id)

  t.true(AgentStub.findById.called, 'findById should be callaed on model')
  t.true(AgentStub.findById.calledOnce, 'findById should be called once')
  t.true(AgentStub.findById.calledWith(id), 'findById should be called with specify id')

  t.deepEqual(agent, agentFixtures.byId(id), 'should be the same')
})

test.serial('Agent#createOrUpdate - exist', async t => {
  const agent = await db.Agent.createOrUpdate(single)

  t.true(AgentStub.findOne.called, 'findOne should be called on model')
  t.true(AgentStub.findOne.calledTwice, 'findOnd should be called twice')
  t.true(AgentStub.update.called, 'update should be called on model')
  t.true(AgentStub.update.calledOnce, 'update should be called once')

  t.deepEqual(agent, single, 'agent should be the same')
})

test.serial('Agent#createOrUpdate - new', async t => {
  const agent = await db.Agent.createOrUpdate(newAgent)

  t.true(AgentStub.findOne.called, 'findOne should be execute on AgentModel')
  t.true(AgentStub.findOne.calledOnce, 'findOne should be called once')
  t.true(AgentStub.findOne.calledWith({
    where: { uuid: newAgent.uuid }
  }), 'findOnde should be call with uuid args')
  t.true(AgentStub.create.called, 'create should be execute on AgentModel')
  t.true(AgentStub.create.calledOnce, 'create should be called once')
  t.true(AgentStub.create.calledWith(newAgent), 'create should be called with newAgent arg')

  t.deepEqual(agent, newAgent, 'agent should be the same newAgent')
})

test.serial('Agent#findByUuid', async t => {
  const agent = await db.Agent.findByUuid(uuid)

  t.true(AgentStub.findOne.called, 'findOne should be called on AgentModel')
  t.true(AgentStub.findOne.calledOnce, 'findOne should be called once')
  t.true(AgentStub.findOne.calledWith(uuidArgs), 'findOne should be called with args')

  t.deepEqual(agent, agentFixtures.byUuid(uuid), 'agent should be the same')
})

test.serial('Agent#findAll', async t => {
  const agents = await db.Agent.findAll()

  t.true(AgentStub.findAll.called, 'findAll should be called on AgentModel')
  t.true(AgentStub.findAll.calledOnce, 'findAll should be called once')
  t.true(AgentStub.findAll.calledWith(), 'findAll should be called without args')

  t.is(agents.length, agentFixtures.all.length, 'agents should be the same length')
  t.deepEqual(agents, agentFixtures.all, 'agents should be the same')
})

test.serial('Agent#findConnected', async t => {
  const agents = await db.Agent.findConnected()

  t.true(AgentStub.findAll.called, 'findAll should by execute on AgentModel')
  t.true(AgentStub.findAll.calledOnce, 'findAll should be called once')
  t.true(AgentStub.findAll.calledWith(connectedArgs), 'findAll should be called with connectedArgs')

  t.is(agents.length, agentFixtures.connected.length, 'agents should be same elements')
  t.deepEqual(agents, agentFixtures.connected, 'agents should be the same')
})

test.serial('Agent#findByUsername', async t => {
  const agents = await db.Agent.findByUsername(username)

  t.true(AgentStub.findAll.called, 'findAll should be execute on AgentModel')
  t.true(AgentStub.findAll.calledOnce, 'findAll should be called once')
  t.true(AgentStub.findAll.calledWith(usernameArgs), 'findAll should be called with usernameArgs')

  t.is(agents.length, agentFixtures.platzi.length, 'agents should be same element to agentFixtures.platzi')
  t.deepEqual(agents, agentFixtures.platzi, 'agents should be the same to agentFixtures.plazi')
})
