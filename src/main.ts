import * as core from '@actions/core'
import {Inputs, Protector} from './protector'
import {inspect} from 'util'

async function run(): Promise<void> {
  try {
    const [owner, repo] = core.getInput('repository').split('/')

    const inputs: Inputs = {
      rule: core.getInput('rule', {required: true}),
      deleteTag: core.getInput('deleteTag') === 'true',
      failWorkflow: core.getInput('failWorkflow') === 'true',
      token: core.getInput('token', {required: true}),
      owner,
      repo
    }

    core.debug(`Inputs: ${inspect(inputs)}`)

    const protector = new Protector(inputs)
    await protector.reject()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
