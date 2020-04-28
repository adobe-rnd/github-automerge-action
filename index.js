/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  // Get client and context
  const client = new github.GitHub(
    core.getInput('repo-token', {required: true})
  );
  const { pull_request: pr } = github.context.payload;
  if (!pr) {
    throw new Error("Event payload missing `pull_request`");
  }
  console.log(`Creating approving review for pull request #${pr.number}`);
  await client.pulls.createReview({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: pr.number,
    event: "APPROVE"
  });
  console.log(`Approved pull request #${pr.number}`);

  console.log(`Trying to merge PR...`);
  await client.pulls.merge({
    commit_title: `Merging changes of ${pr.head.ref} (#${pr.number}}`,
    commit_message: pr.head.sha,
    merge_method: 'merge',
  })
  console.log(`done.`);
}

run().catch((error) => {
  console.error(error);
  core.setFailed(error.message);
});
