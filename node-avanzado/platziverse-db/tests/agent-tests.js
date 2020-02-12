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
const single = Object.assign({}, agentFixtures.single)
const id = 1
const uuid = 'yyy-yyy-yyy'
const uuidArgs = {
  where: {
    uuid
  }
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
    update: sanbox.stub()
  }

  // Cuando llame a la funcion con el valor que tiene id  me retorne
  // Una promesa la cual me devuelve el fixture byId con el Id
  AgentStub.findById.withArgs(id).returns(Promise.resolve(agentFixtures.byId(id)))

  // findOne
  AgentStub.findOne.withArgs(uuidArgs).returns(Promise.resolve(agentFixtures.byUuid(uuid)))

  // Update
  AgentStub.update.withArgs(single, uuidArgs).returns(Promise.resolve(single))

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
  let agent = await db.Agent.createOrUpdate(single)

  t.true(AgentStub.findOne.called, 'findOne should be called on model')
  t.true(AgentStub.findOne.calledTwice, 'findOnd should be called twice')
  t.true(AgentStub.update.called, 'update should be called on model')
  t.true(AgentStub.update.calledOnce, 'update should be called once')

  t.deepEqual(agent, single, 'agent should be the same')
})
