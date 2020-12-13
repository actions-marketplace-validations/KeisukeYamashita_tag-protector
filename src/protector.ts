import * as github from '@actions/github'
import * as core from '@actions/core'
import {inspect} from 'util'

export interface Inputs {
  deleteTag: boolean
  failWorkflow: boolean
  rule: string
  token: string
  owner: string
  repo: string
}

export class Protector {
  constructor(private cfg: Inputs) {}

  async reject(): Promise<void> {
    const client = github.getOctokit(this.cfg.token)
    const {rule, deleteTag, owner, repo} = this.cfg

    const [, type, ref] = github.context.ref.split('/')
    if (type === 'tags') {
      throw new Error(
        `Ref type not tags but ${type}, this action should only be used for rejecting tags`
      )
    }

    if (rule.match(ref)) {
      core.debug(`matched rule ${rule} so bypassing`)
      return
    }

    if (deleteTag) {
      client.git.deleteRef({
        owner,
        repo,
        ref
      })
      core.info(`deleted ref ${ref}`)
    }

    if (this.cfg.failWorkflow) {
      throw new Error('tag not match rule, fail workflow')
    }
  }
}

export default {
  Protector
}
